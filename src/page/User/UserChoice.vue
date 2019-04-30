<template>
     <div class="UserChoice">
           <div class="UserChoice-con">
                  <div class="userchoice-list">
                          <div class="list-title">--欢迎使用大学生兼职管理平台--</div>
                          <div class="list-con">
                                <div class="list-con-one">
                                      <p class="p1" @click="PerfectResume">完善简历</p>
                                </div>
                                <div class="list-con-one">
                                      <p class="p2" @click="Deliver">简历投递</p>
                                </div>
                                <div class="list-con-one">
                                      <p class="p3" @click="JobRecommend">兼职推荐</p>
                                </div>
                                <div class="list-con-one">
                                      <p class="p3" @click="LookNew">浏览新闻</p>
                                </div>
                                <div class="list-con-one">
                                      <p class="p3" @click="Exchanger">留言交流</p>
                                </div>
                                <div class="list-con-one">
                                      <p class="p3" @click="Naire">问卷测评</p>
                                </div>
                          </div>
                  </div>
           </div>
     </div>
</template>

<script>
    //axios
    import axios from 'axios'
    //cookie
    import {setCookie,getCookie}from '../../router/cookieUtil'
    export default {
        data() {
            return {

            };
        },
        methods: {
            //完善简历
            PerfectResume(){
                this.$router.push('/Resume')
            },
            //简历投递
            Deliver(){
                this.$router.push('/Deliver')
            },
            //兼职推荐
            JobRecommend(){
                this.$router.push('/JobRecommend')
            },
            //浏览新闻
            LookNew(){
                this.$router.push('/LookNew')
            },
            //留言交流
            Exchanger(){
                this.$router.push('/Exchanger')
            },
            //问卷测评
            Naire(){
                this.$router.push('/Naire')
            },
        }
    }
</script>

<style lang="scss" scoped>
    
   .UserChoice{
       width: 100%;
       height: 100vh;
       background-color: #324057;
       display: flex;
       align-items: center;
       justify-content: center;
   }

   .UserChoice .UserChoice-con{
       width: 90%;
       height: 90%;
       background-color:#fff;
       box-shadow: #465170 10px 10px 30px;
       border-radius: 0.1rem;
       background:url(../../images/main_bg.jpg);
   }

   .UserChoice-con .userchoice-list{
       width: 80%;
       height: 100%;
       margin: auto;
       display: flex;
       flex-direction: column;
       align-items: center;
   }

   .userchoice-list .list-title{
       font-size: 0.34rem;
       color: #324057;
       margin-top: 1rem;
   }

   .userchoice-list .list-con{
       width: 100%;
       margin-top: 1rem;
       display: flex;
       flex-direction: row;
       align-items: center;
       flex-wrap: wrap;
   }

   .userchoice-list .list-con .list-con-one{
       width: 33.33%;
       height: 2.38rem;
       display: flex;
       align-items: center;
       justify-content: center;
       margin-bottom: 0.1rem;
   }

   .list-con .list-con-one p{
        width: 70%;
        height: 1.3rem;
        line-height: 1.3rem;
        text-align: center;
        font-size: 0.28rem;
        border-radius: 0.1rem;
        border:1px solid #d3d9e9;
        box-shadow: 0.04rem 0.06rem 0.1rem -0.02rem #d3d9e9;
        cursor: pointer;
   }

   .list-con .list-con-one .p1{
       background-color: #00abf7;
       color: #fff;
   }

   .list-con .list-con-one .p2{
       background-color: #3dbc6b;
       color: #fff;
   }

   .list-con .list-con-one .p3{
       background-color: #f5f5f5;
       color: #666;
   }

</style>