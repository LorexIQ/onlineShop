import {ApiProperty} from "@nestjs/swagger";

export class UserTokenSwaggerDto {
    @ApiProperty({ default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzY1MmZiODA1YzhjNDNkOWZmZTFmYzMiLCJ1c2VybmFtZSI6InRlc3RlZDEiLCJpYXQiOjE2Njc1ODMzODAsImV4cCI6MTY2NzU4Njk4MH0.r3tzt9zjsF5XUR4pj679IDQ3IKc7gtPRfHzev8hu6X0' })
    access_token: string;
}