export interface Animal {
  id: number
  nom: string
  espece: string | null
  race: string | null
  age: string | null
  sexe: string | null
  description: string | null
  photo_url: string | null
  date_entree: string | null
  disponible: boolean
  slug: string
  source_url: string | null
  urgence: 'prioritaire' | 'urgent' | 'critique' | null
  refuge: { id: number; nom: string; ville: string | null; site_url: string | null; telephone: string | null } | null
}

export interface AnimalsResponse {
  data: Animal[]
  total: number
  page: number
  limit: number
}

export interface AnimalFilters {
  page?: number
  limit?: number
  espece?: string
  sexe?: string
  ville?: string
  urgence?: 'prioritaire' | 'urgent' | 'critique'
}

export function useAnimals() {
  const { public: { apiBase } } = useRuntimeConfig()

  function fetchAnimals(filters: AnimalFilters = {}) {
    return useFetch<AnimalsResponse>('/animals', {
      baseURL: apiBase,
      query: filters,
    })
  }

  function fetchAnimal(id: number) {
    return useFetch<Animal>(`/animals/${id}`, {
      baseURL: apiBase,
    })
  }

  return { fetchAnimals, fetchAnimal }
}
