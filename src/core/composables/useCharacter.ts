import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCharacterStore } from '@/infrastructure/stores/characters'
import type { Character } from '../domain/character'

export function useCharacter() {
  const route = useRoute()
  const store = useCharacterStore()
  const character = ref<Character>()
  const homeworld = ref<string>('')
  const films = ref<string[]>([])
  const vehicles = ref<string[]>([])
  const starships = ref<string[]>([])

  async function fetchResource(url: URL) {
    const res = await fetch(url)
    return await res.json()
  }

  const loadCharacter = async () => {
    const id = route.params.id as string
    character.value = store.getCharacter(id)
    character.value ??= await store.fetchCharacterById(id)
  }

  const loadCharacterNestedData = async () => {
    if (!character.value) throw new Error('Failed to load character.')

    try {
      if (character.value.homeworld) {
        const homeworldData = await fetchResource(character.value.homeworld)
        homeworld.value = homeworldData.name
      }

      if (character.value.films.length) {
        const filmsData = await Promise.all(character.value.films.map(fetchResource))
        films.value = filmsData.map((film) => film.title)
      }

      if (character.value.vehicles.length) {
        const vehiclesData = await Promise.all(character.value.vehicles.map(fetchResource))
        vehicles.value = vehiclesData.map((vehicle) => vehicle.name)
      }

      if (character.value.starships.length) {
        const starshipsData = await Promise.all(character.value.starships.map(fetchResource))
        starships.value = starshipsData.map((starship) => starship.name)
      }
    } catch (error) {
      console.error('Failed to fetch character details:', error)
    }
  }

  loadCharacter()
  loadCharacterNestedData()

  return { self: character, homeworld, films, vehicles, starships }
}
