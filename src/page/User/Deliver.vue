<template>
     <div class="Resume">
           <div class="Resume-top">
                <div class="Resume-top-con">
                      <div class="top-con-left" @click="goback">
                            <img src="../../images/back.png"/>
                            <p class="p1">简历投递</p>
                      </div>
                      <div class="top-con-right">
                            <p class="p1">您好！{{userName}}</p>
                            <p class="p2" @click="Signout">退出登录</p>
                      </div>
                </div>
           </div>
           <div class="Resume-content">
                <div class="LookNew">
                     <p class="textone">简历投递</p>
                     <div class="LookNew-list">
                           <div class="LookNew-listtext" v-for="(item,index) in newlist.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="item.id">
                                 <div class="listtext-top">
                                       <p class="top-title" @click="GOLook(index)">{{ item.title }}</p>
                                       <p class="top-comname">{{ item.companyName }}</p>
                                       <p class="top-time">{{ item.date }}</p>
                                 </div>
                           </div>
                     </div>
                     <div class="page">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[5, 10]"
                                :page-size="pagesize"        
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="newlist.length">
                            </el-pagination>
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
                currentPage:1, //初始页
                pagesize:10,//每页的数据
                newlist:[],
                userName:''
            };
        },
        created () {
            //简历投递
            this.deliverget()
            this.userName = getCookie("name");
            let token = getCookie("token4");
            if (token=="") {
                this.$router.push('/')
            } else {
                
            }
        },
        methods: {
            //接口
            deliverget(){
                axios({
                    method:'post',
                    url:'http://114.115.147.52:7076/resumedelivery/getUserResume'+'?username='+getCookie("name"),

                }).then(response => {
                    // console.log(response.data.data)  
                    this.newlist=response.data.data;
                    //将后台返回的时间格式2019-04-17T05:02:04.000+0000转为正常时间格式
                    var time = response.data.data;
                    for(let i = 0;i<time.length;i++){
                      var newTime = new Date(time[i].date)
                      time[i].date = newTime.getFullYear()+"-"+(newTime.getMonth()+1 < 10 ?"0"+(newTime.getMonth()+1) :newTime.getMonth()+1)+"-"+(newTime.getDate()<10?"0"+newTime.getDate():newTime.getDate())+" "+(newTime.getHours()<10?"0"+newTime.getHours():newTime.getHours())+":"+(newTime.getMinutes()<10?"0"+newTime.getMinutes():newTime.getMinutes())+":"+(newTime.getSeconds()<10?"0"+newTime.getSeconds():newTime.getSeconds());
                  }
                    // console.log(this.newlist)  
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
            // //查看文章
            // GOLook(i){
            //     //储存用户信息
            //     sessionStorage.setItem('deliverid', i)
            //     this.$router.push('/Joblist')
            // },
             // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
              this.pagesize = size;
              // console.log(this.pagesize)  //每页下拉显示数据
            },
            handleCurrentChange: function(currentPage){
              this.currentPage = currentPage;
              document.documentElement.scrollTop = 0;//点击翻页的时候回到顶部
              // console.log(this.currentPage)  //点击第几页
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

    .LookNew .textone{
        color: #324057;
        font-size: 0.3rem;
        margin-bottom: 0.36rem;
    }

    .LookNew .LookNew-list{
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .LookNew-list .LookNew-listtext{
        width: 100%;
        display: flex;
        flex-direction: column;
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
        cursor: pointer;
    }

    .LookNew-listtext .listtext-top{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        margin: 0.15rem auto;
    }

    .LookNew-listtext .listtext-top .top-title{
        font-size: 0.24rem;
        color: #333;
    }

    .LookNew-listtext .listtext-top .top-title:hover{
        color: #344b70;
    }

    .LookNew-listtext .listtext-top .top-comname{
        font-size: 0.20rem;
        color: #666;
        position: absolute;
        left: 5rem;  
    }

    .LookNew-listtext .listtext-top .top-time{
        font-size: 0.16rem;
        color: #999;
        position: absolute;
        right: 0;     
    }

    //分页 
    /deep/.el-pagination{
        margin-top: 0.3rem;
        // margin-bottom: 0.5rem;
        float: right;
        font-size: 0.2rem;
        color: #333333;
        font-weight: normal;
        .el-select .el-input{
            width: 1.26rem;
            height: 0.36rem;
        }
        .el-select .el-input .el-input__inner{
            height: 100%;
            font-size: 0.2rem;
            color: #333333;
        }
        .el-pagination__editor.el-input .el-input__inner{
            height: 0.36rem;
        }
        .btn-prev,.btn-next{
            height: 0.36rem;
        }
        .btn-prev{
            border-radius: 0.05rem 0 0 0.05rem;
        }
        .btn-next{
            border-radius: 0 0.05rem 0.05rem 0;
        }
        .el-pager li{
            line-height: 0.36rem;
            height: 0.36rem;
            font-size: 0.2rem;
        }
        .el-pagination__total{
            color: #333333;
        }
        button,span:not([class*=suffix]){
            height: 0.36rem;
            line-height: 0.36rem;
            font-size: 0.2rem;
            color: #333333;
        }
        .el-pagination__editor.el-input{
            font-size: 0.2rem;
        }
        .el-input--mini .el-input__icon {
            line-height: 0.36rem;
        }
        .el-pager li {
            margin: 0 4px;
        }
    }

</style>