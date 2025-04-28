<script setup lang="ts">
import type { Character } from '@/core/domain/character'
import CharacterCard from '../components/CharacterCard.vue'

defineProps<{
  characters: Character[]
}>()
</script>

<template>
  <div class="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
    <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
  </div>
</template>
