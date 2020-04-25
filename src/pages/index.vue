<template>
  <div class="container mb-5">
    <section class="text-center">
      <div class="display-3">
        ほうき鯖
      </div>
      <div class="display-4">
        A Minecraft Server.
      </div>
    </section>
    <section class="text-center">
      <b-button href="https://map.houkiserver.com" target="_blank" size="lg">
        Dynmap
      </b-button>
    </section>
    <section class="text-center">
      <h5>基本情報</h5>
      <div>アドレス・・・{{ address }}</div>
      <div>バージョン・・・{{ version }}</div>
      <div>ユーザー・・・{{ player }}</div>
    </section>
    <section class="d-flex justify-content-center">
      <div class="text-center px-2">
        <h5>McMMO合計レベルランキング</h5>
        <div v-for="set in totalSetting">
          <span v-html="set.icon"></span>
          <span class="font-weight-bold" :style="{ fontSize: set.fontSize }">
            {{ totalLevelPlayers[set.index] }}
          </span>
          <small>({{ totalLevelValues[set.index] }})</small>
        </div>
      </div>
      <div class="text-center px-2">
        <h5>Jobs総合ポイントランキング</h5>
        <div v-for="set in totalSetting">
          <span v-html="set.icon"></span>
          <span class="font-weight-bold" :style="{ fontSize: set.fontSize }">
            {{ totalPointPlayers[set.index] }}
          </span>
          <small>({{ totalPointValues[set.index] }})</small>
        </div>
      </div>
    </section>
    <section class="text-center">
      <a href="https://minecraft.jp/servers/planethouki.ddns.net" target="_blank" rel="noopener noreferrer">
        <img src="https://minecraft.jp/servers/planethouki.ddns.net/banner/1/560x95.png" alt="" className="{classes.w100}">
      </a>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      version: 'Loading...',
      player: 'Loading...',
      address: 'houkiserver.com',
      totalLevelPlayers: [],
      totalLevelValues: [],
      totalPointPlayers: [],
      totalPointValues: [],
      totalSetting: [
        { index: 0, icon: '&#x1F947;', fontSize: '150%' },
        { index: 1, icon: '&#x1F948;', fontSize: '110%' },
        { index: 2, icon: '&#x1F949;', fontSize: '100%' }
      ]
    }
  },
  mounted () {
    fetch('https://houkiserverquery.azurewebsites.net/')
      .then(res => res.json())
      .then((data) => {
        this.version = data.version.name
        this.player = `${data.players.online} / ${data.players.max}`
      })

    Promise.all([
      fetch('https://houkiserverstats.z31.web.core.windows.net/mcmmo.json'),
      fetch('https://houkiserverstats.z31.web.core.windows.net/jobs_point.json')
    ])
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then((results) => {
        const mcmmo = results[0]
        const jobs = results[1]
        this.totalLevelPlayers = mcmmo.totalLevel.map(item => item.playerName)
        this.totalLevelValues = mcmmo.totalLevel.map(item => item.level)
        this.totalPointPlayers = jobs.slice(0, 10).map(item => item.username)
        this.totalPointValues = jobs.slice(0, 10).map(item => Math.floor(item.totalpoints))
      })
  }
}
</script>
