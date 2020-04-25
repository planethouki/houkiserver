<template>
  <div class="container mb-5">
    <section>
      <div class="h3">
        McMMOレベルランキング
      </div>
      <b-row>
        <b-col
          v-for="item in mcmmo"
          :key="item.title"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="py-2 px-2"
        >
          <b-card
            :title="item.title"
            body-class="p-3"
            title-tag="h6"
          >
            <b-card-text>
              <div v-for="r in item.rank" :key="r.player" class="d-flex justify-content-between">
                <div style="font-size: 80%;">
                  <span v-html="r.icon" class="d-inline-block text-center" style="width: 2rem;" />
                  <span>{{ r.player }}</span>
                </div>
                <div style="font-size: 70%;">
                  <span>{{ r.level }}</span>
                </div>
              </div>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </section>
    <section>
      <div class="h3">
        Jobsポイントランキング
      </div>
      <b-row>
        <b-col
          v-for="item in jobsRank"
          :key="item.title"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="py-2 px-2"
        >
          <b-card
            :title="item.title"
            body-class="p-3"
            title-tag="h6"
          >
            <b-card-text>
              <div v-for="r in item.rank" :key="r.player" class="d-flex justify-content-between">
                <div style="font-size: 80%;">
                  <span v-html="r.icon" class="d-inline-block text-center" style="width: 2rem;" />
                  <span>{{ r.player }}</span>
                </div>
                <div style="font-size: 70%;">
                  <span>{{ r.level }}</span>
                </div>
              </div>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </section>
    <section>
      <div class="h3">
        Jobsレベルランキング
      </div>
      <b-row>
        <b-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="py-2 px-2"
        >
          <b-card
            body-class="p-3"
            title-tag="h6"
          >
            <b-card-text>
              <div v-for="r in jobsPoint" :key="r.player" class="d-flex justify-content-between">
                <div style="font-size: 80%;">
                  <span v-html="r.icon" class="d-inline-block text-center" style="width: 2rem;" />
                  <span>{{ r.player }}</span>
                </div>
                <div style="font-size: 70%;">
                  <span>{{ r.level }}</span>
                </div>
              </div>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
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
      mcmmo: [],
      jobsRank: [],
      jobsPoint: [],
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
    Promise.all([
      fetch('https://houkiserverstats.z31.web.core.windows.net/mcmmo.json'),
      fetch('https://houkiserverstats.z31.web.core.windows.net/jobs_point.json'),
      fetch('https://houkiserverstats.z31.web.core.windows.net/jobs_rank.json')
    ])
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
