import type { Animal } from './useAnimals'

export interface Favori {
  id: number
  animal: Animal
}

export function useFavoris() {
  const { public: { apiBase } } = useRuntimeConfig()
  const { token } = useAuth()

  function authHeaders() {
    return { Authorization: `Bearer ${token.value}` }
  }

  function fetchFavoris() {
    return $fetch<Favori[]>('/favorites', {
      baseURL: apiBase,
      headers: authHeaders(),
    })
  }

  function addFavori(animalId: number) {
    return $fetch('/favorites', {
      method: 'POST',
      baseURL: apiBase,
      headers: authHeaders(),
      body: { animalId },
    })
  }

  function removeFavori(animalId: number) {
    return $fetch(`/favorites/${animalId}`, {
      method: 'DELETE',
      baseURL: apiBase,
      headers: authHeaders(),
    })
  }

  return { fetchFavoris, addFavori, removeFavori }
}
