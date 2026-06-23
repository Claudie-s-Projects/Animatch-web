export default defineNuxtRouteMiddleware(() => {
  const { isLoggedIn, role } = useAuth()
  if (!isLoggedIn.value || role.value !== 'refuge') {
    return navigateTo('/login')
  }
})
