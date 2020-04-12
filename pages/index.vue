<template>
  <div class="home-page">
    <h1>Hva lurer du på?</h1>
    <p class="intro">
      <em>Er det sant?</em> er en tjeneste fra <a href="https://skepsis.no">foreningen Skepsis</a>.
      Her kan du finne svar på temaer som kan være vanskelig å finne ut av på egenhånd fordi internett
      er flust av vranglære, feilinformasjon, kyniske aktører og direkte svindel. Velg et hovedtema,
      eller søk på det du lurer på.
    </p>
    <ul class="topic-list"><li v-for="topic in topics" :key="topic.slug"><nuxt-link :to="`/${topic.slug}`">{{ topic.name }}</nuxt-link></li></ul>
    <Search />
  </div>
</template>

<script>
import Search from '@/components/Search.vue'

export default {
  name: 'HomePage',
  transition (to, from) {
    if (!from) {
      return 'slide-left'
    }
    const toLength = Object.keys(to.params).length
    const fromLength = Object.keys(from.params).length
    return toLength < fromLength ? 'slide-right' : 'slide-left'
  },
  components: {
    Search
  },
  computed: {
    topics() {
      return this.$store.state.topics
    }
  },
}
</script>

<style lang="scss">
.home-page {
  .intro {
    padding-left: 1rem;
    border-left: 5px solid white;
  }
  .topic-list {
    list-style: none;
    padding-left: 0;
    li {
      font-size: 1.5rem;
      @media screen and (min-width: 50em) {
        font-size: 3.5rem;
      }
      font-weight: bold;
      display: inline;
      &:after {
        content: ", "
      }
      &:last-child:after {
        content: ""
      }
    }
  }
}
</style>
