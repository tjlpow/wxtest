var postsData = require('../../../data/posts-data.js')
var App = getApp();
Page({
    data: {
        isMusicPlay: false
    },

    onLoad: function (event) {

        
        var postId = event.id;
        this.data.currentPostId = postId;
        var postData = postsData.postsList[postId]
        this.setData({ postData: postData })

        var collectStorage = wx.getStorageSync('collectState');
        if (collectStorage) {
            var collectState = collectStorage[postId];
            this.setData({ collectState: collectState });
        }
        else {
            var collectStorage = { postId: false };
            wx.setStorageSync('collectState', collectStorage);
            this.setData({ collectState: false });
        }
        
        this.setMusicMonitor();

        if (App.globalData.g_isMusicPlay) {
            this.setData({
                isMusicPlay:true
            })
        }

    },

    setMusicMonitor: function (event) {
        //同步全局音乐播放器与页面音乐播放器
        var that = this;
        wx.onBackgroundAudioPlay(function () {
            that.setData({
                isMusicPlay: true
            });
            App.globalData.g_isMusicPlay = true;
        })
        wx.onBackgroundAudioPause(function () {
            that.setData({
                isMusicPlay: false
            })
            App.globalData.g_isMusicPlay = false;
        })
    },

    onCollectTap: function (event) {
        var collectStorage = wx.getStorageSync('collectState');
        var collectState = collectStorage[this.data.currentPostId];
        collectState = !collectState;
        collectStorage[this.data.currentPostId] = collectState;
        wx.setStorageSync('collectState', collectStorage);
        this.setData({ collectState: collectState });
    },


    onMusicTap: function (event) {
        var that = this;
        if (this.data.isMusicPlay) {
            wx.pauseBackgroundAudio()

            that.setData({
                isMusicPlay: false
            })

        }

        else {
            wx.playBackgroundAudio({
                dataUrl: postsData.postsList[this.data.currentPostId].music.dataUrl,
                title: '歌名',
                coverImgUrl: postsData.postsList[this.data.currentPostId].music.coverImgUrl
            })

            that.setData({
                isMusicPlay: true
            })
        }

    }

})