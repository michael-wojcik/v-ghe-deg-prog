<template>
  <div class="degree-programs__card" :class="{'is-expanded': isExpanded}">
    <h3 class="degree-programs__title">{{ degree.title }}</h3>
    <div v-html="degree.body.processed" class="field-body"></div>
    <a class="link--expand" @click="expandCard">{{ cardExpandText }}</a>

    <h5 class="related-programs__label">Related Programs</h5>
    <transition
      name="toggleRelated"
      @enter="startTransition"
      @after-enter="endTransition"
      @before-leave="startTransition"
      @after-leave="endTransition"
    >
      <div class="degree-programs__related-cards">
        <div v-for="(program, index) in relatedPrograms" :key="index">
          <related-program :program="program"></related-program>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import RelatedProgram from './RelatedProgram';

  export default {
    name: 'Card',
    props: ['degree', 'degreeType'],
    components: { RelatedProgram },

    data() {
      return {
        isExpanded: false,
        cardExpandText: 'Read more'
      }
    },

    methods: {
      expandCard() {
        this.isExpanded = !this.isExpanded;
        this.isExpanded ? this.cardExpandText = 'Collapse card' : this.cardExpandText = 'Read more'
      },

      startTransition(el) {
        el.style.height = el.scrollHeight + 'px'
      },

      endTransition(el) {
        el.style.height = ''
      }
    },

    computed: {
      relatedPrograms() {
        return this.degree.fieldRelatedPrograms;
      }
    }
  }
</script>
