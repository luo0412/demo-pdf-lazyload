<template>
  <div class="container">
    <el-button type="primary" @click="toLoad">预览文件</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toLoad() {
      this.$router.push("/pdf");
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
