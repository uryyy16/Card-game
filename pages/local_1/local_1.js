const app = getApp()
var types = ["H", "S", "D", "C"] // 花色
var points = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"] // 点数

var current_player = -1 //当前轮到的玩家
var cards = [] // 所有扑克牌
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

var tmp_ty = ''   //从服务器处获取的牌的花色
var tmp_num = ''  //从服务器处获取的牌的数字


var a
Page({
  data: {
    //打印提示信息
    msg:'玩家一',
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
    interval: 0
  },

  //随机52张牌
  init: function(){
      // 遍历所有花色与点数
      for (var i in types) 
        for (var j in points) 
          cards.push(types[i] + points[j])
      // 洗牌
      // 遍历 cards 数组
      for (var i = 0, len = cards.length; i < len; i++) {
        // 生成一个随机的数组下标(0~51)
        var index = Math.floor(Math.random() * len);
        // 将当前遍历到的元素与随机下标处的元素交换位置
        var tmp = cards[i];
        cards[i] = cards[index];
        cards[index] = tmp;
      }
      console.log(cards);
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
            msg: '玩家一'
        })
    }  
    else{
        current_player = 1
        this.setData({
            msg: '玩家二'
        })
    }  
    this.judge_game_over()
  },

  //将所抽取的牌放入卡池区
  add_pool: function(ty, num){
    var tmp_pool_tot = this.data.pool_tot
    this.setData({
        pool_tot: tmp_pool_tot + 1
    })
    if (ty == 'S'){
        pool_spade[pool_spade_num] = num
        pool_spade_num ++
        take_poke = 0
        this.setData({
            top_poke_url: '/image/poke/spade.jpg'
        })
    }
    else if (ty == 'H'){
        pool_heart[pool_heart_num] = num
        pool_heart_num ++
        take_poke = 1
        this.setData({
            top_poke_url: '/image/poke/heart.jpg'
        })
    }
    else if (ty == 'C'){
        pool_club[pool_club_num] = num
        pool_club_num ++
        take_poke = 2
        this.setData({
            top_poke_url: '/image/poke/club.jpg'
        })
    }
    else{
        pool_diamond[pool_diamond_num] = num
        pool_diamond_num ++
        take_poke = 3
        this.setData({
            top_poke_url: '/image/poke/diamond.jpg'
        })
    }
  },

  //玩家从手牌中抽取          0,1  'S','H','C','D'
  take_from_inside: function(player, ty, num){
    //将新抽取的牌放入卡池区
    this.add_pool(ty, num)
    //判断所出牌与卡池区顶部花色是否一致
    this.judge_type()
  },

  //玩家从卡组中抽取          0,1  'S','H','C','D'  'A','2','3'...
  take_from_outside: function(ty, num){
    //更新卡组、卡池区牌总数
    var tmp_left_tot = this.data.left_tot
    this.setData({
        left_tot: tmp_left_tot - 1
    })
    if (ty == 'S')  take_poke = 0
    else if (ty == 'H')  take_poke = 1
    else if (ty == 'C')  take_poke = 2
    else  take_poke = 3
    this.add_pool(ty, num)
    this.judge_type()
  },

  //判断对局是否结束
  judge_game_over: function(){
    if (this.data.left_tot == 0){
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
    }
  },

  //玩家0的点击S事件
  player0_S(){
    console.log('玩家0点击S' + current_player)
    if (current_player == 0 && this.data.player_0_spade > 0){
        take_poke = 0
        var t_player_0_spade = this.data.player_0_spade - 1
        this.setData({
            player_0_spade: t_player_0_spade
        })
        this.take_from_inside(0, 'S', spade_0[t_player_0_spade])
    }
  },

  //玩家0的点击H事件
  player0_H(){
    console.log('玩家0点击H' + current_player)
    if (current_player == 0 && this.data.player_0_heart > 0){
        take_poke = 1
        var t_player_0_heart = this.data.player_0_heart - 1
        this.setData({
            player_0_heart: t_player_0_heart
        })
        this.take_from_inside(0, 'H', heart_0[t_player_0_heart])
    }
  },

  //玩家0的点击C事件
  player0_C(){
    console.log('玩家0点击C' + current_player)
    if (current_player == 0 && this.data.player_0_club > 0){
        take_poke = 2
        var t_player_0_club = this.data.player_0_club - 1
        this.setData({
            player_0_club: t_player_0_club
        })
        this.take_from_inside(0, 'C', club_0[t_player_0_club])
    }
  },

  //玩家0的点击D事件
  player0_D(){
    console.log('玩家0点击D' + current_player)
    if (current_player == 0 && this.data.player_0_diamond > 0){
        take_poke = 3
        var t_player_0_diamond = this.data.player_0_diamond - 1
        this.setData({
            player_0_diamond: t_player_0_diamond
        })
        this.take_from_inside(0, 'D', diamond_0[t_player_0_diamond])
    }
  },

  //玩家1的点击S事件
  player1_S(){
    console.log('玩家1点击S' + current_player)
    if (current_player == 1 && this.data.player_1_spade > 0){
        take_poke = 0
        var t_player_1_spade = this.data.player_1_spade - 1
        this.setData({
            player_1_spade: t_player_1_spade
        })
        this.take_from_inside(1, 'S', spade_1[t_player_1_spade])
    }
  },

  //玩家1的点击H事件
  player1_H(){
    console.log('玩家1点击H' + current_player)
    if (current_player == 1 && this.data.player_1_heart > 0){
        take_poke = 1
        var t_player_1_heart = this.data.player_1_heart - 1
        this.setData({
            player_1_heart: t_player_1_heart
        })
        this.take_from_inside(1, 'H', heart_1[t_player_1_heart])
    }
  },

  //玩家1的点击C事件
  player1_C(){
    console.log('玩家1点击C' + current_player)
    if (current_player == 1 && this.data.player_1_club > 0){
        take_poke = 2
        var t_player_1_club = this.data.player_1_club - 1
        this.setData({
            player_1_club: t_player_1_club
        })
        this.take_from_inside(1, 'C', club_1[t_player_1_club])
    }
  },

  //玩家1的点击D事件
  player1_D(){
    console.log('玩家1点击D' + current_player)
    if (current_player == 1 && this.data.player_1_diamond > 0){
        take_poke = 3
        var t_player_1_diamond = this.data.player_1_diamond - 1
        this.setData({
            player_1_diamond: t_player_1_diamond
        })
        this.take_from_inside(1, 'D', diamond_0[t_player_1_diamond])
    }
  },

  //玩家的点击卡组事件
  get_poke(){
    console.log('玩家点击卡组' + current_player)
    var tmp = cards[52 - this.data.left_tot]
    console.log('tmppppppppp:' + tmp)
    tmp_ty = tmp[0]
    tmp_num = tmp[1]
    if (tmp.length == 3)  tmp_num += tmp[2]
    this.take_from_outside(tmp_ty, tmp_num)
  },

  onLoad: function (options) {
    current_player = 0
    this.init()
   },
}) 