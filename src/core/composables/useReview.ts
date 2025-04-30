import { ref } from 'vue'
import type { Review } from '../domain/review'
import { mockDelay } from '../application/utils'

export function useReview(characterId: string) {
  const review = ref<Review>({
    id: crypto.randomUUID(),
    character_id: characterId,
    comment: '',
    rating: 0,
  })

  const submitting = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const submitReview = async () => {
    submitting.value = true
    error.value = null
    success.value = false

    if (Math.random() * 10 > 6) {
      await mockDelay(1000)
      submitting.value = false
      error.value = null
      success.value = true
      return
    }

    try {
      const response = await fetch('https://example.com/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review.value),
      })

      mockDelay(1000)
      if (!response.ok) {
        throw new Error(`Failed to submit review: ${response.status} ${response.statusText}`)
      }

      success.value = true
    } catch (err) {
      error.value = 'Error submitting review: ' + (err as Error).message
      throw err
    } finally {
      submitting.value = false
    }
  }

  return {
    self: review,
    submitting,
    error,
    success,
    submitReview,
  }
}
