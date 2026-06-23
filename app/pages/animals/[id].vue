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
  <div class="px-8 pt-6 pb-4">
    <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-sm text-brun-400 hover:text-blush-500 group">
      <span class="inline-block group-hover:-translate-x-1 transition-transform duration-150">‹</span>
      Accueil
    </NuxtLink>
  </div>
  <main class="max-w-3xl mx-auto px-4 pb-8">

    <div v-if="animal" class="space-y-6">
      <div class="flex items-center gap-3">
        <h1 class="text-3xl font-bold text-brun-800">{{ animal.nom }}</h1>
        <UrgenceBadge :urgence="animal.urgence" />
        <button
          v-if="isLoggedIn"
          @click="toggleFavori"
          class="ml-auto w-9 h-9 flex items-center justify-center rounded-full bg-creme-50 hover:bg-blush-100 text-xl transition-colors"
          :title="isFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'"
        >
          <span :class="isFavori ? 'text-red-500' : 'text-brun-400'">♥</span>
        </button>
      </div>

      <img
        v-if="animal.photo_url"
        :src="animal.photo_url"
        :alt="animal.nom"
        class="w-full max-h-96 object-cover rounded-[20px]"
      />

      <div class="grid grid-cols-2 gap-4 text-sm">
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <span class="text-brun-400">Espèce</span>
          <p class="font-medium text-brun-800 mt-1">{{ animal.espece ?? "—" }}</p>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <span class="text-brun-400">Race</span>
          <p class="font-medium text-brun-800 mt-1">{{ animal.race ?? "—" }}</p>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <span class="text-brun-400">Âge</span>
          <p class="font-medium text-brun-800 mt-1">{{ animal.age ?? "—" }}</p>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <span class="text-brun-400">Sexe</span>
          <p class="font-medium text-brun-800 mt-1">{{ animal.sexe ?? "—" }}</p>
        </div>
      </div>

      <div v-if="animal.description">
        <h2 class="font-semibold text-brun-800 mb-2">Description</h2>
        <p class="text-sm text-brun-700 whitespace-pre-line">
          {{ animal.description }}
        </p>
      </div>

      <div v-if="isLoggedIn && !demandeEnvoyee">
        <button
          v-if="!showForm"
          @click="showForm = true"
          class="w-full py-3 rounded-xl text-base font-semibold bg-blush-500 text-white hover:bg-blush-400 active:scale-95 transition shadow-md"
        >
          🐾 Faire une demande d'intérêt
        </button>
        <div v-else class="space-y-3">
          <textarea
            v-model="message"
            placeholder="Présente-toi et explique pourquoi cet animal te correspond (optionnel)"
            rows="4"
            class="w-full bg-creme-50 border border-[#E7CDB6] rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:border-blush-500 focus:ring-2 focus:ring-blush-100"
          />
          <div class="flex gap-2">
            <button
              @click="showForm = false"
              class="flex-1 py-2 rounded-xl border border-[#E7CDB6] text-sm text-brun-700 hover:bg-creme-50 transition-colors"
            >
              Annuler
            </button>
            <button
              @click="faireUneDemande"
              class="flex-1 py-2 rounded-xl bg-blush-500 text-white text-sm font-semibold hover:bg-blush-400 transition-colors"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>

      <p v-if="demandeEnvoyee" class="text-center text-green-600 font-medium">
        Demande envoyée ✓
      </p>

      <div v-if="animal.refuge" class="bg-white border border-[#E7CDB6] rounded-xl p-4 text-sm space-y-1">
        <h2 class="font-semibold text-brun-800 mb-2">Refuge d'origine</h2>
        <p class="text-brun-700">{{ animal.refuge.nom }} — {{ animal.refuge.ville }}</p>
        <p v-if="animal.refuge.telephone" class="text-brun-700">{{ animal.refuge.telephone }}</p>
        <a
          v-if="animal.refuge.site_url"
          :href="animal.refuge.site_url"
          target="_blank"
          rel="noopener"
          class="text-blush-500 hover:underline"
        >
          Voir le site du refuge →
        </a>
      </div>
    </div>
  </main>
</template>
