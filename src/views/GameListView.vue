<template>
  <div class="game-list">
    <h1>{{ t('games.title') }}</h1>
    <input v-model="text" @keyup.enter="searchInputHandler()"/>
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
import { Database } from '@/database'

export default defineComponent({
  name: 'AboutView',
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local'
    })
    return { t }
  },
  data() {
    return {
      games: [],
      database: new Database(),
      text: ''
    }
  },
  mounted() {
    // Start loading the games list as soon as possible
    this.database.load()
    this.search()
  },
  methods: {
    async search(query) {
      let games = await this.database.getDatabase()
      let games_matching = {};
      // Filter the games list by applying the query on all fields of each game
      if (query) {
        // TODO: Improve the search algorithm, it is very basic and very slow
        // Iterate over the games list using a for loop
        for (let i = 0; i < Object.keys(games).length; i++) {
          // Get the current game in the database
          let game = games[Object.keys(games)[i]]
          // Iterate over the fields of each game using a for loop
          for (let j = 0; j < Object.keys(game).length; j++) {
            // Get the current field of the current game
            let field = game[Object.keys(game)[j]]
            // If the query is found in the field, remove the game from the list
            if (field.toLowerCase().indexOf(query.toLowerCase()) > -1) {
              // Add the game to object that will be displayed in the list
              games_matching[Object.keys(games)[i]] = game
              break
            }
          }
        }
      } else {
        games_matching = games
      }
      this.games = games_matching
      console.log(this.games)
    },
    searchInputHandler() {
      this.search(this.text)
    }
  },
})
</script>