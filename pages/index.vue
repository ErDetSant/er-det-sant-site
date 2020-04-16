<template>
  <div class="home-page">
    <h1>Hva lurer du på?</h1>
    <div class="intro" v-html="$md.render(site.frontpagetext)">
    </div>
    <ul class="topic-list"><li v-for="topic in topics" :key="topic.slug"><nuxt-link :to="`/${topic.slug}`">{{ topic.title }}</nuxt-link></li></ul>
    <Search />
  </div>
</template>

<script>
import Search from '@/components/Search.vue'

export default {
  name: 'HomePage',
  head () {
    return {
      title: this.site.title,
      script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
      meta: [
        { hid: 'og:title', name: 'og:title', content: this.site.title },
        { hid: 'og:description', name: 'og:description', content: this.site.description },
      ]
    }
  },
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
    },
    site() {
      return this.$store.state.siteInfo
    },
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
