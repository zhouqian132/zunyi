$(function() {
  $('.main-header').load('./header/header.html', function() {})
  var length = 8
  var col = getUrlParam('col')
  if (col != null) {
    if (col == 1) {
      var title = "知名专家"
    } else if (col == 2) {
      var title = "正专家"
    } else if (col == 3) {
      var title = "副专家"
    } else if (col == 4) {
      var title = "普通专家"
    } else if (col == 5) {
      var title = "博士"
    }
    html = '<span class="first">当前位置：</span><span><a class="one" href="index.html">首页</a> <i class="iconfont icon-shuangjiantouyou" aria-hidden="true"></i> <a class="two" href="zjlist.html">专家简介</a> <i class="iconfont icon-shuangjiantouyou" aria-hidden="true"></i><span class="last">' + title + '</span></span>'
    $('.position-list').html(html)
  }

  //专家信息
  function specialist(page) {
    $.ajax({
      url: href + 'gzjhbfzpt/YxyArtilZhuanke',
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
              if (v.artSex != null) {
                if (v.artSex == 1) {
                  var artSex = "男"
                } else if (v.artSex == 2) {
                  var artSex = "女"
                } else if (v.artSex == 3) {
                  var artSex = ""
                }
              } else {
                var artSex = ""
              }
              //1:知名专家 2:正专家 3:副专家 4:普通专家 5:博士
              if (v.artNavbname != null) {
                if (v.artNavbname == 1) {
                  var artNavbname = ""
                } else if (v.artNavbname == 2) {
                  var artNavbname = "正专家"
                } else if (v.artNavbname == 3) {
                  var artNavbname = "副专家"
                } else if (v.artNavbname == 4) {
                  var artNavbname = "普通专家"
                } else if (v.artNavbname == 5) {
                  var artNavbname = "博士"
                }
              }else {
                var artNavbname = ""
              }
              html += '<div class="col-xs-12 col-md-6">\n' +
                '<div class="listwrap listwrap-1">\n' +
                '<div class="list-left">\n' +
                '<div class="width-zjimg"> <a href="zjinfo.html?id=' + v.id + '"><img class="list-zjimg" src="http://111.231.195.149:8080/jhbpt/' + v.artShows + '" alt=""></a> </div>\n' +
                '</div>\n' +
                '<div class="list-right">\n' +
                '<div class="list-main">\n' +
                '<a class="eddot-t" href="zjinfo.html?id=' + v.id + '" style="overflow-wrap: break-word;">' + v.artTitle + '<span class="sex">' + artSex + '</span></a>\n' +
                '<div class="belong">' + (v.artAuthor == null ? "" : v.artAuthor) + '</div>\n' +
                '<div class="navbname">' + artNavbname + '</div>\n' +
                '<div class="summary eddot-p">' + v.artExcerpt + '</div>\n' +
                '<div class="refer"><button type="button" class="btn-info">咨询</button></div>\n' +
                '</div>\n' +
                '</div>\n' +
                '</div>\n' +
                '</div>'
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
