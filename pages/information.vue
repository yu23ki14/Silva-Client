<template lang="pug">
.information-container
  .columns
    .column.is-three-fifths.is-offset-one-fifth
      nuxt-link(to="/")
        |< ホームに戻る
      .information-links
        img(src="~assets/images/logos/logo-blue.svg" width="250")
        p.subtitle
          nuxt-link(to="/auth/edit")
            |アカウント情報を編集
        p.subtitle
          nuxt-link(to="/about")
            |silvaとは
        p.subtitle
          nuxt-link(to="/covid19-info")
            |新型コロナウイルスに関する外部リンク集
        p.subtitle
          nuxt-link(to="/auth/edit")
            |silvaへのご要望
        p.subtitle
          nuxt-link(to="/auth/logout")
            |ログアウト
</template>

<script>
export default {

}
</script>

<style lang="sass">
.information-container
  margin: 20px 10px
.information-links
  margin-top: 30px
  text-align: center
  p.subtitle
    margin-top: 15px
    margin-bottom: 0
</style>
