export interface Demande {
  id: number
  animal: {
    id: number
    nom: string
    photo_url: string | null
    refuge: { nom: string; ville: string } | null
  }
  statut: string
  created_at: string
}

export function useDemandes() {
  const { public: { apiBase } } = useRuntimeConfig()
  const { token } = useAuth()

  function authHeaders() {
    return { Authorization: `Bearer ${token.value}` }
  }

  function fetchDemandes() {
    return $fetch<Demande[]>('/demandes', {
      baseURL: apiBase,
      headers: authHeaders(),
    })
  }

  function sendDemande(animalId: number) {
    return $fetch('/demandes', {
      method: 'POST',
      baseURL: apiBase,
      headers: authHeaders(),
      body: { animalId },
    })
  }

  function cancelDemande(animalId: number) {
    return $fetch(`/demandes/${animalId}`, {
      method: 'DELETE',
      baseURL: apiBase,
      headers: authHeaders(),
    })
  }

  return { fetchDemandes, sendDemande, cancelDemande }
}
