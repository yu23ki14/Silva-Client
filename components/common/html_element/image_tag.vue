<template lang="pug">
  img(:src="env == 'development' ? 'http://localhost:1337' + src : src" :width="width")
</template>

<script>
export default {
  props: ['src', 'width'],
  data () {
    return {
      env: process.env.NODE_ENV
    }
  }
}
</script>
