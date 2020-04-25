<template lang="pug">
  .dashboard-main-inner
    div(v-if="$store.state.dashboard.team != null")
      DashboardTeam
      DashboardStatusHistory
      DashboardActionHistory
    p.title.is-5(v-else-if="Object.keys($store.state.dashboard.clients).length > 0")
      |リストから詳細を見る患者を選択してください。
    p.title.is-5(v-else)
      |患者を追加する＋ボタンから患者を追加してください。
</template>

<script>
import DashboardTeam from './team'
import DashboardStatusHistory from './status_history'
import DashboardActionHistory from './action_history'

export default {
  components: {
    DashboardTeam,
    DashboardStatusHistory,
    DashboardActionHistory
  }
}
</script>

<style lang="sass">
.dashboard-main-inner
  width: 90%
  margin: 20px auto
</style>
