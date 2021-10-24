const watch = require("../../utils/util.js");

const app = getApp()

var current_player = -1 //当前轮到的玩家
var top_poke = -1  //卡池区顶部花色
var take_poke = -1  //当前取出的牌的花色

var pool_spade = []  //记录卡池区黑桃情况
var pool_heart = []  //记录卡池区红桃情况
var pool_club = []  //记录卡池区梅花情况
var pool_diamond = []  //记录卡池区方块情况

var pool_spade_num = 0  //记录卡池区黑桃数量
var pool_heart_num = 0  //记录卡池区红桃数量
var pool_club_num = 0  //记录卡池区梅花数量
var pool_diamond_num = 0  //记录卡池区方块数量

var spade_0 = []  //玩家0的黑桃记录
var heart_0 = []  //玩家0的红桃记录
var club_0 = []  //玩家0的梅花记录
var diamond_0 = []  //玩家0的方块记录

var spade_1 = []  //玩家1的黑桃记录
var heart_1 = []  //玩家1的红桃记录
var club_1 = []  //玩家1的梅花记录
var diamond_1 = []  //玩家1的方块记录

var deposit_0 = 0  //玩家0的托管状态

var tmp_ty = '1'   //从服务器处获取的牌的花色
var tmp_num = '1'  //从服务器处获取的牌的数字

