import * as echarts from '../ec-canvas/echarts';

const app = getApp();
const htmlSnip =
`<p>
<br />
</p>
<p style="text-align:left;">
亲爱的<strong><span style="line-height:1.5;font-size:18px;">{0}</span></strong>家长：
</p>
<p style="text-align:left;">
<br />
</p>
<p style="text-align:left;">
&nbsp;上图是孩子本周的行为规范记录，我们全班正在向着“最文明教室”努力，您的孩子也在用自己的力量为班级加油，为自己加油！
</p>
<p style="text-align:left;">
<br />
</p>
<p style="text-align:left;">
&nbsp;从本周的得分情况来看，孩子的<span style="color:#99BB00;font-size:18px;"><strong><u>{1}</u></strong></span>、<span style="color:#99BB00;font-size:18px;"><strong><u>{2}</u></strong></span>表现不错，请一定大大鼓励孩子哦~
</p>
<p style="text-align:left;">
<br />
</p>
<p style="text-align:left;">
另一方面，孩子在<span style="font-size:18px;color:#FF9900;"><strong><u>{3}</u></strong></span>、<span style="color:#FF9900;font-size:18px;"><strong><u>{4}</u></strong></span>还需继续努力，但是没关系，跟孩子一起想想——我还可以做什么让自己更棒！
</p>
<p style="text-align:left;">
<br />
</p>
<p style="text-align:left;">
云朵之家绝不做纵向对比，但是支持孩子们进行自我归纳总结。
</p>
<p style="text-align:left;">
<br />
</p>
<p style="text-align:left;">
孩子们之间也没有任何可比性，有内敛的，有活泼的，不同的性格一定在班级表现中有不同的体现。因为孩子的不同，才有云朵之家的精彩，请您也接纳孩子的不同侧面，我们一起悦纳孩子~
</p>
<p style="text-align:left;">
<br />
</p>
<p style="text-align:left;">
&nbsp;同时，孩子一周鲜活的生活也不是这冷冰冰的数字可以概括的，提供这样一份图表是希望您能更多维度的关注孩子的成长。很多时候，成绩只是个结果，而比起结果更重要的是，对孩子来说，班级生活中这些“细小而重要”的方面是否可以做好，这些方面往往是现阶段孩子在班级里“胜任感”“自信心”的来源。
</p>
<p style="text-align:left;">
<br />
</p>
<p style="text-align:left;">
家庭自主规划也期待您和孩子每周整理和总结，云朵之家和您一起陪伴孩子的成长~
</p>
<p style="text-align:left;">
<br />
</p>
<div style="text-align:left;">
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;云朵之家
</div>
<div style="text-align:left;">
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span style="font-size:14px;"><strong><em>{5}</em></strong></span> 
</div>
<p>
<br />
</p>
<p style="text-align:left;">
<br />
</p>
<p style="text-align:left;">
<br />
</p>
<p style="text-align:left;">
<br />
</p>
<p style="text-align:left;">
<br />
</p>
<p style="text-align:left;">
<br />
</p>
<p style="text-align:left;">
<br />
</p>
<p style="text-align:left;">
<br />
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
      wx.request({url: "https://req.wangyaqi.site:8080/get_polygon/" + name, methods: 'get', timeout: 500, success (res) {
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

        }, fail(res){
            wx.showToast({
                title: '数据库未响应, 请稍后重试',
                icon: 'none',
                duration : 2000,
              });
        }})

        }
    },  
})
