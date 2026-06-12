<script setup lang="ts">
definePageMeta({ middleware: "refuge" });

const {
  public: { apiBase },
} = useRuntimeConfig();
const { token } = useAuth();

const refuge = ref<{
  nom: string;
  email: string;
  adresse: string;
  localite: string;
} | null>(null);

const data = await $fetch<{
  nom: string;
  email: string;
  adresse: string;
  localite: string;
}>(`${apiBase}/auth/me-refuge`, {
  headers: { Authorization: `Bearer ${token.value}` },
});
refuge.value = data;

const { fetchDemandesRefuge, updateStatut } = useDemandes();
const demandes = ref(await fetchDemandesRefuge());
async function changerStatut(id: number, statut: string) {
  await updateStatut(id, statut);
  const d = demandes.value.find((d) => d.id === id);
  if (d) d.statut = statut;
}
</script>

<template>
  <main class="max-w-2xl mx-auto px-4 py-16">
    <h1 class="text-2xl font-bold mb-8">Espace refuge</h1>

    <div v-if="refuge" class="bg-white rounded-xl border p-6 space-y-3">
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide">Nom</p>
        <p class="font-medium">{{ refuge.nom }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide">Email</p>
        <p class="font-medium">{{ refuge.email }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide">Adresse</p>
        <p class="font-medium">{{ refuge.adresse }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide">Localité</p>
        <p class="font-medium">{{ refuge.localite }}</p>
      </div>
      <div class="mt-8">
        <h2 class="text-xl font-bold mb-4">Demandes reçues</h2>

        <p v-if="demandes.length === 0" class="text-gray-500">
          Aucune demande pour le moment.
        </p>

        <div v-else class="space-y-4">
          <div
            v-for="demande in demandes"
            :key="demande.id"
            class="border rounded-xl p-4 space-y-2"
          >
            <div class="flex items-center justify-between">
              <p class="font-semibold">{{ demande.animal.nom }}</p>
              <span
                class="text-xs font-medium px-2 py-0.5 rounded-full"
                :class="{
                  'bg-gray-100 text-gray-500': demande.statut === 'en_attente',
                  'bg-green-100 text-green-700': demande.statut === 'validée',
                  'bg-red-100 text-red-600': demande.statut === 'déclinée',
                }"
              >
                {{
                  demande.statut === "en_attente"
                    ? "En attente"
                    : demande.statut === "validée"
                      ? "Validée"
                      : "Déclinée"
                }}
              </span>
            </div>

            <p class="text-sm font-medium">
              {{ demande.famille.prenom }} {{ demande.famille.nom }}
            </p>
            <p class="text-xs text-gray-500">
              {{ demande.famille.logement }} · {{ demande.famille.enfants }} ·
              {{ demande.famille.animaux }} · {{ demande.famille.activite }} ·
              {{ demande.famille.experience }}
            </p>
            <p v-if="demande.message" class="text-sm text-gray-700 italic">
              {{ demande.message }}
            </p>
            <p class="text-xs text-gray-400">
              {{ new Date(demande.created_at).toLocaleDateString("fr-BE") }}
            </p>

            <div v-if="demande.statut === 'en_attente'" class="flex gap-2 pt-1">
              <button
                @click="changerStatut(demande.id, 'validée')"
                class="flex-1 py-1.5 rounded-lg bg-green-100 text-green-700 text-sm font-medium hover:bg-green-200"
              >
                Valider
              </button>
              <button
                @click="changerStatut(demande.id, 'déclinée')"
                class="flex-1 py-1.5 rounded-lg bg-red-100 text-red-600 text-sm font-medium hover:bg-red-200"
              >
                Décliner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
