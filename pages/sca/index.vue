<template lang="pug">
  .sca-container.container
    .columns
      .column.is-4.is-offset-4
        .field
          p.title.is-3
            |SCA Covid19
          p.subtitle.is-5
            |SCA (Silva Clinical Assessment) Covid19 はCovid19感染疑いのある患者さんの対応方針を決定するのを支援するシステムです。
          p
            |ぐったりしている、前⽇⽐で症状増悪あり・発熱あり等の場合以降の質問に回答してください。
        .field
          p.control
            nuxt-link.button.is-fullwidth.is-info(to="/sca/assessment")
              | 次へ
</template>

<script>
export default {
}
</script>

<style lang="sass">
.sca-container
  padding: 15px
  a
    &:hover
      text-decoration: none
</style>
