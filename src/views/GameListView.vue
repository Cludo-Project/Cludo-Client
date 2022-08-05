<template>
  <div class="game-list">
    <h1>{{ t('games.title') }}</h1>
    <input v-model="text" @keyup="searchInputHandler()"/>
    <ul>
      <li v-for="(game, index) in games" :key="index">
        <router-link :to="`/games/${game.id}`">{{ game.name }}</router-link>
      </li>
    </ul>
  </div>
</template>


<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

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
      text: ''
    }
  },
  async mounted() {
    this.search()
  },
  methods: {
    async search(query) {
      if (!query) {
        this.games = await this.database.getDatabase()
        return
      }
      // Save searching time start
      let start = new Date().getTime()
      // Search for the query
      let games = await this.database.search(query)
      // Iterate over the games and add searchResult.item to this.games
      this.games = []
      for (let game of games) {
        this.games.push(game.item)
      }
      // Log the time it took to search the games list if the debug mode is enabled
      if (process.env.NODE_ENV === 'development') {
        console.log(`Searching the games list took ${new Date().getTime() - start}ms`)
      }
    },
    searchInputHandler() {
      this.search(this.text)
    }
  },
})
</script>