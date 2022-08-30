<template>
  <router-link :to="`/games/${game.id}`">
    <ImageHover
      :text="game.description"
      :src="getImageUrl(game)"
      class="game-img-hover"
    />
    <p class="game-title">
      {{ game.name }}
    </p>
  </router-link>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ImageHover from './ImageHover.vue'

export default defineComponent({
    name: "GamePreview",
    components: { ImageHover },
    props: {
        game: { type: Object, required: true }
    },
    setup() {
        const { t } = useI18n({
            inheritLocale: true,
            useScope: "local"
        });
        return { t };
    },
    methods: {
        getImageUrl(game) {
            // If the game has an image, return it
            if (game.image || game.image_url) {
                // If image if a full url (starting with http(s)://), return it directly
                if (game.image_url.startsWith("http://") || game.image_url.startsWith("https://")) {
                    return game.image_url;
                }
                return this.database.images_url + (game.image || game.image_url);
            }
            // Otherwise, return an empty string (handled by the ImageHover component)
            return "";
        }
    }
})
</script>

<style scoped>
.game-img-hover {
  /* Take at max 50% of the width and 20% of the height */
  max-width: 100%;
  max-height: 100%;
  /* Add shadow */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
</style>