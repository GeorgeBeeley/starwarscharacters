<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useCharacterStore } from './infrastructure/stores/characters'

const characterStore = useCharacterStore()

onMounted(() => {
  if (characterStore.characters.length === 0 && !characterStore.loading) {
    characterStore.initializeCharacters()
  }
})
</script>
<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen -z-10 bg-gradient-to-b from-black via-gray-900 to-gray-800"
  ></div>

  <div class="flex flex-col md:flex-row min-h-screen text-yellow-400 w-full">
    <aside
      class="w-full md:w-64 md:fixed md:top-5 md:left-8 md:h-[90vh] flex flex-col py-6 px-4 backdrop-blur-md border-0 md:border border-yellow-500 rounded-xl shadow-lg"
    >
      <img
        alt="Star Wars Logo"
        src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Star_Wars_Logo..png"
        width="200"
        height="auto"
        class="mb-8 mx-auto"
      />
      <nav class="flex flex-col gap-6 text-lg font-semibold">
        <RouterLink
          to="/"
          class="hover:text-yellow-300 transition-colors duration-200 border-b border-yellow-600 pb-2"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/favourites"
          class="hover:text-yellow-300 transition-colors duration-200 border-b border-yellow-600 pb-2"
        >
          My Favourites
        </RouterLink>
      </nav>
    </aside>

    <main
      class="flex-1 ml-0 md:ml-72 p-8 pt-12 overflow-y-auto place-items-center md:w-[calc(100vw-21rem)]"
    >
      <RouterView />
    </main>
  </div>
</template>
