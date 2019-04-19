$(function() {
  $('.main-header').load('./header/header.html', function() {})
  var id = getUrlParam('id')
  var col = getUrlParam('col')
  var site = ''
  if (col == 'a') {
    site = 'gzjhbfzpt/YxyArtilMesg/'
    collist()
  } else if (col == 'b') {
    site = 'gzjhbfzpt/YxyArtilWechat/'
    weChat()
  } else if (col == 'c') {
    site = 'gzjhbfzpt/YxyArtilXueshu/'
    $('.column-list').html("")
    $('.two').html('学术讲座')
    $('.two').attr('href', 'chair.html')
  }

  $.ajax({
    url: href + site + id,
    type: 'get',
    success: function(res) {
      if (res.status === 200) {
        console.log(res)
        var artExcerpt = res.data.artExcerpt != undefined ? res.data.artExcerpt : ''
        var html = '<div class="book-header">\n' +
          '<div class="listwrap listwrap-1">\n' +
          '<div class="list-left">\n' +
          '<img class="list-zjimg" src="http://111.231.195.149:8080/jhbpt/' + res.data.artShows + '">\n' +
          '</div>\n' +
          '<div class="margin-bottom-10"></div>\n' +
          '<div class="list-right">\n' +
          '<div class="name">' + res.data.artTitle + '</div>\n' +
          '<div class="summary eddot-p">' + artExcerpt + '</div>\n' +
          '</div>\n' +
          '<div class="margin-bottom-20"></div>\n' +
          '</div>\n' +
          '</div>\n' +
          '<div class="book-main">\n' +
          '<h1>详细介绍</h1>\n' +
          '<div class="content">' + res.data.artConcter + '</div>\n' +
          '</div>'
        $('.book').html(html)
        $('.last').html(res.data.artTitle)
      }
    }
  })

  function collist() {
    html = '<li>\n' +
      '         <a href="collist.html?col=1" title="" target="_self">新闻动态<span class="pull-right"><i class="iconfont icon-jiantou" aria-hidden="true"></i></span></a>\n' +
      '       </li>\n' +
      '       <li>\n' +
      '         <a href="collist.html?col=4" title="" target="_self">行业咨询<span class="pull-right"><i class="iconfont icon-jiantou" aria-hidden="true"></i></span></a>\n' +
      '       </li>\n' +
      '       <li>\n' +
      '         <a href="collist.html?col=2" title="" target="_self">重要公告<span class="pull-right"><i class="iconfont icon-jiantou" aria-hidden="true"></i></span></a>\n' +
      '       </li>\n' +
      '       <li>\n' +
      '         <a href="collist.html?col=3" title="" target="_self">学术会议<span class="pull-right"><i class="iconfont icon-jiantou" aria-hidden="true"></i></span></a>\n' +
      '       </li>\n' +
      '       <li>\n' +
      '         <a href="collist.html?col=5" title="" target="_self">线上培训<span class="pull-right"><i class="iconfont icon-jiantou" aria-hidden="true"></i></span></a>\n' +
      '       </li>'
    $('.column-ul').html(html)
    $('.two').html('信息公告')
    $('.two').attr('href', 'collist.html')
  }

  function weChat() {
    html = '<li>\n' +
      '         <a href="WeChat.html?col=1" title="" target="_self">经典案例<span class="pull-right"><i class="iconfont icon-jiantou" aria-hidden="true"></i></span></a>\n' +
      '       </li>\n' +
      '       <li>\n' +
      '         <a href="WeChat.html?col=2" title="" target="_self">经典课件<span class="pull-right"><i class="iconfont icon-jiantou" aria-hidden="true"></i></span></a>\n' +
      '       </li>\n' +
      '       <li>\n' +
      '         <a href="WeChat.html?col=3" title="" target="_self">专家视角<span class="pull-right"><i class="iconfont icon-jiantou" aria-hidden="true"></i></span></a>\n' +
      '       </li>'
    $('.column-ul').html(html)
    $('.two').html('微信栏目')
    $('.two').attr('href', 'WeChat.html')
  }



})
