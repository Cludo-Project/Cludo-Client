<template>
  <div class="game-list">
    <h1>{{ t('games.title') }}</h1>
    <input
      v-model="text"
      :placeholder="t('games.search')"
      @keyup="searchInputHandler()"
    >
    <div class="game-grid">
      <GamePreview
        v-for="(game, index) in games"
        :key="[ index, game ]"
        class="game"
        :game="game"
      />
    </div>
    <div v-if="games.length != 0">
      <button
        v-if="page > 0"
        @click="previousPage"
      >
        ← {{ t('games.previous') }}
      </button>
      <p
        v-if="page > 0"
        class="page-info"
      >
        {{ t('games.page') }} {{ page + 1 }} / {{ totalPages }}
      </p>
      <button
        v-if="page +1 < totalPages"
        @click="nextPage"
      >
        {{ t('games.next') }} →
      </button>
    </div>
  </div>
</template>


<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import GamePreview from '../components/GamePreview.vue'

const maxResultsPerPage = 10

export default defineComponent({
  name: 'AboutView',
  components: {
    GamePreview
},
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'global'
    })
    return { t }
  },
  data() {
    return {
      games: [],
      text: '',
      query: '',
      page: 0,
      totalPages: 1,
    }
  },
  async mounted() {
    this.refresh()
  },
  methods: {
    async search(query) {
      const resultStartIndex = this.page * maxResultsPerPage
      if (!query) {
        let database = await this.database.getDatabase()
        this.totalPages = Math.ceil(Object.keys(database).length / maxResultsPerPage)
        // Limit max games and display them
        this.games = []
        // TODO: Improve this
        for (let i = resultStartIndex; i < Math.min(Object.keys(database).length, resultStartIndex + maxResultsPerPage); i++) {
          let game = Object.values(database)[i]
          if (game) {
            this.games.push(game)
          } else {
            // In development mode, raise an error if a game is missing, in production mode, just raise a warning
            if (process.env.NODE_ENV === 'development') {
              throw new Error(`Game ${i} is missing`)
            } else {
              console.warn(`Game ${i} is missing`)
            }
          }
        }
        // this.games = database.slice(0, maxResults)
        return
      }
      // Save searching time start
      let start = new Date().getTime()
      // Search for the query
      let games = await this.database.search(query)
      this.totalPages = Math.ceil(games.length / maxResultsPerPage)
      // Iterate over the games and add searchResult.item to this.games
      this.games = []
      for (let i = resultStartIndex; i < games.length && i < resultStartIndex + maxResultsPerPage; i++) {
        let game = games[i]
        this.games.push(game.item)
      }
      // Log the time it took to search the games list if the debug mode is enabled
      if (process.env.NODE_ENV === 'development') {
        console.log(`Searching the games list took ${new Date().getTime() - start}ms`)
      }
    },
    searchInputHandler() {
      this.query = this.text
      this.page = 0
      this.refresh()
    },
    refresh() {
      this.search(this.query)
    },
    previousPage() {
      this.page--
      this.refresh()
    },
    nextPage() {
      this.page++
      this.refresh()
    }
  },
})
</script>

<style scoped>
.page-info {
  /* Remove line break */
  display: inline;
  margin: .5rem
}

button {
  /* Make button round */
  border-radius: 8px;

  border: none;
  padding: 15px;
  font-size: 16px;
  margin: 4px 2px;
}
</style>

<style scoped>
.game {
  padding: 20px;
}
.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  /* padding: 20px; */
}
</style>