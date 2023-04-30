<template>
  <div id="page-index" class="container mb-5">
    <section class="text-center">
      <h1 class="display-3 mb-4">
        ほうき鯖
      </h1>
      <div>
        サーバーアドレス
      </div>
      <div class="display-4 mb-4">
        houkiserver.com
      </div>
      <div>
        サーバーステータス
      </div>
      <div v-if="serverStatusLoading" class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div v-else class="display-4">
        {{ serverStatus.isServerOnline ? 'オンライン' : 'オフライン' }}
      </div>
    </section>
    <section class="text-center">
      <div class="h3">
        ほうき鯖再開のお知らせ
      </div>
      <p>
        ほうき鯖は、2021年12月31日をもって運用終了しましたが、この度、2023年2月10日に再開しました。
      </p>
      <p>
        サーバー運用の費用を抑えるため、当面の間は<strong class="h4">17時から23時</strong>までの起動です。
      </p>
    </section>
    <section class="text-center">
      <h3>
        プレイヤー数
      </h3>
      <div v-if="serverStatusLoading" class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div v-else>
        <span>{{ serverStatus.onlinePlayerCount }}</span
        ><span> / </span
        ><span>{{ serverStatus.maxPlayerCount }}</span>
      </div>
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

<script setup>

const config = useRuntimeConfig()

const discord = config.public.discordInviteLink
const totalSetting = [
  { index: 0, icon: '&#x1F947;', fontSize: '150%' },
  { index: 1, icon: '&#x1F948;', fontSize: '110%' },
  { index: 2, icon: '&#x1F949;', fontSize: '100%' }
]

const totalMcMmoLevel = reactive([])
const totalJobsPoint = reactive([])

const fetchStatusInterval = ref(0)

const serverStatusLoading = ref(true)
const serverStatus = reactive({
  isServerOnline: false,
  onlinePlayerCount: 0,
  maxPlayerCount: 0,
})

onMounted(() => {
  Promise.all([
    $fetch('/api/serverStats/mcmmo'),
    $fetch('/api/serverStats/jobsPoint'),
  ])
    .then(([mcmmo, jobs]) => {
      [0, 1, 2].forEach((index) => {
        totalMcMmoLevel.push({
          playerName: mcmmo.totalLevel[index].playerName,
          level: mcmmo.totalLevel[index].level
        })
      });
      [0, 1, 2].forEach((index) => {
        totalJobsPoint.push({
          username: jobs[index].username,
          totalpoints: Math.floor(jobs[index].totalpoints)
        })
      });
    })

  $fetch('/api/serverStatus').then((statusResponse) => {
    serverStatusLoading.value = false
    serverStatus.isServerOnline = statusResponse.isServerOnline
    if (statusResponse.isServerOnline) {
      const status = statusResponse.result
      serverStatus.onlinePlayerCount = status.players.online
      serverStatus.maxPlayerCount = status.players.max
    }
  })
})
</script>

<style scoped lang="scss">
section {
  margin-bottom: 2rem;
}
</style>
