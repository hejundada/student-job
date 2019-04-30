<template>
  <div class="loginbg">
    <div class="login-content">
      <transition name="fade" mode="in-out">
        <section class="form_contianer" v-show="loginShow">
          <div class="manage_tip">
            <p>用户注册</p>
          </div>
          <div class="table-form">
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
              <el-form-item prop="userphone">
                <el-input v-model="loginForm.userphone" maxlength="11" placeholder="账号"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
              </el-form-item>
              <el-form-item prop="username">
                <el-input v-model="loginForm.username" placeholder="用户模块—昵称/企业模块—公司名称"></el-input>
              </el-form-item>
              <!-- <el-form-item class="register-code" prop="code">
              <el-input type="text" placeholder="验证码" v-model="loginForm.code"></el-input>
              <el-button :disabled="disabled" @click="sendcode" class="enter-code">{{btntxt}}</el-button>
              </el-form-item>-->
              <el-form-item>
                <el-radio v-model="radio" label="4">普通用户</el-radio>
                <el-radio v-model="radio" label="3">企业单位</el-radio>
              </el-form-item>
              <el-form-item>
                <!-- <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button> -->
                <el-button type="primary" class="submit_btn" @click="submitRegister">注册</el-button>
              </el-form-item>
              <div class="register">
                <div></div>
                <a @click="login">返回登录>></a>
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
      disabled: false,
      time: 0,
      btntxt: "发送验证码",
      loginForm: {
        userphone: "",
        password: "",
        username: "",
        code: ""
      },
      rules: {
        userphone: [
          { required: true, message: "请您输入账号", trigger: "blur" },{validator: validatePhone,trigger: "blur",required: true,message: "请输入正确的手机号"}
        ],
        password: [
          { required: true, message: "请您输入密码", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请您输入昵称", trigger: "blur" }
        ],
      },
      loginShow: false
    };
  },
  mounted() {
    this.loginShow = true;
  },
  methods: {
    //发送手机验证码倒计时
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + "s后重新获取";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "发送验证码";
        this.disabled = false;
      }
    },
    //验证手机号码部分
    // sendcode() {
    //   var regphone = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
    //   if (this.loginForm.userphone == "") {
    //       this.$message({
    //       showClose: true,
    //       message: "请输入账号",
    //       type: "error"
    //     });
    //   } else if (!regphone.test(this.loginForm.userphone)) {
    //      this.$message({
    //       showClose: true,
    //       message: "手机格式不正确",
    //       type: "error"
    //     });
    //   } else {
    //     this.time = 60;
    //     this.disabled = true;
    //     this.timer();
    //   }
    // },
    register() {
      this.$router.push("/Register");
    },
    //注册
    submitRegister() {
      var regphone = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
      if (this.loginForm.userphone == "" && this.loginForm.password == "") {
        this.$message({
          showClose: true,
          message: "请输入账号/密码/昵称",
          type: "error"
        });
      } else if (!regphone.test(this.loginForm.userphone)) {
        this.$message({
          showClose: true,
          message: "手机格式不正确",
          type: "error"
        });
        this.loginForm.userphone = "";
      } else if (this.loginForm.userphone == "") {
        this.$message({
          showClose: true,
          message: "请您输入账号",
          type: "error"
        });
      } else if (this.loginForm.password == "") {
        this.$message({
          showClose: true,
          message: "请您输入密码",
          type: "error"
        });
      } else if (this.radio == "") {
        this.$message({
          showClose: true,
          message: "请您选择注册类型",
          type: "error"
        });
      } else if (this.username == "") {
        this.$message({
          showClose: true,
          message: "请您输入昵称",
          type: "error"
        });
      } else {
        //判断企业还是用户
        if(this.radio==4){
            axios({
              method: "post",
              url:
                "http://114.115.147.52:7076/user/register" +
                "?username=" +
                this.loginForm.userphone +
                "&password=" +
                this.loginForm.password +
                "&userLevel=" +
                this.radio +
                "&nickName=" +
                this.loginForm.username,
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            }).then(response => {
                if (response.data.code === 100) {
                  this.$message({
                    showClose: true,
                    message: "注册成功！",
                    type: "success"
                  });
                  this.$router.push("/");
                } else {
                  this.$message({
                    showClose: true,
                    message: "注册失败！",
                    type: "error"
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
        }else if(this.radio==3){
              axios({
              method: "post",
              url:
                "http://114.115.147.52:7076/user/register" +
                "?username=" +
                this.loginForm.userphone +
                "&password=" +
                this.loginForm.password +
                "&userLevel=" +
                this.radio +
                "&companyName=" +
                this.loginForm.username+"&nickName="+"公司",
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            }).then(response => {
                if (response.data.code === 100) {
                  this.$message({
                    showClose: true,
                    message: "注册成功！",
                    type: "success"
                  });
                  this.$router.push("/");
                } else {
                  this.$message({
                    showClose: true,
                    message: "注册失败！",
                    type: "error"
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
        }
        
      }
    },
    login() {
      this.$router.push("/");
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
  height: 428px;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.enter-code {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
  border-radius: 4px;
  outline: none;
  padding: 0px 10px;
}
.register {
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;
}
.register a {
  font-size: 14px;
  color: #409eff;
  cursor: pointer;
}
/deep/.register-code {
  .el-form-item__content {
    display: flex;
  }
  .el-input__inner {
    width: 90%;
  }
}
/deep/.el-form {
  width: 80%;
  margin: 50px 0px 28px 0px;
  .submit_btn {
    width: 100%;
  }
}
</style>