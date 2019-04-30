<template>
     <div class="Resume">
           <div class="Resume-top">
                <div class="Resume-top-con">
                      <div class="top-con-left" @click="goback">
                            <img src="../../images/back.png"/>
                            <p class="p1">返回</p>
                      </div>
                      <div class="top-con-right">
                            <p class="p1">您好！{{userName}}</p>
                            <p class="p2" @click="Signout">退出登录</p>
                      </div>
                </div>
           </div>
           <div class="Resume-content">
                <div class="LookNew">
                     <p class="texttitle">{{newinfor.title}}</p>
                     <p class="texttime">{{newinfor.date}}</p>
                     <p class="textcon">{{newinfor.content}}</p>
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
                userName:'',
                newinfor:'',
            };
        },
        // 创建完成前
        created() {
            this.userName = getCookie("name");
            //定义接口方法
            this.getnewinfor()
            let token = getCookie("token4");
            if (token=="") {
                this.$router.push('/')
            } else {
                
            }
        },
        methods: {
            //获取新闻详情接口
            getnewinfor(){

                axios({
                    method:'post',
                    url:'http://114.115.147.52:7076/news/getNews'+'?id='+sessionStorage.getItem('bookid'),

                }).then(response => {
                    // console.log(response.data.data)
                    this.newinfor=response.data.data[0];
                    var newTime = new Date(response.data.data[0].date);
                    response.data.data[0].date = newTime.getFullYear()+"-"+(newTime.getMonth()+1 < 10 ?"0"+(newTime.getMonth()+1) :newTime.getMonth()+1)+"-"+(newTime.getDate()<10?"0"+newTime.getDate():newTime.getDate())+" "+(newTime.getHours()<10?"0"+newTime.getHours():newTime.getHours())+":"+(newTime.getMinutes()<10?"0"+newTime.getMinutes():newTime.getMinutes())+":"+(newTime.getSeconds()<10?"0"+newTime.getSeconds():newTime.getSeconds());
                }).catch(err => {
                    console.log(err);
                })

            },
            //返回
            goback(){
                this.$router.go(-1);
            },
            //退出
            Signout(){
                setCookie("token4", "", -1);
                this.$router.push('/')
            },
        }
    }
</script>

<style lang="scss" scoped>
    
    .Resume{
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        background:url(../../images/bg.jpg);
    }

    .Resume .Resume-top{
        width: 100%;
        height: 0.5rem;
        background-color: #324057;
    }

    .Resume-top .Resume-top-con{
        width: 15rem;
        height: 0.5rem;
        margin: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .Resume-top-con .top-con-left{
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
    }

    .Resume-top-con .top-con-left img{
        width: 0.1rem;
        height: 0.18rem;
    }

    .Resume-top-con .p1{
        font-size: 0.16rem;
        color: #fff;
        margin-left: 0.1rem;
    }

    .Resume-top-con .top-con-right{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .Resume-top-con .top-con-right .p2{
        font-size: 0.16rem;
        color: #fff;
        margin-left: 0.2rem;
        cursor: pointer;
    }

    .Resume-top-con .top-con-right .p2:hover{
        color: #00abf7;
    }

    .Resume .Resume-content{
        width: 15rem;
        margin: 0.5rem auto;
    }

    .Resume-content .LookNew{
        width: 80%;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .LookNew .texttitle{
        color: #324057;
        font-size: 0.3rem;
        margin-top: 0.4rem;
        margin-bottom: 0.15rem;
    }

    .LookNew .texttime{
        color: #999;
        font-size: 0.2rem;
        margin-bottom: 0.36rem;
    }

    .LookNew .textcon{
        width: 100%;
        color: #333;
        font-size: 0.24rem;
        text-indent: 2em;
        margin-bottom: 0.2rem;
    }


</style>