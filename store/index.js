import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const state = () => ({
  topics: [],
  authors: [],
  articles: [],
  siteInfo: [],
})

export const mutations = {
  SET_TOPICS(state, data) {
    state.topics = data
  },
  SET_AUTHORS(state, data) {
    state.authors = data
  },
  SET_ARTICLES(state, data) {
    state.articles = data
  },
  SET_INFO(state, data) {
    state.siteInfo = data
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const topicsCtx = await require.context('~/content/topics/', false, /\.json$/)
    const authorsCtx = await require.context('~/content/authors/', false, /\.json$/)
    const articlesCtx = await require.context('~/content/articles/', true, /\.json$/)
    const topics = topicsCtx.keys().map(key => {
      const res = topicsCtx(key)
      res.slug = key.slice(2, -5)
      return res
    })
    const authors = authorsCtx.keys().map(key => {
      const res = authorsCtx(key)
      res.slug = key.slice(2, -5)
      return res
    })
    const articles = articlesCtx.keys().map(key => {
      const res = articlesCtx(key)
      res.slug = key.slice(2, -5)
      return res
    })
    const info = require('~/content/site/info.json')

    await commit('SET_TOPICS', topics)
    await commit('SET_AUTHORS', authors)
    await commit('SET_ARTICLES', articles)
    await commit('SET_INFO', info)
  },
}