var postsData = require('../../data/posts-data.js')

Page({
    data: {
    
    },

    onLoad: function (event) {
        this.setData(postsData)
    },

    onPostTap:function(event){
        var postId = event.currentTarget.dataset.postid;
        wx.navigateTo({
          url: 'post-detail/post-detail?id=' + postId
        })
    },

    onSwiperTap:function(event){
        var postId = event.target.dataset.postid;
        wx.navigateTo({
          url: 'post-detail/post-detail?id=' + postId
        })
    }
})