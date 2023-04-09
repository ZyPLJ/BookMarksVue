<template>
  <div style="background-color: grey" class="index">
    <header class="header">
      <div class="audio">
        <input type="checkbox" id="audio" @click="Out" />
        <label for="audio" class="audios"> </label>
        <img v-show="show" src="/images/音乐开启.png" class="audioYes"/>
        <img v-show="!show" src="/images/音乐关闭.png" class="audioNo"/>
        <audio autoplay="true" loop="true" id="ad">
          <source src="/video/背景音乐.mp3" />
        </audio>
      </div>
      <div class="logo"></div>
      <nav class="header_nav">
        <div class="header_textNav">
          <a href="#" class="header_textPublic header_textChecked">
            首&nbsp;页
          </a>
          <a href="/Bookmarks" class="header_textPublic"> 书签页 </a>
          <a href="http://101.43.25.210:7031/" class="header_textPublic">
            个人博客
          </a>
          <a href="https://ailink.pw/#/login/register?code=1767992919" class="header_textPublic">
            体验ChatAI
          </a>
          <!-- <a href="#" class="header_textPublic"> 新&nbsp;闻 </a>
          <a href="#" class="header_textPublic"> 角&nbsp;色 </a>
          <a href="#" class="header_textPublic"> 世&nbsp;界 </a>
          <a href="#" class="header_textPublic"> 漫&nbsp;画 </a>
          <a href="#" class="header_textPublic"> 社&nbsp;区 </a> -->
          <div class="header_navs"></div>
        </div>
      </nav>
      <div class="header_right"></div>
    </header>
    <!-- 主体内容 -->
    <section class="home">
      <div class="video_body">
        <div class="video">
          <video
            src="/video/原神.mp4"
            style="width: 100vw"
            loop="loop"
            muted="muted"
            autoplay
          ></video>
        </div>
        <div class="video_body_nr">
          <div class="video_button">
            <input type="checkbox" style="display: none" id="conductVideo" />
            <label for="conductVideo" class="conductButton">
              <div class="buttonStart"></div>
            </label>
            <div class="videos">
              <label for="conductVideo" class="offbutton"> </label>
              <!-- <video
                src="/video/宣传视频.mp4"
                muted="muted"
                controls="controls"
                autoplay
                style="width: 100%"
              ></video> -->
            </div>
            <div class="shade"></div>
          </div>
          <div class="ys_download"></div>
          <div class="glide_cartoon"></div>
          <div class="jin_12"></div>
        </div>
      </div>
    </section>
    <div class="right_gz">
      <input type="checkbox" class="right_jt" id="gz" />
      <label for="gz" class="right_jt" id="an1"> </label>
      <div class="gz_2">
        <ul>
          <li>
            <div class="right_top">
              <p>关注我们</p>
              <img src="/images/5192045913af4a31a7988ed7077a1e0.jpg" />
              <p>扫码关注微信</p>
            </div>
          </li>
          <li>
            <div class="right_weibo right_bj">
              <a href="https://www.cnblogs.com/ZYPLJ/" style="color: orange"
                >点击跳转博客园</a
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'

const show = ref(true)
const Out = () => {
  var ov = document.getElementById("ad");
  if (ov.paused) {
    ov.play();
    show.value = true
  } else {
    ov.pause();
    show.value = false
  }
};
</script>

<style scoped>
.index {
  -webkit-font-smoothing: antialiased;
  background-color: #fff;
  font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
    "\5B8B\4F53", sans-serif;
  color: #666;
}
</style>