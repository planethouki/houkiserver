<template>
  <div class="container mb-5">
    <section>
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
      <section>
        <div class="h5">
          保護チェスト
        </div>
        <div class="position-relative" style="max-width: 560px;">
          <div class="screen">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/O6GsuNKixes"
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

<script>
export default {}
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
