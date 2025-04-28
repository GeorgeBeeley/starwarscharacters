import type { Review } from './review'

export type Character = {
  id: string
  name: string
  height: number
  mass: number
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: URL
  films: URL[]
  species: URL[]
  vehicles: URL[]
  starships: URL[]
  created: Date
  edited: Date
  url: URL
  reviews: Review[]
}

export type CharacterDTO = {
  name: string
  height: number
  mass: number
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

export const createCharacter = ({ ...character }: CharacterDTO) => ({
  id: character.url.toString().substring(30),
  name: character.name,
  height: character.height,
  mass: character.mass,
  hair_color: character.hair_color,
  skin_color: character.skin_color,
  eye_color: character.eye_color,
  birth_year: character.birth_year,
  gender: character.gender,
  homeworld: new URL(character.homeworld),
  films: character.films.map((f) => new URL(f)),
  species: character.species.map((f) => new URL(f)),
  vehicles: character.vehicles.map((f) => new URL(f)),
  starships: character.starships.map((f) => new URL(f)),
  created: new Date(character.created),
  edited: new Date(character.edited),
  URL: new URL(character.url),
  reviews: [],
})
