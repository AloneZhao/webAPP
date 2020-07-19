(function () {
  // 订单详情模版

  var itemTmpl = '<div class="order-item">' +
    '<div class="order-item-inner">' +
    '<img class="item-img" src=$poi_pic />' +
    '<div class="item-right">' +
    '<div class="item-top">' +
    '<p class="order-name one-line">$poi_name</p>' +
    '<div class="arrow"></div>' +
    '<div class="order-state">$status_description</div>' +
    '</div>' +
    '<div class="item-bottom">' +
    '$getProduct' +
    '</div>' +
    '</div>' +
    '</div>' +
    '$getComment' +
    '</div>';


  var page = 0;
  var isLoading = false;

  /**
   * 请求数据
   * @param 
   */

  function getList() {
    page++;
    isLoading = true;
    $.get('../json/orders.json', function (data) {
      setTimeout(function () {
        console.log(data.data.digestlist);
        var list = data.data.digestlist || [];
        initContentList(list);
        isLoading = false;
      }, 1000)
    });
    if (page === 3) {
      $('.loading').text('加载完成')
    }
  }


  /**
   * 渲染具体菜品
   * @param {*} data 
   */
  function getProduct(data) {
    let list = data.product_list;

    // 复制数组防止引用
    // push一个用来计算总计的{type：more}
    list.push({
      type: 'more'
    });

    var str = '';
    list.forEach((item, index) => {
      if (item.type === 'more') {
        str += getTotalPrice(data);
      } else {
        str += '<div class="product-item">' + item.product_name + '<div class="p-count">x' + item.product_count + '</div></div>'
      }

    })

    return str;
  }

  /**
   * 渲染每个菜品的总计
   * @param {*} data 
   */
  function getTotalPrice(data) {
    return '<div class="product-item">' +
      '<span>...</span>' +
      '<div class="p-total-count">' +
      '总计' + data.product_count + '个菜，实付' +
      '<span class="total-price">¥' + data.total + '</span>' +
      '</div>' +
      '</div>';

  }

  /**
   * 渲染评价按钮
   * @param {*} data 
   */
  function getComment(data) {
    let evaluation = !data.is_comment;
    if (evaluation) {
      return '<div class="evaluation clearfix">' +
        '<div class="evaluation-btn">评价</div>' +
        '</div>';

    }

    return '';
  }

  /**
   * 渲染列表
   * @param [*] array 
   */
  function initContentList(list) {


    list.forEach(function (item, index) {


      var str = itemTmpl.replace('$poi_pic', item.poi_pic)
        .replace('$poi_name', item.poi_name)
        .replace('$status_description', item.status_description)


        .replace('$getProduct', getProduct(item))

        .replace('$getComment', getComment(item));


      $('.order-list').append(str);

    });
  }


  // function addClick() {
  //   $('.category-content').on('click', '.category-item', function () {
  //     alert(1);
  //   });
  // }

  /**
   * 模拟滚动加载
   */
  function scrollLoading() {
    window.addEventListener('scroll', function () {
      var clientHeight = document.documentElement.clientHeight;
      var scrollHeight = document.body.scrollHeight;
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      var proDis = 30; // 阈值 
      // 为何减proDis 因为当页面即将滚动完就触发而不是刚滚动完才触发
      if ((clientHeight + scrollTop) >= (scrollHeight - proDis)) {
        // 最多滚动加载2页
        if (page < 3) {
          // 在发送请求时避免多次加载
          if (isLoading) {
            return;
          } else {
            getList();
          }
        }
      }
    })
  }

  /**
   * @constructor init
   * @description 列表单个组件
   */
  function init(argument) {
    getList();
    scrollLoading();
  }


  init();
})();