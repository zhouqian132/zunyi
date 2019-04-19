$(function() {
  $('.main-header').load('./header/header.html', function() {})
  var userId;
  var imghref = 'http://192.168.0.168:10010/yxy/v1/gzjhbfzpt/upload/files/'
  var mailBox = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  var phoneBox = /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\d{8}$/
  //点击切换导航
  $('.two li').click(function() {
    var parentId = $(this).parent().parent().index()
    var index = $(this).index()
    var item = $('.content>div').eq(parentId)
    item.show().siblings().hide()
    item.children().eq(index).show().siblings().hide()
  });

  $('.one>li').click(function() {
    if ($(this).find(".two")[0] == undefined) {
      $('.content>div').eq($(this).index()).show().siblings().hide()
    }
  });

  //获取本地数据
  function userInfo() {
    $.ajax({
      url: href + 'gzjhbfzpt/YxyUseron/userInfo',
      type: 'get',
      xhrFields: {
        withCredentials: true
      },
      success: function(res) {
        if (res.status === 200) {
          userId = res.data.id
          user(userId)
        } else {
          alert("登录已过期，请重新登录")
          window.location.href = 'index.html'
        }
      }
    })
  };

  //获取用户信息
  function user(id) {
    $.ajax({
      url: href + '/gzjhbfzpt/YxyUseron/query/' + id,
      type: "get",
      xhrFields: {
        withCredentials: true
      },
      success: function(res) {
        console.log(res)
        if (res.status === 200) {
          $('.phone').val(res.data.userMobile)
          $('.email').val(res.data.userMailbox)
          $('.weixin').val(res.data.userWechat)
          $('.edsel').val(res.data.userSex)
          $('.image').html('<img src="' + imghref + res.data.userAvatar + '" onerror="javascript:this.src=\'./header/tupian.jpg\';">')
        }
      }
    })
  }

  //修改密码
  $('#btn-success').click(function() {
    var old_pass = $('.old_pass').val()
    var new_pass = $('.new_pass').val()
    var confirm_pass = $('.confirm_pass').val()
    if (old_pass === '') {
      layer.msg('请输入当前密码')
    } else if (new_pass.length < 6) {
      layer.msg('请输入6位及以上密码')
    } else if (new_pass !== confirm_pass) {
      layer.msg('两次输入的密码不一样')
    } else {
      pass(old_pass, confirm_pass)
    }
  });

  function pass(old_pass, confirm_pass) {
    $.ajax({
      url: href + 'gzjhbfzpt/YxyUseron/modify/' + userId,
      type: 'post',
      xhrFields: {
        withCredentials: true
      },
      data: {
        userPass: old_pass,
        newUserPass: confirm_pass
      },
      success: function(res) {
        if (res.status === 200) {
          $('.old_pass').val("")
          $('.new_pass').val("")
          $('.confirm_pass').val("")
          alert("修改成功,请重新登录")
          window.location.href = "index.html"
        }
      }
    })
  };

  //修改资料
  $('#btn-prosperity').click(function() {
    var phone = $('.phone').val()
    var email = $('.email').val()
    var weixin = $('.weixin').val()
    var edsel = $('.edsel').val()
    var file = $('#file')[0].files[0]
    var myform = new FormData()
    myform.append("userMobile", phone)
    myform.append("userMailbox", email)
    myform.append("userWechat", weixin)
    myform.append("userSex", edsel)
    if (file !== undefined) {
      myform.append("file", file)
      myform.append("id", userId)
    }
    if (!phone.match(phoneBox) && phone !== '') {
      layer.msg("请输入正确的手机号码")
    } else if (!email.match(mailBox) && email !== '') {
      layer.msg("请输入正确的邮箱地址")
    } else {
      $.ajax({
        url: href + 'gzjhbfzpt/YxyUseron/modify/' + userId,
        type: "post",
        xhrFields: {
          withCredentials: true
        },
        data: myform,
        cache: false,
        processData: false,
        contentType: false,
        success: function(res) {
          if (res.status === 200) {
            layer.msg('修改成功')
          }
        }
      })
    }
  });

  $('#file').change(function(e) {
    $('#btn-prosperity').click()
    var files = this.files;
    var $file = files[0]
    $.each(files, function(key, value) {
      var fr = new FileReader();
      fr.onload = function() {
        var html = '<img src=' + this.result + '>'
        $('.image').html(html)
      }
      fr.readAsDataURL(value);
    })
  });

  //退出登录
  $('.uploadImg, .operation').mouseenter(function() {
    $('.operation').show()
  });
  $('.uploadImg, .operation').mouseleave(function() {
    $('.operation').hide()
  });

  $('.exit a').click(function() {
    $.ajax({
      url: href + 'gzjhbfzpt/YxyUseron/loginOut',
      type: 'get',
      xhrFields: {
        withCredentials: true
      },
      success: function(res) {
        if (res.status === 200) {
          window.location.href = 'index.html'
        }
      }
    })
  });



  new Page({
    id: 'pagination',
    pageTotal: 10, //必填,总页数
    pageAmount: 8, //每页多少条
    dataTotal: 10, //总共多少条数据
    curPage: 1, //初始页码,不填默认为1
    pageSize: 5, //分页个数,不填默认为5
    showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
    showSkipInputFlag: true, //是否支持跳转,不填默认不显示
    getPage: function(page) {
      //获取当前页数
      // specialist(page)
    }
  })

  function init() {
    userInfo()
  }
  init()
})
