<template>
  <div class="page">
    <h2><nuxt-link :to="`/${topic.slug}`">⇦ {{ topic.title }}</nuxt-link></h2>
    <h1>{{ article.title }}</h1>
    <div v-html="$md.render(article.text)"></div>
    <ul class="source-list"><li v-for="(source, i) in article.sources" :key="`source-${i}`"><a target="_blank" :href="source.url">{{ source.name }}</a></li></ul>
    <Search />
  </div>
</template>

<script>
import Search from '@/components/Search.vue'

export default {
  name: 'ArticlePage',
  head () {
    return {
      title: this.article.title + ' — ' + this.topic.title + ' — Er det sant? – Skepsis',
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
        return this.$route.params.topic === article.slug.split('/')[0]
      })
    },
    article () {
      const articles = this.$store.state.articles
      return articles.find((article) => {
        const slug = this.$route.params.topic + '/' + this.$route.params.article
        return article.slug === slug
      })
    },
  },
}
</script>

<style lang="scss">
.page {
}
</style>
