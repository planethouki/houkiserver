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
      <h3>基本情報</h3>
      <div>アドレス・・・{{ address }}</div>
      <div>バージョン・・・{{ version }}</div>
      <div>ユーザー・・・{{ player }}</div>
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
    <section>
      <h3 class="text-center">
        デイリーランキング
      </h3>
      <div class="d-flex justify-content-center">
        <div class="text-center px-2">
          <h6>McMMO合計レベル</h6>
          <div v-for="record in totalIncreaseLevelRecords" :key="record.playerName">
            <span class="font-weight-bold">
              {{ record.playerName }}
            </span>
            <small>(+{{ record.increaseLevel }})</small>
          </div>
          <div v-if="totalIncreaseLevelRecords.length === 0">
            データなし
          </div>
        </div>
        <div class="text-center px-2 d-none">
          <h6>Jobs総合ポイント</h6>
          <div v-for="record in totalIncreasePointRecords" :key="record.username">
            <span class="font-weight-bold">
              {{ record.username }}
            </span>
            <small>(+{{ record.increasePoints }})</small>
          </div>
          <div v-if="totalIncreaseLevelRecords.length === 0">
            データなし
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
    <section class="d-flex flex-column">
      <div class="text-center">
        <a href="https://minecraft.jp/servers/planethouki.ddns.net" target="_blank" rel="noopener noreferrer">
          <img
            src="https://minecraft.jp/servers/planethouki.ddns.net/banner/1/560x95.png"
            alt="minecraft.jp"
            style="max-width: 100%;"
          >
        </a>
      </div>
      <div class="mt-3 text-center">
        <a
          href="https://ja.namemc.com/server/houkiserver.com"
          rel="noreferrer"
          target="_blank"
        >
          namemc.com&#x2197;
        </a>
      </div>
      <div class="mt-1 text-center">
        <a
          href="https://gservers.org/minecraft-servers/houkiserver.com:25565/"
          rel="noreferrer"
          target="_blank"
        >
          gservers.org&#x2197;
        </a>
      </div>
      <div class="mt-1 text-center">
        <a
          href="https://mclist.co/server/houkiserver.com:25565/"
          rel="noreferrer"
          target="_blank"
        >
          mclist.co&#x2197;
        </a>
      </div>
    </section>
  </div>
</template>

<script>
import { format, addDays } from 'date-fns'

export default {
  components: {},
  data () {
    return {
      version: 'Loading...',
      player: 'Loading...',
      address: 'houkiserver.com',
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
    const fetchStatus = () => {
      fetch('https://houikiserver-query.azurewebsites.net/api/status')
        .then(res => res.json())
        .then((data) => {
          this.version = data.version
          this.player = `${data.onlinePlayers} / ${data.maxPlayers}`
        })
    }
    this.fetchStatusInterval = setInterval(fetchStatus, 10000)
    fetchStatus()

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

    const d1 = format(addDays(new Date(), -1), 'yyyyMMdd')
    const d2 = format(addDays(new Date(), -2), 'yyyyMMdd')
    Promise.all([
      fetch(`https://houkiserverstats.z31.web.core.windows.net/daily/${d1}_jobs_point.json`),
      fetch(`https://houkiserverstats.z31.web.core.windows.net/daily/${d2}_jobs_point.json`),
      fetch(`https://houkiserverstats.z31.web.core.windows.net/daily/${d1}_mcmmo.json`),
      fetch(`https://houkiserverstats.z31.web.core.windows.net/daily/${d2}_mcmmo.json`)
    ])
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(([p1, p2, m1, m2]) => {
        this.totalIncreasePointRecords = p1.map(({ username, totalpoints }) => {
          const found = p2.find(p => p.username === username)
          const increasePoints = found ? totalpoints - found.totalpoints : 0
          return { username, increasePoints }
        }).filter((item) => {
          return item.increasePoints > 0
        }).sort((a, b) => {
          return b.increasePoints - a.increasePoints
        }).map((item) => {
          return { ...item, increasePoints: Math.floor(item.increasePoints) }
        })
        this.totalIncreaseLevelRecords = m1.totalLevel.map(({ playerName, level }) => {
          const found = m2.totalLevel.find(p => p.playerName === playerName)
          const increaseLevel = found ? level - found.level : 0
          return { playerName, increaseLevel }
        }).filter((item) => {
          return item.increaseLevel > 0
        }).sort((a, b) => {
          return b.increaseLevel - a.increaseLevel
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
