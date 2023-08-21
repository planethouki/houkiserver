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
          houkiserver.com
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
  </div>
</template>

<script setup>

const config = useRuntimeConfig()

const discord = config.public.discordInviteLink

const fetchStatusInterval = ref(0)

const serverStatusLoading = ref(true)
const serverStatus = reactive({
  isServerOnline: false,
  onlinePlayerCount: 0,
  maxPlayerCount: 0,
  version: 'loading...',
})

onMounted(() => {
  $fetch('/api/serverStatus').then((statusResponse) => {
    serverStatusLoading.value = false
    serverStatus.isServerOnline = statusResponse.isServerOnline
    if (statusResponse.isServerOnline) {
      const status = statusResponse.result
      serverStatus.onlinePlayerCount = status.players.online
      serverStatus.maxPlayerCount = status.players.max
      serverStatus.version = status.version.name.replace('Spigot', 'Minecraft')
    }
  })
})
</script>

<style scoped lang="scss">
section {
  margin-bottom: 2rem;
}
</style>
