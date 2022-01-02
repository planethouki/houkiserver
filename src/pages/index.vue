<template>
  <div id="page-index" class="container mb-5">
    <section class="text-center">
      <div class="display-3">
        ほうき鯖
      </div>
      <div class="display-4">
        A Minecraft Server.
      </div>
    </section>
    <section class="text-center">
      <div class="h3">
        ほうき鯖終了のお知らせ
      </div>
      <p>
        ほうき鯖は、2021年12月31日をもって運用終了いたしました。
      </p>
    </section>
    <section>
      <h3 class="text-center">
        総合ランキング
      </h3>
      <div class="d-flex justify-content-center">
        <div class="text-center px-2">
          <h6>McMMO合計レベル</h6>
          <div v-for="(item, index) in totalMcMmoLevel" :key="index">
            <span v-html="totalSetting[index].icon" />
            <span :style="{ fontSize: totalSetting[index].fontSize }" class="font-weight-bold">
              {{ item.playerName }}
            </span>
            <small>({{ item.level }})</small>
          </div>
        </div>
        <div class="text-center px-2 d-none">
          <h6>Jobs総合ポイント</h6>
          <div v-for="(item, index) in totalJobsPoint" :key="index">
            <span v-html="totalSetting[index].icon" />
            <span :style="{ fontSize: totalSetting[index].fontSize }" class="font-weight-bold">
              {{ item.username }}
            </span>
            <small>({{ item.totalpoints }})</small>
          </div>
        </div>
      </div>
    </section>
    <section class="text-center">
      <h3>
        コンタクト
      </h3>
      <div>
        <a :href="discord" target="_blank" rel="noreferrer">Discord</a>
      </div>
      <div>
        <a href="https://twitter.com/planethouki" target="_blank" rel="noreferrer">Twitter</a>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      totalMcMmoLevel: [],
      totalJobsPoint: [],
      totalSetting: [
        { index: 0, icon: '&#x1F947;', fontSize: '150%' },
        { index: 1, icon: '&#x1F948;', fontSize: '110%' },
        { index: 2, icon: '&#x1F949;', fontSize: '100%' }
      ],
      totalIncreasePointRecords: [],
      totalIncreaseLevelRecords: [],
      fetchStatusInterval: null
    }
  },
  computed: {
    discord () {
      return process.env.DISCORD_INVITE_LINK
    }
  },
  mounted () {
    Promise.all([
      fetch('https://houkiserverstats.z31.web.core.windows.net/mcmmo.json'),
      fetch('https://houkiserverstats.z31.web.core.windows.net/jobs_point.json')
    ])
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(([mcmmo, jobs]) => {
        this.totalMcMmoLevel = [0, 1, 2].map((index) => {
          return {
            playerName: mcmmo.totalLevel[index].playerName,
            level: mcmmo.totalLevel[index].level
          }
        })
        this.totalJobsPoint = [0, 1, 2].map((index) => {
          return {
            username: jobs[index].username,
            totalpoints: Math.floor(jobs[index].totalpoints)
          }
        })
      })
  },
  destroyed () {
    if (this.fetchStatusInterval !== null) {
      clearInterval(this.fetchStatusInterval)
    }
  }
}
</script>
