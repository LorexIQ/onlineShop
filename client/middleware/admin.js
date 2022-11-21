export default function ({ redirect, store }) {
  if (!(store.state.auth.user && store.state.auth.user.role === 2)) {
    redirect({name: 'index'})
  }
}
