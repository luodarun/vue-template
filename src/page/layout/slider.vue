<template>
  <lr-scrollbar class="page-component__menu">
    <lr-menu
      :default-active="nowTagValue"
      unique-opened
      mode="vertical"
      :show-timeout="400"
      :collapse="keyCollapse"
    >
      <menuItem :menu="menu"></menuItem>
    </lr-menu>
  </lr-scrollbar>
</template>
<script>
import menuItem from "./menuItem";
import { mapGetters } from "vuex";

export default {
  name: "LayoutSlider",
  components: { menuItem },
  computed: {
    ...mapGetters(["menu", "keyCollapse"]),
    nowTagValue: function() {
      return this.$route.fullPath;
    }
  }
};
</script>
<style lang="scss">
.page-component__menu {
  position: absolute !important;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  transition: padding-top 0.3s;
}
.lr-scrollbar__wrap {
  height: 100%;
  overflow-x: hidden !important;
}
.lr-scrollbar__view {
  height: 100%;
}
.lr-menu {
  height: 100%;
}
</style>
