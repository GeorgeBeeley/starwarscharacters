<script setup lang="ts">
import { mockDelay } from '@/core/application/utils'
import { useCharacter } from '@/core/composables/useCharacter'
import { useReview } from '@/core/composables/useReview'
import { computed } from 'vue'

const character = useCharacter()

if (character.self.value === null || character.self.value === undefined)
  throw new Error('Character is null or undefined')

const reviews = computed(() => character.self.value!.reviews)
const review = useReview(character.self.value.id)

const setRating = (i: number) => {
  review.self.value.rating = i
}

const onSave = async () => {
  if (!character.self.value) return

  try {
    await review.submitReview()

    if (review.success.value && review.self.value) {
      reviews.value.push(review.self.value)
      mockDelay(1000)
      review.self.value = {
        id: crypto.randomUUID(),
        character_id: character.self.value.id,
        comment: '',
        rating: 0,
      }
      review.success.value = false
    }
  } catch (err) {
    console.error('Failed to save review:', err)
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto pt-12">
    <textarea
      class="w-full mx-auto bg-white rounded-3xl p-4 text-black font-bold"
      v-model="review.self.value.comment"
      :placeholder="`Review ${character.self.value?.name}...`"
    ></textarea>

    <div class="flex flex-row justify-between py-4 px-2">
      <div class="flex flex-row gap-1">
        <i
          v-for="(i, index) in review.self.value.rating"
          :key="index"
          class="pi pi-star-fill text-xl text-amber-500 cursor-pointer hover:scale-105"
          @click="setRating(i)"
        />
        <i
          v-for="(j, index) in 5 - review.self.value.rating!"
          :key="index"
          class="pi pi-star text-xl text-amber-500 cursor-pointer hover:scale-105"
          @click="setRating(review.self.value.rating! + j)"
        />
      </div>

      <button
        class="bg-amber-400 text-black font-bold rounded px-4 py-2 cursor-pointer"
        @click="onSave"
        :disabled="review.self.value.comment === ''"
      >
        Submit
      </button>
    </div>

    <div v-if="review.submitting.value" class="text-amber-500">Posting review...</div>
    <div v-if="review.error.value !== null" class="text-red-500">{{ review.error.value }}</div>

    <div class="pt-8 pb-4">
      <h2 class="text-2xl mb-4">{{ character.self.value?.reviews.length }} Reviews</h2>
      <ul class="gap-y-2 flex flex-col-reverse">
        <li v-if="reviews.length === 0">Leave the first review!</li>
        <li
          v-for="review in reviews"
          :key="review.id"
          class="border border-amber-400 rounded-2xl p-5 mb-4"
        >
          <div class="flex flex-row gap-1">
            <i v-for="i in review.rating" :key="i" class="pi pi-star-fill text-xl text-amber-500" />
          </div>
          <p class="mt-2">
            {{ review.comment }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
