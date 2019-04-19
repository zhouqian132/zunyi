$(function() {
  $('.main-header').load('./header/header.html', function() {})
  var phoneBox = /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\d{8}$/
  //登录
  $('.loginBtn').click(function() {
    var account = $('.login-user').val()
    var password = $('.login-pass').val()
    if (account === '' || password === '') {
      hint("请输入用户账号和密码")
    } else {
      namelogin()
    }
  });

  //登录
  function namelogin() {
    $.ajax({
      url: href + 'gzjhbfzpt/YxyUseron/login',
      type: 'post',
      xhrFields: {
        withCredentials: true
      },
      data: {
        username: $('.login-user').val(),
        password: $('.login-pass').val()
      },
      success: function(res) {
        if (res.status === 200) {
          window.location.href = "my.html"
        } else {
          hint('账号或密码错误')
        }
      },
      error: function(xhr) {
        hint('账号或密码错误')
      }
    })
  }

  $('.skip').click(function() {
    $.ajax({
      url: href + 'gzjhbfzpt/YxyUseron/userInfo',
      type: 'get',
      xhrFields: {
        withCredentials: true
      },
      success: function(res) {
        if (res.status === 200) {
          window.location.href = "my.html"
        } else {
          hint("请先登录")
        }
      }
    })
  })

  //获取信息公告
  function message() {
    $.ajax({
      url: href + 'gzjhbfzpt/YxyArtilMesg',
      type: 'get',
      success: function(res) {
        if (res.status === 200) {
          var html = '';
          var one = '';
          if (res.data.items != '') {
            var c = res.data.items[0]
            one = '<a href="colinfo.html?col=a&amp;id=' + c.id + '">' + c.artTitle + '</a>\n' +
              '<div style="overflow-wrap: break-word;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + c.artExcerpt + '<a class="more" href="colinfo.html?col=a&amp;id=' + c.id + '">[详情]</a>\n' +
              '</div>'
            $.each(res.data.items, function(i, v) {
              if (i != 0) {
                html += '<li><a class="index-main-a is-truncated" href="colinfo.html?col=a&amp;id=' + v.id + '" style="overflow-wrap: break-word;">' + v.artTitle + '</a> <span class="index-main-span">' + datef(v.createDate) + '</span></li>'
              }
            })
          }
          $('#home-lgnew').html(one)
          $('#mesgList').html(html)
        }
      }
    })
  };

  //获取专科简介
  function specialty() {
    $.ajax({
      url: href + 'gzjhbfzpt/YxyArtilZk',
      type: 'get',
      success: function(res) {
        if (res.status === 200) {
          if (res.data.items != '') {
            var html = '';
            res.data.items.forEach(function(v) {
              html += '<li><a class="index-main-a" href="zkinfo.html?id=' + v.id + '" style="overflow-wrap: break-word;">' + v.artTitle + '</a> <span class="index-main-span">' + datef(v.createDate) + '</span></li>'
            })
            $('#shareList').html(html)
          }
        }
      }
    })
  };

  //线上培训
  function onLine() {
    $.ajax({
      url: href + 'gzjhbfzpt/YxyArtilMesg',
      type: 'get',
      data: {
        artNavbname: 5
      },
      success: function(res) {
        if (res.status === 200) {
          if (res.data.items != '') {
            var html = '';
            res.data.items.forEach(function(v) {
              html += '<li><a class="index-main-a" href="zkinfo.html?id=' + v.id + '" style="overflow-wrap: break-word;">' + v.artTitle + '</a> <span class="index-main-span">' + datef(v.createDate) + '</span></li>'
            })
            $('#trainList').html(html)
          }
        }
      }
    })
  }
  //微信栏目
  function wechat() {
    $.ajax({
      url: href + 'gzjhbfzpt/YxyArtilWechat',
      type: 'get',
      success: function(res) {
        if (res.status === 200) {
          if (res.data.items != '') {
            var html = '';
            res.data.items.forEach(function(v) {
              html += '<li><a class="index-main-a" href="colinfo.html?col=b&amp;id=' + v.id + '" style="overflow-wrap: break-word;">' + v.artTitle + '</a> <span class="index-main-span">' + datef(v.createDate) + '</span></li>'
            })
            $('#wechatList').html(html)
          }
        }
      }
    })
  };

  //学术讲座
  function science() {
    $.ajax({
      url: href + 'gzjhbfzpt/YxyArtilXueshu',
      type: 'get',
      success: function(res) {
        if (res.status === 200) {
          if (res.data.items != '') {
            var html = '';
            res.data.items.forEach(function(v) {
              html += '<li><a class="index-main-a" href="colinfo.html?col=c&amp;id=' + v.id + '" style="overflow-wrap: break-word;">' + v.artTitle + '</a> <span class="index-main-span">' + datef(v.createDate) + '</span></li>'
            })
            $('#artilList').html(html)
          }
        }
      }
    })
  };

  //获取专家简介
  function specialist() {
    $.ajax({
      url: href + 'gzjhbfzpt/YxyArtilZhuanke',
      type: 'get',
      data: {
        rows: 30
      },
      success: function(res) {
        if (res.status === 200) {
          if (res.data.items != '') {
            var html = '';
            res.data.items.forEach(function(v) {
              html += '<li style="float: left; width: 120px;">\n' +
                '<div class="pic"><a href="zjinfo.html?id=' + v.id + '" target="_blank"><img src="http://111.231.195.149:8080/jhbpt/' + v.artShows + '" alt=""></a></div>\n' +
                '<div class="title"><a href="zjinfo.html?id=' + v.id + '" target="_blank">' + v.artTitle + '</a></div>\n' +
                '</li>'
            })
            $('#zj-list').html(html)
            if ($('#zj-list li').length > 8) {
              movedome($('#zj-list'))
            }
          }
        }
      }
    })
  };

  //获取视频播报
  function video() {
    $.ajax({
      url: href + 'gzjhbfzpt/YxyArtilVideo',
      type: 'get',
      data: {
        rows: 30
      },
      success: function(res) {
        if (res.status === 200) {
          if (res.data.items != '') {
            var html = '';
            res.data.items.forEach(function(v) {
              html += '<li style="float: left; width: 120px;">\n' +
                '<div class="pic"><a href="videoinfo.html?id=' + v.id + '"><img src="http://111.231.195.149:8080/jhbpt/' + v.artShows + '" alt=""></a></div>\n' +
                '<div class="title"><a href="videoinfo.html?id=' + v.id + '">' + v.artTitle + '</a></div>\n' +
                '</li>'
            })
            $('#video-list').html(html)
            if ($('#video-list li').length > 8) {
              movedome($('#video-list'))
            }
          }
        }
      }
    })
  };

  //信息公告轮播
  $('.slideBox .hd ul li').mouseenter(function() {
    var index = $(this).index()
    $('.slideBox .bd ul li').eq(index).fadeIn().siblings().hide()
    $(this).addClass("on").siblings().removeClass('on')
  });

  $('.next').click(function() {
    var length = $('.slideBox .bd ul li').length
    var a = $('.slideBox .hd ul .on').index()
    if (a === length - 1) {
      a = -1
    }
    $('.slideBox .bd ul li').eq(a + 1).fadeIn().siblings().hide()
    $('.slideBox .hd ul li').eq(a + 1).addClass("on").siblings().removeClass('on')
  });

  $('.prev').click(function() {
    var length = $('.slideBox .bd ul li').length
    var a = $('.slideBox .hd ul .on').index()
    $('.slideBox .bd ul li').eq(a - 1).fadeIn().siblings().hide()
    $('.slideBox .hd ul li').eq(a - 1).addClass("on").siblings().removeClass('on')
    if (a === 0) {
      a = length - 1
    }
  });

  //图片左移动
  function movedome($ul) {
    var stop = false;
    var width = $ul.children('li').outerWidth(true)
    setInterval(function() {
      if (stop == true) {
        return;
      }
      var one = $ul[0]
      one.style.marginLeft = parseInt(getComputedStyle(one).marginLeft) - 1 + 'px'
      if (parseInt(getComputedStyle(one).marginLeft) + width <= 0) {
        var $li = $ul.children("li").first();
        $li.appendTo($ul);
        one.style.marginLeft = "0px";
      }
    }, 50);

    $ul.hover(function() {
      $(this).css("cursor", "pointer");
      stop = true; //停止动画
    }, function() {
      stop = false; //开始动画
    });
  };

  //忘记密码
  $('.btn-primary').click(function() {
    var username = $('.user_name').val();
    var idCard = $('.card').val();
    var newPass = $('.new_pass').val()
    var password = $('.confirm_pass').val()
    if (username === '') {
      layer.msg("用户名不能为空")
    } else if (idCard === '') {
      layer.msg("身份证号码不能为空")
    } else if (newPass === '') {
      layer.msg("请输入密码")
    } else if (newPass !== password) {
      layer.msg("两次密码不一致")
    } else {
      $.ajax({
        url: href + 'gzjhbfzpt/YxyUseron/forgot/modify',
        type: "put",
        data: {
          username: username,
          idCard: idCard,
          password: password
        },
        success: function(res) {
          if (res.status === 200) {
            layer.msg("修改成功")
          }
        }
      })
    }



  })

  //提示框
  function hint(msg) {
    layer.msg(msg, {
      icon: 2,
      shade: 0.3,
      shadeClose: true,
      time: 2000,
      shift: 1
    });
  };

  function init() {
    message()
    specialty()
    wechat()
    science()
    onLine()
    specialist()
    video()

  }
  init()

})
