import * as echarts from '../ec-canvas/echarts';

const app = getApp();

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
            name: '专注倾听',
            max: 10
          },
          {
            name: '路队有序',
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
            name: '文明礼貌',
            max: 10
          },
          {
            name: '就餐秩序',
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
          }
        //   {
        //     value: [300, 430, 150, 300, 420, 250],
        //     name: '开销'
        //   }
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
    
    // onReady() {
    //     setTimeout(function () {
    //       // 获取 chart 实例的方式
    //       console.log("chart", data)
    //     }, 2000);
    //   },
    data: {
        ec: {
          // 将 lazyLoad 设为 true 后，需要手动初始化图表
          lazyLoad: true
        },
        isLoaded: false,
        isDisposed: false
      },
    

  pageLifetimes: {
    show() {
        this.ecComponent = this.selectComponent('#mychart-dom-bar');
        console.log("==========================select componment", this.ecComponent);
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
          });

        }})
        }
    },  
})
