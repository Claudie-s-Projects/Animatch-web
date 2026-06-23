<script setup lang="ts">
const { fetchAnimals } = useAnimals();

const { isLoggedIn, role, token } = useAuth();
const { fetchProfile } = useProfile();
const {
  public: { apiBase },
} = useRuntimeConfig();
const { data } = await fetchAnimals({ urgence: "critique", limit: 4 });
const especeSelectionnee = useState<string>("matchEspece", () => "");

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
const resultatsMatch = useState<MatchResultat[]>("matchResultats", () => []);
const erreurMatch = ref<string | null>(null);
const profilIncomplet = ref(false);

async function lancerMatch() {
  loadingMatch.value = true;
  erreurMatch.value = null;
  profilIncomplet.value = false;
  resultatsMatch.value = [];
  if (!especeSelectionnee.value) {
    erreurMatch.value = "Choisis une espèce avant de lancer le matching.";
    loadingMatch.value = false;
    return;
  }
  try {
    const profile = await fetchProfile();

    if (
      !profile.logement ||
      !profile.enfants ||
      !profile.animaux ||
      !profile.activite ||
      !profile.experience ||
      !especeSelectionnee.value
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
        espece: especeSelectionnee.value,
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
    <!-- Hero -->
    <section class="bg-creme-50 pt-0 md:pt-40 pb-16">
      <div
        class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-start gap-10"
      >
        <div class="md:w-2/5 flex flex-col items-start gap-3 md:-mt-40">
          <img
            src="/logo.png"
            alt="Animatch"
            class="w-[28rem] h-[28rem] object-contain mix-blend-multiply md:-mt-8"
          />
          <!-- visible uniquement sur desktop -->
          <p v-if="!isLoggedIn" class="hidden md:block text-sm text-brun-400 bg-white rounded-lg px-4 py-3 md:mt-16">
            Chaque foyer est unique.
            <NuxtLink to="/login" class="text-blush-500 font-medium hover:underline">Connecte-toi</NuxtLink>
            pour accéder au matching IA et recevoir des recommandations personnalisées parmi les animaux disponibles.
          </p>
        </div>
        <div class="md:w-3/5 md:pl-16 md:-translate-y-16">
          <p
            class="text-blush-500 font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Adoption animale
          </p>
          <h1 class="text-5xl font-bold text-brun-800 mb-4 leading-tight">
            Trouve ton compagnon idéal
          </h1>
          <p class="text-brun-400 mb-8 max-w-md text-base">
            Animatch te connecte avec des animaux des refuges des alentours qui
            correspondent à ton mode de vie.
          </p>
          <div class="flex gap-3 flex-wrap mb-6">
            <NuxtLink
              to="/animals"
              class="inline-block bg-blush-500 text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-blush-400 transition-colors shadow-md"
            >
              Voir tous les animaux
            </NuxtLink>
          </div>
          <!-- visible uniquement sur mobile -->
          <p v-if="!isLoggedIn" class="md:hidden text-sm text-brun-400 bg-white rounded-lg px-4 py-3">
            Chaque foyer est unique.
            <NuxtLink to="/login" class="text-blush-500 font-medium hover:underline">Connecte-toi</NuxtLink>
            pour accéder au matching IA et recevoir des recommandations personnalisées parmi les animaux disponibles.
          </p>
        </div>
      </div>
    </section>

    <!-- Sections -->
    <div class="max-w-6xl mx-auto px-4 py-12 flex flex-col gap-6 md:-mt-24">
      <!-- Matching -->
      <div
        v-if="isLoggedIn && role === 'famille'"
        class="bg-white rounded-[20px] shadow-md p-6"
      >
        <div class="flex items-baseline justify-between mb-4">
          <div>
            <h2 class="text-xl font-bold text-brun-800">
              Ton Animatch idéal
            </h2>
            <p class="text-sm text-brun-400 mt-1">
              Les 5 animaux qui te correspondent le mieux selon ton profil.
            </p>
          </div>
        </div>
        <div class="flex flex-wrap gap-3 mb-4">
          <select
            v-model="especeSelectionnee"
            class="bg-white border border-[#E7CDB6] rounded-lg px-4 py-2 text-sm text-brun-700 focus:outline-none focus:border-blush-500"
          >
            <option value="">Je souhaite adopter...</option>
            <option value="Chien">Un chien</option>
            <option value="Chat">Un chat</option>
          </select>
          <button
            @click="lancerMatch"
            :disabled="loadingMatch"
            class="bg-blush-500 hover:bg-blush-400 text-white px-8 py-2 rounded-xl text-sm font-medium disabled:opacity-50 transition-colors"
          >
            {{ loadingMatch ? "Analyse en cours…" : "Lancer le matching" }}
          </button>
          <button
            v-if="resultatsMatch.length"
            @click="
              resultatsMatch = [];
              especeSelectionnee = '';
              erreurMatch = null;
            "
            class="bg-white border border-[#E7CDB6] text-brun-700 px-6 py-2 rounded-xl text-sm hover:bg-creme-50 transition-colors"
          >
            Réinitialiser
          </button>
        </div>
        <div v-if="loadingMatch" class="py-6 text-brun-400 text-sm">
          Analyse en cours…
        </div>
        <p v-if="profilIncomplet" class="text-sm text-amber-600">
          Ton profil est incomplet —
          <NuxtLink to="/profil" class="underline font-medium"
            >Complète-le ici</NuxtLink
          >
          pour lancer le matching.
        </p>
        <p v-if="erreurMatch" class="text-sm text-red-500">{{ erreurMatch }}</p>
        <div
          v-if="resultatsMatch.length"
          class="mt-6 grid gap-6 sm:grid-cols-5"
        >
          <div
            v-for="(animal, index) in resultatsMatch"
            :key="animal.id"
            class="text-left"
          >
            <div class="relative mb-2">
              <span
                class="absolute -top-3 -left-3 z-10 w-7 h-7 bg-blush-500 text-white text-sm font-bold rounded-full flex items-center justify-center shadow"
              >
                {{ index + 1 }}
              </span>
              <AnimalCard :animal="animal" />
            </div>
            <p class="text-sm text-brun-700 italic px-1">
              {{ animal.explication }}
            </p>
          </div>
        </div>
      </div>

      <!-- Urgents -->
      <div class="bg-white rounded-[20px] shadow-md p-6 flex flex-col">
        <h2 class="text-xl font-bold text-brun-800 mb-4">
          En attente depuis trop longtemps
        </h2>
        <div
          v-if="data?.data?.length"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-4"
        >
          <AnimalCard
            v-for="animal in data.data"
            :key="animal.id"
            :animal="animal"
          />
        </div>
        <p v-else class="text-sm text-brun-400 mb-4">
          Aucun animal en situation critique pour le moment.
        </p>
        <NuxtLink
          to="/longue-duree"
          class="text-sm bg-blush-500 text-white px-6 py-3 rounded-xl hover:bg-blush-400 transition-colors font-medium shrink-0 self-end mt-auto"
          >Voir tous</NuxtLink
        >
      </div>

      <!-- Guides -->
      <div class="bg-white rounded-[20px] shadow-md p-6 flex flex-col gap-2">
        <h2 class="text-xl font-bold text-brun-800">Prêt à adopter ?</h2>
        <p class="text-sm text-brun-400">
          Consulte nos guides pratiques pour bien préparer l'arrivée de ton animal.
        </p>
        <NuxtLink
          to="/guides"
          class="inline-block bg-blush-500 text-white text-sm px-6 py-3 rounded-xl hover:bg-blush-400 transition-colors font-medium shrink-0 self-end mt-auto"
        >
          Voir les guides →
        </NuxtLink>
      </div>
    </div>
  </main>
</template>
