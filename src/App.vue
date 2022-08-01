<template>
  <nav>
    <router-link to="/">{{ t('home.title') }}</router-link> |
    <router-link to="/about">{{ t('about.title') }}</router-link>
    <!-- TODO: Restore locale switcher and center correctly links -->
    <!-- <LocaleSwitcher/> -->
  </nav>
  <router-view/>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
// import LocaleSwitcher from '@/components/LocaleSwitcher.vue'
export default defineComponent({
  setup () {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'global'
    })
    return { t }
  },
  components: {
    // LocaleSwitcher
},
})
</script>
<style>
.black {
  --primary: #000;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  text-decoration: none;
}

nav {
  padding: 30px;
  font-size: 1.2rem;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
