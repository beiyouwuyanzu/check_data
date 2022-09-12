Component({
  pageLifetimes: {
    show() {
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
      // 请求服务
      wx.request({url: "https://req.wangyaqi.site:8080/get_polygon/" + name, methods: 'get', success (res) {
        console.log(res.data);
      }
    });
    }
  }
})
