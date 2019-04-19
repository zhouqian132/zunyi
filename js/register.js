$(function() {
  //判断是否寻在 0不存在 1存在
  var name = 0;
  var phone = 0;
  var mailbox = 0;
  var card = 0;

  var mailBox = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  var phoneBox = /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\d{8}$/

  //校验姓名
  $('input[name=user_name]').blur(function() {
    var name = $(this).val()
    var msg = '用户姓名已存在'
    if (name != '') {
      verify(name, 1, msg)
    }
  });

  //校验手机号
  $('input[name=user_mobile]').blur(function() {
    var phone = $(this).val()
    var msg = '手机号已存在'
    if (phone != '') {
      verify(phone, 2, msg)
    }
  });

  //校验邮箱
  $('input[name=user_mailbox]').blur(function() {
    var mailbox = $(this).val()
    var msg = '邮箱地址已存在'
    if (mailbox != '') {
      verify(mailbox, 3, msg)
    }
  });

  //校验身份证号码
  $('input[name=user_idcard]').blur(function() {
    var card = $(this).val()
    var msg = '身份证号码已存在'
    if (card != '') {
      verify(card, 4, msg)
    }
  });

  function verify(data, type, msg) {
    $.ajax({
      url: href + 'gzjhbfzpt/YxyUseron/check/' + data + '/' + type,
      type: 'get',
      success: function(res) {
        if (res.status === 200) {
          if (res.data == true) {
            layer.msg(msg)
            if (type === 1) {
              name = 1
            } else if (type === 2) {
              phone = 1
            } else if (type === 3) {
              mailbox = 1
            } else if (type === 4) {
              card = 1
            }
          } else if (res.data == false) {
            if (type === 1) {
              name = 0
            } else if (type === 2) {
              phone = 0
            } else if (type === 3) {
              mailbox = 0
            } else if (type === 4) {
              card = 0
            }
          }
        }
      }
    })
  };

  $('#btnLogin').click(function() {
    var user_name = $('input[name=user_name]').val()
    var user_mobile = $('input[name=user_mobile]').val()
    var old_pass = $('.old_pass').val()
    var new_pass = $('.new_pass').val()
    var age = $('input[name=user_age]').val()
    var nation = $('input[name=user_nation]').val()
    var fiche = $('input[name=user_idcard]').val()
    var email = $('input[name=user_mailbox]').val()
    if (user_name === '') {
      layer.msg("请输入姓名！")
    } else if (!user_mobile.match(phoneBox)) {
      layer.msg('请输入正确的手机号码')
    } else if (old_pass.length < 6) {
      layer.msg('请输入6位及以上密码')
    } else if (new_pass !== old_pass) {
      layer.msg('两次输入的密码不一样')
    } else if (age === '') {
      layer.msg('请输入年龄')
    } else if (nation === '') {
      layer.msg('请输入民族')
    } else if (IdCodeValid(fiche).pass == false) {
      layer.msg('请输入正确的身份证号码')
    } else if (!email.match(mailBox) && email != '') {
      layer.msg('请输入正确的邮箱地址')
    } else if (name == 1) {
      layer.msg('用户姓名已存在')
    } else if (phone == 1) {
      layer.msg("手机号已存在")
    } else if (mailbox == 1) {
      layer.msg("邮箱地址已存在")
    } else if (card == 1) {
      layer.msg("身份证号码已存在")
    } else {
      enroll()
    }
    // enroll()
  });

  function enroll() {
    var myform = new FormData()
    myform.append('userName', $('input[name=user_name]').val())
    myform.append('userMobile', $('input[name=user_mobile]').val())
    myform.append('userPass', $('input[name=user_pass]').val())
    myform.append('userAddr', $('select[name=user_addr]').val())
    myform.append('userSex', $('select[name=user_sex]').val())
    myform.append('userAge', $('input[name=user_age]').val())
    myform.append('userProfession', $('select[name=user_profession]').val())
    myform.append('userNation', $('input[name=user_nation]').val())
    myform.append('userIdcard', $('input[name=user_idcard]').val())
    myform.append('userStatus', $('select[name=user_status]').val())
    myform.append('userStatus', $('select[name=user_status]').val())
    myform.append('userHospital', $('input[name=user_hospital]').val())
    myform.append('userWechat', $('input[name=user_wechat]').val())
    myform.append('userMailbox', $('input[name=user_mailbox]').val())
    if ($('#file')[0].files[0] !== undefined) {
      myform.append('file', $('#file')[0].files[0])
    }
    $.ajax({
      url: href + 'gzjhbfzpt/YxyUseron/register',
      type: 'post',
      data: myform,
      cache: false,
      processData: false,
      contentType: false,
      success: function(res) {
        if (res.status === 200) {
          alert('注册成功')
          href = "register.html"
        }
      }
    })
  };

})
