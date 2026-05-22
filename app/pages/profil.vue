<script setup lang="ts">
const { isLoggedIn } = useAuth()
const { fetchProfile, updateProfile } = useProfile()

if (!isLoggedIn.value) {
  await navigateTo('/login')
}

const profile = await fetchProfile()

const form = reactive({
  logement: profile.logement ?? '',
  enfants: profile.enfants ?? '',
  animaux: profile.animaux ?? '',
  activite: profile.activite ?? '',
  experience: profile.experience ?? '',
})

const succes = ref(false)
const erreur = ref(false)

async function enregistrer() {
  succes.value = false
  erreur.value = false
  try {
    await updateProfile(form)
    succes.value = true
  } catch {
    erreur.value = true
  }
}
</script>

<template>
  <main class="max-w-xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Mon profil</h1>

    <form @submit.prevent="enregistrer" class="space-y-4">
      <div>
        <label class="block text-sm text-gray-500 mb-1">Type de logement</label>
        <input v-model="form.logement" type="text" class="w-full border rounded-lg px-3 py-2 text-sm" />
      </div>
      <div>
        <label class="block text-sm text-gray-500 mb-1">Composition familiale (enfants)</label>
        <input v-model="form.enfants" type="text" class="w-full border rounded-lg px-3 py-2 text-sm" />
      </div>
      <div>
        <label class="block text-sm text-gray-500 mb-1">Animaux déjà présents</label>
        <input v-model="form.animaux" type="text" class="w-full border rounded-lg px-3 py-2 text-sm" />
      </div>
      <div>
        <label class="block text-sm text-gray-500 mb-1">Mode de vie (sédentaire / actif…)</label>
        <input v-model="form.activite" type="text" class="w-full border rounded-lg px-3 py-2 text-sm" />
      </div>
      <div>
        <label class="block text-sm text-gray-500 mb-1">Expérience avec les animaux</label>
        <input v-model="form.experience" type="text" class="w-full border rounded-lg px-3 py-2 text-sm" />
      </div>

      <button type="submit" class="w-full bg-blush-400 text-white py-2 rounded-lg text-sm font-medium hover:bg-blush-500">
        Enregistrer
      </button>

      <p v-if="succes" class="text-green-600 text-sm text-center">Profil mis à jour ✓</p>
      <p v-if="erreur" class="text-red-500 text-sm text-center">Une erreur est survenue.</p>
    </form>
  </main>
</template>
