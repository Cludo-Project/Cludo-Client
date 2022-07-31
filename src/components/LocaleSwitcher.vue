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