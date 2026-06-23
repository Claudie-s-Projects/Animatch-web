<script setup lang="ts">
const { isLoggedIn } = useAuth();
const { fetchProfile, updateProfile } = useProfile();

if (!isLoggedIn.value) {
  await navigateTo("/login");
}

const profile = await fetchProfile();

const form = reactive({
  logement: profile.logement ?? "",
  enfants: profile.enfants ?? "",
  animaux: profile.animaux ?? "",
  activite: profile.activite ?? "",
  experience: profile.experience ?? "",
});

const succes = ref(false);
const erreur = ref(false);

async function enregistrer() {
  succes.value = false;
  erreur.value = false;
  try {
    const data = Object.fromEntries(
      Object.entries(form).filter(([, v]) => v !== '')
    );
    await updateProfile(data);
    succes.value = true;
  } catch {
    erreur.value = true;
  }
}

const champsRemplis = computed(() =>
  Object.values(form).filter(v => v !== "").length
);
const pourcentage = computed(() =>
  Math.round((champsRemplis.value / 5) * 100)
);
</script>

<template>
  <main class="max-w-xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-brun-800 mb-2">Mon profil</h1>

    <!-- Bandeau progression -->
    <div class="bg-white rounded-xl p-4 shadow-sm mb-6 border border-[#E7CDB6]">
      <div class="flex justify-between text-sm text-brun-700 mb-2">
        <div class="flex items-center gap-1.5">
          <span>Profil complété</span>
          <div class="group/info relative">
            <span class="text-[10px] text-brun-400 border border-[#E7CDB6] rounded-full w-4 h-4 inline-flex items-center justify-center cursor-help">i</span>
            <div class="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-56 text-xs bg-brun-800 text-creme-50 p-3 rounded-xl hidden group-hover/info:block z-50 leading-relaxed whitespace-normal">
              Complète ton profil à 100% pour accéder au matching IA avec les animaux.
            </div>
          </div>
        </div>
        <span class="font-semibold">{{ pourcentage }}%</span>
      </div>
      <div class="w-full bg-creme-50 rounded-full h-2">
        <div
          class="bg-blush-500 h-2 rounded-full transition-all duration-300"
          :style="{ width: pourcentage + '%' }"
        ></div>
      </div>
      <p v-if="pourcentage < 100" class="text-xs text-brun-400 mt-2">
        Complète ton profil pour lancer le matching IA.
      </p>
    </div>

    <form @submit.prevent="enregistrer" class="space-y-4">
      <div>
        <label class="block text-sm text-brun-700 mb-1">Type de logement</label>
        <select v-model="form.logement"
          class="w-full bg-white border border-[#E7CDB6] rounded-lg px-3 py-2 text-sm text-brun-800 focus:outline-none focus:border-blush-500">
          <option value="">-- Choisir --</option>
          <option>Maison avec jardin</option>
          <option>Maison sans jardin</option>
          <option>Appartement avec balcon</option>
          <option>Appartement sans balcon</option>
          <option>Autre</option>
        </select>
      </div>

      <div>
        <label class="block text-sm text-brun-700 mb-1">Composition familiale (enfants)</label>
        <select v-model="form.enfants"
          class="w-full bg-white border border-[#E7CDB6] rounded-lg px-3 py-2 text-sm text-brun-800 focus:outline-none focus:border-blush-500">
          <option value="">-- Choisir --</option>
          <option>Aucun</option>
          <option>Enfants < 5 ans</option>
          <option>Enfants 6–12 ans</option>
          <option>Enfants 13+ ans</option>
        </select>
      </div>

      <div>
        <label class="block text-sm text-brun-700 mb-1">Animaux déjà présents</label>
        <select v-model="form.animaux"
          class="w-full bg-white border border-[#E7CDB6] rounded-lg px-3 py-2 text-sm text-brun-800 focus:outline-none focus:border-blush-500">
          <option value="">-- Choisir --</option>
          <option>Aucun</option>
          <option>Chien</option>
          <option>Chat</option>
          <option>Autre animal</option>
          <option>Plusieurs animaux</option>
        </select>
      </div>

      <div>
        <label class="block text-sm text-brun-700 mb-1">Mode de vie (sédentaire / actif…)</label>
        <select v-model="form.activite"
          class="w-full bg-white border border-[#E7CDB6] rounded-lg px-3 py-2 text-sm text-brun-800 focus:outline-none focus:border-blush-500">
          <option value="">-- Choisir --</option>
          <option>Sédentaire</option>
          <option>Modérément actif</option>
          <option>Très actif</option>
        </select>
      </div>

      <div>
        <label class="block text-sm text-brun-700 mb-1">Expérience avec les animaux</label>
        <select v-model="form.experience"
          class="w-full bg-white border border-[#E7CDB6] rounded-lg px-3 py-2 text-sm text-brun-800 focus:outline-none focus:border-blush-500">
          <option value="">-- Choisir --</option>
          <option>Aucune</option>
          <option>Débutant</option>
          <option>Expérimenté</option>
          <option>Expert</option>
        </select>
      </div>

      <button type="submit"
        class="w-full bg-blush-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blush-400 transition-colors">
        Enregistrer
      </button>

      <p v-if="succes" class="text-green-600 text-sm text-center">Profil mis à jour ✓</p>
      <p v-if="erreur" class="text-red-500 text-sm text-center">Une erreur est survenue.</p>
    </form>
  </main>
</template>
