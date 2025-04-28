<script setup lang="ts">
import { useCharacter } from '@/core/composables/useCharacter'
import { createNewReview, submitReview, type Review } from '@/core/domain/review'
import { ref } from 'vue'

const character = useCharacter()

const reviews = ref<Review[]>(character.self.value!.reviews)
const newReview = ref<Review>(createNewReview(character.self.value!.id))
const setRating = (i: number) => {
  newReview.value.rating = i
}

const onSave = () => {
  if (character.self.value) {
    character.self.value.reviews.push(newReview.value)
    submitReview(newReview.value)
    newReview.value = createNewReview(character.self.value!.id)
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto pt-12">
    <textarea
      class="w-full mx-auto bg-white rounded-3xl p-4 text-black font-bold"
      v-model="newReview.comment"
      :placeholder="`Review ${character.self.value?.name}...`"
    ></textarea>

    <div class="flex flex-row justify-between py-4 px-2">
      <div class="flex flex-row gap-1">
        <i
          v-for="(i, index) in newReview.rating"
          :key="index"
          class="pi pi-star-fill text-xl text-amber-500 cursor-pointer"
          @click="setRating(i)"
        />
        <i
          v-for="(j, index) in 5 - newReview.rating!"
          :key="index"
          class="pi pi-star text-xl text-amber-500 cursor-pointer"
          @click="setRating(newReview.rating! + j)"
        />
      </div>

      <button
        class="bg-amber-400 text-black font-bold rounded px-4 py-2 cursor-pointer"
        @click="onSave"
        :disabled="newReview.comment === ''"
      >
        Submit
      </button>
    </div>

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
