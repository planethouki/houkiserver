<template>
  <div id="page-index" class="container mb-5">
    <section class="text-center">
      <h1 class="display-3 mb-4">
        ほうき鯖
      </h1>
      <div class="mb-4">
        <div>
          サーバーアドレス
        </div>
        <div class="display-4">
          mc.houkiserver.com
        </div>
      </div>
      <div class="mb-4">
        <div>
          バージョン
        </div>
        <div v-if="serverStatusLoading" class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div v-else>
          {{ serverStatus.version }}
        </div>
      </div>
      <div class="mb-4">
        <div>
          サーバーステータス
        </div>
        <div v-if="serverStatusLoading" class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div v-else class="display-4 mb-4">
          {{ serverStatus.isServerOnline ? 'オンライン' : 'オフライン' }}
        </div>
      </div>
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
    <section class="text-center">
      <h3>
        解説
      </h3>
      <div>
        <a :href="youtube" target="_blank" rel="noreferrer">YouTube</a>
      </div>
    </section>
  </div>
</template>

<script setup>

const config = useRuntimeConfig()

const discord = config.public.discordInviteLink
const youtube = config.public.youtubePlaylistLink

let fetchStatusInterval

const serverStatusLoading = ref(true)
const serverStatus = reactive({
  isServerOnline: false,
  onlinePlayerCount: 0,
  maxPlayerCount: 0,
  version: 'loading...',
})

onMounted(() => {
  fetchServerStatus()
  fetchStatusInterval = setInterval(fetchServerStatus, 10000)
})

onUnmounted(() => {
  clearInterval(fetchStatusInterval)
})

async function fetchServerStatus() {
  return $fetch('/api/serverStatus', { signal: AbortSignal.timeout(4000) })
    .then((statusResponse) => {
      serverStatusLoading.value = false
      serverStatus.isServerOnline = statusResponse.isServerOnline
      if (statusResponse.isServerOnline) {
        const status = statusResponse.result
        serverStatus.onlinePlayerCount = status.players.online
        serverStatus.maxPlayerCount = status.players.max
        serverStatus.version = status.version.name.replace('Spigot', 'Minecraft')
      } else {
        serverStatus.onlinePlayerCount = 0
        serverStatus.maxPlayerCount = 0
        serverStatus.version = 'unknown'
      }
    })
}
</script>

<style scoped lang="scss">
section {
  margin-bottom: 2rem;
}
</style>
