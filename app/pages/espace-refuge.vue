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
  <main class="max-w-2xl mx-auto px-4 py-12">

    <!-- Header dégradé roux -->
    <div class="bg-linear-to-r from-roux-600 to-roux-300 rounded-[20px] px-8 py-6 mb-6">
      <h1 class="text-2xl font-bold text-white">Espace refuge</h1>
      <p v-if="refuge" class="text-roux-100 text-sm mt-1">{{ refuge.nom }}</p>
    </div>

    <div v-if="refuge" class="flex flex-col gap-6">

      <!-- Infos refuge -->
      <div class="bg-white rounded-[20px] border border-[#E7CDB6] p-6 shadow-sm">
        <h2 class="text-lg font-semibold text-brun-800 mb-4">Informations</h2>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p class="text-xs text-brun-400 uppercase tracking-wide mb-1">Nom</p>
            <p class="font-medium text-brun-800">{{ refuge.nom }}</p>
          </div>
          <div>
            <p class="text-xs text-brun-400 uppercase tracking-wide mb-1">Email</p>
            <p class="font-medium text-brun-800">{{ refuge.email }}</p>
          </div>
          <div>
            <p class="text-xs text-brun-400 uppercase tracking-wide mb-1">Adresse</p>
            <p class="font-medium text-brun-800">{{ refuge.adresse }}</p>
          </div>
          <div>
            <p class="text-xs text-brun-400 uppercase tracking-wide mb-1">Localité</p>
            <p class="font-medium text-brun-800">{{ refuge.localite }}</p>
          </div>
        </div>
      </div>

      <!-- Demandes reçues -->
      <div class="bg-white rounded-[20px] border border-[#E7CDB6] p-6 shadow-sm">
        <h2 class="text-lg font-semibold text-brun-800 mb-4">Demandes reçues</h2>

        <p v-if="demandes.length === 0" class="text-brun-400 text-sm">
          Aucune demande pour le moment.
        </p>

        <div v-else class="space-y-4">
          <div
            v-for="demande in demandes"
            :key="demande.id"
            class="bg-creme-50 border border-[#E7CDB6] rounded-xl p-4 space-y-2"
          >
            <div class="flex items-center justify-between">
              <p class="font-semibold text-brun-800">{{ demande.animal.nom }}</p>
              <span
                class="text-xs font-medium px-2 py-0.5 rounded-full"
                :class="{
                  'bg-white text-brun-700 border border-[#E7CDB6]': demande.statut === 'en_attente',
                  'bg-green-100 text-green-700': demande.statut === 'validée',
                  'bg-roux-100 text-roux-600': demande.statut === 'déclinée',
                }"
              >
                {{ demande.statut === 'en_attente' ? 'En attente' : demande.statut === 'validée' ? 'Validée' : 'Déclinée' }}
              </span>
            </div>

            <p class="text-sm font-medium text-brun-800">
              {{ demande.famille.prenom }} {{ demande.famille.nom }}
            </p>
            <p class="text-xs text-brun-400">
              {{ demande.famille.logement }} · {{ demande.famille.enfants }} ·
              {{ demande.famille.animaux }} · {{ demande.famille.activite }} ·
              {{ demande.famille.experience }}
            </p>
            <p v-if="demande.message" class="text-sm text-brun-700 italic">
              {{ demande.message }}
            </p>
            <p class="text-xs text-brun-400">
              {{ new Date(demande.created_at).toLocaleDateString("fr-BE") }}
            </p>

            <div v-if="demande.statut === 'en_attente'" class="flex gap-2 pt-1">
              <button
                @click="changerStatut(demande.id, 'validée')"
                class="flex-1 py-1.5 rounded-lg bg-green-100 text-green-700 text-sm font-medium hover:bg-green-200 transition-colors"
              >
                Valider
              </button>
              <button
                @click="changerStatut(demande.id, 'déclinée')"
                class="flex-1 py-1.5 rounded-lg bg-roux-100 text-roux-600 text-sm font-medium hover:bg-roux-100 transition-colors"
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
