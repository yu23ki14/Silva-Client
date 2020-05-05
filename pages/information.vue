<template lang="pug">
.information-container.columns
  .column.is-three-fifths.is-offset-one-fifth
    nuxt-link(to="/")
      |< ホームに戻る
    .information-links
      img(src="~assets/images/logos/logo-blue.svg" width="250")
      nuxt-link(to="/auth/edit")
        p.subtitle
          |アカウント情報を編集
      nuxt-link(to="/sca")
        p.subtitle
          |SCA covid19
      //nuxt-link(to="/needhelps")
        p.subtitle
          |助けを必要としているチーム
      nuxt-link(to="/auth/logout")
        p.subtitle
          |ログアウト
</template>

<script>
export default {

}
</script>

<style lang="sass">
.information-container
  margin-top: 40px
.information-links
  margin-top: 30px
  text-align: center
  p
    margin-top: 10px
</style>
