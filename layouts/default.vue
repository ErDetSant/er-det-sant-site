<template>
  <div>
    <div class="content">
      <div class="logo">
        <nuxt-link to="/">
          <logo />
        </nuxt-link>
      </div>
      <nuxt />
    </div>
  </div>
</template>
<script>
import Logo from '~/components/Logo.vue'
export default {
  name: 'Layout',
  components: {
    Logo,
  },
}
</script>

<style lang="scss">
html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 20px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  box-sizing: border-box;
  background: #1a1a1a;
  color: white;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

a {
  color: inherit;
}

h1 {
  font-weight: bold;
  font-size: 1.5rem;
  @media screen and (min-width: 50em) {
    font-size: 3.5rem;
  }
}
h2 {
  font-weight: bold;
  font-size: 1rem;
  @media screen and (min-width: 50em) {
    font-size: 2rem;
  }
}

.logo {
  @media screen and (min-width: 50em) {
    position: absolute;
    top: -1rem;
    right: calc(100% + 1.5rem);
  }
  @media screen and (max-width: 50em) {
    position: fixed;
    width: 6rem;
    top: 1rem;
    right: 1rem;
    svg {
      width: 6rem;
      height: auto;
    }
  }
}
.content {
  position: relative;
  margin: 6rem 1rem;
  @media screen and (min-width: 50em) {
    margin: 6rem 6rem 6rem 20rem;
  }
}

.slide-left-enter, .slide-left-leave-active,
.slide-right-enter, .slide-right-leave-active {
  transition: all .3s
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(5rem, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-5rem, 0);
}
</style>
