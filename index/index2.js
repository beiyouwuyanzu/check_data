import * as echarts from '../ec-canvas/echarts';

const app = getApp();
const htmlSnip =
`<p>
<div style="text-align:left;">
    <strong>亲爱的{0}家长</strong>：
</div>
<div style="text-align:left;">
    上图是孩子本周的行为规范记录，我们全班正在向着“最文明教室”努力，您的孩子也在用自己的力量为班级加油，为自己加油！
</div>
<div style="text-align:left;">
    从本周的得分情况来看，孩子的<strong><span style="font-size:14px;color:#99BB00;"><u>{1}</u></span></strong>、<strong><span style="font-size:14px;color:#99BB00;"><u>{2}</u></span></strong>表现不错，请一定大大鼓励孩子哦~
</div>
<div style="text-align:left;">
    另一方面，孩子在<strong><span style="font-size:14px;color:#E53333;"><u>{3}</u></span></strong>、<span style="font-size:14px;color:#E53333;"><strong><u>{4}</u></strong></span>还需继续努力，但是没<span style="color:#E53333;"></span>关系，跟孩子一起想想——我还可以做什么让自己更棒！
</div>
<div style="text-align:left;">
    家庭自主规划也期待您和孩子每周整理和总结，云朵之家和您一起陪伴孩子的成长~
</div>
<div style="text-align:left;">
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 云朵之家
</div>
<p style="text-align:left;">
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<em>{5}</em>
</p>
<p style="text-align:left;">
    <em><br />
</em>
</p>
<p style="text-align:left;">
    <em><br />
</em>
</p>
<p style="text-align:left;">
    <em><br />
</em>
</p>
<p style="text-align:left;">
    <em><br />
</em>
</p>
</p>
`
function setOption(chart, res) {
    let date = res.data[0];
    let name = res.data[1];
    let values = res.data.slice(2);

    const option = {
        title: {
            text: name + "表现记录",
            subtext: '更新日期' + " " + date,
            left:'center', 
        },
        grid: {
            left:'3%',
             top:'top',
             right: '2%',
             bottom: '0',
             containLabel: true
           },
        backgroundColor: "#ffffff",
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        radar: {
          // shape: 'circle',
          indicator: [{
            name: '晨诵自主学习',
            max: 10
          },
          {
            name: '课间纪律',
            max: 10
          },
          {
            name: '倾听',
            max: 10
          },
          {
            name: '路队',
            max: 10
          },
          {
            name: '上课互动',
            max: 10
          },
          {
            name: '作业完成',
            max: 10
          },
          {
            name: '卫生水平',
            max: 10
          },
          {
            name: '文明',
            max: 10
          },
          {
            name: '就餐',
            max: 10
          },
          {
            name: '光盘',
            max: 10
          }
          ]
        },
        series: [
            {
          name: '预算 vs 开销',
          type: 'radar',
          data: [{
            value: values,
            name: name,
            label: {
                normal: {
                    show: true,
                    formatter:function(params) {
                        return params.value;
                    }
                }
            }

          }
          ]
        }]
      };
      chart.setOption(option);
  }
  



Component({
    onReady: function () {
        // 获取组件
        this.ecComponent = this.selectComponent('#mychart-dom-bar');
        console.log("select componment", this.ecComponent);
      },

    data: {
        ec: {
          // 将 lazyLoad 设为 true 后，需要手动初始化图表
          lazyLoad: true
        },
        isLoaded: false,
        isDisposed: false,
        renderedByHtml: false,
      },
    

  pageLifetimes: {
    show() {
        this.ecComponent = this.selectComponent('#mychart-dom-bar');
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  },
  methods:{

    formSubmit: function(e){
      console.log(e.detail.value);
      let name = e.detail.value['input'];
      let that = this;
      // 请求服务
      if(name == ""){
          wx.showToast({
            title: '请输入姓名',
            duration: 1000,
            icon: 'error',
          });
          return;
      }
      wx.request({url: "https://req.wangyaqi.site:8080/get_polygon/" + name, methods: 'get', success (res) {
        console.log(res.data);
        if(res.data == "not found"){
            wx.showToast({
              title: '未查询到该生信息',
              icon: 'error',
              duration : 1000,
            });
            return;
        }

        // 加载图片数据
        that.ecComponent.init((canvas, width, height, dpr) => {
            // 获取组件的 canvas、width、height 后的回调函数
            // 在这里初始化图表
            const chart = echarts.init(canvas, null, {
              width: width,
              height: height,
              devicePixelRatio: dpr // new
            });
            setOption(chart, res);
      
            // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
            that.chart = chart;
      
            that.setData({
              isLoaded: true,
              isDisposed: false
            });
      
            // 注意这里一定要返回 chart 实例，否则会影响事件处理等
            return chart;
          }
          );

        // 加载文本提示
        that.setData({
            renderedByHtml: true
          });

          String.prototype.format = function(args) {
            if (arguments.length > 0) {
              var result = this;
              if (arguments.length == 1 && typeof(args) == "object") {
                for (var key in args) {
                  var reg = new RegExp("({" + key + "})", "g");
                  result = result.replace(reg, args[key]);
                }
              } else {
                for (var i = 0; i < arguments.length; i++) {
                  if (arguments[i] == undefined) {
                    return "";
                  } else {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                  }
                }
              }
              return result;
            } else {
              return this;
            }
          };

          // 替换文本
          let date = res.data[0];
          let name = res.data[1];
          let values = res.data.slice(2);
          let mirror = [];
          for(let i = 0; i < values.length; i++){
              mirror.push([values[i], i]);
          }
          function sortFunction(a, b) {
            if (a[0] === b[0]) {
                return 0;
            }
            else {
                return (a[0] < b[0]) ? -1 : 1;
            }
            }
          mirror.sort(sortFunction);
          console.log("after sort", mirror);
          let names = "晨诵自主学习,课间纪律,专注倾听,路队有序,上课互动,作业完成,卫生水平,文明礼貌,就餐秩序,光盘".split(',');
          let good1 = names[mirror.at(-1)[1]], good2 = names[mirror.at(-2)[1]];
          let bad1 = names[mirror[0][1]], bad2 = names[mirror[1][1]];
          let text = htmlSnip.format(name, good1, good2, bad1, bad2, date);
          that.setData({htmlSnip: text});

        }})

        }
    },  
})
