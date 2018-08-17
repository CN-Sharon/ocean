$(function(){

	/*二级导航栏的出现与隐藏---开始*/
	var $a=$(".biglogo .logonav .navlist a");
	var arrZh=[];//保存原先的导航词
	var arrEn=['FASHION','BEAUTY','STAR','LOHAS','PLASTIC','VIDEO','MODERN'];
	var index=0;
	var $logonav_sub=$(".logonav-sub");
	var $logonav_subLi=$(".logonav-sub li");
	var $logonav=$("logonav");

	$a.each(function(){//遍历
		arrZh.push( $(this).html() );
	});

	//鼠标移入导航
	$a.mouseenter(function(){
		$a.eq(index).html(arrZh[index]).removeClass("hover");
		index=$(this).index(".navlist a");
		// console.log(index)
		$(this).addClass("hover").html( arrEn[index] );
		$logonav_sub.slideDown();
		$logonav_subLi.eq(index).show().siblings().hide();
	});

	//鼠标从二级导航移开，执行
	$logonav_sub.mouseleave(function(){
		$(this).stop().slideUp();
		$a.removeClass('hover');
		$a.eq(index).html( arrZh[index] );
	});

	$logonav.mouseleave(function(){
		$logonav_sub.stop().slideUp();
		$a.removeClass('hover');
		$a.eq(index).html( arrZh[index] );
	});

	//搜索按钮

	$(".search .search-bg").click(function(){
		//获取焦点
		$(this).css('background-position','0 660px');
		$('.search .text').css('display','block').animate({'width':'140px'});
		$('.search .text').focus();
			
	});

	//失去焦点
	$(".search .text").blur(function(){
		$(this).animate({width:0},200,function(){
			$(".search .search-bg").css('background-position','0 620px');
			$(this).css('display','none');
			// $(".search .search-bg input").css('width','0');
		})
	});

	/*轮播图--开始*/
	bannerAuto($('.bigbanner .tab a'),$('.bigbanner .pic ul'),$('.bigbanner .btn a'),$('.bigbanner .banner'),"hover",$('.bigbanner .pic'),3000);
	bannerAuto($('.todayFocus .tab a'),$('.todayFocus .pic ul'),$('.todayFocus .btn a'),$('.todayFocus .banner'),"hover",$('.todayFocus .pic'),2000);
	bannerAuto($('.mod-slide .tab a'),$('.mod-slide .pic ul'),$('.mod-slide .btn a'),$('.mod-slide .banner'),"hover",$('.mod-slide .pic'),3000);
	bannerAuto($('.fashion .tab a'),$('.fashion .pic ul'),$('.fashion .btn a'),$('.fashion .banner'),"hover",$('.fashion .pic'),3000);
	bannerAuto($('.beauty .tbody .tbody-left .tab a'),$('.beauty .tbody .tbody-left .pic ul'),$('.beauty .tbody .tbody-left .btn a'),$('.beauty .tbody .tbody-left .banner'),"hover",$('.beauty .tbody .tbody-left .pic'),3000);
	bannerAuto($('.beauty .tbody .tbody-right .tab a'),$('.beauty .tbody .tbody-right .pic ul'),$('.beauty .tbody .tbody-right .btn a'),$('.beauty .tbody .tbody-right .banner'),"hover",$('.beauty .tbody .tbody-right .pic'),3000);
	bannerAuto($('.beauty .tfoot .tab a'),$('.beauty .tfoot .pic ul'),$('.beauty .tfoot .btn a'),$('.beauty .tfoot .banner'),"hover",$('.beauty .tfoot .pic'),3000);
	bannerAuto($('.lohas .tab a'),$('.lohas .pic ul'),$('.lohas .btn a'),$('.lohas .banner'),"hover",$('.lohas .pic'),3000);
	bannerAuto($('.plastic .tbody-left .tab a'),$('.plastic .tbody-left .pic ul'),$('.plastic .tbody-left .btn a'),$('.plastic .tbody-left .banner'),"hover",$('.plastic .tbody-left .pic'),3000);
	bannerAuto($('.plastic .tbody-right .tab a'),$('.plastic .tbody-right .pic ul'),$('.plastic .tbody-right .btn a'),$('.plastic .tbody-right .banner'),"hover",$('.plastic .tbody-right .pic'),3000);
	bannerAuto($('.modern .tbody-top .tab a'),$('.modern .tbody-top .pic ul'),$('.modern .tbody-top .btn a'),$('.modern .tbody-top .banner'),"hover",$('.modern .tbody-top .pic'),3000);
	bannerAuto($('.modern .tbody-bottom .tab a'),$('.modern .tbody-bottom .pic ul'),$('.modern .tbody-bottom .btn a'),$('.modern .tbody-bottom .banner'),"hover",$('.modern .tbody-bottom .pic'),3000);
	bannerAuto($('.choice .tab a'),$('.choice .pic ul'),$('.choice .btn a'),$('.choice .banner'),"hover",$('.choice .pic'),3000);
	

	//图片轮播
	function bannerAuto($tabA, $wrapUl, $btnA, $box, event, $width,T){
		var index1=0;
		var nowDate = new Date();
		var timer=null;
		var picWidth=$width.width();

		//点击圆点
		$tabA[event](function(){
			index1=$(this).index();
			$(this).addClass('on').siblings().removeClass('on');
			$wrapUl.animate({"marginLeft":(-picWidth*(index1+1))},500);
		});
		//点击按钮
		$btnA.click(function(){
			if( new Date() - nowDate > 600){
				nowDate=new Date();
				var n=$(this).index(); //0左边 1右边
				n ? index1++ : index1--;
				play();
			}
			
		});

		timeAuto();

		$box.hover(function(){//移入
			clearInterval(timer);
		},function(){ //移出
			timeAuto();
		});

		//定时器
		function timeAuto(){
			timer=setInterval(function(){
				index1++;
				play();

			},T);
		}
		function play(){
			var btnIndex=index1;
			if(btnIndex == $tabA.length){
				btnIndex=0;
			}else if(btnIndex < 0){
				btnIndex=$tabA.length-1;
			}
			$tabA.eq(btnIndex).addClass('on').siblings().removeClass('on');
			$wrapUl.animate({"marginLeft":(-picWidth*(index1+1))},500,function(){
				if(index1==$tabA.length){
					$wrapUl.css('marginLeft',-picWidth);
					index1=0;
				}else if(index1 < 0 ){
					$wrapUl.css('marginLeft',(-picWidth*($tabA.length)));
					index1=$tabA.length-1;
				}
			});
		}
	}
	

	//今日焦点

	todayFocus($(".txtList .listContent li"),$(".txtList .listContent ul"),
		$(".txtList .listContent"));

	function todayFocus(txtLi,txtUl,txtBox){
		var index2=0;
		var timer=null;
		
		timeAuto();
		function timeAuto(){
			timer=setInterval(function(){
				index2++;
				play();
			},2000);
		}
		function play(){
			txtUl.animate({"marginTop":-28*index2},500,function(){
				if(index2==txtLi.length){
					index2=0;
					txtUl.css("marginTop",0+"px");
				}
			});
		}
		txtBox.hover(function(){
			clearInterval(timer);
		},function(){
			timeAuto();
		});
	}

	//大明星淡入淡出
	var index3=0;
	var timer3=null;
	var $slidewrap=$('.star .slidewrap');
	var $smallimg=$('.star .slidewrap .smallimg');
	var $smallimgLi=$('.star .slidewrap .smallimg li');
	var $picLi=$('.star .slidewrap .pic li');
	var $tabA=$('.star .slidewrap .tab a');

	$slidewrap.hover(function(){
		$smallimg.stop().animate({"bottom" : "0"},500);
		$smallimg.css("display","block");
	},function(){
		$smallimg.stop().animate({"bottom" : "-94"},500);
	});
	$smallimgLi.mouseenter(function(){
		index3=$(this).index();
		$picLi.eq(index3).fadeIn(1000).siblings().fadeOut(1000);
		$tabA.eq(index3).addClass('on').siblings().removeClass('on');
	});
	$slidewrap.hover(function(){
		clearInterval(timer3);
	},function(){
		timer3=setInterval(function(){
			index3++;
			index3 %= 5;
			$tabA.eq(index3).addClass('on').siblings().removeClass('on');
			$picLi.eq(index3).fadeIn(1000).siblings().fadeOut(1000);
		},2000);
	});
	



	//视觉
	var num=0;
	var i=0;
	var arrVisual=[];
	var aW=0;
	var aH=0;
	function Random(n){
		var m=parseInt(Math.random()*n);
		return m;
	}

	$('.visual .tbody .hover').hover(function(){//鼠标移入
		aW = $(this).width();
		aH = $(this).height();

		arrVisual=[{
			"top" : -aH + 'px',
			"opacity" : '0'
		},{
			"top" : aH + 'px' ,
			"opacity" : '0'
		},{
			"left" : -aW + 'px' ,
			"opacity" : '0'
		},{
			"left" : aW + 'px' ,
			"opacity" : '0'
		}

		];

		$(this).find('a:last span').animate({bottom:0},500);
			
	},function(){  //鼠标移出
		i=Random(4);
		$(this).find('a:last span').animate({bottom:-65},500);
		$(this).find('a:last').animate(arrVisual[i],500,function(){
			$(this).css({"top" : "0" , "left": "0" , "opacity" : "1" });
			$(this).prependTo($(this).parent());

		});
	});


	//选项卡
	TabAuto($('.baike .thead .navlist a') , 'mouseenter' ,$('.baike .tbody .tab-box'));
	TabAuto($('.recommend .tbody-left .tab-box .tab a') , 'hover' ,$('.recommend .tbody-left .tab-box .box a'));
	TabAuto($('.recommend .tbody-center .li-box .li a') , 'hover' ,$('.recommend .tbody-center .li-box .box .slide'));

	function TabAuto($tabA , event , $tabBox){
		var index4=0;
		$tabA[event](function(){
			index4=$(this).index();
			$(this).addClass("on").siblings().removeClass("on");
			$tabBox.eq(index4).show().siblings().hide();
		});	
	}


	//楼梯式导航
	$(".StairNav .StairMenu").hover(function(){
		$(".StairNav .sideNav").fadeIn();
	},function(){
		$(".StairNav .sideNav").fadeOut();
	});

	$(".StairNav .sideNav").hover(function(){
		$(this).stop();
	},function(){
		$(this).fadeOut();
	});
	$(".StairNav .list").click(function(){
		var index = $(this).index() / 2;
		$(this).addClass("active").siblings().removeClass("active");
		var sTop = $(".Stair").eq(index).offset().top;
		$("html,body").animate({scrollTop:sTop},500);
	});
	$(".StairNav .to-top").click(function(){
		$("html,body").animate({scrollTop:0},1000);
	});


});

