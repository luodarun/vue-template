<template>
  <lr-container style="height: 100%;">
    <lr-aside width="210px" class="self-aside">
      <LayoutSlider />
    </lr-aside>
    <lr-container>
      <lr-header class="self-header" height="auto">
        <LayoutTop />
      </lr-header>
      <lr-main class="self-main">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="routeCache">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </lr-main>
      <lr-footer class="self-footer">
        <LayoutFooter />
      </lr-footer>
    </lr-container>
  </lr-container>
</template>
<script>
import LayoutFooter from "./footer";
import LayoutSlider from "./slider";
import LayoutTop from "./top";

export default {
  components: { LayoutFooter, LayoutSlider, LayoutTop },
  computed: {
    routeCache() {
      return this.$store.getters.routeCache.map(item => item.name).toString();
    }
  },
  watch: {
    $route: {
      handler(val) {
        let tempRouteCache = this.$store.state.system.routeCache;
        let tempRouteCacheView = this.$store.state.system.routeCacheView;
        if (
          !tempRouteCache.map(item => item.path).includes(val.fullPath) &&
          val.meta.needCache
        ) {
          tempRouteCache.push({
            title: val.meta.title,
            path: val.fullPath,
            name: val.name
          });
        }
        if (
          !tempRouteCacheView.map(item => item.path).includes(val.fullPath) &&
          val.meta.needCache
        ) {
          tempRouteCacheView.push({
            title: val.meta.title,
            path: val.fullPath,
            name: val.name
          });
        }
        this.$store.commit("set_routeCache", tempRouteCache);
        this.$store.commit("set_routeCacheView", tempRouteCacheView);
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.self-aside {
  position: relative;
}
.self-header {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  padding: 0;
}
.self-footer {
  line-height: 60px;
  text-align: center;
  color: #aaa;
}
.self-main {
  overflow: hidden;
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
