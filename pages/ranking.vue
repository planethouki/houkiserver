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

<script>
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

export default {
  components: {},
  data () {
    return {
      mcmmo: null,
      jobsRank: null,
      jobsPoint: null
    }
  },
  mounted () {
    Promise.resolve()
      .then(() => {
        return new Promise((resolve) => {
          setTimeout(resolve, 0)
        })
      })
      .then(() => {
        return Promise.all([
          fetch('https://houkiserverstats.z31.web.core.windows.net/mcmmo.json'),
          fetch('https://houkiserverstats.z31.web.core.windows.net/jobs_point.json'),
          fetch('https://houkiserverstats.z31.web.core.windows.net/jobs_rank.json')
        ])
      })
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(([mcmmo, jobsPoint, jobsRank]) => {
        this.mcmmo = Object.keys(mcmmo).map((key) => {
          return {
            title: mcMmoTypeToName(key),
            rank: mcmmo[key].slice(0, 10).map((item, index) => {
              return {
                icon: indexToIcon(index),
                player: item.playerName,
                level: item.level
              }
            })
          }
        })
        this.jobsRank = Object.keys(jobsRank).map((key) => {
          return {
            title: key,
            rank: jobsRank[key].slice(0, 10).map((item, index) => {
              return {
                icon: indexToIcon(index),
                player: item.username,
                level: item.level
              }
            })
          }
        })
        this.jobsPoint = jobsPoint.slice(0, 20).map((item, index) => {
          return {
            icon: indexToIcon(index),
            player: item.username,
            level: Math.floor(item.totalpoints)
          }
        })
      })
  }
}
</script>
