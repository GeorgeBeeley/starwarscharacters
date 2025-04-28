<script setup lang="ts">
defineProps<{
  active: boolean
  favouriteClickBehaviour: (e: Event) => void
  unfavouriteClickBehaviour: (e: Event) => void
}>()
</script>

<template>
  <i
    v-if="active"
    @click="unfavouriteClickBehaviour"
    class="pi pi-heart-fill text-xl text-red-700 cursor-pointer"
  />
  <i v-else @click="favouriteClickBehaviour" class="pi pi-heart text-white cursor-pointer" />
</template>
