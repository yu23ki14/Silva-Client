<template lang="pug">
  header(:class="{solid: solid}")
    .page-container
      .header-container(:class="{active: headerMenuActive}")
        .header-logo-container
          nuxt-link(to="/")
              img(v-show="solid" src="~assets/images/logos/logo-blue.png")
              img(v-show="!solid" src="~assets/images/logos/logo-white.png")
        .header-menu-container
          ul
            li
              img(src="~assets/images/logos/logo-white.png")
            li
              nuxt-link(to="/stores" class="with-animation") Search Store
            li
              nuxt-link(to="/destinations" class="with-animation") Destination idea
            li
              nuxt-link(to="/posts" class="with-animation") Must Try
        .header-hamburger
          button.hamburger-menu(@click="toggleMenu")
            span
            span
            span
</template>

<script>
export default {
  computed: {
    solid () {
      return this.$store.state.header.solid
    },
    headerMenuActive () {
      return this.$store.state.header.menuActive
    }
  },
  methods: {
    toggleMenu () {
      this.$store.dispatch('header/toggleMenuActive')
    }
  }
}
</script>

<style lang="sass">
header
  .page-container
    position: relative
  .header-container
    display: flex
    justify-content: space-between
    position: absolute
    top: 30px
    left: 0px
    width: 100%
    @include mediaQuery-down(sm)
      top: 20px
  .header-logo-container img
    width: 100px
    @include mediaQuery-down(sm)
      width: 60px
  .header-menu-container
    display: flex
    align-items: center
    ul
      display: flex
      list-style: none
    li
      padding: 20px 5px 40px
      margin: 0 10px
    a
      color: white
    img
      display: none
    @include mediaQuery-down(sm)
      display: none
  &.solid
    background-color: white
    border-bottom: 1px solid #e8e8e8
    .page-container
      width: 100%
      padding: 10px 20px
      @include mediaQuery-down(sm)
        padding: 5px 10px
    .header-container
      position: relative
      top: 0
      align-items: center
    .header-logo-container
      a
        @include mediaQuery-down(sm)
          display: inline-flex
      img
        width: 60px
        @include mediaQuery-down(sm)
          width: 40px
    .header-menu-container
      li
        padding: 20px 5px
      a
        color: $text-default
    .header-hamburger
      span
        background-color: gray
      .hamburger-menu
        top: inherit
  .header-hamburger
    display: none
    @include mediaQuery-down(sm)
      display: block
      z-index: 5
    .hamburger-menu
      width: 25px
      height: 20px
      position: relative
      top: 10px
      background-color: transparent
      border: none
      &:focus
        outline: none
    span
      width: 100%
      height: 2px
      position: absolute
      left: 0
      background-color: white
      transition-duration: .3s
      &:nth-of-type(1)
        top: 0
      &:nth-of-type(2)
        top: calc( 50% - 1px )
        opacity: 1
      &:nth-of-type(3)
        bottom: 0
  .header-container.active
    .header-menu-container
      @include mediaQuery-down(sm)
        display: flex
        background-color: $brand-primary
        height: 100vh
        width: 100%
        position: fixed
        top: 0
        left: 0
        z-index: 3
        a
          color: white
        ul
          flex-wrap: wrap
          margin-top: -120px
        li
          width: 100%
          padding: 8px
          font-size: 24px
        img
          width: 80px
          display: block
    span
      z-index: 2
      background-color: white
      &:nth-of-type(1)
        top: 5px
        transform: rotate(45deg)
      &:nth-of-type(2)
        opacity: 0
      &:nth-of-type(3)
        bottom: 13px
        transform: rotate(-45deg)
</style>
