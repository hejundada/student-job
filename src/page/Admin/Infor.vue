<template>
  <div class="student-box" v-bind:style="{height:myHeight}">
    <div class="box-infor">
      <div class="header-text">信息类别列表</div>
      <div class="issue">
        <el-button class="allsubbtn" @click="new_infor">新增类别</el-button>
        <div></div>
      </div>
      <div class="table-box">
        <table id="tableSort" style="table-layout:fixed;">
          <thead class="table-header">
            <tr>
              <th class="left-radius">序号</th>
              <th>类别</th>
            </tr>
          </thead>
          <tbody class="table-lists">
            <tr
              class="first-tr"
              v-for="(item,index) in employer.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              :key="item.id"
            >
              <td class="sequence">{{index+1>9?index+1:"0"+(index+1)}}</td>
              <td class="sequence">{{item.name}}</td>
            </tr>
          </tbody>
        </table>
        <div class="page">
          <div></div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="employer.length"
          ></el-pagination>
        </div>
      </div>

      <!--弹框 -->
      <div class="establish-sub-popup" v-show="amend_show">
        <div class="sub-popup-con">
          <div class="con-text">
            <p class="p1">新增类别</p>
          </div>
          <div class="amend-infor2">
            <div class="amend-infor-list">
              <label>类别</label>
              <el-input class="el-input2" v-model="name" placeholder="请输入类别"></el-input>
            </div>
          </div>
          <div class="subpopup-twobtn">
            <el-button class="allsubbtn" @click="confirm">提交</el-button>
          </div>
          <div class="delete" @click="close">X</div>
        </div>
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
      myHeight: window.innerHeight - 100 + "px",
      //修改弹窗
      amend_show: false,
      name: '',
      currentPage: 1, //初始页
      pagesize: 10, //每页显示的数据
      employer: []
    };
  },
  created(){
    this.Infors();
  },
  methods: {
    //所有信息类别
    Infors(){
      axios({
          method:'post',
          url:'http://114.115.147.52:7076/employType/allEmployType',
          header:{
            "Content-Type": "application/json;charset=UTF-8"
          }
      }).then(response =>{
          console.log(response.data.data)
          this.employer = response.data.data;
      }).catch(err =>{
        console.log(err)
      })
    },
    //提交
    confirm() {
      if(this.name == ''){
         this.$message({
          showClose: true,
          message: "请您填写类别",
          type: "warning"
        });
      }else{
        axios({
          method:'post',
          url:'http://114.115.147.52:7076/employType/addEmployType'+"?name="+this.name,
          header:{
            "Content-Type": "application/json;charset=UTF-8"
          }
      }).then(response =>{
        this.$message({
          showClose: true,
          message: "新增成功",
          type: "success"
        });
         this.amend_show = false;
        this.name = '';
        this.Infors();
      }).catch(err =>{
        console.log(err)
      })
      }
    },
    //关闭弹窗
    close() {
      this.amend_show = false;
      this.name = '';
    },
    new_infor(){
      this.amend_show = true;
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      document.documentElement.scrollTop = 0; //点击翻页的时候回到顶部
    }
  }
};
</script>
<style lang="scss" scoped>
.student-box {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}
.box-infor {
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.3rem auto;
}
table {
  border-collapse: collapse;
  width: 100%;
  cursor: default;
}
table .table-header {
  background-color: #B0C4DE;
}
.table-header th {
  color: #fff;
  font-size: 0.2rem;
}
tr {
  height: 0.6rem;
  border-bottom: 1px solid #f2f2f2;
}
.sequence {
  text-align: center;
}
.table-lists {
  background-color: #fff;
}
.table-lists td {
  color: #253646;
  font-size: 0.2rem;
}
.table-lists .money {
  color: #ff0000;
}
.table-btn {
  width: 100%;
  background-color: #fff;
  border-radius: 0 0 0.05rem 0.05rem;
}
.btn-list {
  display: flex;
  justify-content: space-between;
  padding: 0.18rem 0 0.18rem 0;
}
.btn-box {
  width: 95%;
  margin: auto;
  display: flex;
}
.table-btn .btn-list1 {
  width: 67%;
}
.btn-list .all-btn {
  width: 1.4rem;
  height: 0.44rem;
  color: #fff;
  font-size: 0.18rem;
  background-color: #00abf7;
  border-radius: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.btn2 {
  margin-left: 0.44rem;
}
.btn-list .all-btn a {
  border-bottom: 0.01rem solid #fff;
}
table tr:first-child .left-radius {
  border-top-left-radius: 0.05rem;
}
table tr:first-child th:first-child {
  width: 1.23rem;
}
table tr:first-child .right-radius {
  border-top-right-radius: 0.05rem;
}
table tr:last-child td:first-child {
  border-bottom-left-radius: 0.05rem;
}
table tr:last-child td:last-child {
  border-bottom-right-radius: 0.05rem;
}
.header-text {
  font-size: 0.26rem;
  width: 100%;
  height: 0.5rem;
  background-color: #B0C4DE;
  border-radius: 5px;
  text-align: center;
  line-height: 0.5rem;
  color: #fff;
}
.delete-order {
  color: #ff0000;
  border-bottom: 1px solid #ff0000;
}
.amend-infor {
  color: #4876ff;
  margin-right: 0.2rem;
  border-bottom: 1px solid #4876ff;
}
// 修改弹窗弹窗
.establish-sub-popup {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(51, 51, 51, 0.3);
}
.establish-sub-popup .sub-popup-con {
  width: 6rem;
  background: rgb(255, 255, 255);
  border-radius: 0.05rem;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -2.5rem;
  margin-top: -2.12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.con-text {
  width: 100%;
  background-color: #B0C4DE;
  border-radius: 0.05rem 0.05rem 0rem 0rem;
  height: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.establish-sub-popup .sub-popup-con .p1 {
  color: #fff;
  font-size: 0.22rem;
}

.establish-sub-popup .sub-popup-con .subpopup-twobtn {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.4rem 0 0.4rem 0;
}
.establish-sub-popup .sub-popup-con .allsubbtn {
  width: 1.4rem;
  height: 0.44rem;
  background-color: #3dbc6b;
  border-radius: 0.05rem;
  font-size: 0.2rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.12rem 0.2rem;
}
.amend-infor2 {
  width: 80%;
  margin-top: 0.4rem;
}
.amend-infor-list {
  height: 0.5rem;
  margin-bottom: 0.1rem;
  display: flex;
  align-items: center;
}
.amend-infor-list label {
  font-size: 0.2rem;
  white-space: nowrap;
  color: #666;
  width: 20%;
  margin:0 0.2rem 0 0.2rem;
}
.delete {
  font-size: 0.2rem;
  position: absolute;
  right: 0.15rem;
  color: #fff;
  top: 0.15rem;
  width: 0.25rem;
  height: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #b0c4de;
  border-radius: 50%;
}
.delete:hover {
  border-color: #fff;
  cursor: pointer;
}
.page {
  width: 100%;
  height: 0.6rem;
  display: flex;
  justify-content: space-between;
  margin-top: 0.3rem;
}
.el-pagination {
  margin-right: 0.25rem;
  height: 100%;
}
.el-input2{
width: 50%;
}
.issue {
  width: 100%;
  margin: 0.1rem auto;
  height: 0.4rem;
  display: flex;
  justify-content: space-between;
}
.issue .el-button {
  background-color: #67c23a;
  color: #fff;
  padding: 0.12rem 0.2rem;
}
/deep/ 
  .el-select {
    width: 50%;
}
</style>

