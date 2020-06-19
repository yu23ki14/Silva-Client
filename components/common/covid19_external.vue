<template lang="pug">
  .covid19-external-container
    p.title.is-4
      |COVID-19に関する情報を載せた外部サイト
    p.subtitle.is-5
      |１：厚生労働省新型コロナウイルス感染症に関するQ&A
    a(href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/dengue_fever_qa_00004.html" target="blank")
      p.subtitle.is-5
        |https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/dengue_fever_qa_00004.html
    p.subtitle.is-5
      |２：日本緩和医療学会 COVID-19関連特別ワーキンググループ
    a(href="https://www.jspm-covid19.com/?p=1" target="blank")
      p.subtitle.is-5
        |https://www.jspm-covid19.com/?p=1
    p.subtitle.is-5
      |３：日本看護協会新型コロナウィルス感染症関連情報
    a(href="https://www.nurse.or.jp/nursing/practice/covid_19/index.html?utm_source=top&utm_medium=banner&utm_campaign=square" target="blank")
      p.subtitle.is-5
        |https://www.nurse.or.jp/nursing/practice/covid_19/index.html?utm_source=top&utm_medium=banner&utm_campaign=square
    p.subtitle.is-5
      |４：日本がん看護学会COVID-19関連情報特設ページ
    a(href="https://jscn.or.jp/covid-19/index.html" target="blank")
      p.subtitle.is-5
        |https://jscn.or.jp/covid-19/index.html
    p.subtitle.is-5
      |５：日本専門看護師協議会 新型コロナウィルス感染症に関する情報
    a(href="http://jpncns.org/covid-19/idx01.html" target="blank")
      p.subtitle.is-5
        |http://jpncns.org/covid-19/idx01.html
</template>

<style lang="sass">
.covid19-external-container
  .title
    margin-bottom: 20px
  .title:not(.is-spaced)+.subtitle
    margin-top: 0
  .subtitle
    margin-bottom: 10px
  a
    .subtitle
      margin-bottom: 30px
</style>
