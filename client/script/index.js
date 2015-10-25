//首页的脚本逻辑
(function($){

    //frame切换相关 start---------------------------------------------------
    //apiready是该window创建或者reload时触发
	apiready = function () {
        //防止StatusBar与header部分重叠
        $api.fixStatusBar( $api.dom('header') );

        //设定StatusBar的样式
        api.setStatusBarStyle({
            style: 'dark',
            color: '#6ab494'
        });

        InitFrameGroup();      //采用apicloud进行状态栏与frame的初始化
    }

    //frame group的初始化（首页相关）
    function InitFrameGroup(){
        var frames = [];
        //附近搜索界面
        frames.push({
            name: 'location',
            url: './html/index_frames/location.html',
            bounces: true
            //bgColor : 'rgba(255,0,0,.2)'
        });

        //首页界面
        frames.push({
            name: 'home',
            url: './html/index_frames/home.html',
            bounces: true
        });

        //消息界面
        frames.push({
            name: 'message',
            url: './html/index_frames/message.html',
            bounces: true
        });

        api.openFrameGroup({
            name: 'index_group',    //frame group的名称
            scrollEnabled: false,   //是否能左右滚动
            rect: {                 //该frame group中的frame在屏幕中显示的位置
                x: 0, 
                y: $api.dom('header').offsetHeight, 
                w: api.winWidth, 
                h: $api.dom('#main').offsetHeight
            },
            index: 1,               //默认显示的frame,可从0开始
            frames: frames          //frames
        }, function(ret, err){

        });
    }

    //切换frame的实现
    var frame_title = ['搜索附近', '创业者平台', '最新消息'];

    $("#footer li").click(function(){
        if( this == $api.dom('#footer li.active') )return;

        //样式变换
        $("#footer li").removeClass('active');
        $(this).addClass('active');

        //frame切换
        var index = $(this).index();
        api.setFrameGroupIndex({
            name: 'index_group',
            index: index
        });

        //标题切换
        $("header .logo p").html(frame_title[index]);
    });

    //frame切换相关 end---------------------------------------------------

    //切换到其他界面的处理 start----------------------------------------------------------
    //切换到用户管理界面
    $(".user").click(function(){
        api.openWin({
            name: 'user',
            url: './user.html',
        });
    });

})(jQuery);