<template>
  <div class="about">
    <h1>{{ t('404.message') }}</h1>
    <p>
    {{ t('404.you-may-want-to') }} <a href="javascript:history.go(-1)">{{ t('404.go-back') }}</a> {{ t('404.or-to-the') }} <router-link to="/">{{ t('404.home-page') }}</router-link>.
    </p>
  </div>
</template>


<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'NotFoundView',
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local'
    })
    return { t }
  }
})
</script>