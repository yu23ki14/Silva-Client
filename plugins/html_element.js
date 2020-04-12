import Vue from 'vue'

import ImageTag from '~/components/common/html_element/image_tag'
import BgImageTag from '~/components/common/html_element/bg_image_tag'

Vue.mixin({
  components: {
    ImageTag,
    BgImageTag
  }
})
