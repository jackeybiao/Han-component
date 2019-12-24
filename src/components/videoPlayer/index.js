import React,{ useEffect } from 'react';
import videojs from 'video.js'
import videozhCN from 'video.js/dist/lang/zh-CN.json'; //播放器中文，不能使用.js文件
import 'video.js/dist/video-js.css';  //样式文件注意要加上
import 'videojs-flash';  //如果要播放RTMP要使用flash 需要先npm i videojs-flash

import loading from '../../assets/images/loading.gif';

import "./index.css";

const VideoPlayer = (props) => {

  useEffect(()=>{

      const config = {
          autoplay: true,  //自动播放
          language: 'zh-CN',
          controls: true,  //控制条
          preload: 'auto',  //自动加载
          errorDisplay: true,  //错误展示
          width: 500,  //宽
          height: 300,  //高
          poster:loading,
          fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
          userActions: {
              hotkeys: true  //是否支持热键
          }
    }

    videojs.addLanguage('zh-CN', videozhCN);

    if(props.rtmp && document.getElementById("myvideo")){
      var player = videojs('myvideo', config, function(){console.log('videojs播放器初始化成功')})

      player.play();
    }

    

    return () => {
      if(player){
        player.dispose()
      }
    }

  },[props.rtmp])


  return (
    <div> 
      <div data-vjs-player>
        <video id="myvideo" className="video-js">
            <source src={props.rtmp} type="rtmp/flv" />
        </video>
      </div>
    </div>
  )
}

export default VideoPlayer;
