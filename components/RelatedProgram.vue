<template>
  <div class="related-program" :class="{'show-copy': showCopy}">
    <h3 class="related-program__title related-program--expand" @click="toggleCopy">{{ program.entity.title }}</h3>
    <div class="related-program__copy" v-if="showCopy" v-html="program.entity.body.processed"></div>
  </div>
</template>

<script>
  export default {
    name: 'RelatedProgram',
    props: ['program'],

    data() {
      return {
        showCopy: false,
      }
    },

    methods: {
      toggleCopy() {
        this.showCopy = !this.showCopy;
      }
    }
  }
</script>
