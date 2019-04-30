<template>
	<div class="container">
		<el-row class="homemodule">
            <el-col :span="24" class="homemodule-header">
                <el-col :span="10" class="homeheader-left">
                    <div class="homeheader-left-con">
                         <span class="text">推荐算法后台管理系统</span>
                         <span class="time">{{nowTime}}</span>
                    </div>
                </el-col>
                <el-col :span="14" class="homeheader-right">
                    <div class="homeheader-right-con">
                        <span><img src="../images/user.png" /><a>{{nickname}}</a></span>
                        <span @click="Signout"><img src="../images/exit.png" /><a>退出</a></span>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="24" class="homemodule-content">
                <aside>
                    <el-menu class="homecon-left" router>
                        <el-menu-item index="User"><div class="user"><p>学生用户管理</p></div></el-menu-item>
                        <el-menu-item index="Employer"><div class="order"><p>用人单位管理</p></div></el-menu-item>
                        <el-menu-item index="Infor"><div class="stock"><p>信息类别管理</p></div></el-menu-item>
                        <el-menu-item index="New"><div class="naire"><p>新闻资讯管理</p></div></el-menu-item>
                        <el-menu-item index="Message"><div class="report"><p>留言信息管理</p></div></el-menu-item>
                        <el-menu-item index="Notice"><div class="count"><p>系统公告管理</p></div></el-menu-item>
                    </el-menu>
                </aside>
                <section v-bind:style ="{height:myHeight}">
                    <el-col :span="24">
                        <!-- <keep-alive> -->
                            <router-view></router-view>
                        <!-- </keep-alive> -->
                    </el-col>
                </section>
            </el-col>
		</el-row>
  	</div>
</template>

<script>
    //axios
     import axios from 'axios'
    //cookie
    import {setCookie,getCookie}from '../router/cookieUtil'
    export default {

        data() {
            return {
                // myWidth: ((window.innerWidth - 240)/(window.innerWidth)*100) + '%',
                myHeight: (window.innerHeight - 100) + 'px',
                nickname:'您好！欢迎您',
                ID:"",
                token:'',
                nowTime:"",
                nowWeek:"",
            };
        },
        // 创建完成前
        created() {
            this.nickname = getCookie("name")
            this.nowTimes();
            let token = getCookie("token2");
            if(token ==''){
                this.$router.push('/')
            }
        },
        methods: {
            //修改密码
            Changepsw(){
                this.$router.push('/changepsw')
            },
            //退出
            Signout(){
                setCookie("token2",'',-1)
                this.$router.push('/')
            },
            //当前时间
            timeFormate(timeStamp) {
                let year = new Date(timeStamp).getFullYear();
                let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
                let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
                var week = timeStamp ? new Date(timeStamp) : new Date();
                if(week.getDay() == 1){
                    this.nowWeek="周一"
                } else if(week.getDay() == 2){
                    this.nowWeek="周二"
                } else if(week.getDay() == 3){
                    this.nowWeek="周三"
                } else if(week.getDay() == 4){
                    this.nowWeek="周四"
                } else if(week.getDay() == 5){
                    this.nowWeek="周五"
                } else if(week.getDay() == 6){
                    this.nowWeek="周六"
                } else {
                    this.nowWeek="周日"
                }
                let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
                let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
                this.nowTime = year + "/" + month + "/" + date +"  "+ this.nowWeek +"  "+ hh +":"+ mm ;
                // console.log(this.nowTime)
                clearInterval(this.Times);
            },
            
            // 定时器函数
            nowTimes(){
                this.timeFormate(new Date());
                this.Times=setInterval(this.nowTimes,1000);
            },

        },

    }
</script>


<style lang="scss" scoped>
	.homemodule{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #eef5fd;
    }
    .homemodule-header{
        width: 100%;
        height:1rem; 
        background-color: #011e3c;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2000;
    }
    .homeheader-left{
        height: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .homeheader-left .homeheader-left-con{
        width: 100%;
        display: flex; 
        flex-direction: row;
        align-items: center;
        position: relative; 
        margin-left: 0.3rem;
    }
    .homeheader-left .text{
        font-size: 0.26rem;
        color: #ffffff;
    }
    .homeheader-left .time{
        font-size: 0.18rem;
        color: #ffffff;
        margin-left: 0.8rem;
    }
    .homeheader-right{
        height: 1rem;
        position: relative;
    }
    .homeheader-right-con{
        height: 0.46rem;
        position: absolute;
        top: 0.27rem;
        right: 0.3rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .homeheader-right-con span{
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 0.46rem;
        border-right: 1px dashed #fff;
    }
    .homeheader-right-con span:last-child{
        border-right: none;
    }
    .homeheader-right-con span img{
        width:0.4rem;
        height:0.4rem;
        margin-left: 0.2rem;
    }
    .homeheader-right-con span a{
        margin-right: 0.2rem;
        margin-left: 0.12rem;
        font-size: 0.18rem;
        color: #ffffff;
        cursor: pointer;
    }
    .homemodule-content{
        display: flex;
        flex-direction: row;
        background-color: #eef5fd;
    }
    .homemodule-content aside{
        width:2.4rem; 
        height: 100%;
        background-color: #011e3c;
        position: fixed;
        top: 1rem;
        left: 0;
    }
    .homemodule-content aside .homecon-left{
        height: 100%;
        background-color: #011e3c;
    }
    .homemodule-content aside .homecon-left li{
        width: 2.4rem;
        height: 0.8rem;
        font-size: 0.22rem;
        color: #8da5d5;
        padding-right: 0px;
        border-bottom: 1px solid #013c76;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding-left: 0px!important;
    }
    .el-menu-item:hover {
        outline: 0;
        background-color: #022d58;
    }
    .el-menu-item:focus{
        outline: 0;
        background-color: #eef5fd;
        color: #fd5378 !important;
        border-left: 0.04rem solid #fd5378;
    }
    .el-menu-item:focus div{
        margin-left: -0.04rem;
    }
    .homemodule-content section{
        width: 16.80rem;
        position: absolute;
        left: 2.4rem;
        top: 1rem;
        background-color: #eef5fd;
    }
    /deep/.el-menu-item{
        padding: 0 0;
    }
</style>
