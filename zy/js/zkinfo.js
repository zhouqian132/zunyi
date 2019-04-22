$(function() {
  $('.main-header').load('./header/header.html', function() {})
  var id = getUrlParam('id')

  $.ajax({
    url: href + 'gzjhbfzpt/YxyArtilZk/' + id,
    type: 'get',
    success: function(res) {
      if (res.status === 200) {
        console.log(res)
        var html = '<div class="book-header">\n' +
          '<div class="listwrap listwrap-1">\n' +
          '<div class="list-left">\n' +
          '<img class="list-zjimg" src="http://111.231.195.149:8080/jhbpt/'+res.data.artShows+'">\n' +
          '</div>\n' +
          '<div class="margin-bottom-10"></div>\n' +
          '<div class="list-right">\n' +
          '<div class="name">'+res.data.artTitle+'</div>\n' +
          '<div class="summary eddot-p">'+res.data.artExcerpt+'</div>\n' +
          '</div>\n' +
          '<div class="margin-bottom-20"></div>\n' +
          '</div>\n' +
          '</div>\n' +
          '<div class="book-main">\n' +
          '<h1>详细介绍</h1>\n' +
          '<div class="content">'+res.data.artConcter+'</div>\n' +
          '</div>'
        $('.book').html(html)
        $('.last').html(res.data.artTitle)
      }
    }
  })
})
