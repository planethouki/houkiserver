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
  </div>
</template>
