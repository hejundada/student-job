<template>
     <div class="Resume">
           <div class="Resume-top">
                <div class="Resume-top-con">
                      <div class="top-con-left" @click="goback">
                            <img src="../../images/back.png"/>
                            <p class="p1">完善简历</p>
                      </div>
                      <div class="top-con-right">
                            <p class="p1">您好！{{userName}}</p>
                            <p class="p2" @click="Signout">退出登录</p>
                      </div>
                </div>
           </div>
           <div class="Resume-content">
                <div class="Resume-content-form">
                       <p class="p1">完善简历</p>
                       <div class="form-text">
                            <label>姓名:</label>
                            <input type="text" v-model="modifydata.name" />
                       </div>
                       <div class="form-text">
                            <label>性别:</label>
                            <div class="left-choicesex">
                                <el-radio v-model="modifydata.sex" label="1">男</el-radio>
                                <el-radio v-model="modifydata.sex" label="0">女</el-radio>
                            </div>
                       </div>
                       <div class="form-text">
                            <label>年龄:</label>
                            <input type="text" v-model="modifydata.age" />
                       </div>
                       <div class="form-text">
                            <label>家庭住址:</label>
                            <input type="text" v-model="modifydata.address" />
                       </div>
                       <div class="form-text">
                            <label>兴趣:</label>
                            <input type="text" v-model="modifydata.interest" />
                       </div>
                       <div class="form-text">
                            <label>毕业学校:</label>
                            <input type="text" v-model="modifydata.school" />
                       </div>
                       <div class="form-text">
                            <label>个人简介:</label>
                            <textarea type="text" v-model="modifydata.brief"></textarea>
                       </div>
                       <el-button class="submitdata"  @click="begindata" >提交</el-button>
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
                modifydata: {
                    name: '',
                    sex:'0',
                    age:'',
                    address:'',
                    interest:'',
                    school:'',
                    brief:'',
                },
                resumelist:''
            };
        },
       created () {
            this.userName = getCookie("name");
            let token = getCookie("token4");
            if (token=="") {
                this.$router.push('/')
            } else {
                
            }
        },
        methods: {
            //返回
            goback(){
                this.$router.go(-1);
            },
            //退出
            Signout(){
                setCookie("token4", "", -1);
                this.$router.push('/')
            },
            //提交
            begindata(){
                 axios({
                    method:'post',
                    url:'http://114.115.147.52:7076/resume/addResumes'+'?username='+getCookie("name")+'&title='+'dddddd'+'&nickName='+this.modifydata.name+'&sex='+this.modifydata.sex+'&age='+this.modifydata.age+'&address='+this.modifydata.address+'&love='+this.modifydata.interest+'&school='+this.modifydata.school+'&content='+this.modifydata.brief,

                }).then(response => {
                    if(response.data.code==100){
                        this.$message({
                            showClose: true,
                            message: "完善成功！",
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
        font-size: 0.22rem;
        color: #3a6186;
        padding: 0px 0.2rem;
    }

    .Resume-content-form .form-text .left-choicesex{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 0px;
    }
    .left-choicesex .el-radio{
        color: #3a6186;
        font-size: 0.22rem;
    }
    .left-choicesex /deep/ .el-radio__inner{
        border: 1px solid #bbbbbb;
        width: 0.2rem;
        height: 0.2rem;
        background-color: #fff !important;
    }
    .left-choicesex /deep/ .el-radio__inner::after{
        width: 0.1rem;
        height: 0.1rem;
        background-color: #3a6186;
    } 
    .left-choicesex /deep/ .el-radio__label{
        font-size: 0.22rem;
        padding-left: 0.1rem;
    }
    .left-choicesex /deep/ .el-radio__input.is-checked+.el-radio__label{
         color: #3a6186;
    }

    .Resume-content-form .form-text textarea{
        width: 3.4rem;
        height: 1.4rem;
        line-height: 0.3rem;
        border: 1px solid #dcdcdc;
        border-radius: 5px;
        font-size: 0.22rem;
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