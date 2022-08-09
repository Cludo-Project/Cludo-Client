<template>
  <div>
    <nav>
      <router-link to="/">
        <img
          alt="Logo"
          src="@/assets/logo.png"
          class="logo"
        >
      </router-link>
      <router-link to="/">
        {{ t('home.title') }}
      </router-link> |
      <router-link to="/games">
        {{ t('games.title') }}
      </router-link> |
      <router-link to="/about">
        {{ t('about.title') }}
      </router-link>
      <LocaleSwitcher />
    </nav>
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import LocaleSwitcher from '@/components/LocaleSwitcher.vue'
export default defineComponent({
  components: {
    LocaleSwitcher
  },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'global'
    })
    return { t }
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
  /* Align left */
  text-align: left;
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

.logo {
  border-radius: 100%;
  /* Use the same width than the top bar */
  width: 40px;
  height: 40px;
  margin-right: 20px;
  /* Center vertically in the top bar */
  vertical-align: middle;
}
</style>
