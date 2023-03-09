<template>
  <div>
    <NuxtLayout>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <nuxt-link class="navbar-brand" to="/">
            ほうき鯖
          </nuxt-link>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <nuxt-link class="nav-link active" aria-current="page" to="/ranking">ランキング</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link active" aria-current="page" to="/rules">ルール</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link active" aria-current="page" to="/howto">ハウツー</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <NuxtPage/>

      <div class="bg-light pt-3">
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
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
