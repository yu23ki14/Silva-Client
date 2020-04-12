<template lang="pug">
  div(:style="env == 'development' ? { 'background-image': 'url(http://localhost:1337' + src + ')' } : { 'background-image': 'url(' + src + ')' }")
</template>

<script>
export default {
  props: ['src'],
  data () {
    return {
      env: process.env.NODE_ENV
    }
  }
}
</script>
