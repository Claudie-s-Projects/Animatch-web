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
  <main class="max-w-3xl mx-auto px-4 py-8">
    <NuxtLink
      to="/"
      class="text-sm text-gray-500 hover:underline mb-6 inline-block"
      >← Retour à l'accueil</NuxtLink
    >
    <h1 class="text-2xl font-bold mb-6">Mes demandes</h1>

    <p v-if="demandes.length === 0" class="text-gray-500">
      Tu n'as pas encore envoyé de demande d'intérêt.
    </p>

    <div v-else class="space-y-4">
      <div
        v-for="demande in demandes"
        :key="demande.id"
        class="border rounded-xl p-4 flex items-center gap-4"
      >
        <img
          v-if="demande.animal.photo_url"
          :src="demande.animal.photo_url"
          :alt="demande.animal.nom"
          class="w-16 h-16 object-cover rounded-lg flex-shrink-0"
        />
        <div class="flex-1 min-w-0">
          <p class="font-semibold">{{ demande.animal.nom }}</p>
          <p class="text-sm text-gray-500">
            {{ demande.animal.refuge?.nom }} —
            {{ demande.animal.refuge?.ville }}
          </p>
          <p class="text-xs text-gray-400 mt-1">
            {{ new Date(demande.created_at).toLocaleDateString("fr-BE") }}
          </p>
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
        <button
          @click="annuler(demande.animal.id)"
          class="text-xs text-red-500 hover:underline whitespace-nowrap"
        >
          Annuler
        </button>
      </div>
    </div>
  </main>
</template>
