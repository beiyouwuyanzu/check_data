// index.js
Component({
    data:{
        "name_list": "李诗涵\n屈嘉怡\n特凌格\n关静萱\n宋佳艾\n李雨彤\n赵思涵\n孟庆宇\n刘智阳\n刘博文\n孙天朗\n王晨旭\n杨仲秋\n刘锦鸿\n冯梦骁\n张逸凡\n马士雅\n肖鞠\n黄钰舒\n屈锶涵\n杨梓萱\n孙钰然\n司若琳\n卢心雅\n吴小小\n顾一苇\n谭澈\n蔡润锋\n江一帆\n周楚恩\n徐子正\n王梓轩\n章华宸\n范铭宸\n魏一\n郝一棵",
    },
    people: [],
    input: "",
    methods: {
        clickMe: function() {
            this.that = this;
            wx.createSelectorQuery().select('.input_list').fields({
              properties: ["value"]
            }).exec(params=>{


                var that = this;
                this.input = params[0].value;
                console.log("input", this.input);
                wx.createSelectorQuery().select('.name_list').fields({properties:["value"]}).exec(res=>{
    
                  console.log("delay!");
                  var people = [];
                  var name_list = res[0].value.split("\n");
                  console.log(name_list.length);
                  for(var item of name_list) {
                      if(this.input.indexOf(item) == -1){
                          people.push(item);
                      }
                  }
          
                  if(!people.length){
                      console.log("原始名单共" + name_list.length + "人\n" + "全部都已经签到");
                      that.setData({"out_put": "原始名单共" + name_list.length + "人\n" + "全部都已经签到"});
                  }else{
                      console.log("原始名单共" + name_list.length + "人\n" + "全部都已经签到");
                      that.setData({"out_put": "原始名单共" + name_list.length + "人, 未签到" + people.length + "人\n------\n" + people.join(", ")});
                  }
          
                  const innerAudioContext = wx.createInnerAudioContext({
                      useWebAudioImplement: false // 是否使用 WebAudio 作为底层音频驱动，默认关闭。对于短音频、播放频繁的音频建议开启此选项，开启后将获得更优的性能表现。由于开启此选项后也会带来一定的内存增长，因此对于长音频建议关闭此选项
                    })
                    innerAudioContext.src = 'pages/res/y1009.mp3';  
                    innerAudioContext.play() // 播放
          
                  wx.showToast({
                      title: '检查成功',
                      icon: 'success',
                      duration: 1000
                    })
    
    
                });
    
            



            });

        }
    },
    pageLifetimes: {
        show() {
          if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
              selected: 0
            })
          }
        }
      }
    }

)


