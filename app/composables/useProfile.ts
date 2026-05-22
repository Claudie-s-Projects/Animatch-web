export interface Profile {
  id: number
  prenom: string
  nom: string
  email: string
  logement: string | null
  enfants: string | null
  animaux: string | null
  activite: string | null
  experience: string | null
}

export function useProfile() {
  const { public: { apiBase } } = useRuntimeConfig()
  const { token } = useAuth()

  function authHeaders() {
    return { Authorization: `Bearer ${token.value}` }
  }

  function fetchProfile() {
    return $fetch<Profile>('/auth/me', {
      baseURL: apiBase,
      headers: authHeaders(),
    })
  }

  function updateProfile(data: Partial<Omit<Profile, 'id' | 'prenom' | 'nom' | 'email'>>) {
    return $fetch<Profile>('/auth/me', {
      method: 'PATCH',
      baseURL: apiBase,
      headers: authHeaders(),
      body: data,
    })
  }

  return { fetchProfile, updateProfile }
}
