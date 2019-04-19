$(function() {
  $('.main-header').load('./header/header.html', function() {})

  var mailBox = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  var phoneBox = /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\d{8}$/

  var id = getUrlParam('type')
  $('.edsel').val(id)

  $('.edsel').change(function() {
    id = $(this).val()
  });

  //互动渠道
  function interaction() {
    var myform = new FormData()
    myform.append('type', id)
    myform.append('name', $('input[name=name]').val())
    myform.append('phone', $('input[name=phone]').val())
    myform.append('email', $('input[name=email]').val())
    myform.append('address', $('input[name=address]').val())
    myform.append('theme', $('input[name=theme]').val())
    myform.append('content', $('textarea[name=content]').val())
    $.ajax({
      url: href + 'gzjhbfzpt/YxyInterChannel/api',
      type: 'post',
      data: myform,
      cache: false,
      processData: false,
      contentType: false,
      success: function(res) {
        if(res.status === 200) {
          hint('留言成功，我们将尽快对您的意见做出处理')
          $('input, textarea').val('')
        }
      }
    })
  };

  //提交信息
  $('.feedFormBtn').click(function() {
    var phone = $('input[name=phone]').val()
    var email = $('input[name=email]').val()
    var theme = $('input[name=theme]').val()
    var content = $('textarea[name=content]').val()
    var name1 = $('input[name=name]').val()
    if(name1 === '') {
      hint('姓名不能为空')
      return false
    }else if(phone === '') {
      hint("电话号码不能为空")
      return false
    }else if (!phone.match(phoneBox)) {
      hint("请输入正确的手机号码")
      return false
    }else if(!email.match(mailBox) && email !== '') {
      hint("请输入正确的邮件地址")
      return false
    }else if(theme === '') {
      hint("标题不能为空")
      return false
    }else if(content === '') {
      hint("反馈内容不能为空")
      return false
    }
    interaction()
  });

  function hint(msg) {
    layer.msg(msg, {
      time: 2000,
    });
  };

})
