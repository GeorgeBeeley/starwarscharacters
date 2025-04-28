export type Review = {
  id: string
  comment: string | undefined
  rating: number | null
}

export function createNewReview(): Review {
  return { id: crypto.randomUUID(), comment: '', rating: 0 } as Review
}
