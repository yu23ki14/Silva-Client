import Vue from 'vue'

Vue.mixin({
  methods: {
    roleFormatter (role, short) {
      if (short) {
        switch (role) {
          case 'care_manager':
            return 'ケアマネ'
          case 'clinic':
            return '訪問診療'
          case 'nurse':
            return '訪問看護'
          case 'care':
            return '訪問介護'
          case 'rehabilitation':
            return '訪問リハ'
          case 'medicine':
            return '訪問薬剤'
          case 'day_service':
            return 'デイ/施設'
          case 'dentistry':
            return '訪問歯科'
          case 'other':
            return 'その他'
        }
      } else {
        switch (role) {
          case 'care_manager':
            return 'ケアマネージャー'
          case 'clinic':
            return '訪問診療'
          case 'nurse':
            return '訪問看護'
          case 'care':
            return '訪問介護'
          case 'rehabilitation':
            return '訪問リハビリテーション'
          case 'medicine':
            return '訪問薬剤'
          case 'day_service':
            return 'デイ/施設'
          case 'dentistry':
            return '訪問歯科'
          case 'other':
            return 'その他'
        }
      }
    },
    dateFormatter (inputdate, format, is12hours) {
      if (inputdate === undefined) {
        return ''
      }
      const date = new Date(inputdate)
      let weekday = ['日', '月', '火', '水', '木', '金', '土']
      if (!format) {
        format = 'YYYY/MM/DD(WW) hh:mm'
      }
      const year = date.getFullYear()
      const month = (date.getMonth() + 1)
      const day = date.getDate()
      weekday = weekday[date.getDay()]
      let hours = date.getHours()
      const minutes = date.getMinutes()
      const secounds = date.getSeconds()

      const ampm = hours < 12 ? 'AM' : 'PM'
      if (is12hours) {
        hours = hours % 12
        hours = (hours !== 0) ? hours : 12 // 0時は12時と表示する
      }

      const replaceStrArray =
        {
          'YYYY': year,
          'Y': year,
          'MM': ('0' + (month)).slice(-2),
          'M': month,
          'DD': ('0' + (day)).slice(-2),
          'D': day,
          'WW': weekday,
          'hh': ('0' + hours).slice(-2),
          'h': hours,
          'mm': ('0' + minutes).slice(-2),
          'm': minutes,
          'ss': ('0' + secounds).slice(-2),
          's': secounds,
          'AP': ampm
        }

      const replaceStr = '(' + Object.keys(replaceStrArray).join('|') + ')'
      const regex = new RegExp(replaceStr, 'g')

      const ret = format.replace(regex, function (str) {
        return replaceStrArray[str]
      })

      return ret
    }
  }
})
