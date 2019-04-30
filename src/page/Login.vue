<template>
  <div class="loginbg">
    <div class="login-content">
      <transition name="fade" mode="in-out">
        <section class="form_contianer" v-show="loginShow">
          <div class="manage_tip">
            <p>推荐算法系统</p>
          </div>
          <div class="table-form">
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
              <el-form-item prop="userphone">
                <el-input v-model="loginForm.userphone" maxlength="11" placeholder="账号"></el-input>
              </el-form-item>
              <el-form-item prop="password" class="login-pass">
                <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
                <div class="forget-pass">
                  <a @click="forgrtPass">修改密码?</a>
                </div>
              </el-form-item>
              <el-form-item>
                <el-radio v-model="radio" label="4">普通用户</el-radio>
                <el-radio v-model="radio" label="2">管理员</el-radio>
                <el-radio v-model="radio" label="3">企业用户</el-radio>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="submit_btn" @click="submitLogin">登录</el-button>
              </el-form-item>
              <div class="register">
                <div></div>
                <a @click="register">注册>></a>
              </div>
            </el-form>
          </div>
        </section>
      </transition>
    </div>
  </div>
</template>

<script>
//axios
import axios from "axios";
//cookie
import { setCookie, getCookie } from "../router/cookieUtil";
import { validatePhone } from "../router/validate.js";
export default {
  data() {
    return {
      radio: "",
      loginForm: {
        userphone: "",
        password: ""
      },
      rules: {
        userphone: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      loginShow: false
    };
  },
  mounted() {
    this.loginShow = true;
  },
  methods: {
    //注册
    register() {
      this.$router.push("/Register");
    },
    //忘记密码
    forgrtPass() {
      this.$router.push("/Forget");
    },
    //登录验证
    submitLogin() {
      var regphone = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
      if (this.loginForm.userphone == "" && this.loginForm.password == "") {
        this.$message({
          showClose: true,
          message: "请输入账号/密码",
          type: "error"
        });
      } else if (this.loginForm.userphone == "") {
        this.$message({
          showClose: true,
          message: "请输入账号",
          type: "error"
        });
      }else if (this.loginForm.password == "") {
        this.$message({
          showClose: true,
          message: "请输入密码",
          type: "error"
        });
      } else if (this.radio == "") {
        this.$message({
          showClose: true,
          message: "请选择登录类型",
          type: "error"
        });
      } else {
        axios({
          method: "post",
          url:
            "http://114.115.147.52:7076/user/login" +
            "?username=" +
            this.loginForm.userphone +
            "&password=" +
            this.loginForm.password +
            "&userLevel=" +
            this.radio,
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
          .then(response => {
            if (response.data.code === 100) {
              this.$message({
                showClose: true,
                message: "登录成功！",
                type: "success"
              });
              setCookie("name", response.data.data.username);
              if (response.data.data.userLevel === 2) {
                this.$router.push("/Home");
                setCookie("token2", response.data.data.token);
              } else if (response.data.data.userLevel === 3) {
                setCookie("token3", response.data.data.token);
                setCookie("CompanyID", response.data.data.company[0].id); 
                setCookie("companyName", response.data.data.company[0].companyName); 
                this.$router.push("/Release");
              } else {
                setCookie("token4", response.data.data.token);
                this.$router.push("/UserChoice");
              }
            } else {
              this.$message({
                showClose: true,
                message: "登录失败,您不是当前类型用户！",
                type: "error"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.loginbg {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #324057;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.login-content .manage_tip {
  font-size: 34px;
  color: #fff;
  margin-bottom: 30px;
}
.table-form{
  width: 100%;
  height: 366px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}
.form_contianer {
  width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.register {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.22rem;
}
.register a {
  font-size: 14px;
  color: #409eff;
  cursor: pointer;
}
.login-pass {
  position: relative;
}
.forget-pass {
  position: absolute;
  right: 10px;
  top: 0;
  color: #409eff;
  z-index: 1000;
}
.forget-pass a {
  background-color: #fff;
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
/deep/.el-form {
  width: 80%;
  margin: 50px 0px 28px 0px;
  .submit_btn {
    width: 100%;
  }
}
</style>