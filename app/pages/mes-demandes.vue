<script setup lang="ts">
const { isLoggedIn } = useAuth();
const { fetchDemandes, cancelDemande } = useDemandes();

if (!isLoggedIn.value) {
  await navigateTo("/login");
}

const demandes = ref(await fetchDemandes());

async function annuler(animalId: number) {
  const ok = confirm("Annuler cette demande ?");
  if (!ok) return;
  await cancelDemande(animalId);
  demandes.value = demandes.value.filter((d) => d.animal.id !== animalId);
}
</script>

<template>
  <div class="px-8 pt-6 pb-4">
    <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-sm text-brun-400 hover:text-blush-500 group">
      <span class="inline-block group-hover:-translate-x-1 transition-transform duration-150">‹</span>
      Accueil
    </NuxtLink>
  </div>
  <main class="max-w-3xl mx-auto px-4 pb-8">
    <h1 class="text-2xl font-bold text-brun-800 mb-2">Mes demandes</h1>
    <p class="text-sm text-brun-400 mb-6">Le refuge prendra connaissance de ta demande prochainement.</p>

    <p v-if="demandes.length === 0" class="text-brun-400">
      Tu n'as pas encore envoyé de demande d'intérêt.
    </p>

    <div v-else class="space-y-4">
      <div
        v-for="demande in demandes"
        :key="demande.id"
        class="bg-white border border-[#E7CDB6] rounded-[20px] p-4 flex items-center gap-4 shadow-sm"
      >
        <img
          v-if="demande.animal.photo_url"
          :src="demande.animal.photo_url"
          :alt="demande.animal.nom"
          class="w-16 h-16 object-cover rounded-xl flex-shrink-0"
        />
        <div v-else class="w-16 h-16 rounded-xl bg-creme-50 flex-shrink-0"></div>

        <div class="flex-1 min-w-0">
          <p class="font-semibold text-brun-800">{{ demande.animal.nom }}</p>
          <p class="text-sm text-brun-700">
            {{ demande.animal.refuge?.nom }} — {{ demande.animal.refuge?.ville }}
          </p>
          <p class="text-xs text-brun-400 mt-1">
            {{ new Date(demande.created_at).toLocaleDateString("fr-BE") }}
          </p>
          <span
            class="text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block"
            :class="{
              'bg-creme-50 text-brun-700': demande.statut === 'en_attente',
              'bg-green-100 text-green-700': demande.statut === 'validée',
              'bg-roux-100 text-roux-600': demande.statut === 'déclinée',
            }"
          >
            {{ demande.statut === 'en_attente' ? 'En attente' : demande.statut === 'validée' ? 'Validée' : 'Déclinée' }}
          </span>
        </div>

        <button
          @click="annuler(demande.animal.id)"
          class="text-xs text-brun-400 hover:text-red-500 hover:underline whitespace-nowrap"
        >
          Annuler
        </button>
      </div>
    </div>
  </main>
</template>
