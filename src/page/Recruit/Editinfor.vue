<template>
     <div class="Resume">
           <div class="Resume-top">
                <div class="Resume-top-con">
                      <div class="top-con-left" @click="goback">
                            <img src="../../images/back.png"/>
                            <p class="p1">修改招聘信息</p>
                      </div>
                      <div class="top-con-right">
                            <p class="p1">您好！{{releaseName}}</p>
                            <p class="p2" @click="Signout">退出登录</p>
                      </div>
                </div>
           </div>
           <div class="Resume-content">
                <div class="Resume-content-form">
                       <p class="p1">修改招聘信息</p>
                       <div class="form-text">
                            <label>职位名称:</label>
                            <input type="text" v-model="jobinfors.title" />
                       </div>
                       <div class="form-text">
                            <label>企业名称:</label>
                            <input type="text" v-model="jobinfors.companyName" />
                       </div>
                       <div class="form-text">
                            <label>薪资:</label>
                            <input type="text" v-model="jobinfors.salary" />
                       </div>
                       <div class="form-text">
                            <label>招聘类型:</label>
                            <input type="text" value="兼职" disabled />
                       </div>
                       <div class="form-text">
                            <label>职位要求:</label>
                            <textarea type="text" v-model="jobinfors.content"></textarea>
                       </div>
                       <el-button class="submitdata"  @click="begindata" >发布</el-button>
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
                releaseName:'',
                jobinfors:'',
            };
        },
        created () {
            //查看招聘信息
            this.jobinfor()

            this.releaseName = getCookie("name")
            let token = getCookie("token3");
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
                    url:'http://114.115.147.52:7076/employ/allEmploy',

                }).then(response => {
                    // console.log(response.data.data)
                    // console.log(response.data.data[sessionStorage.getItem('deliverid')-1]) 
                    this.jobinfors= response.data.data[sessionStorage.getItem('deliverid')-1]
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
                setCookie("token3", "", -1);
                this.$router.push('/')
            },
            //提交
            begindata(){
                axios({
                    method:'post',
                    url:'http://114.115.147.52:7076/employ/updateEmploy'+'?id='+sessionStorage.getItem('deliverid')+'&title='+this.jobinfors.title+'&companyName='+this.jobinfors.companyName+'&salary='+this.jobinfors.salary+'&content='+this.jobinfors.content,

                }).then(response => {
                    // console.log(response.data.data)
                    if(response.data.code==100){
                        this.$message({
                            showClose: true,
                            message: "修改成功",
                            type: "success"
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
        height: 2rem;
        margin: auto;
        margin-top: 0.8rem;
    }

    .Resume .Resume-content .Resume-content-form{
        width: 50%;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .Resume-content-form .p1{
        color: #324057;
        font-size: 0.3rem;
        margin-bottom: 0.36rem;
    }

    .Resume-content-form .form-text{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 0.2rem;
    }
    .Resume-content-form .form-text label{
        width: 1.76rem;
        font-size: 0.22rem;
        color: #3a6186;
    }
    .Resume-content-form .form-text input{
        width: 3.4rem;
        height: 0.4rem;
        line-height: 0.4rem;
        border: 1px solid #dcdcdc;
        border-radius: 5px;
        font-size: 0.18rem;
        color: #3a6186;
        padding: 0px 0.2rem;
        background-color: #fff;
    }

    .Resume-content-form .form-text textarea{
        width: 3.4rem;
        height: 2.5rem;
        line-height: 0.3rem;
        border: 1px solid #dcdcdc;
        border-radius: 5px;
        font-size: 0.18rem;
        color: #3a6186;
        padding: 0px 0.2rem;
    }

    .Resume-content-form .submitdata{
        width: 1.4rem;
        height: 0.44rem;
        background-color: #324057;
        border-radius: 5px;
        font-size: 0.2rem;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.2rem;
        padding: 0px;
    }

</style>