<template>
    <div class="game-view">
        <!-- TODO: Translate it and improve UI -->
        <h1 v-if="name">{{ name }}</h1>
        <p v-if="id">ID : {{ id }}</p>
        <p v-if="description">Description : {{ description }}</p>
        <p v-if="designation">Designation : {{ designation }}</p>
        <p v-if="players_min && players_max">Players : {{ players_min }} - {{ players_max }}</p>
        <p v-if="type">Type : {{ type }}</p>
        <p v-if="vendor">Vendor : {{ vendor }}</p>
        <img v-if="image" :src="'http://ludoacigne.free.fr/jeux/images/' + image" class="game-img" />
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
        this.name = this.game.name
        this.id = this.game.id
        this.description = this.game.description
        this.designation = this.game.designation
        this.image = this.game.image_url || this.game.image
        this.players_min = this.game.players_min
        this.players_max = this.game.players_max
        this.type = this.game.type
        this.vendor = this.game.vendor
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