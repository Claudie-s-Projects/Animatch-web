<script setup lang="ts">
const route = useRoute();
const { fetchAnimal } = useAnimals();
const { isLoggedIn } = useAuth();
const { fetchFavoris, addFavori, removeFavori } = useFavoris();
const { sendDemande, fetchDemandes } = useDemandes();

const { data: animal } = await fetchAnimal(Number(route.params.id));

if (!animal.value) {
  throw createError({ statusCode: 404, message: "Animal introuvable" });
}

const isFavori = ref(false);
const demandeEnvoyee = ref(false);
const showForm = ref(false);
const message = ref("");

if (isLoggedIn.value) {
  const demandesExistantes = await fetchDemandes().catch(() => []);
  demandeEnvoyee.value = demandesExistantes.some(
    (d) => d.animal.id === animal.value!.id,
  );
  const favoris = await fetchFavoris().catch(() => []);
  isFavori.value = favoris.some((f) => f.animal.id === animal.value!.id);
}

async function toggleFavori() {
  if (!animal.value) return;
  if (isFavori.value) {
    await removeFavori(animal.value.id);
    isFavori.value = false;
  } else {
    await addFavori(animal.value.id);
    isFavori.value = true;
  }
}

async function faireUneDemande() {
  if (!animal.value) return;
  try {
    await sendDemande(animal.value.id, message.value || undefined);
  } catch {}

  demandeEnvoyee.value = true;
  showForm.value = false;
}
</script>

<template>
  <main class="max-w-3xl mx-auto px-4 py-8">
    <NuxtLink
      to="/animals"
      class="text-sm text-gray-500 hover:underline mb-6 inline-block"
    >
      ← Retour au catalogue
    </NuxtLink>

    <div v-if="animal" class="space-y-6">
      <div class="flex items-center gap-3">
        <h1 class="text-3xl font-bold">{{ animal.nom }}</h1>
        <UrgenceBadge :urgence="animal.urgence" />
        <button
          v-if="isLoggedIn"
          @click="toggleFavori"
          class="ml-auto w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-xl"
          :title="isFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'"
        >
          <span :class="isFavori ? 'text-red-500' : 'text-gray-400'">♥</span>
        </button>
      </div>

      <img
        v-if="animal.photo_url"
        :src="animal.photo_url"
        :alt="animal.nom"
        class="w-full max-h-96 object-cover rounded-xl"
      />

      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span class="text-gray-500">Espèce</span>
          <p class="font-medium">{{ animal.espece ?? "—" }}</p>
        </div>
        <div>
          <span class="text-gray-500">Race</span>
          <p class="font-medium">{{ animal.race ?? "—" }}</p>
        </div>
        <div>
          <span class="text-gray-500">Âge</span>
          <p class="font-medium">{{ animal.age ?? "—" }}</p>
        </div>
        <div>
          <span class="text-gray-500">Sexe</span>
          <p class="font-medium">{{ animal.sexe ?? "—" }}</p>
        </div>
      </div>

      <div v-if="animal.description">
        <h2 class="font-semibold mb-2">Description</h2>
        <p class="text-sm text-gray-700 whitespace-pre-line">
          {{ animal.description }}
        </p>
      </div>

      <div v-if="isLoggedIn && !demandeEnvoyee">
        <button
          v-if="!showForm"
          @click="showForm = true"
          class="w-full py-3 rounded-xl text-base font-semibold bg-blush-400 text-white hover:bg-blush-500 active:scale-95 transition shadow-md"
        >
          🐾 Faire une demande d'intérêt
        </button>
        <div v-else class="space-y-3">
          <textarea
            v-model="message"
            placeholder="Présentez-vous et expliquez pourquoi cet animal
  vous correspond (optionnel)"
            rows="4"
            class="w-full border rounded-xl px-3 py-2 text-sm resize-none"
          />
          <div class="flex gap-2">
            <button
              @click="showForm = false"
              class="flex-1 py-2 rounded-xl border text-sm"
            >
              Annuler
            </button>
            <button
              @click="faireUneDemande"
              class="flex-1 py-2 rounded-xl bg-blush-400 text-white text-sm font-semibold hover:bg-blush-500"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>

      <p v-if="demandeEnvoyee" class="text-center text-green-600 font-medium">
        Demande envoyée ✓
      </p>

      <div v-if="animal.refuge" class="border rounded-xl p-4 text-sm space-y-1">
        <h2 class="font-semibold mb-2">Refuge d'origine</h2>
        <p>{{ animal.refuge.nom }} — {{ animal.refuge.ville }}</p>
        <p v-if="animal.refuge.telephone">{{ animal.refuge.telephone }}</p>
        <a
          v-if="animal.refuge.site_url"
          :href="animal.refuge.site_url"
          target="_blank"
          rel="noopener"
          class="text-blue-600 hover:underline"
        >
          Voir le site du refuge →
        </a>
      </div>
    </div>
  </main>
</template>
