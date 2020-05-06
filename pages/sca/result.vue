<template lang="pug">
  .sca-result-container.container
    .columns
      .column.is-6-tablet.is-offset-3-tablet.is-4-widescreen.is-offset-4-widescreen
        .field
          p.title.is-3
            |結果：C
          p
            |Covid19感染の可能性が高いです。
            br
            |保健所へ連絡し、対応病院の選定を始めましょう。
            br
            |もう一度患者とその家族とこれから入院治療を行うか自宅療養を継続するかもう一度話し合って決定してください。入院することは感染拡大リスクを下げられますが、それによって新たにリスクが生じてしまいます。
          p
            |また、包括ケアに関わっているチームと情報を密に共有し、感染拡大を防ぎながら最良のアクションプランを考え実行する必要があります。
            br
            |Silvaで患者の情報を管理することをおすすめします。Silvaは逐次変わる情報共有を容易にし、ケアを支えます。
        .field
          p.control
            nuxt-link.button.is-fullwidth.is-info(to="/auth/sign_up")
              | Silvaに新規登録する
</template>

<script>
export default {
}
</script>

<style lang="sass">
.sca-result-container
  padding: 20px 15px 0
  p
    margin-top: 20px
</style>
