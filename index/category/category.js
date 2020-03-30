(function () {
  // 类目模板字符串
  var itemTmpl = '<div class="category-item">' +
    '<img class="item-icon" src=$url />' +
    '<p class="item-name">$name</p>' +
    '</div>'
  // 初始化 .category-content页面元素
  function initCategory() {
    // 获取category的数据
    $.get('../json/head.json', function (data) {
      // console.log(data);
      var list = data.data.primary_filter.splice(0, 8);
      list.forEach(function (item) {
        var str = itemTmpl.replace('$url', item.url).replace('$name', item.name);
        $('.category-content').append(str);
      })
    })
  }

  // 为每一个类目绑定点击事件
  function addClick() {
    $('.category-content').on('click', '.category-item', function () {
      alert(1);
    })

  }

  // 初始化函数 --> 入口函数
  function init() {
    initCategory();
    addClick();
  }
  init();
})()