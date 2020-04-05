<template>
  <div class="page">
    <h2><nuxt-link to="/">⇦ Tilbake til start</nuxt-link></h2>
    <h1>{{ topic.name }}:</h1>
    <ul class="article-list"><li v-for="article in articles" :key="article.id"><nuxt-link :to="`/${topic.id}/${article.id}`">{{ article.title }}</nuxt-link></li></ul>
    <Search />
  </div>
</template>

<script>
import Search from '@/components/Search.vue'

export default {
  name: 'TopicPage',
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
  async asyncData ({ params, app }) {
    const topic = await import(`~/content/topics/${params.topic}.json`)
    const context = await require.context('~/content/articles/', false, /\.json$/);
    let articles = await context.keys().map(key => ({
      ...context(key),
      id: key.replace('.json', '').replace('./', ''),
    }));
    const topicData = {
      id: params.topic,
      name: topic.name
    }
    return {
      topic: topicData,
      articles: articles.filter((article) => {
        return article.topics.includes(params.topic)
      })
    }
  },
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
