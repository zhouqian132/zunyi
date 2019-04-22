$(function() {
  $('.main-header').load('./header/header.html', function() {})
  var length = 4;

  //专科简介
  function specialist(page) {
    $.ajax({
      url: href + 'gzjhbfzpt/YxyArtilZk',
      type: 'get',
      data: {
        rows: length,
        page: page
      },
      success: function(res) {
        if (res.status === 200) {
          if (res.data.items != '') {
            var html = '';
            res.data.items.forEach(function(v) {
              // console.log(v)
              html += '<li class="li">\n' +
                '<div class="content"> <a class="link" href="zkinfo.html?id='+v.id+'">	<span class="onefa"><i class="iconfont icon-fangdajing"></i></span>	<img src="http://111.231.195.149:8080/jhbpt/'+v.artShows+'" alt="">		</a><a class="href" href="zkinfo.html?id='+v.id+'">'+v.artTitle+'</a>\n' +
                '<p class="eddot">'+v.artExcerpt+'</p>\n' +
                '</div>\n' +
                '</li>'
            })
            $('#collist').html(html)
            new Page({
              id: 'pagination',
              pageTotal: res.data.totalPage, //必填,总页数
              pageAmount: length, //每页多少条
              dataTotal: res.data.total, //总共多少条数据
              curPage: page, //初始页码,不填默认为1
              pageSize: 5, //分页个数,不填默认为5
              showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
              showSkipInputFlag: true, //是否支持跳转,不填默认不显示
              getPage: function(page) {
                //获取当前页数
                specialist(page)
              }
            })
          }
        }
      }
    })
  };


  function init() {
    specialist()
  }
  init()
})
