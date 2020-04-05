<template>
  <div class="page">
    <h2><nuxt-link :to="`/${topic.id}`">⇦ {{ topic.name }}</nuxt-link></h2>
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
  async asyncData ({ params, error }) {
    if (params.topic && params.article) {
      const topic = await import(`~/content/topics/${params.topic}.json`)
      const article = await import(`~/content/articles/${params.topic}/${params.article}.json`)
      if (!topic.default.name || !article.default.title) {
        error({ statusCode: 404, message: 'Page not found' })
      }

      return {
        topic: { ...topic.default, id: params.topic},
        article: { ...article.default, id: params.article }
      }
    } else {
       error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style lang="scss">
.page {
}
</style>
