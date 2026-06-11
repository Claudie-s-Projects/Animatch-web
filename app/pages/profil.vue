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
    await updateProfile(form);
    succes.value = true;
  } catch {
    erreur.value = true;
  }
}
</script>

<template>
  <main class="max-w-xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Mon profil</h1>

    <form @submit.prevent="enregistrer" class="space-y-4">
      <div>
        <label class="block text-sm text-gray-500 mb-1">Type de logement</label>
        <select
          v-model="form.logement"
          class="w-full border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">-- Choisir --</option>
          <option>Maison avec jardin</option>
          <option>Maison sans jardin</option>
          <option>Appartement avec balcon</option>
          <option>Appartement sans balcon</option>
          <option>Autre</option>
        </select>
      </div>
      <div>
        <label class="block text-sm text-gray-500 mb-1"
          >Composition familiale (enfants)</label
        >
        <select
          v-model="form.enfants"
          class="w-full border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">-- Choisir --</option>
          <option>Aucun</option>
          <option>Enfants < 5 ans</option>
          <option>Enfants 6–12 ans</option>
          <option>Enfants 13+ ans</option>
        </select>
      </div>
      <div>
        <label class="block text-sm text-gray-500 mb-1"
          >Animaux déjà présents</label
        >
        <select
          v-model="form.animaux"
          class="w-full border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">-- Choisir --</option>
          <option>Aucun</option>
          <option>Chien</option>
          <option>Chat</option>
          <option>Autre animal</option>
          <option>Plusieurs animaux</option>
        </select>
      </div>
      <div>
        <label class="block text-sm text-gray-500 mb-1"
          >Mode de vie (sédentaire / actif…)</label
        >
        <select
          v-model="form.activite"
          class="w-full border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">-- Choisir --</option>
          <option>Sédentaire</option>
          <option>Modérément actif</option>
          <option>Très actif</option>
        </select>
      </div>
      <div>
        <label class="block text-sm text-gray-500 mb-1"
          >Expérience avec les animaux</label
        >
        <select
          v-model="form.experience"
          class="w-full border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">-- Choisir --</option>
          <option>Aucune</option>
          <option>Débutant</option>
          <option>Expérimenté</option>
          <option>Expert</option>
        </select>
      </div>

      <button
        type="submit"
        class="w-full bg-blush-400 text-white py-2 rounded-lg text-sm font-medium hover:bg-blush-500"
      >
        Enregistrer
      </button>

      <p v-if="succes" class="text-green-600 text-sm text-center">
        Profil mis à jour ✓
      </p>
      <p v-if="erreur" class="text-red-500 text-sm text-center">
        Une erreur est survenue.
      </p>
    </form>
  </main>
</template>
