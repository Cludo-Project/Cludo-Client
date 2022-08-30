<template>
  <div class="game-view">
    <!-- TODO: Translate it and improve UI -->
    <h1 v-if="name">
      {{ name }}
    </h1>
    <p v-if="id">
      ID : {{ id }}
    </p>
    <p v-if="description">
      Description : {{ description }}
    </p>
    <p v-if="players_min != -1 && players_max != -1">
      Players : {{ players_min }} - {{ players_max }}
    </p>
    <p v-if="players_min != -1 && players_max == -1">
      Players : {{ players_min }}
    </p>
    <p v-if="players_min == -1 && players_max != -1">
      Players : {{ players_max }}
    </p>
    <div v-if="age">
      <div v-if="age.isMouth">
        <p v-if="age.min && age.max && age.max != -1">
          Age : {{ age.min }} months - {{ age.max }} months
        </p>
        <p v-else-if="age.min && age.max && age.max == -1">
          Age : more than {{ age.min }} months
        </p>
        <p v-else-if="age.min && age.max && age.min == -1">
          Age : less than {{ age.max }} months
        </p>
        <p v-else-if="age.min && !age.max">
          Age : {{ age.min }} months
        </p>
        <p v-else-if="!age.min && age.max">
          Age : {{ age.max }} months
        </p>
      </div>
      <div v-else>
        <p v-if="age.min && age.max && age.max != -1">
          Age : {{ age.min }} years - {{ age.max }} years
        </p>
        <p v-else-if="age.min && age.max && age.max == -1">
          Age : more than {{ age.min }} years
        </p>
        <p v-else-if="age.min && age.max && age.min == -1">
          Age : less than {{ age.max }} years
        </p>
        <p v-else-if="age.min && !age.max">
          Age : {{ age.min }} years
        </p>
        <p v-else-if="!age.min && age.max">
          Age : {{ age.max }} years
        </p>
      </div>
    </div>
    <p v-if="type">
      Type : {{ type }}
    </p>
    <p v-if="vendor">
      Vendor : {{ vendor }}
    </p>
    <img
      v-if="image"
      :src="image"
      class="game-img"
    >
  </div>
</template>


<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
    name: 'GameView',
    setup() {
        const { t } = useI18n({
            inheritLocale: true,
            useScope: 'global'
        })
        return { t }
    },
    data() {
        return {
            name: '',
            id: '',
            description: '',
            designation: '',
            image_url: '',
            players_min: '',
            players_max: '',
            type: '',
            vendor: '',
        }
    },
    async mounted() {
        this.gameId = this.$route.params.gameId
        this.database = await this.database.getDatabase()
        this.game = this.database[this.gameId]
        // If the game is not found, redirect to the 404 page
        if (!this.game) {
            // TODO: Redirect to 404 page invisible to the user
            this.$router.push('/404')
            return
        }
        this.name = this.game.name
        this.id = this.game.id
        this.description = this.game.description
        this.designation = this.game.designation
        this.image = this.game.image_url || this.game.image
        this.players_min = this.game.players_min
        this.players_max = this.game.players_max
        this.age = this.game.age
        this.type = this.game.type
        this.vendor = this.game.vendor
        // Add game name to the title
        document.title = this.name + ' - ' + document.title
    },
})
</script>

<style scoped>
.game-view {
    margin: 0;
    padding: 0;
}

.game-img {
    max-width: 50%;
    max-height: 50vh;
}
</style>