Page({
  data: { 
    //显示提示信息
    msg:'游戏未开始',
    //判断是否托管
    robot: false,
    //判断本回合是否结束
    done: false,
    //当前玩家
    ch_current_player:'',
    //玩家0的机器人图片路径
    robort_url_0:'/image/icon/robort.jpg',
    //卡池区顶部花色图片路径
    top_poke_url:'',
    //卡组剩余牌的数量
    left_tot: 52,
    //卡池区所积累牌的数量
    pool_tot: 0,
    //玩家0的各花色手牌数量
    player_0_spade: 0,
    player_0_heart: 0,
    player_0_club: 0,
    player_0_diamond: 0,
    //玩家1的各花色手牌数量
    player_1_spade: 0,
    player_1_heart: 0,
    player_1_club: 0,
    player_1_diamond: 0,

    interval: 0,
    interval1: 0
  },

  watch: {                                    //观察者
    done: function(newValue,oldValue){
        if(newValue){                       //done为true，本回合结束
            this.data.done = false;                     //开启下一回合
            this.get_last();    //开启下一回合
        }
    },
    robot: function(newValue,oldValue){   //观察是否在托管状态
        if(newValue){
            this.AI_robot();
        }
    }
},
  //判断所抽取的牌花色与卡池区花色是否一致
  judge_type: function() {
    if (top_poke == take_poke){
        top_poke = -1
        this.setData({
          top_poke_url:'',
          pool_tot: 0
        })
        if (current_player == 0){
          //更新玩家0的黑桃记录及数量
          for (var i = 0; i < pool_spade_num; i ++){
              spade_0[this.data.player_0_spade + i] = pool_spade[i]
          }
          var tmp_player_0_spade = this.data.player_0_spade + pool_spade_num
          this.setData({
              player_0_spade: tmp_player_0_spade
          })
          //更新玩家0的红桃记录及数量
          for (var i = 0; i < pool_heart_num; i ++){
              heart_0[this.data.player_0_heart + i] = pool_heart[i]
          }
          var tmp_player_0_heart = this.data.player_0_heart + pool_heart_num
          this.setData({
              player_0_heart: tmp_player_0_heart
          })
          //更新玩家0的梅花记录及数量
          for (var i = 0; i < pool_club_num; i ++){
              club_0[this.data.player_0_club + i] = pool_club[i]
          }
          var tmp_player_0_club = this.data.player_0_club + pool_club_num
          this.setData({
              player_0_club: tmp_player_0_club
          })
          //更新玩家0的方块记录及数量
          for (var i = 0; i < pool_diamond_num; i ++){
              diamond_0[this.data.player_0_diamond + i] = pool_diamond[i]
          }
          var tmp_player_0_diamond = this.data.player_0_diamond + pool_diamond_num
          this.setData({
              player_0_diamond: tmp_player_0_diamond
          })
        }
        else{
          //更新玩家1的黑桃记录及数量
          for (var i = 0; i < pool_spade_num; i ++){
              spade_1[this.data.player_1_spade + i] = pool_spade[i]
          }
          var tmp_player_1_spade = this.data.player_1_spade + pool_spade_num
          this.setData({
              player_1_spade: tmp_player_1_spade
          })
          //更新玩家1的红桃记录及数量
          for (var i = 0; i < pool_heart_num; i ++){
              heart_1[this.data.player_1_heart + i] = pool_heart[i]
          }
          var tmp_player_1_heart = this.data.player_1_heart + pool_heart_num
          this.setData({
              player_1_heart: tmp_player_1_heart
          })
          //更新玩家1的梅花记录及数量
          for (var i = 0; i < pool_club_num; i ++){
              club_1[this.data.player_1_club + i] = pool_club[i]
          }
          var tmp_player_1_club = this.data.player_1_club + pool_club_num
          this.setData({
              player_1_club: tmp_player_1_club
          })
          //更新玩家1的方块记录及数量
          for (var i = 0; i < pool_diamond_num; i ++){
              diamond_1[this.data.player_1_diamond + i] = pool_diamond[i]
          }
          var tmp_player_1_diamond = this.data.player_1_diamond + pool_diamond_num
          this.setData({
              player_1_diamond: tmp_player_1_diamond
          })
        }
        pool_spade_num = pool_heart_num = pool_club_num = pool_diamond_num = 0
        top_poke = -1
    }
    else{
        top_poke = take_poke
    }
    if (current_player == 1){
        current_player = 0
        this.setData({
            ch_current_player: '一'
        })
    }  
    else{
        current_player = 1
        this.setData({
            ch_current_player: '二'
        })
    }  
    if (current_player == 1)  this.data.done = true
    //this.judge_game_over()
  },

  //告知服务器抽取卡组操作
  tell_0: function(){
    wx.request({
        url: 'http://172.17.173.97:9000/api/game/' + app.globalData.uuid,
        method: "PUT",
        header: {
            "Authorization": wx.getStorageSync('token')
        },
        data: {
            type : 0
        },
        success: res => {
            console.log("333333333")
            console.log(res)
            var info = res.data.data.last_code
            console.log('info:' + info)
            tmp_ty = info[4]
            tmp_num = info[5]
            if (info.length == 7)  tmp_num += info[6]
            console.log("tell 0")
            console.log("tmp_ty" + tmp_ty)
            console.log("tmp_num" + tmp_num)
            this.take_from_outside()
        }
    })
  },

  //告知服务器抽取手牌操作  'S','H','C','D'  'A','2','3'.....
  tell_1: function(){
    wx.request({
        url: 'http://172.17.173.97:9000/api/game/' + app.globalData.uuid,
        method: "PUT",
        header: {
            "Authorization": wx.getStorageSync('token')
        },
        data: {
            type: 1,
            card: tmp_ty + tmp_num
        },
        success: res => {
            console.log(res)
        }
    })
  },

  //将所抽取的牌放入卡池区
  add_pool: function(){
    var tmp_pool_tot = this.data.pool_tot
    this.setData({
        pool_tot: tmp_pool_tot + 1
    })
    console.log("放牌")
    console.log("tmp_ty" + tmp_ty)
    console.log("tmp_num" + tmp_num)
    if (tmp_ty == 'S'){
        pool_spade[pool_spade_num] = tmp_num
        pool_spade_num ++
        take_poke = 0
        this.setData({
            top_poke_url: '/image/poke/spade.jpg'
        })
    }
    else if (tmp_ty == 'H'){
        pool_heart[pool_heart_num] = tmp_num
        pool_heart_num ++
        take_poke = 1
        this.setData({
            top_poke_url: '/image/poke/heart.jpg'
        })
    }
    else if (tmp_ty == 'C'){
        pool_club[pool_club_num] = tmp_num
        pool_club_num ++
        take_poke = 2
        this.setData({
            top_poke_url: '/image/poke/club.jpg'
        })
    }
    else{
        pool_diamond[pool_diamond_num] = tmp_num
        pool_diamond_num ++
        take_poke = 3
        this.setData({
            top_poke_url: '/image/poke/diamond.jpg'
        })
    }
  },

  //玩家从手牌中抽取          0,1  'S','H','C','D'
  take_from_inside: function(player){
    if(player == 0){
        //告知服务器此轮操作
         this.tell_1()
    }
    else{
        //修改对方手牌
        var pos = 0
        if (tmp_ty == 'S'){
            for (var i = 0; i < this.data.player_1_spade; i ++)
                if (spade_1[i] == tmp_num){
                    pos = i;
                    break;
                }
            for (var i = pos; i < this.data.player_1_spade; i ++)
                spade_1[i] = spade_1[i+1];
            var tot = this.data.player_1_spade - 1;
            this.setData({
                player_1_spade: tot
            })
        }
        else if (tmp_ty == 'H'){
            for (var i = 0; i < this.data.player_1_heart; i ++)
                if (heart_1[i] == tmp_num){
                    pos = i;
                    break;
                }
            for (var i = pos; i < this.data.player_1_heart; i ++)
                heart_1[i] = heart_1[i+1];
            var tot = this.data.player_1_heart - 1;
            this.setData({
                player_1_heart: tot
            })
        }
        else if (tmp_ty == 'C'){
            for (var i = 0; i < this.data.player_1_club; i ++)
                if (club_1[i] == tmp_num){
                    pos = i;
                    break;
                }
            for (var i = pos; i < this.data.player_1_club; i ++)
                club_1[i] == club_1[i+1];
            var tot = this.data.player_1_club - 1;
            this.setData({
                player_1_club: tot
            })
        }
        else{
            for (var i = 0; i < this.data.player_1_diamond; i ++)
                if (diamond_1[i] == tmp_num){
                    pos = i;
                    break;
                }
            for (var i = 0; i < this.data.player_1_diamond; i ++)
                diamond_1[i] == diamond_0[i+1];
            var tot = this.data.player_1_diamond - 1;
            this.setData({
                player_1_diamond: tot
            })
        }
    }
    //将新抽取的牌放入卡池区
    this.add_pool()
    //判断所出牌与卡池区顶部花色是否一致
    this.judge_type()
  },

  //玩家从卡组中抽取          0,1  'S','H','C','D'  'A','2','3'...
  take_from_outside: function(){
    //更新卡组、卡池区牌总数
    var tmp_left_tot = this.data.left_tot - 1
    this.setData({
        left_tot: tmp_left_tot
    })
    if (tmp_ty == 'S')  take_poke = 0
    else if (tmp_ty == 'H')  take_poke = 1
    else if (tmp_ty == 'C')  take_poke = 2
    else  take_poke = 3
    this.add_pool()
    this.judge_type()
  },
    //托管
  AI_robot: function(){
    var that = this
    this.data.interval1 = setInterval(function () {
        if(current_player == 0){
            clearInterval(that.data.interval1)
            var tmp = [that.data.player_0_spade, that.data.player_0_heart, that.data.player_0_club, that.data.player_0_diamond]
            console.log('打印托管函数中的tmp数组：' + tmp)
            console.log('黑桃：' + that.data.player_0_spade)
            console.log('红心：' + that.data.player_0_heart)
            console.log('梅花：' + that.data.player_0_club)
            console.log('方块：' + that.data.player_0_diamond)
            var maxi = -1, maxn = -1
            for(var i = 0; i < 4; i ++){
                if(tmp[i] > maxn){
                    maxn = tmp[i]
                    maxi = i
                }
            }
            console.log('maxn : ' + maxn)
            if(maxn == 0)  that.tell_0();
            else{
                if(maxi == 0){
                    take_poke = 0
                    var t_player_0_spade = that.data.player_0_spade - 1
                    that.setData({
                        player_0_spade: t_player_0_spade
                    })
                    tmp_ty = 'S'
                    tmp_num = spade_0[t_player_0_spade]
                }  
                else if (maxi == 1){
                    take_poke = 1
                    var t_player_0_heart = that.data.player_0_heart - 1
                    that.setData({
                        player_0_heart: t_player_0_heart
                    })
                    tmp_ty = 'H'
                    tmp_num = heart_0[t_player_0_heart]
                }
                else if (maxi == 2){
                    take_poke = 2
                    var t_player_0_club = that.data.player_0_club - 1
                    that.setData({
                        player_0_club: t_player_0_club
                    })
                    tmp_ty = 'C'
                    tmp_num = club_0[t_player_0_club]
                }
                else{
                    take_poke = 3
                    var t_player_0_diamond = that.data.player_0_diamond - 1
                    that.setData({
                        player_0_diamond: t_player_0_diamond
                    })
                    tmp_ty = 'D'
                    tmp_num = diamond_0[t_player_0_diamond]
                }
                that.take_from_inside(0)
            }
        }
    },1000)
  },    

  //判断赢家
  judge_winner:function(){
     //获取玩家剩余手牌
     var s0 = this.data.player_0_spade + this.data.player_0_heart + this.data.player_0_club + this.data.player_0_diamond
     var s1 = this.data.player_1_spade + this.data.player_1_heart + this.data.player_1_club + this.data.player_1_diamond
     //判断赢家
     var flag = 0
     if (s0 < s1)  flag = 0
     else if (s0 == s1)  flag = -1
     else  flag = 1
     app.globalData.winner = flag
     wx.setStorageSync('winner', flag)
     wx.navigateTo({
         url: '/pages/gameover/gameover',
     })
  }, 

  //判断对局是否结束
  judge_game_over: function(){
    if (this.data.left_tot == 0){
       this.judge_winner()
    }
    else{
        if (current_player == 1)  this.data.done = true
    }
  },

  //玩家0的点击S事件
  player0_S(){
    console.log('玩家0点击S' + current_player + ' ' +deposit_0)
    if (current_player == 0 && deposit_0 == 0 && this.data.player_0_spade > 0){
        take_poke = 0
        var t_player_0_spade = this.data.player_0_spade - 1
        this.setData({
            player_0_spade: t_player_0_spade
        })
        tmp_ty = 'S'
        tmp_num = spade_0[t_player_0_spade]
        this.take_from_inside(0)
    }
  },

  //玩家0的点击H事件
  player0_H(){
    console.log('玩家0点击H' + current_player + ' ' +deposit_0)
    if (current_player == 0 && deposit_0 == 0  && this.data.player_0_heart > 0){
        take_poke = 1
        var t_player_0_heart = this.data.player_0_heart - 1
        this.setData({
            player_0_heart: t_player_0_heart
        })
        tmp_ty = 'H'
        tmp_num = heart_0[t_player_0_heart]
        this.take_from_inside(0)
    }
  },

  //玩家0的点击C事件
  player0_C(){
    console.log('玩家0点击C' + current_player + ' ' +deposit_0)
    if (current_player == 0 && deposit_0 == 0 && this.data.player_0_club > 0){
        take_poke = 2
        var t_player_0_club = this.data.player_0_club - 1
        this.setData({
            player_0_club: t_player_0_club
        })
        tmp_ty = 'C'
        tmp_num = club_0[t_player_0_club]
        this.take_from_inside(0)
    }
  },

  //玩家0的点击D事件
  player0_D(){
    console.log('玩家0点击D' + current_player + ' ' +deposit_0)
    if (current_player == 0 && deposit_0 == 0 && this.data.player_0_diamond > 0){
        take_poke = 3
        var t_player_0_diamond = this.data.player_0_diamond - 1
        this.setData({
            player_0_diamond: t_player_0_diamond
        })
        tmp_ty = 'D'
        tmp_num = diamond_0[t_player_0_diamond]
        this.take_from_inside(0)
    }
  },

  //玩家0的点击卡组事件
  get_poke(){
    console.log('get_poke玩家点击卡组' + current_player + ' ' +deposit_0)
    if (current_player == 0 && deposit_0 == 0){
        this.tell_0()
    }
  },

  //玩家0切换托管
  change_robot_0(){
    console.log('玩家0点击托管机器人' + deposit_0)
    if (deposit_0 == 1){
        deposit_0 = 0
        this.setData({
            robort_url_0: '/image/icon/robort.jpg',
            robot: false
        })
    }  
    else{
        deposit_0 = 1
        this.setData({
            robort_url_0: '/image/icon/robort_hover.jpg',
            robot: true
        })
    }  
  },
 //结束时获取对局信息
 get_info:function(){
     console.log("get_info")
    var that = this
    wx.request({
        url: 'http://172.17.173.97:9000/api/game/' + app.globalData.uuid ,
        method: "GET",
        header: {
            "Authorization": wx.getStorageSync('token')
        },
        data: {
        },
        success: res => {
            console.log(res)
            if(res.data.code != 401){
                app.globalData.winner = res.data.data.winner
                wx.setStorageSync('winner', res.data.data.winner)
                wx.navigateTo({
                    url: '/pages/gameover/gameover',
               })
            }
         }
    })
 },


  //获取上步操作
  get_last: function(){
    var op_ty
    current_player = 1
    var that = this
    this.data.interval = setInterval(function () {
        console.log('在线对战循环')
        current_player = 1
        wx.request({
            url: 'http://172.17.173.97:9000/api/game/' + app.globalData.uuid + '/last',
            method: "GET",
            header: {
                "Authorization": wx.getStorageSync('token')
            },
            data: {
            },
            success: res => {
                console.log(res)
                if(res.data.code == 400){
                    clearInterval(that.data.interval)
                    that.get_info()
                    //that.judge_winner()
                }
                if(res.data.data.your_turn == true){
                    current_player = 0
                    clearInterval(that.data.interval)
                    console.log('为我的轮次')
                    that.setData({
                        msg: '己方回合'
                    })
                    //记录上步操作
                    var info = res.data.data.last_code
                    console.log('拿到对方的操作为：' + info)
                    if (info.length != 0){
                        current_player = 1
                        tmp_ty = info[4]
                        tmp_num = info[5]
                        op_ty = info[2]
                        console.log("拿到对方操作")
                        console.log(op_ty)
                        console.log(tmp_ty)
                        console.log(tmp_num)
                        if (info.length == 7)  tmp_num += info[6]
                        if (op_ty == '0')  that.take_from_outside()
                        else  that.take_from_inside(1)
                    }
                }
                else{
                    that.setData({
                        msg: '对方回合'
                    })
                }
            },
            fail: res => {
                console.log("123456" )
                console.log(res)
            }
        })
    },1000)
    this.get_info()
    console.log('退出循环')
    //记录玩家1的操作
    current_player = 0;
    if (deposit_0 == 1)  this.AI_robot()
  },

  onLoad: function (options) {
    watch.setWatcher(this)
    this.get_last()
  },

  onHide: function(options) {
      clearInterval(this.data.interval)
  }
}) 