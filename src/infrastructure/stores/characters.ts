import { defineStore } from 'pinia'
import { createCharacter, type Character } from '@/core/domain/character'

export const useCharacterStore = defineStore('character', {
  state: () => ({
    characters: [] as Character[],
    favourites: [] as string[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    isFavourite: (state) => {
      return (id: string) => state.favourites.some((fav) => fav === id)
    },

    getFavourites: (state) => {
      return () => state.characters.filter((character) => state.favourites.includes(character.id))
    },

    getCharacter: (state) => {
      return (id: string) => state.characters.find((character) => character.id === id)
    },
  },

  actions: {
    async initializeCharacters() {
      this.loading = true
      this.error = null

      try {
        const response = await fetch('https://swapi.info/api/people')
        if (!response.ok) throw new Error(`API error: ${response.status}`)

        const data = await response.json()

        this.characters = data.map(createCharacter)
      } catch (e) {
        console.error(e)
        if (e instanceof Error) {
          this.error = e.message
        } else {
          this.error = 'Unknown error'
        }
      } finally {
        this.loading = false
      }
    },

    async fetchCharacterById(id: string): Promise<Character> {
      let character
      this.loading = true
      this.error = null

      try {
        const response = await fetch(`https://swapi.info/api/people/${id}`)
        if (!response.ok) throw new Error(`API error: ${response.status}`)

        character = await response.json()
      } catch (e) {
        console.error(e)
        if (e instanceof Error) {
          this.error = e.message
        } else {
          this.error = 'Unknown error'
        }
      } finally {
        this.loading = false
      }

      return character
    },

    addToFavourites(characterId: string) {
      if (!this.favourites.find((id) => id === characterId)) {
        this.favourites.push(characterId)
      }
    },

    removeFromFavourites(characterId: string) {
      this.favourites = this.favourites.filter((id) => id !== characterId)
    },
  },
})
