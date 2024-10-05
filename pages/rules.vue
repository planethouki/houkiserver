<template>
  <div class="container mb-5">
    <section>
      <template v-if="menu.ruleInfo.length === 0">
        <div class="h3">
          ルール
        </div>
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="h3">
          ワールドコマンド
        </div>
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="h3">
          情報
        </div>
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </template>
      <template v-else>
        <div class="h3">
          ルール
        </div>
        <div class="row mb-4">
          <template v-for="m in menu.ruleInfo" :key="m.key">
            <RulesCard :title="m.title" :body="m.body" />
          </template>
        </div>
        <div class="h3">
          ワールドコマンド
        </div>
        <div class="row mb-4">
          <template v-for="m in menu.commands" :key="m.key">
            <RulesCard :title="m.title" :body="m.body" />
          </template>
        </div>
        <div class="h3">
          情報
        </div>
        <div class="row mb-4">
          <template v-for="m in menu.otherInfo" :key="m.key">
            <RulesCard :title="m.title" :body="m.body" />
          </template>
        </div>
      </template>
    </section>

    <section style="margin-top: 5rem;">
      <div class="h3">
        kaitaku商人
      </div>
      <p>kaitakuワールドのスポーン地点にはアイテム商人がいます。エメラルドとアイテムを交換してくれます。</p>
      <p>主にマインクラフト内で個数が限られるアイテムを販売しています。</p>
    </section>

    <section style="margin-top: 5rem;">
      <div class="h3">
        ハウツー
      </div>
      <section>
        <div class="h5">
          領地保護
        </div>
        <div class="position-relative" style="max-width: 560px;">
          <div class="screen">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/videoseries?list=PLKkXcIN2QHPJC8_BgTbnf2qa0EbWlzzib"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup>

const menu = reactive({
  ruleInfo: [],
  commands: [],
  otherInfo: [],
})

$fetch('/api/serverStats/menu')
  .then((menuRes) => {
    menuRes.forEach((item) => {
      if (item.key === "ruleinfo") {
        menu.ruleInfo.push(item)
      } else if (item.key.endsWith("cmd")) {
        menu.commands.push(item)
      } else {
        menu.otherInfo.push(item)
      }
    })
  })

const shopItems = reactive([])

$fetch('/api/serverStats/shopItems')
  .then((shopItemsRes) => {
    Object
      .keys(shopItemsRes.Items)
      .forEach((itemName) => {
        const item = shopItemsRes.Items[itemName]
        const giveItems = Object
          .keys(item.GiveItems)
          .map((giveItemName) => {
            const giveItem = item.GiveItems[giveItemName]
            return {
              id: giveItem.Id,
              amount: giveItem.Amount ?? 1,
            }
          })
        const name = item.Icon.Name ?? itemName
        shopItems.push({
          name,
          price: item.Price,
          giveItems,
        })
      })
  })
</script>

<style scoped>
.screen {
  position: relative;
  height: 0;
  padding-bottom: calc(100% * 9 / 16);
  overflow: hidden;
}

.screen iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
