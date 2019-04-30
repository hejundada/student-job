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
                <div class="JobList">
                      <div class="JobList-top">
                            <p class="jobtitle">{{jobinfors.title}}</p>
                            <p class="jobtime">{{jobinfors.date}}</p>
                      </div>
                      <div class="JobList-con">
                            <p class="jobcompang">公司:  {{jobinfors.companyName}}</p>
                            <p class="jobmoney">招聘类型:  {{jobinfors.typeName}}</p>
                            <p class="jobask">职位要求:</p>
                            <p class="jobasklist">{{jobinfors.content}}</p>
                      </div>
                      <div class="JobList-bottom">
                            <el-button class="submitdata"  @click="submitgo" >申请职位</el-button>
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
                userName:'',
                jobinfors:'',
                resumelist:''
            };
        },
        created () {
            //查看招聘信息
            this.jobinfor()
            //查看简历接口
            this.myresume()
            this.userName = getCookie("name");
            let token = getCookie("token4");
            if (token=="") {
                this.$router.push('/')
            } else {
                
            }
        },
        methods: {
            //招聘信息接口
            jobinfor(){
                axios({
                    method:'post',
                    url:'http://114.115.147.52:7076/resumedelivery/getMyDelivery'+'?username='+getCookie("name"),

                }).then(response => {
                    // console.log(response.data.data[sessionStorage.getItem('jobid')-1]) 
                    this.jobinfors= response.data.data[sessionStorage.getItem('jobid')]
                    //将后台返回的时间格式2019-04-17T05:02:04.000+0000转为正常时间格式
                      var newTime = new Date(response.data.data[sessionStorage.getItem('jobid')].date)
                      response.data.data[sessionStorage.getItem('jobid')].date = newTime.getFullYear()+"-"+(newTime.getMonth()+1 < 10 ?"0"+(newTime.getMonth()+1) :newTime.getMonth()+1)+"-"+(newTime.getDate()<10?"0"+newTime.getDate():newTime.getDate())+" "+(newTime.getHours()<10?"0"+newTime.getHours():newTime.getHours())+":"+(newTime.getMinutes()<10?"0"+newTime.getMinutes():newTime.getMinutes())+":"+(newTime.getSeconds()<10?"0"+newTime.getSeconds():newTime.getSeconds());
                }).catch(err => {
                    console.log(err);
                })
            },
            //查看简历接口
            myresume(){
                axios({
                    method:'post',
                    url:'http://114.115.147.52:7076/resume/getResume'+'?username='+getCookie("name"),

                }).then(response => {
                    // console.log(response.data.data[0]) 
                    this.resumelist= response.data.data[0]
                    if(response.data.data==''||response.data.data==null){
                         this.$message({
                            showClose: true,
                            message: "你还没有完善简历，请先完善简历！",
                            type: "error"
                        });
                    }
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
            //申请职位
            submitgo(){
                if(this.resumelist==''||this.resumelist==null){
                        this.$message({
                        showClose: true,
                        message: "你还没有完善简历，请先完善简历！",
                        type: "error"
                    });
                }
                 axios({
                    method:'post',
                    url:'http://114.115.147.52:7076/resumedelivery/addResumeDelivery'+'?username='+getCookie("name")+'&companyId='+this.jobinfors.companyId+'&resumeId='+this.resumelist.id,

                }).then(response => {
                    console.log(response.data.data) 
                    if(response.data.code==100){
                        this.$message({
                            showClose: true,
                            message: "投递成功！",
                            type: "success"
                        });
                    }else{
                        this.$message({
                            showClose: true,
                            message: "投递失败，请先完善简历！",
                            type: "error"
                        });
                    }   
                }).catch(err => {
                    console.log(err);
                })
            }
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

    .Resume-content .JobList{
        width: 80%;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .JobList .JobList-top{
        width: 100%;
        height: 0.7rem;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .JobList .JobList-top .jobtitle{
        font-size: 0.24rem;
        color: #333;
        font-weight: 600;
    }

    .JobList .JobList-top .jobtime{
        font-size: 0.18rem;
        color: #999;
    }

    .JobList .JobList-con{
        width: 100%;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        flex-direction: column;
        margin-top: 0.4rem;
    }

    .JobList-con .jobcompang{
        font-size: 0.20rem;
        color: #333;
        margin-bottom: 0.2rem;
    }

    .JobList-con .jobmoney{
        font-size: 0.20rem;
        color: #333;
        margin-bottom: 0.2rem;
    }

    .JobList-con .jobask{
        font-size: 0.20rem;
        color: #333;
        margin-bottom: 0.2rem;
    }

    .JobList-con .jobasklist{
        font-size: 0.20rem;
        color: #333;
        margin-bottom: 0.4rem;
    }

    .JobList .JobList-bottom{
        width: 100%;
        margin-top: 0.4rem;
    }

    .JobList-bottom .submitdata{
        width: 1.4rem;
        height: 0.44rem;
        background-color: #324057;
        border-radius: 5px;
        font-size: 0.2rem;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0px;
    }


</style>