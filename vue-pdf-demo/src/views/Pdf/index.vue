<template>
  <div class="pdf">
    <iframe
      :src="`/static/pdf/web/viewer.html?file=${encodeURIComponent(src)}`"
      frameborder="0"
      style="width: 100%; height: calc(100vh)"
    ></iframe>
  </div>
</template>

<script>
import baseUrl from "@/api/baseurl.js";
export default {
  data() {
    return {
      baseUrl: baseUrl.baseUrl,
      src: "",
      loading: false,
    };
  },
  created() {},
  methods: {
    getPdfCode: function () {
      this.loading = true;
      // 这里是请求分片的接口，看情况修改
      this.src = `http://localhost:8181/v1/pdf/load`;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getPdfCode();
    });
  },
};
</script>

<style lang="scss" scoped></style>
