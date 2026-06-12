export interface Demande {
  id: number;
  animal: {
    id: number;
    nom: string;
    photo_url: string | null;
    refuge: { nom: string; ville: string } | null;
  };
  statut: string;
  created_at: string;
}

export interface DemandeRefuge {
  id: number;
  statut: string;
  message: string | null;
  created_at: string;
  animal: { id: number; nom: string };
  famille: {
    prenom: string;
    nom: string;
    logement: string | null;
    enfants: string | null;
    animaux: string | null;
    activite: string | null;
    experience: string | null;
  };
}

export function useDemandes() {
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  const { token } = useAuth();

  function authHeaders() {
    return { Authorization: `Bearer ${token.value}` };
  }

  function fetchDemandes() {
    return $fetch<Demande[]>("/demandes", {
      baseURL: apiBase,
      headers: authHeaders(),
    });
  }

  function sendDemande(animalId: number, message?: string) {
    return $fetch("/demandes", {
      method: "POST",
      baseURL: apiBase,
      headers: authHeaders(),
      body: { animalId, message },
    });
  }

  function cancelDemande(animalId: number) {
    return $fetch(`/demandes/${animalId}`, {
      method: "DELETE",
      baseURL: apiBase,
      headers: authHeaders(),
    });
  }

  function fetchDemandesRefuge() {
    return $fetch<DemandeRefuge[]>("/demandes/refuge", {
      baseURL: apiBase,
      headers: authHeaders(),
    });
  }

  function updateStatut(id: number, statut: string) {
    return $fetch(`/demandes/${id}/statut`, {
      method: "PATCH",
      baseURL: apiBase,
      headers: authHeaders(),
      body: { statut },
    });
  }

  return {
    fetchDemandes,
    sendDemande,
    cancelDemande,
    fetchDemandesRefuge,
    updateStatut,
  };
}
