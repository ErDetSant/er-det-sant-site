import info from './content/site/info'
import fs from 'fs'
import path from 'path'
import glob from 'glob'

var dynamicRoutes = getDynamicPaths({
  'topics': 'topics/*.json',
  'articles': 'articles/**/*.json',
});

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: info.title || 'Er det sant? — Skepsis',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: info.description || 'En tjeneste fra foreningen Skepsis' },
      // Open Graph
      { hid: 'og:title', name: 'og:title', content: info.title || '' },
      { hid: 'og:description', name: 'og:description', content: info.description || 'En tjeneste fra foreningen Skepsis' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:url', name: 'og:url', content: 'https://erdetsant.skepsis.no' },
      { hid: 'og:image', name: 'og:image', content: 'https://erdetsant.skepsis.no/erdetsant.png' },
      // Twitter Card
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@SkepsisNorge' },
      { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: 'Er det sant? delingsbilde' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  vue: {
    config: {
      devtools: true
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit',
  ],
  markdownit: {
    injected: true,
    preset: 'default',
    breaks: true,
    html: true,
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    devtools: true,
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  generate: {
    routes: dynamicRoutes
  },
}

/**
 * Create an array of URLs from a list of files
 * @param {*} urlFilepathTable
 */
function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map(url => {
      const filepathGlob = urlFilepathTable[url];
      return glob
        .sync(filepathGlob, { cwd: 'content' })
        .map(filepath => `${path.dirname(filepath).replace(url, '')}/${path.basename(filepath, '.json')}`);
    })
  );
}
