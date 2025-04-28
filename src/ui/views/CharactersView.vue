<script setup lang="ts">
import { useCharacterStore } from '@/infrastructure/stores/characters'
import CharactersList from '@/ui/components/CharactersList.vue'

const characterStore = useCharacterStore()
</script>

<template>
  <div v-if="characterStore.loading" class="py-8 text-center">Loading characters...</div>

  <div v-else-if="characterStore.error" class="py-8 text-center text-red-600">
    Error: {{ characterStore.error }}
  </div>

  <div v-else>
    <CharactersList :characters="characterStore.characters" />
  </div>
</template>
