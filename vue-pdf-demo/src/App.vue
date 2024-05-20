<template>
  <div id="app" class="wrapper">
    <transition name="fade-transform" mode="out-in">
      <template v-if="$route.meta.keepAlive">
        <keep-alive>
          <router-view class="view" />
        </keep-alive>
      </template>
      <template v-else>
        <router-view class="view" />
      </template>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f5f5f5;
  color: #333;
  position: relative;
  font-size: 16px;
  min-height: 100vh;
  height: auto !important;
}

/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-100px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.line2 {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  /* -webkit-box-orient: vertical; */
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  display: -webkit-box;
  word-break: break-all;
}
.line1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
