<template>
  <div class="Resume">
    <div class="Resume-top">
      <div class="Resume-top-con">
        <div class="top-con-left" @click="goback">
          <img src="../../images/back.png">
          <p class="p1">问卷测评</p>
        </div>
        <div class="top-con-right">
          <p class="p1">您好！{{userName}}</p>
          <p class="p2" @click="Signout">退出登录</p>
        </div>
      </div>
    </div>
    <div class="Resume-content">
      <div class="Resume-content-form">
        <p class="p1">问卷调查</p>
        <div class="NaireQuer">
          <div class="NaireQuer-subject" v-for="(item,index) in question" :key="item.id">
            <p class="p2">{{index+1}}.{{item.title}}</p>
            <div class="left-choicesex">
              <el-radio v-model="itemRadio[index]" label="1">是</el-radio>
              <el-radio v-model="itemRadio[index]" label="0">不是</el-radio>
            </div>
          </div>
        </div>
        <el-button class="submitdata" @click="begindata">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
//axios
import axios from "axios";
//cookie
import { setCookie, getCookie } from "../../router/cookieUtil";

export default {
  data() {
    return {
      userName: "",
      // modifydata:{
      //      one:''
      // },
      itemRadio: ["radio1"],
      question: "",
      typedata: []
    };
  },
  created() {
    //获取问卷题目
    this.getnaire();
    this.userName = getCookie("name");
    let token = getCookie("token4");
    if (token == "") {
      this.$router.push("/");
    } else {
    }
  },
  methods: {
    //题目接口
    getnaire() {
      axios({
        method: "post",
        url: "http://114.115.147.52:7076/survey/allSurvey"
      })
        .then(response => {
          console.log(response.data.data)
          this.question = response.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //返回
    goback() {
      this.$router.go(-1);
    },
    //退出
    Signout() {
      setCookie("token4", "", -1);
      this.$router.push("/");
    },
    //提交
    begindata() {
        var arrList = [];
        for (let i = 0; i < this.itemRadio.length; i++) {
            if(this.itemRadio[i] == '1'){
                arrList.push(this.question[i].type);
            }
        }
      if (this.itemRadio=="radio1") {
        this.$message({
          showClose: true,
          message: "请填写全部问卷",
          type: "warning"
        });
      } else {
        axios({
          method: "post",
          url: "http://114.115.147.52:7076/survey/surveySub",
          data: {
            username: getCookie("name"),
            type: arrList
          }
        })
          .then(response => {
            console.log(response.data);
            if (response.data.code == 100) {
              this.$message({
                showClose: true,
                message: "提交问卷成功",
                type: "success"
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
.Resume {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: url(../../images/bg.jpg);
}

.Resume .Resume-top {
  width: 100%;
  height: 0.5rem;
  background-color: #324057;
}

.Resume-top .Resume-top-con {
  width: 15rem;
  height: 0.5rem;
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.Resume-top-con .top-con-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}

.Resume-top-con .top-con-left img {
  width: 0.1rem;
  height: 0.18rem;
}

.Resume-top-con .p1 {
  font-size: 0.16rem;
  color: #fff;
  margin-left: 0.1rem;
}

.Resume-top-con .top-con-right {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.Resume-top-con .top-con-right .p2 {
  font-size: 0.16rem;
  color: #fff;
  margin-left: 0.2rem;
  cursor: pointer;
}

.Resume-top-con .top-con-right .p2:hover {
  color: #00abf7;
}

.Resume .Resume-content {
  width: 15rem;
  height: 2rem;
  margin: auto;
  margin-top: 0.8rem;
}

.Resume .Resume-content .Resume-content-form {
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.Resume-content-form .p1 {
  color: #324057;
  font-size: 0.3rem;
  margin-bottom: 0.36rem;
}

.Resume-content-form .NaireQuer {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.NaireQuer .NaireQuer-subject {
  display: flex;
  flex-direction: column;
}

.NaireQuer .NaireQuer-subject .p2 {
  color: #324057;
  font-size: 0.24rem;
  margin-top: 0.4rem;
}

.NaireQuer-subject .left-choicesex {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.2rem;
  margin-bottom: 0px;
}
.left-choicesex .el-radio {
  color: #3a6186;
  font-size: 0.22rem;
}
.left-choicesex /deep/ .el-radio__inner {
  border: 1px solid #bbbbbb;
  width: 0.2rem;
  height: 0.2rem;
  background-color: #fff !important;
}
.left-choicesex /deep/ .el-radio__inner::after {
  width: 0.1rem;
  height: 0.1rem;
  background-color: #3a6186;
}
.left-choicesex /deep/ .el-radio__label {
  font-size: 0.22rem;
  padding-left: 0.1rem;
}
.left-choicesex /deep/ .el-radio__input.is-checked + .el-radio__label {
  color: #3a6186;
}

.Resume-content-form .submitdata {
  width: 1.4rem;
  height: 0.44rem;
  background-color: #324057;
  border-radius: 5px;
  font-size: 0.2rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  padding: 0px;
}
</style>