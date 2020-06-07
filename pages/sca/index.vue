<template lang="pug">
  .sca-container.container
    .columns
      .column.is-6-tablet.is-offset-3-tablet.is-4-widescreen.is-offset-4-widescreen
        .field
          p.title.is-3
            |SCA19
          p.subtitle.is-5
            |SCA19は、在宅療養のセッティングにおいて、COVID-19感染が疑われる症例について「アラートモード」を発令する際に必要となる情報を整理し共有するためのツールでありCOVID-19の診断あるいはPCR検査の可否判断を目的としたものではありません.
          p
            |以下に示す症状の一つ以上該当する場合、次へを押して質問に回答してください。
          p
            |発熱、悪寒、咳嗽の増悪、息切れの増悪、筋肉痛、倦怠感、咽頭痛、嘔気・嘔吐、嗅覚・味覚生涯、腹痛・下痢
        .field
          p.control
            nuxt-link.button.is-fullwidth.is-info(to="/sca/assessment")
              | 次へ
            a.button.is-fullwidth.is-light(@click="$router.go(-1)")
              | 戻る
</template>

<script>
export default {
  mounted () {
    this.validateClientId()
  },
  methods: {
    validateClientId () {
      if (this.$store.state.sca.data.client_id === null) {
        this.$router.push('/')
        this.$store.commit('message/setMessage', { message: 'エラーが発生しました。', messageType: 'danger' })
      }
    }
  }
}
</script>

<style lang="sass">
.sca-container
  padding: 15px
  .title
    margin-bottom: 30px
  a
    margin-bottom: 10px
    &:hover
      text-decoration: none
</style>
