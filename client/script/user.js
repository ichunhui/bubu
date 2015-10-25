//用户界面的脚本逻辑
(function($){
	//判断是否登录---------------------------------------------------------------------------
	function hasLogin(){
		if(localStorage.getItem('hasLogin') == 1){
			$("#username").html('已登录');
			$(".login").removeClass('login');
			$(".logout").addClass('active');
		}
		return;
	}

	//frame切换相关 start--------------------------------------------------------------------
	//页面载入初始化部分
	apiready = function(){
		//防止StatusBar与header部分重叠
        $api.fixStatusBar( $api.dom('header') );

        //设定StatusBar的样式
        api.setStatusBarStyle({
            style: 'dark',
            color: '#6ab494'
        });

        InitFrameGroup();      //采用apicloud进行状态栏与frame的初始化
        hasLogin();
	}

	//frame group的初始化（用户相关）
	function InitFrameGroup(){
		var frames = [];
		//个人信息查看与修改界面
		frames.push({
			name: 'info',
			url: './html/user_frames/info.html',
			bounces: true
		});

		//关注的活动界面
		frames.push({
			name: 'activity',
			url: './html/user_frames/activity.html',
			bounces: true
		});

		//关注的人
		frames.push({
			name: 'friend',
			url: './html/user_frames/friend.html',
			bounces: true
		});

		api.openFrameGroup({
            name: 'user_group',    //frame group的名称
            scrollEnabled: false,   //是否能左右滚动
            rect: {                 //该frame group中的frame在屏幕中显示的位置
                x: 0, 
                y: $api.offset($api.dom('#main')).t, 
                w: api.winWidth, 
                h: $api.dom('#main').offsetHeight
            },
            index: 0,               //默认显示的frame,可从0开始
            frames: frames          //frames
        }, function(ret, err){

        });
	}

	//切换相应的frame(info、activity、friend)
	$(".user-nav li").click(function(){
		if(this == $api.dom('.user-nav li.active')) return;

		//样式变换
		$(".user-nav li").removeClass('active');
		$(this).addClass('active');

		//frame切换
		var index = $(this).index();
		api.setFrameGroupIndex({
            name: 'user_group',
            index: index,
            reload: true
        });
	});

	//frame切换相关 end--------------------------------------------------------------------

	//页面切换相关 start-------------------------------------------------------------------
	//关闭窗口
	$(".back").click(function(){
		api.closeWin();
	});

	//切换到登录界面
	$(".login").click(function(){
		api.openWin({
			name: 'login',
			url: './html/user_login/user_login.html'
		});
	});

	//切换到登出界面
	$(".logout").click(function(){
		localStorage.setItem('hasLogin', 0);
		api.openWin({
			name: 'user',
			url: './user.html',
			reload: true
		});
	});

	//页面切换相关 end---------------------------------------------------------------------

})(jQuery);
