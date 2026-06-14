<script setup lang="ts">
const { fetchAnimals } = useAnimals();

const { isLoggedIn, role, token } = useAuth();
const { fetchProfile } = useProfile();
const {
  public: { apiBase },
} = useRuntimeConfig();
const { data } = await fetchAnimals({ urgence: "critique", limit: 4 });

interface MatchResultat {
  id: number;
  nom: string;
  espece: string;
  race: string;
  age: string;
  sexe: string;
  photo_url: string;
  urgence: string;
  refuge: { nom: string; ville: string } | null;
  explication: string;
}

const loadingMatch = ref(false);
const resultatsMatch = ref<MatchResultat[]>([]);
const erreurMatch = ref<string | null>(null);
const profilIncomplet = ref(false);

async function lancerMatch() {
  loadingMatch.value = true;
  erreurMatch.value = null;
  profilIncomplet.value = false;
  resultatsMatch.value = [];

  try {
    const profile = await fetchProfile();

    if (
      !profile.logement ||
      !profile.enfants ||
      !profile.animaux ||
      !profile.activite ||
      !profile.experience
    ) {
      profilIncomplet.value = true;
      return;
    }

    resultatsMatch.value = await $fetch<MatchResultat[]>(`${apiBase}/match`, {
      method: "POST",
      body: {
        logement: profile.logement,
        enfants: profile.enfants,
        animaux: profile.animaux,
        activite: profile.activite,
        experience: profile.experience,
      },
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
  } catch {
    erreurMatch.value = "Une erreur est survenue, réessaie plus tard.";
  } finally {
    loadingMatch.value = false;
  }
}
</script>

<template>
  <main>
    <section class="bg-creme-50 py-16 px-4 text-center">
      <h1 class="text-4xl font-bold mb-4">Trouvez votre compagnon</h1>
      <p class="text-gray-500 mb-8 max-w-xl mx-auto">
        Plus besoin de chercher pour adopter.
      </p>
      <NuxtLink
        to="/animals"
        class="inline-block bg-blush-400 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-blush-500"
      >
        Voir tous les animaux
      </NuxtLink>
    </section>

    <section
      v-if="isLoggedIn && role === 'famille'"
      class="max-w-4xl mx-auto px-4 py-12 text-center"
    >
      <h2 class="text-2xl font-bold mb-2">Votre match idéal</h2>
      <p class="text-sm text-gray-500 mb-6">
        Notre IA analyse votre profil et sélectionne les 3 animaux qui vous
        correspondent le mieux.
      </p>

      <button
        @click="lancerMatch"
        :disabled="loadingMatch"
        class="inline-block bg-walnut-600 text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-walnut-700 disabled:opacity-50"
      >
        {{ loadingMatch ? "Analyse en cours…" : "Lancer le matching" }}
      </button>

      <p v-if="profilIncomplet" class="mt-4 text-sm text-amber-600">
        Ton profil est incomplet.
        <NuxtLink to="/profil" class="underline font-medium"
          >Complète-le ici</NuxtLink
        >
        pour lancer le matching.
      </p>

      <p v-if="erreurMatch" class="mt-4 text-sm text-red-500">
        {{ erreurMatch }}
      </p>

      <div v-if="resultatsMatch.length" class="mt-8 grid gap-8 sm:grid-cols-3">
        <div
          v-for="(animal, index) in resultatsMatch"
          :key="animal.id"
          class="text-left"
        >
          <div class="relative mb-2">
            <span
              class="absolute -top-3 -left-3 z-10 w-7 h-7 bg-blush-400 text-white text-sm font-bold rounded-full flex items-center justify-center shadow"
            >
              {{ index + 1 }}
            </span>
            <AnimalCard :animal="animal" />
          </div>
          <p class="text-sm text-gray-600 italic px-1">
            {{ animal.explication }}
          </p>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 py-12 text-center">
      <h2 class="text-xl font-bold mb-4">
        Animaux en attente depuis longtemps
      </h2>
      <NuxtLink
        to="/longue-duree"
        class="inline-block bg-white border text-sm px-5 py-2 rounded-xl hover:bg-gray-100 mb-6"
        >Voir tous les animaux →</NuxtLink
      >

      <div
        v-if="data?.data?.length"
        class="flex flex-wrap justify-center gap-6"
      >
        <div
          v-for="animal in data.data"
          :key="animal.id"
          class="w-full sm:w-64"
        >
          <AnimalCard :animal="animal" />
        </div>
      </div>
      <p v-else class="text-sm text-gray-400">
        Aucun animal en situation critique pour le moment.
      </p>
    </section>

    <section class="bg-creme-50 border-y px-4 py-10 text-center">
      <h2 class="text-xl font-bold mb-2">Prêt à adopter ?</h2>
      <p class="text-sm text-gray-500 mb-4">
        Consultez nos guides pratiques pour bien préparer l'arrivée de votre
        animal.
      </p>
      <NuxtLink
        to="/guides"
        class="inline-block bg-white border text-sm px-5 py-2 rounded-xl hover:bg-gray-100"
      >
        Voir les guides d'adoption →
      </NuxtLink>
    </section>
  </main>
</template>
