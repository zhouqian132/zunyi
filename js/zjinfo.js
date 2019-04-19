$(function() {
  $('.main-header').load('./header/header.html', function() {})
  var id = getUrlParam('id')

  $.ajax({
    url: href + 'gzjhbfzpt/YxyArtilZhuanke/' + id,
    type: 'get',
    success: function(res) {
      if (res.status === 200) {
        console.log(res)
        var html = '<div class="book-header">\n' +
          '<div class="listwrap listwrap-1">\n' +
          '<div class="list-left">\n' +
          '<img class="list-zjimg" src="http://111.231.195.149:8080/jhbpt/' + res.data.artShows + ' " onerror="javascript:this.src=\'./header/tupian.jpg\';" />\n' +
          '</div>\n' +
          '<div class="list-right">\n' +
          '<div class="name"><i class="iconfont icon-xingming"></i>' + res.data.artTitle + '</div>\n' +
          '<div class="belong"><i class="iconfont icon-yiliaohangyedeICON-"></i>' + (res.data.artAuthor != null ? res.data.artAuthor : "") + '</div>\n' +
          '<div class="summary eddot-p"><i class="iconfont icon-jianjiexinxi"></i>' + res.data.artExcerpt + '</div>\n' +
          '</div>\n' +
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
})
