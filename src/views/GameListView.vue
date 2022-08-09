<template>
  <div class="game-list">
    <h1>{{ t('games.title') }}</h1>
    <input
      v-model="text"
      @keyup="searchInputHandler()"
    >
    <ul>
      <li
        v-for="(game, index) in games"
        :key="index"
      >
        <router-link :to="`/games/${game.id}`">
          {{ game.name }}
        </router-link>
      </li>
    </ul>
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
        {{ t('games.page') }} {{ page + 1 }} / {{ games.length + 1 }}
      </p>
      <button
        v-if="page < games.length"
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

const maxResultsPerPage = 10

export default defineComponent({
  name: 'AboutView',
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
      page: 1
    }
  },
  async mounted() {
    this.search()
  },
  methods: {
    async search(query) {
      const resultStartIndex = this.page * maxResultsPerPage
      if (!query) {
        let database = await this.database.getDatabase()
        // Limit max games and display them
        this.games = []
        // TODO: Improve this
        for (let i = resultStartIndex; i < Math.min(Object.keys(database).length, resultStartIndex + maxResultsPerPage); i++) {
          if (database[i]) {
            this.games.push(database[i])
          }
        }
        // this.games = database.slice(0, maxResults)
        return
      }
      // Save searching time start
      let start = new Date().getTime()
      // Search for the query
      let games = await this.database.search(query)
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