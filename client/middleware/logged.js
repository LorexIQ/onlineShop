export default function ({ redirect, store }) {
  if (!store.state.auth.user) {
    redirect({name: 'auth'})
  }
}
