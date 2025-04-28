<script setup lang="ts">
import type { Character } from '@/core/domain/character'
import { computed, onMounted, ref } from 'vue'
import textFit from 'textfit'
import { useCharacterStore } from '@/infrastructure/stores/characters'
import FavouriteButton from './FavouriteButton.vue'

const props = defineProps<{
  character: Character
}>()

const characterStore = useCharacterStore()
const nameRef = ref<HTMLElement | null>(null)

const isCharacterFavourited = computed(() => characterStore.isFavourite(props.character.id))
const unfavouriteCharacter = (e: Event) => {
  e.stopPropagation()
  characterStore.removeFromFavourites(props.character.id)
}
const favouriteCharacter = (e: Event) => {
  e.stopPropagation()
  characterStore.addToFavourites(props.character.id)
}

onMounted(() => {
  if (nameRef.value) {
    textFit(nameRef.value, {
      multiLine: false,
    })
  }
})
</script>

<template>
  <div class="relative hover:scale-103 hover:shadow-2xl transition-transform duration-300">
    <div class="text-xl absolute right-3 top-3 z-10">
      <FavouriteButton
        :active="isCharacterFavourited"
        :favourite-click-behaviour="favouriteCharacter"
        :unfavourite-click-behaviour="unfavouriteCharacter"
      />
    </div>

    <RouterLink :to="`/characters/${character.id}`">
      <div
        class="flex flex-col gap-y-4 bg-black/70 w-[18rem] rounded-2xl p-6 shadow-lg border border-yellow-400 backdrop-blur-md text-yellow-400 hover:border-yellow-300 transition-colors duration-300"
      >
        <div class="flex w-full">
          <h2
            ref="nameRef"
            class="w-full whitespace-nowrap overflow-hidden text-2xl font-bold text-yellow-300 tracking-wide border-b border-yellow-500 pb-2 mb-4"
          >
            {{ character.name }}
          </h2>
        </div>

        <div class="flex flex-col gap-3 text-sm leading-relaxed">
          <p class="flex justify-between border-b border-yellow-400 pb-2">
            <strong class="text-white">Gender</strong>
            <span class="capitalize">{{ character.gender }}</span>
          </p>
          <p class="flex justify-between border-b border-yellow-400 pb-2">
            <strong class="text-white">Birth Year</strong>
            <span>{{ character.birth_year }}</span>
          </p>
          <p class="flex justify-between border-b border-yellow-400 pb-2">
            <strong class="text-white">Height</strong>
            <span>{{ character.height }} cm</span>
          </p>
          <p class="flex justify-between">
            <strong class="text-white">Mass</strong>
            <span>{{ character.mass }} kg</span>
          </p>
        </div>

        <div
          class="grid grid-cols-3 gap-2 mt-4 p-3 rounded-lg border border-yellow-400 bg-black/30 backdrop-blur-md min-h-18"
        >
          <div class="flex flex-col items-center text-center">
            <span class="font-bold text-xs text-white">Hair</span>
            <span class="text-xs capitalize">{{ character.hair_color }}</span>
          </div>
          <div class="flex flex-col items-center text-center">
            <span class="font-bold text-xs text-white">Skin</span>
            <span class="text-xs capitalize">{{ character.skin_color }}</span>
          </div>
          <div class="flex flex-col items-center text-center">
            <span class="font-bold text-xs text-white">Eyes</span>
            <span class="text-xs capitalize">{{ character.eye_color }}</span>
          </div>
        </div>

        <div
          class="flex justify-around mt-6 pt-3 border-t border-yellow-400 text-xs text-yellow-300 text-center"
        >
          <p>
            <strong>Films</strong><br />
            {{ character.films.length }}
          </p>
          <p>
            <strong>Vehicles</strong><br />
            {{ character.vehicles.length }}
          </p>
          <p>
            <strong>Starships</strong><br />
            {{ character.starships.length }}
          </p>
        </div>
      </div>
    </RouterLink>
  </div>
</template>
