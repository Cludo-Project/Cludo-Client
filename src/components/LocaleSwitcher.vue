<template>
  <div class="locale-switcher">
    <button :class="currentLocale" @click="switchLocale">
      <span>
        {{ currentLocale.toUpperCase() }}
      </span>
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'LocaleSwitcher',
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local'
    })
    return { t }
  },
  data() {
    return {
      currentLocale: ""
    }
  },
  mounted () {
    // TODO: Support multiple locales
    try {
      this.currentLocale = this.$i18n.global.locale.value === 'fr' ? 'en' : 'fr'
    } catch {
      this.currentLocale = navigator.language === 'fr' ? 'en' : 'fr'
    }
  },
  methods: {
    setLocale(locale) {
      this.$i18n.global.locale._setter(locale)
      this.$i18n.global.locale.value = locale
      this.currentLocale = locale
    },
    switchLocale() {
      if (this.currentLocale === "en") {
        this.setLocale("fr")
      } else {
        this.setLocale("en")
      }
    }
  },
})
</script>

<style scoped>
.locale-switcher {
  display: inline;
  float: right;
}
.fr {
  background-image:
    url("~@/assets/flag_fr.svg");
}
.en {
  background-image:
    url("~@/assets/flag_en.svg");
}
button {
  transition: background-image 0.2s;
  margin-right: 2em;
  display: block;
  padding: 0.4em;
  font-size: 0.7em;
  background-size: cover;
  background-position: center center;
  border: none;
  border-radius: 5px;
  width: 3em;
}
span{
  background: rgba(0, 0, 0, .7);
  color: white;
  border-radius: 2px;
}
</style>