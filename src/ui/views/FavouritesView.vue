<script setup lang="ts">
import { useCharacterStore } from '@/infrastructure/stores/characters'
import CharactersList from '@/ui/components/CharactersList.vue'

const characterStore = useCharacterStore()
const favourites = characterStore.getFavourites()
</script>

<template>
  <div v-if="characterStore.loading" class="py-8 text-center">Loading characters...</div>

  <div v-else-if="characterStore.error" class="py-8 text-center text-red-600">
    Error: {{ characterStore.error }}
  </div>

  <div v-else>
    <div v-if="characterStore.favourites.length === 0">No favourites selected</div>
    <CharactersList :characters="favourites" />
  </div>
</template>
