$(function(){
//head文字输出
    var $text_t = $("div.h_text span.text_t").text();
    var $text_b = $("div.h_text span.text_b").text();
    var i=0,j=0;
    var timer = null,timer1 = null;
    timer = setInterval(function(){
        var str = $text_t.substr(0,i);
        $("div.h_text span.text_t").show();
        $("div.h_text span.text_t").html(str + "_");
        i++;
        if( i > $text_t.length ){
            clearInterval(timer);
            $("div.h_text span.text_t").html(str + "");
            timer1 = setInterval(function(){
                str = $text_b.substr(0,j);
                $("div.h_text span.text_b").show();
                $("div.h_text span.text_b").html(str + "_");
                j++;
                if( j > $text_b.length ){
                    clearInterval(timer1);
                    $("div.h_text span.text_b").html(str + "");
                }
            },300);
        }
    },300);
    });
//canvas背景
var canvas=document.querySelector("#bubble");
          var w,h;
          var aColor=["#99CCCC","#FF9999","#CC9999","#993366","#666699"]
          var aBubble=[];
          ~~function setSize(){
            window.onresize=arguments.callee;
            w=window.innerWidth;
            h=window.innerHeight;
            canvas.width=w;
            canvas.height=h;
          }();
          var canCon=canvas.getContext("2d");
          function random(min,max){
            return Math.random()*(max-min)+min;
          }
          function Bubble(){};
          Bubble.prototype={
            init:function(){
                this.x=random(0,w);
                this.y=random(0,h);
                this.r=random(1,5);
                this.color=aColor[Math.floor(random(0,5))];
                this.mx=random(-2,2);
                this.my=random(-2,2);
            },
            draw:function(){
               canCon.beginPath();
               canCon.fillStyle=this.color;
               canCon.arc(this.x,this.y,this.r,0,Math.PI*2);
               canCon.fill();
            },
            move:function(){
                this.x+=this.mx;
                this.y+=this.my;
                if(this.x-this.r<0||this.x+this.r>w){
                    this.mx=-this.mx;
                }
                if(this.y-this.r<0||this.y+this.r>h){
                    this.my=-this.my;
                }
                this.draw();
            }
          }
          function create(num){
            for(var i=0;i<num;i++){
                 var bubble=new Bubble();
                 bubble.init();
                 bubble.draw();
                 aBubble.push(bubble);
                }
            }
      create(666);
      setInterval(function(){
        canCon.clearRect(0,0,w,h);
         for(var item of aBubble){
            item.move();
         }
      },1000/60);
//轮播图
$(function (){
        var num = 0;
        $("#j_silder_outer .img-item").each(function(index, el) {
            $(this).css({
                "left":$(this).width() * index + "px",
                /*让每个img-item延时一定时间执行动画*/
                "transitionDelay": index * 0.3 + "s"
            });
            $(this).find(".img").css({
                "backgroundPosition": -$(this).width() * index + "px"
            });;
        });

        $(".prev").on("click",function (){
            $("#j_silder_outer .img-item").css("transform", "rotateX(" + (++num * 90) + "deg)");
        });

        $(".next").on("click",function (){
            $("#j_silder_outer .img-item").css("transform", "rotateX(" + (--num * 90) + "deg)");
        });

        var timejg=4000;//轮播间隔时间
        var time = setInterval(move,timejg);
        function move(){
            $("#j_silder_outer .img-item").css("transform", "rotateX(" + (--num * 90) + "deg)");
        }
        $('.slider-outer').hover(function(){
            clearInterval(time);
        },function(){
            time = setInterval(move,timejg);
        });


    });
//返回顶部功能
// document.getElementById("flybtn").onclick=function back(){
//     flybtn.scrollIntoView();
// }
var timer = null;
flybtn.onclick = function back(){
cancelAnimationFrame(timer);
timer = requestAnimationFrame(function fn(){
var oTop = document.body.scrollTop || document.documentElement.scrollTop;
if(oTop > 0){
document.body.scrollTop = document.documentElement.scrollTop = oTop - 30;
timer = requestAnimationFrame(fn);
}else{
cancelAnimationFrame(timer);
}
});
};
window.onscroll=function (){
    var t=document.body.scrollTop || document.documentElement.scrollTop;
    var flybtn=document.getElementById("flybtn");
    if(t<100){
        flybtn.style.display="none";
    }else{
        flybtn.style.display="block";
    };
//导航栏出现消失
    // var t=document.body.scrollTop || document.documentElement.scrollTop;
    var header=document.getElementById("header");
    if(t<100){
        header.style.display="block";
    }else{
        header.style.display="none";
    };
};
//音乐播放
var oMusic=document.getElementById("music");
var oPlay=document.getElementById("play");
var mark=true;
var before=document.getElementById("before");
oPlay.onclick=function(){
    if(mark){
        oMusic.play();
        this.className = "play rotate";
        before.style.display="none";
    }else{
        oMusic.pause();
        this.className="play";
        before.style.display="block";
    }
    mark=!mark;
};
//监听音乐播放完毕并继续播放
oMusic.addEventListener("ended",function(){
    oPlay.className="play rotate";
    before.style.display="none";
    mark=true;
    oMusic.play();
});
//tab切换
var myclick = function(v) {
                var llis = document.getElementsByTagName("li");
                for(var i = 0; i < llis.length; i++) {
                    var lli = llis[i];
                    if(lli == document.getElementById("tab" + v)) {
                        lli.style.backgroundColor = "#ccc";
                    } else {
                        lli.style.backgroundColor = "";
                    }
                }
                var divs = document.getElementsByClassName("news");
                for(var i = 0; i < divs.length; i++) {
                    var divv = divs[i];
                    if(divv == document.getElementById("tab" + v + "_content")) {
                        divv.style.display = "block";
                    } else {
                        divv.style.display = "none";
                    }
                }
            };