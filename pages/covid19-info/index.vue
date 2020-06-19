<template lang="pug">
.covid19-external-container
  .columns
    .column.is-three-fifths.is-offset-one-fifth
      nuxt-link(to="/information" v-if="$store.state.auth.logedin")
        |< 戻る
      nuxt-link(to="/auth/login" v-else)
        |< ログイン画面
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
.covid19-external-container
  margin: 20px 10px
</style>
