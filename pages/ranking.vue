<template>
  <div class="container mb-5">
    <section>
      <div class="h3">
        McMMOレベルランキング
      </div>
      <div class="row">
        <div class="col" v-if="mcmmo === null">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div
          v-for="item in mcmmo"
          v-else
          :key="item.title"
          class="col col-12 col-sm-6 col-md-4 col-lg-3 py-2 px-2"
        >
          <div class="card p-3">
            <h6 class="card-title">
              {{ item.title }}
            </h6>
            <div class="card-text">
              <div v-for="r in item.rank" :key="r.player" class="d-flex justify-content-between">
                <div style="font-size: 80%;">
                  <span class="d-inline-block text-center" style="width: 2rem;" v-html="r.icon" />
                  <span>{{ r.player }}</span>
                </div>
                <div style="font-size: 70%;">
                  <span>{{ r.level }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="h3">
        Jobsレベルランキング
      </div>
      <div class="row">
        <div class="col" v-if="jobsRank === null">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div
          v-for="item in jobsRank"
          v-else
          :key="item.title"
          class="col col-12 col-sm-6 col-md-4 col-lg-3 py-2 px-2"
        >
          <div class="card p-3">
            <h6 class="card-title">
              {{ item.title }}
            </h6>
            <div class="card-text">
              <div v-for="r in item.rank" :key="r.player" class="d-flex justify-content-between">
                <div style="font-size: 80%;">
                  <span class="d-inline-block text-center" style="width: 2rem;" v-html="r.icon" />
                  <span>{{ r.player }}</span>
                </div>
                <div style="font-size: 70%;">
                  <span>{{ r.level }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="h3">
        Jobsポイントランキング
      </div>
      <div class="row">
        <div class="col" v-if="jobsPoint === null">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div
          v-else
          class="col col-12 col-sm-6 col-md-4 col-lg-3 py-2 px-2"
        >
          <div class="card p-3">
            <div class="card-text">
              <div v-for="r in jobsPoint" :key="r.player" class="d-flex justify-content-between">
                <div style="font-size: 80%;">
                  <span class="d-inline-block text-center" style="width: 2rem;" v-html="r.icon" />
                  <span>{{ r.player }}</span>
                </div>
                <div style="font-size: 70%;">
                  <span>{{ r.level }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
function mcMmoTypeToName (type) {
  switch (type.toLowerCase()) {
    case 'acrobatics':
      return '\u30A2\u30AF\u30ED\u30D0\u30C6\u30A3\u30C3\u30AF'
    case 'alchemy':
      return '\u932C\u91D1\u8853'
    case 'archery':
      return '\u5F13'
    case 'axes':
      return '\u65A7'
    case 'excavation':
      return '\u6398\u524a'
    case 'fishing':
      return '\u91E3\u308A'
    case 'herbalism':
      return '\u8FB2\u696D'
    case 'mining':
      return '\u63A1\u6398'
    case 'repair':
      return '\u4FEE\u7406'
    case 'salvage':
      return '\u30B5\u30EB\u30D9\u30FC\u30B8'
    case 'smelting':
      return '\u7CBE\u932C'
    case 'swords':
      return '\u5263'
    case 'taming':
      return '\u8ABF\u6559'
    case 'unarmed':
      return '\u7D20\u624B'
    case 'woodcutting':
      return '\u6728\u3053\u308a'
    case 'totallevel':
      return '合計レベル'
    default:
      return 'Unknown'
  }
}

function indexToIcon (index) {
  switch (index) {
    case 0:
      return '&#x1F947;'
    case 1:
      return '&#x1F948;'
    case 2:
      return '&#x1F949;'
    default:
      return (index + 1).toString()
  }
}

const mcmmo = reactive([])
const jobsRank = reactive([])
const jobsPoint = reactive([])


Promise.all([
  $fetch('/api/serverStats/mcmmo'),
  $fetch('/api/serverStats/jobsPoint'),
  $fetch('/api/serverStats/jobsRank')
])
  .then(([mcmmoRes, jobsPointRes, jobsRankRes]) => {

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

</script>
