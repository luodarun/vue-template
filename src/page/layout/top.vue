<template>
  <div>
    <div class="top-user">
      <lr-dropdown @command="handleCommand">
        <i class="lr-icon-setting" style="margin-right: 15px"></i>
        <lr-dropdown-menu slot="dropdown">
          <lr-dropdown-item command="logout">退出登录</lr-dropdown-item>
        </lr-dropdown-menu>
      </lr-dropdown>
      <span>{{ name }}</span>
    </div>
    <div class="keep-alive-control-wrap">
      <div class="keep-alive-control">
        <div><i class="lr-icon-left" @click="scrollLeft"></i></div>
        <div ref="controlDiv">
          <ul ref="controlUl" class="keep-alive-control-ul">
            <li
              v-for="(item, index) in routeCacheView"
              :key="index"
              v-selfContextMenu="() => getMenu(index)"
              @click="gotActive(item)"
            >
              <div
                :style="{
                  background:
                    fullPath === item.path || fullPath === item.path + '/index'
                      ? '#2d8cf0'
                      : '#f0f0f0'
                }"
              ></div>
              <div>{{ item.title }}</div>
              <i class="lr-icon-close"></i>
            </li>
          </ul>
        </div>
        <div @click="scrollright"><i class="lr-icon-right"></i></div>
        <div
          title="全部关闭"
          style="border-left: 1px solid #f6f6f6;"
          @click="closeAll"
        >
          <i class="lr-icon-close"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import selfContextMenu from "@/directives/selfContextMenu";
import find from "lodash/find";
import findIndex from "lodash/findIndex";
export default {
  name: "LayoutTop",
  directives: {
    selfContextMenu
  },
  data() {
    return {
      fullPath: ""
    };
  },
  computed: {
    ...mapGetters(["routeCacheView", "menu", "name"]),
    haveWel() {
      return (
        this.$router.getMatchedComponents("/wel/index").length > 1 &&
        findIndex(
          this.$store.state.system.routeCacheView,
          item => item.path === "/wel/index" || item.path === "/wel"
        ) > -1
      );
    }
  },
  watch: {
    $route: {
      handler(val) {
        this.fullPath = val.fullPath;
      },
      immediate: true
    }
  },
  methods: {
    handleCommand(command) {
      if (command === "logout") {
        this.$store.dispatch("logout").then(() => {
          this.$router.push({
            path: "/login"
          });
        });
      }
    },
    getMenu(index) {
      let item = this.routeCacheView[index];
      if (item.path === this.$route.fullPath) {
        return [
          {
            name: "刷新",
            callbackFn: () => {
              this.upDateItem(item);
            }
          },
          {
            name: "关闭其他",
            callbackFn: () => {
              this.closeOther(item);
            }
          },
          {
            name: "关闭所有",
            callbackFn: this.closeAll
          }
        ];
      } else if (this.haveWel && item.title === "首页") {
        return [
          {
            name: "关闭其他",
            callbackFn: () => {
              this.closeOther(item);
            }
          },
          {
            name: "关闭所有",
            callbackFn: this.closeAll
          }
        ];
      } else {
        return [
          {
            name: "关闭",
            callbackFn: () => {
              this.closeItem(item, index);
            }
          },
          {
            name: "关闭其他",
            callbackFn: () => {
              this.closeOther(item);
            }
          },
          {
            name: "关闭所有",
            callbackFn: this.closeAll
          }
        ];
      }
    },
    upDateItem(item) {
      this.$store.dispatch("handleUpdateRouter", item).then(() => {
        this.$router.push({
          path: "/redirect" + item.path
        });
      });
    },
    closeItem(item) {
      this.$store.dispatch("handleUpdateRouterView", item);
    },
    closeOther(item) {
      if (this.haveWel) {
        let tempItem = find(this.$store.state.system.routeCacheView, item => {
          return item.title === "首页";
        });
        this.$store.commit("set_routeCacheView", [tempItem, item]);
        this.$store.commit("set_routeCache", [tempItem, item]);
      } else {
        this.$store.commit("set_routeCacheView", [item]);
        this.$store.commit("set_routeCache", [item]);
      }
      this.$router.push({
        path: item.path
      });
    },
    closeAll() {
      if (this.haveWel) {
        let tempItem = find(this.$store.state.system.routeCacheView, item => {
          return item.title === "首页";
        });
        this.$store.commit("set_routeCacheView", [tempItem]);
        this.$store.commit("set_routeCache", [tempItem]);
      } else {
        this.$store.commit("set_routeCacheView", []);
        this.$store.commit("set_routeCache", []);
      }
      this.$router.push({
        path: "/wel"
      });
    },
    gotActive(item) {
      if (
        this.$route.fullPath !== item.path &&
        this.$route.fullPath !== item.path + "/index"
      ) {
        this.$router.push({
          path: item.path
        });
      }
    },
    scrollLeft() {
      let translatedX = this.$refs.controlUl.style.transform
        ? parseInt(this.$refs.controlUl.style.transform.split("translateX(")[1])
        : 0;
      if (-translatedX > this.$refs.controlDiv.clientWidth) {
        this.$refs.controlUl.style.transform = `translateX(${translatedX +
          this.$refs.controlDiv.clientWidth}px)`;
      } else {
        this.$refs.controlUl.style.transform = "translateX(0px)";
      }
    },
    scrollright() {
      let translatedX = this.$refs.controlUl.style.transform
        ? parseInt(this.$refs.controlUl.style.transform.split("translateX(")[1])
        : 0;
      if (
        this.$refs.controlUl.clientWidth + translatedX >
        this.$refs.controlDiv.clientWidth // 滚动的还不够
      ) {
        let lastTranslate =
          this.$refs.controlUl.clientWidth +
          translatedX -
          2 * this.$refs.controlDiv.clientWidth;
        let needTranslate =
          lastTranslate > 0
            ? this.$refs.controlDiv.clientWidth
            : this.$refs.controlUl.clientWidth +
              translatedX -
              this.$refs.controlDiv.clientWidth;
        this.$refs.controlUl.style.transform = `translateX(${translatedX -
          needTranslate}px)`;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.top-user {
  text-align: right;
  font-size: 12px;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
}
.keep-alive-control-wrap {
  padding: 0;
  height: 40px;
  background: #f0f0f0;
  .keep-alive-control {
    position: relative;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    user-select: none;
    height: 100%;
    width: 100%;
    overflow: hidden;
    > div {
      display: inline-block;
    }
    > div:nth-child(2) {
      width: calc(100% - 90px);
      overflow: hidden;
    }
    > div:not(:nth-child(2)) {
      width: 30px;
      background: #fff;
      height: 100%;
      text-align: center;
      cursor: pointer;
      z-index: 1;
      position: relative;
      box-sizing: border-box;
      @include utils-vertical-center;
      i {
        vertical-align: middle;
      }
      &:hover {
        i {
          color: #409eff;
        }
      }
    }
  }
}
.keep-alive-control-ul {
  position: absolute;
  white-space: nowrap;
  top: 5px;
  height: 30px;
  left: 30px;
  margin: 0;
  padding: 0;
  transition: all 0.3s;
  li {
    list-style: none;
    display: inline-block;
    background: #fff;
    height: 100%;
    margin: 0 5px;
    border-radius: 5px;
    cursor: pointer;
    @include utils-vertical-center;
    > div:first-child {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-left: 10px;
      display: inline-block;
      vertical-align: middle;
    }
    > div:nth-child(2) {
      display: inline-block;
      vertical-align: middle;
      margin: 0 10px;
    }
    i {
      vertical-align: middle;
      margin-right: 10px;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
