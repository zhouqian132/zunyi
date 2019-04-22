$(function() {
  $('.main-header').load('./header/header.html', function() {})
  var length = 6
  var col = getUrlParam('col')
  if (col != null) {
    if (col == 1) {
      var title = "学术讲座"
    } else if (col == 2) {
      var title = "宣传视频"
    }
    html = '<span class="first">当前位置：</span><span><a class="one" href="index.html">首页</a> <i class="iconfont icon-shuangjiantouyou" aria-hidden="true"></i> <a class="two" href="videolist.html">视频宣传</a> <i class="iconfont icon-shuangjiantouyou" aria-hidden="true"></i><span class="last">' + title + '</span></span>'
    $('.position-list').html(html)
  }

  //视频宣传
  function specialist(page) {
    $.ajax({
      url: href + 'gzjhbfzpt/YxyArtilVideo',
      type: 'get',
      data: {
        rows: length,
        page: page,
        artNavbname: col
      },
      success: function(res) {
        if (res.status === 200) {
          if (res.data.items != '') {
            var html = '';
            console.log(res)
            res.data.items.forEach(function(v) {
              html += '<li class="li">\n' +
                '      <div class="content"> <img src="http://111.231.195.149:8080/jhbpt/'+v.artShows+'" alt="">\n' +
                '      <div class="list-main list-small">\n' +
                '      <h3>'+v.artTitle+'</h3>\n' +
                '      <p>'+v.artExcerpt+'</p> <a href="videoinfo.html?id='+v.id+'">详情</a> </div>\n' +
                '      </div>\n' +
                '      </li>'
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
