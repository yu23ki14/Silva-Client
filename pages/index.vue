<template lang="pug">

</template>

<script>
// import axios from 'axios'

export default {
  components: {
  },
  data () {
    return {
    }
  },
  asyncData () {
    // return axios.get(process.env.API_URL + '/pages?page_name=welcome')
    //   .then((res) => {
    //     const data = res.data[0]
    //     return axios.get(process.env.API_URL + '/posts?' + data.posts.map(post => 'id_in=' + post.id + '&').join(''))
    //       .then((resPosts) => {
    //         return {
    //           posts: resPosts.data,
    //           stores: data.stores,
    //           services: data.services,
    //           campaigns: data.campaigns,
    //           destinations: data.destinations
    //         }
    //       }).catch((err) => {
    //         return err
    //       })
    //   }).catch((err) => {
    //     return err
    //   })
  },
  mounted () {
    // this.$initLayout(this.$route.path)
  },
  methods: {
  }
}
</script>

<style lang="sass">

</style>
