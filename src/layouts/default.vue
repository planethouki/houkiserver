<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">
        ほうき鯖
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/ranking">
            ランキング
          </b-nav-item>
          <b-nav-item to="/rules">
            ルール
          </b-nav-item>
          <b-nav-item to="/howto">
            ハウツー
          </b-nav-item>
          <b-nav-item to="/dynmap">
            Dynmap
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <nuxt />
    <div class="bg-secondary pt-3">
      <div class="d-flex flex-column flex-sm-row small px-3">
        <div class="d-flex flex-column" style="min-width: 8rem;">
          <h5>ほうき鯖</h5>
        </div>
        <div class="d-flex flex-column pb-3" style="min-width: 10rem;">
          <nuxt-link to="rules">
            ルール
          </nuxt-link>
          <nuxt-link to="howto">
            ハウツー
          </nuxt-link>
          <nuxt-link to="ranking">
            ランキング
          </nuxt-link>
          <nuxt-link to="policy">
            プライバシーポリシー
          </nuxt-link>
        </div>
        <div class="d-flex flex-column pb-3" style="min-width: 8rem;">
          <a href="https://map.houkiserver.com" target="_blank">
            Dynmap&#x2197;
          </a>
          <a href="https://minecraft.jp/servers/houkiserver.com" target="_blank">
            minecraft.jp&#x2197;
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
