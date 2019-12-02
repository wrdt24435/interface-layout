const data = [
    {
      type: '我愿意',
      title: '愿意为你',
      src: 'images/1.jpg'
    },
    {
      type: '我愿意',
      title: '我愿意为你',
      src: 'images/2.jpg'
    },
    {
      type: '我愿意',
      title: '忘记我姓名',
      src: 'images/3.jpg'
    },
  
    {
      type: '我愿意',
      title: '被放逐天际',
      src: 'images/15.jpg'
    },
  
    {
      type: '再见萤火虫',
      title: '天亮你不能见我',
      src: 'images/4.jpg'
    },
  
    {
      type: '再见萤火虫',
      title: '天黑至少想念我',
      src: 'images/5.jpg'
    },
  
    {
      type: '再见萤火虫',
      title: '如果没有灯火',
      src: 'images/6.jpg'
    },
  
    {
      type: '再见萤火虫',
      title: '紧握这萤火，闪耀你阴暗的角落',
      src: 'images/7.jpg'
    },
  
    {
      type: '再见萤火虫',
      title: '那么至少肯定我',
      src: 'images/8.jpg'
    },
  
    {
      type: '末日',
      title: '清规戒律',
      alt: 'React知识点综合运用实例',
      src: 'images/4.jpg'
    },
  
    {
      type: '末日',
      title: '没有意义，意义~',
      src: 'images/5.jpg'
    },
  
    {
      type: '你快乐于是我快乐',
      title: '我还能怎么呢',
      src: 'images/6.jpg'
    },
  
    {
      type: '你快乐于是我快乐',
      title: '你眼睛红了，我的天灰了',
      src: 'images/7.jpg'
    },
  
    {
      type: '你快乐于是我快乐',
      title: '拉拉拉，拉拉拉拉',
      src: 'images/8.jpg'
    }
  
  ];
  
  $(function(){
      ( function (window,document) {
          let my_box = function ({data, Select}) {
              this.types = ['王菲'];  // 所有的分类,
              this.classified = {'王菲': []}; // 按照类型分类后的图片
              this.all_img_element = [];	//所有图片元素集合
              //this.curType = initType; // 当前显示的图片分类
  
              this.imgContainer = null; // 所有图片的容器
              this.wrap = null; // 整体容器
              this.typeBtnEls = null; // 所有分类按钮组成的数组
              this.figures = null; // 所有当前显示的图片组成的数组
              
              this.init_picture(data);
              this.init_view(Select);
              this.bind_event();
          }
          //初始化盒子数据，将data数据按需求放进对象里
          my_box.prototype.init_picture = function(data) {	
              let index;
              let all_src = []; // 所有图片
              data.forEach( ({type, title, src}) => {
                  
                  if (!this.types.includes(type)) {
                      this.types.push(type);
                      this.classified[type] = [];
                  }
                  index = all_src.indexOf(src);
                  if (index >= 0) {
                      this.classified[type].push(index);
  
                  }
                  else {
                      all_src.push(src);
                      this.all_img_element.push(create_img_element(src, title));
                      this.classified["王菲"].push(this.all_img_element.length - 1);
                      this.classified[type].push(this.all_img_element.length - 1);
                  }
              })
              // console.log(this.all_img_element);
          }
          //返回需要创建figure的$元素
          function create_img_element(src, title) {
              return $(`<figure>
                          <img src=${src} alt=${title}>
                          <figcaption>${title}</figcaption>
                      </figure>`);
          }
          //第一次显示
          my_box.prototype.init_view = function(Select) {
              let head_box = [];
              for(let type of this.types) {
                  let select_class = type == Select? " select" : "";
                  head_box.push(`<div class="title${select_class}">${type}<div>`);
              }
              $(".head").append(...head_box);
              //console.log(this.classified[Select]);			
              this.img_view(Select);
          }
          //显示head盒子对应的内容
          my_box.prototype.img_view = function(Select) {
              let img = [];
              let $box = $(".content")
              //console.log($box);
              for(let img_element of this.classified[Select]) {
                      $box.append(this.all_img_element[img_element]);
                      //console.log(this.all_img_element[img_element]);
              }
              $(".content img").css("width","240px");
              //$box.append($('<p>test</p>'));
          }
          my_box.prototype.bind_event = function() {
              let $content_figure = $(".content figure");
              let $big_picture = $(".big_picture");
              $content_figure.click( (obj) => {
                  let my_src = obj.target.firstElementChild.getAttribute("src");
                  //console.log(`${my_src}`);
                 $(".big_picture img").attr("src",`${my_src}`);
                  $big_picture.css("display","flex");
                  setTimeout( () => { $big_picture.css("opacity","1"); });//跑完事件函数后才能显示动画
                  //console.log($(".big_picture img"));
                  $big_picture.click( () => {
                      $big_picture.css("opacity","0");
  
                      setTimeout(() => {
                          $big_picture.css("display","none");
                      }, 300);
                  });
              })
              //$(".big_picture img").css("src","images/1.jpg");
              //console.log( $(".big_picture div") );
          }
          window.$my_box = my_box;
      })(window,document);
  });