<template>
  <div class="container mb-5">
    <section>
      <div class="h3">
        McMMOレベルランキング
      </div>
      <div class="row">
        <div class="col" v-if="mcmmo.length === 0">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <template
          v-for="item in mcmmo"
          v-else
          :key="item.title"
        >
          <RankingCard :title="item.title">
            <template v-for="r in item.rank" :key="r.player">
              <RankingItem :player-name="r.player" :level="r.level" :icon="r.icon" />
            </template>
          </RankingCard>
        </template>
      </div>
    </section>
    <section>
      <div class="h3">
        Jobsレベルランキング
      </div>
      <div class="row">
        <div class="col" v-if="jobsRank.length === 0">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <template
          v-for="item in jobsRank"
          v-else
          :key="item.title"
        >
          <RankingCard :title="item.title">
            <template v-for="r in item.rank" :key="r.player">
              <RankingItem :player-name="r.player" :level="r.level" :icon="r.icon" />
            </template>
          </RankingCard>
        </template>
      </div>
    </section>
    <section>
      <div class="h3">
        Jobsポイントランキング
      </div>
      <div class="row">
        <div class="col" v-if="jobsPoint.length === 0">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <template v-else>
          <RankingCard>
            <template v-for="r in jobsPoint" :key="r.player">
              <RankingItem :player-name="r.player" :level="r.level" :icon="r.icon" />
            </template>
          </RankingCard>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup>

const mcmmo = reactive([])
const jobsRank = reactive([])
const jobsPoint = reactive([])

$fetch('/api/serverStats/mcmmo')
  .then((mcmmoRes) => {
    Object
      .keys(mcmmoRes)
      .map((key) => {
        return {
          title: mcMmoTypeToName(key),
          rank: mcmmoRes[key].slice(0, 10).map((item, index) => {
            return {
              icon: indexToIcon(index),
              player: item.playerName,
              level: item.level
            }
          })
        }
      })
      .forEach((item) => {
        mcmmo.push(item)
      })
  })

$fetch('/api/serverStats/jobsPoint')
  .then((jobsPointRes) => {
    jobsPointRes
      .slice(0, 20)
      .map((item, index) => {
        return {
          icon: indexToIcon(index),
          player: item.username,
          level: Math.floor(item.totalpoints)
        }
      })
      .forEach((item) => {
        jobsPoint.push(item)
      })
  })

$fetch('/api/serverStats/jobsRank')
  .then((jobsRankRes) => {
    Object
      .keys(jobsRankRes)
      .map((key) => {
        return {
          title: key,
          rank: jobsRankRes[key].slice(0, 10).map((item, index) => {
            return {
              icon: indexToIcon(index),
              player: item.username,
              level: item.level
            }
          })
        }
      })
      .forEach((item) => {
        jobsRank.push(item)
      })
  })

</script>
