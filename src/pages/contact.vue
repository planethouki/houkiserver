<template>
  <div class="container mb-5">
    <section>
      <div class="h3">
        お問い合わせ
      </div>
      <iframe
        ref="contactIframe"
        :style="{ width: '100%', height: '600px', overflow: 'hidden', border: 0 }"
        @load="iframeOnload"
        title="contact"
        src="https://houkiserver.mojohelpdesk.com/widgets/create_request#/ticket-form/51178"
      />
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
    }
  },
  methods: {
    iframeOnload () {
      const mojoWidgetCss = '#content_for_layout, body {background-color: #f8f8f8;}#content_for_layout a { color: #428bca;}.section-head { background-color: #2a88ad; color: #fff;}.padding-for-content { font-style: italic;}label { color: #2a88ad;}.form-control { background-color: azure;}.form-footer { background-color: #f8f8f8;}.btn-success { background-color: #2a88ad; border: 1px solid #257c9e; color: #fff;}.glyphicon-exclamation-sign {  color: #ff7777;}'
      const node = this.$refs.contactIframe
      node.contentWindow.postMessage({ 'css': mojoWidgetCss }, '*')
    }
  }
}
</script>
