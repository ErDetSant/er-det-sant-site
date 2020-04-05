<template>
  <form class="search-form">
    <input type="search" class="search-input" placeholder="Søk" /><button type="submit">⇨</button>
  </form>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.search-form {
  position: relative;
  width: 100;
  font-size: 1.5rem;
  @media screen and (min-width: 50em) {
    font-size: 3.5rem;
  }
  button {
    appearance: none;
    -webkit-appearance: none;
    font-size: inherit;
    background: transparent;
    border: 0;
    color: inherit;
  }
}
.search-input {
  width: 70%;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  border: 0;
  border-radius: 0;
  padding-left: 0;
  border-bottom: 5px solid white;
  &::-webkit-search-decoration{
    -webkit-appearance: none;
  }
  font-family: inherit;
  font-weight: bold;
  font-size: 1.5rem;
  @media screen and (min-width: 50em) {
    font-size: 3.5rem;
  }
}
</style>
