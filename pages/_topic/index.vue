<template>
  <div class="page">
    <h2><nuxt-link to="/">⇦ Tilbake til start</nuxt-link></h2>
    <h1>{{ topic.title }}:</h1>
    <ul class="article-list"><li v-for="article in articles" :key="article.slug"><nuxt-link :to="`/${article.slug}`">{{ article.title }}</nuxt-link></li></ul>
    <Search />
  </div>
</template>

<script>
import Search from '@/components/Search.vue'

export default {
  name: 'TopicPage',
  head () {
    return {
      title: this.topic.title + ' — Er det sant? – Skepsis',
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
    topic () {
      const topics = this.$store.state.topics
      return topics.find((topic) => {
        return this.$route.params.topic === topic.slug
      })
    },
    articles () {
      const articles = this.$store.state.articles
      return articles.filter((article) => {
        console.log(article)
        return this.$route.params.topic === article.slug.split('/')[0]
      })
    },
  }
}
</script>

<style lang="scss">
.page {
  .article-list {
    li {
      font-size: 1rem;
      @media screen and (min-width: 50em) {
        font-size: 2rem;
      }
      font-weight: bold;
    }
  }
}
</style>
