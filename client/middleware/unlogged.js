export default ({ redirect, store }) => {
  setTimeout(() => {
    if (store.state.auth.user) {
      redirect({name: 'index'})
    }
  }, 400)
}
