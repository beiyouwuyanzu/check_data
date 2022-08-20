// index.js
Page({
    data:{
        "name_list": "李诗涵\n屈嘉怡\n特凌格\n关静萱\n宋佳艾\n李雨彤\n赵思涵\n孟庆宇\n刘智阳\n刘博文\n孙天朗\n王晨旭\n杨仲秋\n刘锦鸿\n冯梦骁\n张逸凡\n马士雅\n肖鞠\n黄钰舒\n屈锶涵\n杨梓萱\n孙钰然\n司若琳\n卢心雅\n吴小小\n顾一苇\n谭澈\n蔡润锋\n江一帆\n周楚恩\n徐子正\n王梓轩\n章华宸\n范铭宸\n魏一\n郝一棵",
    },
    people: [],
    input: "",

    delay0: function(params) {
        this.input = params[0].value;
        wx.createSelectorQuery().select('#name_list').fields({"id": true, "properties":["value"]}).exec(this.delay);     
    },
    delay: function(res){
        // var input = "";
        // wx.createSelectorQuery().select('#input').fields({"id": true, "properties":["value"]}).exec(function (res) {
        //     input = res[0].value;
        // }); 
        var people = [];
        var name_list = res[0].value.split("\n");
        for(var item of name_list) {
            if(this.input.indexOf(item) == -1){
                // console.log(item);
                people.push(item);
            }
        }
        this.setData({"out_put": people.join(", ")});
    },
    clickMe: function() {
        wx.createSelectorQuery().select('#input').fields({"id": true, "properties":["value"]}).exec(this.delay0); 
    }
})
