(function () {
  // 订单详情模版

  var itemTmpl = '<div class="left-item">' +
    '<div class="item-text">$getItemContent</div>' +
    '</div>';

  window.food_spu_tags = [];
  /**
   * 请求数据
   * @param 
   */
  function getList() {
    $.get('../json/food.json', function (data) {
      // console.log(data);
      console.log(data.data.food_spu_tags);

      // 挂载到全局上
      window.food_spu_tags = data.data.food_spu_tags || [];
      initContentList(window.food_spu_tags);
      // window.ShopBar.changeShippingPrice(data.data.poi_info.shipping_fee || 0);
    });
  }

  /**
   * 渲染左侧列表
   * @param [*] array 
   */
  function initContentList(list) {

    list.forEach(function (item, index) {
      var str = itemTmpl
        .replace('$getItemContent', getItemContent(item))

      // 将item数据挂载到left-item上面
      var $target = $(str);
      $target.data('itemData', item);

      $('.left-bar-inner').append($target);

    });

    $('.left-item').first().click();
  }

  /**
   * 渲染左侧列表item中内容
   * @param {*} data 
   */
  function getItemContent(data) {
    if (data.icon) {
      return '<img class="item-icon" src=' + data.icon + ' />' + data.name;
    } else {
      return data.name
    }
  }


  /**
   * 左侧列表item的点击事件
   */
  function addClick() {
    $('.menu-inner').on('click', '.left-item', function (e) {
      var $target = $(e.currentTarget);
      $target.addClass('active');
      $target.siblings().removeClass('active');
      // 将数据传给详情列表进行渲染
      window.Right.refresh($target.data('itemData'));
    });
  }

  /**
   * @constructor init 初始函数
   * @description 列表单个组件
   */
  function init() {
    getList();
    addClick();
  }


  init();
})();