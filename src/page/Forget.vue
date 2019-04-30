<template>
  <div class="loginbg">
    <div class="login-content">
      <transition name="fade" mode="in-out">
        <section class="form_contianer" v-show="loginShow">
          <div class="manage_tip">
            <p>忘记密码</p>
          </div>
          <div class="table-form">
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
              <el-form-item prop="userphone">
                <el-input v-model="loginForm.userphone" maxlength="11" placeholder="账号"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" placeholder="请输入新密码" v-model="loginForm.password"></el-input>
              </el-form-item>
              <el-form-item prop="password2">
                <el-input type="password" placeholder="请输入旧密码" v-model="loginForm.password2"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="submit_btn" @click="submitForget">修改</el-button>
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
        password2: "",
        code: ""
      },
      rules: {
        userphone: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            validator: validatePhone,
            trigger: "blur",
            required: true,
            message: "请输入正确的手机号"
          }
        ],
        password: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        password2: [
          { required: true, message: "请输入旧密码", trigger: "blur" }
        ]
        // code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      loginShow: false
    };
  },
  mounted() {
    this.loginShow = true;
  },
  methods: {
    //发送手机验证码倒计时
    // timer() {
    //   if (this.time > 0) {
    //     this.time--;
    //     this.btntxt = this.time + "s后重新获取";
    //     setTimeout(this.timer, 1000);
    //   } else {
    //     this.time = 0;
    //     this.btntxt = "发送验证码";
    //     this.disabled = false;
    //   }
    // },
    //验证手机号码部分
    // sendcode() {
    //  var regphone = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
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
    //修改密码
    submitForget() {
      var regphone = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
      if (this.loginForm.userphone == "" && this.loginForm.password == "") {
        this.$message({
          showClose: true,
          message: "请输入账号/新密码/旧密码",
          type: "error"
        });
      } else if (this.loginForm.userphone == "") {
        this.$message({
          showClose: true,
          message: "请输入账号",
          type: "error"
        });
      } else if (!regphone.test(this.loginForm.userphone)) {
        this.$message({
          showClose: true,
          message: "手机格式不正确",
          type: "error"
        });
      } else if (this.loginForm.password == "") {
        this.$message({
          showClose: true,
          message: "请输入新密码",
          type: "error"
        });
      } else if (this.loginForm.password2 == "") {
        this.$message({
          showClose: true,
          message: "请您输入旧密码",
          type: "error"
        });
      }else{
         axios({
          method: "post",
          url:
            "http://114.115.147.52:7076/user/changePass"+"?username=" +this.loginForm.userphone +"&password=" +this.loginForm.password +"&rePassword=" +this.loginForm.password2,
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
          .then(response => {
            if (response.data.code === 100) {
              this.$message({
              showClose: true,
              message: "修改密码成功",
              type: "success"
            })
            this.$router.push("/");
            }
          })
          .catch(err => {
            console.log(err);
          }); 
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