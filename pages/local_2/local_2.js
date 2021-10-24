const app = getApp()
var types = ["H", "S", "D", "C"] // 花色
var points = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"] // 点数

var current_player = 0 //当前轮到的玩家
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

var deposit_0 = 0  //玩家0的托管状态
var deposit_1 = 0  //玩家1的托管状态

var tmp_ty = ''   //从服务器处获取的牌的花色
var tmp_num = ''  //从服务器处获取的牌的数字

Page({
  data: {
    //当前玩家
    ch_current_player:'',
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
    console.log('top_poke: ' + top_poke)
    console.log('take_poke: ' +take_poke)
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
    this.judge_game_over()
  },

  //将所抽取的牌放入卡池区
  add_pool: function(){
    var tmp_pool_tot = this.data.pool_tot
    this.setData({
        pool_tot: tmp_pool_tot + 1
    })
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
    //将新抽取的牌放入卡池区
    this.add_pool()
    //判断所出牌与卡池区顶部花色是否一致
    this.judge_type()
  },

  //玩家从卡组中抽取          0,1  'S','H','C','D'  'A','2','3'...
  take_from_outside: function(){
    //更新卡组、卡池区牌总数
    var tmp_left_tot = this.data.left_tot
    this.setData({
        left_tot: tmp_left_tot - 1
    })
    if (tmp_ty == 'S')  take_poke = 0
    else if (tmp_ty == 'H')  take_poke = 1
    else if (tmp_ty == 'C')  take_poke = 2
    else  take_poke = 3
    this.add_pool()
    this.judge_type()
  },

  //托管
  robot: function(){
    var that = this
    console.log("机器人出牌")
    var tmp = [that.data.player_1_spade, that.data.player_1_heart, that.data.player_1_club, that.data.player_1_diamond]
    console.log('打印托管函数中的tmp数组：' + tmp)
    console.log('黑桃：' + that.data.player_1_spade)
    console.log('红心：' + that.data.player_1_heart)
    console.log('梅花：' + that.data.player_1_club)
    console.log('方块：' + that.data.player_1_diamond)
    var maxi = -1, maxn = -1
    for(var i = 0; i < 4; i ++){
        if(tmp[i] > maxn){
            maxn = tmp[i]
            maxi = i
        }
    }
    console.log('maxn : ' + maxn)
    if(maxn == 0)  that.take_from_outside();
    else{
        if(maxi == 0){
            take_poke = 0
            var t_player_1_spade = that.data.player_1_spade - 1
            that.setData({
                player_1_spade: t_player_1_spade
            })
            tmp_ty = 'S'
            tmp_num = spade_1[t_player_1_spade]
        }  
        else if (maxi == 1){
            take_poke = 1
            var t_player_1_heart = that.data.player_1_heart - 1
            that.setData({
                player_1_heart: t_player_1_heart
            })
            tmp_ty = 'H'
            tmp_num = heart_1[t_player_1_heart]
        }
        else if (maxi == 2){
            take_poke = 2
            var t_player_1_club = that.data.player_1_club - 1
            that.setData({
                player_1_club: t_player_1_club
            })
            tmp_ty = 'C'
            tmp_num = club_1[t_player_1_club]
        }
        else{
            take_poke = 3
            var t_player_1_diamond = that.data.player_1_diamond - 1
            that.setData({
                player_1_diamond: t_player_1_diamond
            })
            tmp_ty = 'D'
            tmp_num = diamond_1[t_player_1_diamond]
        }
        that.take_from_inside(1)
    }
  },

  //判断对局是否结束
  judge_game_over: function(){
    var that = this
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
    else{
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
            
            setTimeout(function() {
                that.robot()
             }, 2000);
            
        }  
    }
  },

  //玩家0的点击S事件
  player0_S(){
    console.log('玩家0点击S' + current_player)
    if (current_player == 0 && this.data.player_0_spade > 0){
        take_poke = 0
        var t_player_0_spade = this.data.player_0_spade - 1
        tmp_ty = 'S'
        tmp_num = spade_0[t_player_0_spade]
        console.log(tmp_ty)
        console.log(tmp_num)
        this.setData({
            player_0_spade: t_player_0_spade
        })
        this.take_from_inside(0)
    }
  },

  //玩家0的点击H事件
  player0_H(){
    console.log('玩家0点击H' + current_player)
    if (current_player == 0 && this.data.player_0_heart > 0){
        take_poke = 1
        var t_player_0_heart = this.data.player_0_heart - 1
        tmp_ty = 'H'
        tmp_num = heart_0[t_player_0_heart]
        console.log(tmp_ty)
        console.log(tmp_num)
        this.setData({
            player_0_heart: t_player_0_heart
        })
        this.take_from_inside(0)
    }
  },

  //玩家0的点击C事件
  player0_C(){
    console.log('玩家0点击C' + current_player)
    if (current_player == 0 && this.data.player_0_club > 0){
        take_poke = 2
        var t_player_0_club = this.data.player_0_club - 1
        tmp_ty = 'C'
        tmp_num = club_0[t_player_0_club]
        console.log(tmp_ty)
        console.log(tmp_num)
        this.setData({
            player_0_club: t_player_0_club
        })
        this.take_from_inside(0)
    }
  },

  //玩家0的点击D事件
  player0_D(){
    console.log('玩家0点击D' + current_player)
    if (current_player == 0 && this.data.player_0_diamond > 0){
        take_poke = 3
        var t_player_0_diamond = this.data.player_0_diamond - 1
        tmp_ty = 'D'
        tmp_num = diamond_0[t_player_0_diamond]
        console.log(tmp_ty)
        console.log(tmp_num)
        this.setData({
            player_0_diamond: t_player_0_diamond
        })
        this.take_from_inside(0)
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

    //玩家的点击卡组事件
  get_poke(){
    if (current_player == 0){
        console.log('玩家点击卡组' + current_player)
        var tmp = cards[52 - this.data.left_tot]
        console.log('tmppppppppp:' + tmp)
        tmp_ty = tmp[0]
        tmp_num = tmp[1]
        if (tmp.length == 3)  tmp_num += tmp[2]
        this.take_from_outside(tmp_ty, tmp_num)
    }
  },

  onLoad: function (options) {
    app.globalData.owner = 1
    wx.setStorageSync('owner', 1)  
    this.init()
   },
}) 