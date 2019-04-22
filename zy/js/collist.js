$(function() {
  $('.main-header').load('./header/header.html', function() {})
  var length = 10
  var col = getUrlParam('col')
  if (col != null) {
    if (col == 1) {
      var title = "新闻动态"
    } else if (col == 2) {
      var title = "重要公告"
    } else if (col == 3) {
      var title = "学术会议"
    } else if (col == 4) {
      var title = "行业咨询"
    } else if (col == 5) {
      var title = "线上培训"
    }
    html = '<span class="first">当前位置：</span><span><a class="one" href="index.html">首页</a> <i class="iconfont icon-shuangjiantouyou" aria-hidden="true"></i> <a class="two" href="collist.html">信息公告</a> <i class="iconfont icon-shuangjiantouyou" aria-hidden="true"></i><span class="last">' + title + '</span></span>'
    $('.position-list').html(html)
  }

  //信息公告
  function specialist(page) {
    $.ajax({
      url: href + 'gzjhbfzpt/YxyArtilMesg',
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
            res.data.items.forEach(function(v) {
              // console.log(v)
              var artExcerpt = v.artExcerpt != null ? v.artExcerpt.replace(/<[^>]*>|/g, "").substring(0, 90) + "..." : ""
              html += '<li class="li">\n' +
                '<div class="content">\n' +
                '<div class="list-left"> <a href="colinfo.html?col=a&amp;id=' + v.id + '"><img src="http://111.231.195.149:8080/jhbpt/' + v.artShows + '" alt=""></a> </div>\n' +
                '<div class="list-main"> <a href="colinfo.html?col=a&amp;id=' + v.id + '"><h3>' + v.artTitle + '</h3></a> <time><i class="iconfont icon-shijian"></i>' + datef(v.createDate, v.createDate) + '<i class="iconfont icon-liulan"></i>' + v.artLike + '</time>\n' +
                '<p>' + artExcerpt + '<a href="colinfo.html?col=a&amp;id=' + v.id + '">[详情]</a> </p>\n' +
                '</div>\n' +
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
