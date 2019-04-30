/**
 * Created by Schon on 2018/9/13 0013.
 */
//设置cookie
export function setCookie(key,value) {
    var Days = 0.6;
    var exdate = new Date(); //获取时间
    exdate.setTime(exdate.getTime() + Days*24*60*60*1000); //保存的天数
    //字符串拼接cookie
    window.document.cookie = key + "=" + value + ";path=/;expires=" + exdate.toGMTString();
  };
  //读取cookie
  export function getCookie(param) {
    var c_param = '';
    if (document.cookie.length > 0) {
      var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('='); //再次切割
        //判断查找相对应的值
        if (arr2[0] == param) {
          c_param = arr2[1];
          //保存到保存数据的地方
        }
      }
      return c_param;
    }
  };
  
  function padLeftZero (str) {
    return ('00' + str).substr(str.length);
  };