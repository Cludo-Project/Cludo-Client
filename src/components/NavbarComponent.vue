<template>
  <nav>
    <router-link to="/">
      <img
        alt="Logo"
        src="@/assets/logo.svg"
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
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import LocaleSwitcher from './LocaleSwitcher.vue'

export default defineComponent({
    name: "NavbarComponent",
    components: { LocaleSwitcher },
    setup() {
        const { t } = useI18n({
            inheritLocale: true,
            useScope: "global"
        });
        return { t };
    }
})
</script>

<style scoped>

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