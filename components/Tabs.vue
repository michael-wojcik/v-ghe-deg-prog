<template>
  <div>
    <ul class="content-tabs">
      <li 
        v-for="tab in tabs"
        :key="tab.tid"
        :class="{'is-active': tab.selected}"
      >
        <a :href="tab.href" @click="selectTab(tab)">{{tab.name}}</a>
      </li>
    </ul>

    <div class="content-tabs-details">
      <transition name="tab-details" mode="out-in">
        <div 
          v-for="tab in selectedTab"
          :key="tab.tid"
          class="degree-programs"
        >
          <div class="degree-programs__list">
            <degree-card 
              v-for="degree in degrees"
              :key="degree.nid"
              :degree="degree"
              :degreeType="tab.tid"
            >
            </degree-card>
          </div>

          <div 
            v-if="tab.fieldPCta"
            v-html="tab.fieldPCta.entity.entityRendered" 
            class="degree-programs__cta"
          >
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import DegreeCard from './DegreeCard';

export default {
  name: 'Tabs',
  components: { DegreeCard },
  props: ['terms', 'nodes'],

  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => tab.selected = (tab.name == selectedTab.name));
    }
  },

  computed: {
    tabs() {
      return this.terms;
    },

    selectedTab() {
      return this.terms.filter(tab => tab.selected);
    },

    degrees() {
      return this.nodes.filter(node => node.fieldDegreeType.entity.tid === this.selectedTab[0].tid);
    }
  },

  watch: {
    tabs() {
      this.tabs.forEach((tab, index) => {
        this.$set(tab, 'selected', false);
        if (index === 0) tab.selected = true;
      });
    }
  }
}
</script>
