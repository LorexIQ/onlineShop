import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MongodbService } from '../mongodb/mongodb.service';
import {MailerService} from "../mailer/mailer.service";
import { SigninDto, SignupDto } from './dto';
import {VerifyDto} from "./dto/verify.dto";
import * as argon from 'argon2';
import { join } from "path";
import { readFile } from "fs";

@Injectable()
export class AuthService {
  constructor(
    private mailer: MailerService,
    private mongo: MongodbService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  // Регистрация пользователя
  async signup(dto: SignupDto) {
    // Генерация пароля
    const hash = await argon.hash(dto.password);
    try {
      // Удаление пароля из dto
      delete dto.password;
      // Сохранение пользователя + возврат без "мусора"
      return this.beautifyUser(await new this.mongo.user({
        ...dto,
        hash
      }).save());
    } catch (err) {
      switch (Object.keys(err.keyValue)[0]) {
        case 'email':
          // Ошибка о дублировании логиров
          throw new ForbiddenException('Почта уже используется');
        case 'username':
          // Ошибка о дублировании логиров
          throw new ForbiddenException('Логин уже занят');
      }
    }
  }
  // Авторизация пользователя
  async signin(dto: SigninDto) {
    // Поиск пользователя в бд
    const user = await this.mongo.user.findOne({
      username: dto.username
    });
    // Пользователь существует
    if (user) {
      // Пароль проходит валидацию хешем
      if (await argon.verify(user.hash, dto.password)) {
        // Возврат сгенерированного токена
        return user.emailVerify ? this.createToken(user._id, user.username) : user;
      } else {
        // Ошибка неверного пароля
        throw new ForbiddenException('Неверный пароль');
      }
    } else {
      // Ошибка несуществования пользователя
      throw new ForbiddenException('Пользователь не найден');
    }
  }

  // Активация аккаунта
  async verify(body: VerifyDto) {
    const user = await this.mongo.user.findOne({ email: body.email });
    if (!user.emailVerify) {
      // Если передан в теле код
      if (body.code) {
        // Попытка активации аккаунта
        return await this.verifyCode({ id: user['_id'], email: user.email }, body.code);
      } else {
        // Запрос кода активации
        return await this.verifyCreateCode(user.email, body.update);
      }
    } else {
      // Ошибка, если аккаунт уже активирован
      throw new ForbiddenException('Аккаунт уже активирован');
    }
  }
  // Сравнение кодов верификации
  async verifyCode(userData: { id: string; email: string; }, code: Number) {
    // Поиск оюъекта ключа активации
    const userVerify = await this.mongo.userVerify.findOne({ email: userData.email });
    // Если ключ имеется
    if (userVerify) {
      // Сравниваем с переданным в тело запроса ключом
      if (userVerify.code == code) {
        // Активируем аккаунт
        await this.mongo.user.updateOne({ '_id': userData.id }, { emailVerify: true });
        // Удаляем объект ключа активации
        userVerify.remove();
      } else {
        // Ошибка неверного ключа
        throw new ForbiddenException('Неверный код активации');
      }
    } else {
      // Ошибка истечения срока годности ключа
      throw new ForbiddenException('Срок действия ключа истёк. Создайте новый');
    }
  }
  // Отправление кода верификации
  async verifyCreateCode(email: string, update: Boolean) {
    // Чтение html + вызов метода отправления письма
    const send = () => {
      readFile(join(__dirname, '../mailer/html/code.html'), 'utf8', async (err, data) => {
        await this.mailer.send({ email, code, html: data.replace('{{ code }}', `${code}`) });
      });
    }
    // Генерация случайного кода
    const code = Math.ceil(Math.random() * 899998 + 100001);
    // Состояние, новый код или выгруженный с базы
    let newCode = false;
    // Поиск записи уже существующего кода
    let userVerify = await this.mongo.userVerify.findOne({ email });
    // Запись не существует
    if (!userVerify) {
      // Создать запись в бд
      userVerify = await this.mongo.userVerify.create({
        email,
        code
      });
      // Установить состояние кода на: новый
      newCode = true;
      // Отправить письмо на почту
      send();
      // Передан ключ обновления кода и прошло больше 30 секунд
    } else if (update && (new Date()).getTime() - userVerify.updatedAt.getTime() > 30000) {
      // Обновление кода и timestamp в бд
      await this.mongo.userVerify.updateOne({ email }, { code });
      // Поиск новогой записи кода
      userVerify = await this.mongo.userVerify.findOne({ email });
      // Установить состояние кода на: новый
      newCode = true;
      // Отправить письмо на почту
      send();
    }
    // Возврат объекта записи о коде в бд + состояние кода
    return { ...this.beautifyUser(userVerify), newCode };
  }

  // Форматирование объекта из mongo
  beautifyUser(data: Object) {
    // Преобразование объекта Mongo в обычный объект JS
    const user = JSON.parse(JSON.stringify(data));
    // Удаление ключей хэша, __v и кода верификации
    delete user.hash;
    delete user.__v;
    delete user.code;
    return user;
  }
  // Генерация токена
  async createToken(id: String, username: string): Promise<{ access_token: string }> {
    // Создание массива с данными токена
    const data = {
      sub: id,
      username
    };
    // Генерация токена JWT
    const access_token = await this.jwt.signAsync(data, {
      expiresIn: '24h',
      secret: this.config.get('JWT_SECRET_KEY')
    });
    return {
      access_token
    }
  }
}