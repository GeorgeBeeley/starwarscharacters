export type Review = {
  id: string
  character_id: string
  comment: string | undefined
  rating: number | null
}

export function createNewReview(character_id: string): Review {
  return { id: crypto.randomUUID(), character_id: character_id, comment: '', rating: 0 } as Review
}

export async function submitReview(review: Review): Promise<void> {
  try {
    const response = await fetch('https://example.com/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    })

    if (!response.ok) {
      throw new Error(`Failed to submit review: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    console.error('Error submitting review:', error)
    throw error
  }
}
