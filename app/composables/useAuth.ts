export function useAuth() {
  const { public: { apiBase } } = useRuntimeConfig()
  const token = useCookie('auth_token')
  const isLoggedIn = computed(() => !!token.value)

  function getPayload() {
    if (!token.value) return null
    return JSON.parse(atob(token.value.split('.')[1]))
  }

  const prenom = computed(() => getPayload()?.prenom as string ?? null)
  const nom = computed(() => getPayload()?.nom as string ?? null)
  const role = computed(() => getPayload()?.role as string ?? null)

  async function login(email: string, mot_de_passe: string) {
    const data = await $fetch<{ access_token: string }>(`${apiBase}/auth/login`, {
      method: 'POST',
      body: { email, mot_de_passe },
    })
    token.value = data.access_token
  }

  async function loginRefuge(email: string, mot_de_passe: string) {
    const data = await $fetch<{ access_token: string }>(`${apiBase}/auth/login-refuge`, {
      method: 'POST',
      body: { email, mot_de_passe },
    })
    token.value = data.access_token
  }

  function logout() {
    token.value = null
  }

  return { isLoggedIn, prenom, nom, role, login, loginRefuge, logout, token }
}
