<template>
  <div class="image-hover-view">
    <img
      :src="src || base_url + 'favicon.svg'"
      :alt="alt"
      class="image"
    >
    <div class="text-container">
      <p class="text">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "ImageHover",
  props: {
    text: { type: String, required: true },
    src: { type: String, required: true },
    alt: { type: String, default: "" },
  },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "global",
    });
    return { t };
  },
  data() {
    return {
      base_url: process.env.VUE_APP_BASE_URL,
    };
  },
});
</script>

<style scoped>
/* TODO: Fix text background that take more space than the image */
/* TODO: Don't show all text it image too small */
/* Hide text container if not hover */
.text-container {
  visibility: hidden;
}

.image-hover-view:hover .text-container {
  visibility: visible;
}

.image {
  /* transition: transform 0.2s; */
  transition: all 0.2s;
  max-width: 100%;
  max-height: 100%;
}

.text-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.image-hover-view:hover .text-container {
  transform: translateY(-10px);
  /* Display text on the image */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* Add a semi-transparent background to hide the image */
  background-color: rgba(0, 0, 0, 0.5);
  /* Cover all the image */
  width: 100%;
  height: 100%;
  /* color: #fff; */
  /* padding: 10px; */
  /* font-size: 1.2rem; */
  /* font-weight: bold; */
}

/* .text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  vertical-align: center;
  padding-top: 50%;
  font-size: 1.5rem;
} */

.image-hover-view {
  /* Prevent taking more space than needed */
  display: inline-block;
  position: relative;
  /* width: 100%; */
  /* Prevent taking all horizontal space */
  overflow: hidden;
  /* Add border radius */
  border-radius: 5%;
}
</style>
