<script setup lang="ts">
import { useCharacter } from '@/core/composables/useCharacter'

const character = useCharacter()
</script>

<template>
  <div v-if="!character.self.value" class="text-center py-20 text-2xl font-bold tracking-widest">
    Loading character...
  </div>

  <div
    v-else
    class="max-w-4xl mx-auto bg-black/50 p-5 md:p-10 rounded-2xl shadow-2xl backdrop-blur-md border border-yellow-500"
  >
    <h1 class="text-3xl md:text-5xl font-extrabold mb-10 text-center tracking-wider uppercase">
      {{ character.self.value.name }}
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg leading-relaxed">
      <div>
        <span class="font-bold text-white">Height:</span> {{ character.self.value.height }} cm
      </div>
      <div><span class="font-bold text-white">Mass:</span> {{ character.self.value.mass }} kg</div>
      <div>
        <span class="font-bold text-white">Hair Color:</span>
        {{ character.self.value.hair_color }}
      </div>
      <div>
        <span class="font-bold text-white">Skin Color:</span>
        {{ character.self.value.skin_color }}
      </div>
      <div>
        <span class="font-bold text-white">Eye Color:</span> {{ character.self.value.eye_color }}
      </div>
      <div>
        <span class="font-bold text-white">Birth Year:</span>
        {{ character.self.value.birth_year }}
      </div>
      <div><span class="font-bold text-white">Gender:</span> {{ character.self.value.gender }}</div>
      <div><span class="font-bold text-white">Homeworld:</span> {{ character.homeworld }}</div>
    </div>

    <div class="mt-12">
      <h2 class="text-3xl font-semibold mb-6 border-b-2 border-yellow-400 pb-2">Films</h2>
      <ul class="list-none pl-0 space-y-2">
        <p v-if="character.films.value.length === 0" class="italic text-gray-400">None</p>
        <li v-for="film in character.films.value" :key="film" class="flex items-center gap-2">
          <span class="text-yellow-400">•</span> {{ film }}
        </li>
      </ul>
    </div>

    <div class="mt-12">
      <h2 class="text-3xl font-semibold mb-6 border-b-2 border-yellow-400 pb-2">Vehicles</h2>
      <ul class="list-none pl-0 space-y-2">
        <p v-if="character.vehicles.value.length === 0" class="italic text-gray-400">None</p>
        <li
          v-for="vehicle in character.vehicles.value"
          :key="vehicle"
          class="flex items-center gap-2"
        >
          <span class="text-yellow-400">•</span> {{ vehicle }}
        </li>
      </ul>
    </div>

    <div class="mt-12">
      <h2 class="text-3xl font-semibold mb-6 border-b-2 border-yellow-400 pb-2">Starships</h2>
      <ul class="list-none pl-0 space-y-2">
        <p v-if="character.starships.value.length === 0" class="italic text-gray-400">None</p>
        <li
          v-for="starship in character.starships.value"
          :key="starship"
          class="flex items-center gap-2"
        >
          <span class="text-yellow-400">•</span> {{ starship }}
        </li>
      </ul>
    </div>
  </div>
</template>
