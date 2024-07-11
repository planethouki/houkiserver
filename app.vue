<template>
  <div>
    <NuxtLayout>
      <nav class="navbar navbar-expand navbar-light bg-light">
        <div class="container-fluid">
          <nuxt-link class="navbar-brand" to="/">
            ほうき鯖
          </nuxt-link>

          <div class="navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <nuxt-link class="nav-link active" aria-current="page" to="/rules">ルール</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link active" aria-current="page" to="/maps">マップ</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <NuxtPage class="pt-3" />

    </NuxtLayout>
  </div>
</template>
