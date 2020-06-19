<template lang="pug">
.about-container
  .columns
    .column.is-three-fifths.is-offset-one-fifth
      nuxt-link(to="/" v-if="$store.state.auth.logedin")
        |< ホームに戻る
      nuxt-link(to="/auth/login" v-else)
        |< ログイン画面
      .about-silva
        img(src="~assets/images/logos/logo-blue.svg" width="250")
        section
          img(src="~assets/images/about/about1.png")
        section
          img(src="~assets/images/about/about2.png")
        section
          img(src="~assets/images/about/about3.png")
        section
          img(src="~assets/images/about/about4.png")
        section
          img(src="~assets/images/about/about5.png")
      .about-external-links
        external
</template>

<script>
import external from '../../components/common/covid19_external'

export default {
  components: {
    external
  }
}
</script>

<style lang="sass">
.about-container
  margin: 20px 10px
.about-silva
  text-align: center
  section
    margin-top: 20px
.about-external-links
  margin-top: 40px
</style>
