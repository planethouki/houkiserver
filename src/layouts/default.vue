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
            Ranking
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Link" right>
            <b-dropdown-item href="https://map.houkiserver.com" target="_blank">
              Dynmap
            </b-dropdown-item>
            <b-dropdown-item href="https://minecraft.jp/servers/houkiserver.com" target="_blank">
              minecraft.jp
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <nuxt />
  </div>
</template>
