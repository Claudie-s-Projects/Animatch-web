export function useAuth() {
  const { public: { apiBase } } = useRuntimeConfig()
  const token = useCookie('auth_token')
  const isLoggedIn = computed(() => !!token.value)

  const prenom = computed(() => {
    if (!token.value) return null;
    const payload = JSON.parse(atob(token.value.split(".")[1]));
    return payload.prenom as string;
  });

  async function login(email: string, mot_de_passe: string) {
    const data = await $fetch<{ access_token: string }>(`${apiBase}/auth/login`, {
      method: 'POST',
      body: { email, mot_de_passe },
    })
    token.value = data.access_token
  }

  function logout() {
    token.value = null;
  }

  return { isLoggedIn, prenom, login, logout, token };
}
