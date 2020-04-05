import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const state = () => ({
  topics: [],
  articles: [],
  siteInfo: [],
});

export const mutations = {
  SET_TOPICS(state, data) {
    state.topics = data
  },
  SET_ARTICLES(state, data) {
    state.articles = data
  },
  SET_INFO(state, data) {
    state.siteInfo = data
  },
};

export const actions = {
  async nuxtServerInit({ state, dispatch }) {
    await dispatch('getSiteInfo')
    await dispatch('getTopics')
    await dispatch('getArticles')
  },
  async getTopics({ commit }) {
    const context = await require.context('~/content/topics/', false, /\.json$/);

    const topics = await context.keys().map(key => ({
      ...context(key),
      id: key.replace('.json', '').replace('./', ''),
    }));

    commit('SET_TOPICS', topics)
  },
  async getArticles({ commit }) {
    const context = await require.context('~/content/articles/', false, /\.json$/);

    const articles = await context.keys().map(key => ({
      ...context(key),
      id: key.replace('.json', '').replace('./', ''),
    }));

    commit('SET_ARTICLES', articles)
  },
  getSiteInfo({ commit }) {
    const info = require('~/content/site/info.json');
    commit('SET_INFO', info)
  }
};