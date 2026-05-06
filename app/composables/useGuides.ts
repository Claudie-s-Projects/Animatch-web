export interface Guide {
  id: number
  titre: string
  slug: string
  contenu: string
  espece: string | null
  thematique: string
}

export function useGuides() {
  const { public: { apiBase } } = useRuntimeConfig()

  function fetchGuides() {
    return useFetch<Guide[]>('/guides', { baseURL: apiBase })
  }

  function fetchGuide(slug: string) {
    return useFetch<Guide>(`/guides/${slug}`, { baseURL: apiBase })
  }

  return { fetchGuides, fetchGuide }
}
