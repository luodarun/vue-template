<template>
  <div class="login-wrap">
    <div class="login_box">
      <div class="login_l_img"><img src="img/login-img.png" /></div>
      <div class="login">
        <div class="login_logo">
          <a href="#"><img src="img/login_logo.png"/></a>
        </div>
        <div class="login_name">
          <p>后台管理系统</p>
        </div>
        <form method="post">
          <input
            v-model="username"
            name="username"
            type="text"
            value="用户名"
            onfocus="this.value=''"
            onblur="if(this.value==''){this.value='用户名'}"
          />
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
          />
          <div style="width:100%;" class="submit" @click="login">登录</div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      username: "admin",
      password: "123456",
      redirect: "",
      otherQuery: null
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  methods: {
    login() {
      if (this.username && this.password) {
        this.$store
          .dispatch("login", this.username, this.password)
          .then(() => {
            this.$router.replace({
              path: this.redirect || "/",
              query: this.otherQuery
            });
          })
          .catch(() => {});
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>
<style lang="scss" scoped>
.login-wrap {
  background: #93defe;
  height: 100%;
  text-align: center;
  @include utils-vertical-center;
}
a {
  color: #27a9e3;
  text-decoration: none;
  cursor: pointer;
}
img {
  border: none;
}

.login_box {
  width: 1100px;
  display: inline-block;
  vertical-align: middle;
}
.login_box .login_l_img {
  float: left;
  width: 432px;
  height: 440px;
  margin-left: 50px;
}
.login_box .login_l_img img {
  width: 500px;
  height: 440px;
}
.login {
  height: 360px;
  width: 400px;
  padding: 50px;
  background-color: #ffffff;
  border-radius: 6px;
  box-sizing: border-box;
  float: right;
  margin-right: 50px;
  position: relative;
  margin-top: 50px;
}
.login_logo {
  width: 120px;
  height: 120px;
  border: 5px solid #93defe;
  border-radius: 100px;
  background: #fff;
  text-align: center;
  line-height: 110px;
  position: absolute;
  top: -60px;
  right: 140px;
}
.login_name {
  width: 100%;
  float: left;
  text-align: center;
  margin-top: 20px;
}
.login_name p {
  width: 100%;
  text-align: center;
  font-size: 18px;
  color: #444;
  padding: 10px 0 20px;
}
.login_logo img {
  width: 60px;
  height: 60px;
  display: inline-block;
  vertical-align: middle;
}
input[type="text"],
input[type="file"],
input[type="password"],
input[type="email"],
select {
  box-sizing: border-box;
  border: 1px solid #dcdee0;
  vertical-align: middle;
  border-radius: 3px;
  height: 50px;
  padding: 0px 16px;
  font-size: 14px;
  color: #555555;
  outline: none;
  width: 100%;
  margin-bottom: 15px;
  line-height: 50px;
  color: #888;
}
input[type="text"]:focus,
input[type="file"]:focus,
input[type="password"]:focus,
input[type="email"]:focus,
select:focus {
  border: 1px solid #27a9e3;
}
.submit {
  display: inline-block;
  vertical-align: middle;
  padding: 12px 24px;
  margin: 0px;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  color: #ffffff;
  background-color: #27a9e3;
  border-radius: 3px;
  border: none;
  -webkit-appearance: none;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  user-select: none;
}
input[type="button"] {
  display: inline-block;
  vertical-align: middle;
  padding: 12px 24px;
  margin: 0px;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  color: #ffffff;
  background-color: #27a9e3;
  border-radius: 3px;
  border: none;
  -webkit-appearance: none;
  outline: none;
  width: 100%;
}
.copyright {
  font-size: 14px;
  color: #fff;
  display: block;
  width: 100%;
  float: left;
  text-align: center;
  margin-top: 60px;
}

#password_text {
  box-sizing: border-box;
  border: 1px solid #dcdee0;
  vertical-align: middle;
  border-radius: 3px;
  height: 50px;
  padding: 0px 16px;
  font-size: 14px;
  color: #888;
  outline: none;
  width: 100%;
  margin-bottom: 15px;
  display: block;
  line-height: 50px;
}
</style>
