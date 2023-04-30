<template>
  <div class="container mb-5">
    <section>
      <div class="h3">
        ルール
      </div>
      <template v-if="menu.length === 0">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </template>
      <template v-else>
        <template v-for="m in menu" :key="m.key">
          <RulesCard :title="m.title" :body="m.body" />
        </template>
      </template>
    </section>
    <section style="margin-top: 5rem;">
      <div class="h3">
        Jobsショップ内容
      </div>
      <p>/jobs shop で購入メニューが開きます。</p>
      <div v-if="shopItems.length === 0" class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div v-else>
        <div v-for="item in shopItems" :key="item.name" class="mb-3">
          <h4 class="h4">{{ item.name }}</h4>
          <div>価格</div>
          <div>{{ item.price }} Jobsポイント</div>
          <div>内容</div>
          <template v-for="giveItem in item.giveItems" :key="giveItem.id">
            <div>{{ giveItem.id }} {{ giveItem.amount }}個</div>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>

const menu = reactive([])

$fetch('/api/serverStats/menu')
  .then((menuRes) => {
    menuRes.forEach((item) => {
      menu.push(item)
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
