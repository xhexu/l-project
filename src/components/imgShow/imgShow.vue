<template>
  <div v-show="show" class="el-image-viewer__wrapper" style="z-index: 9999;">
    <div class="el-image-viewer__mask" @click.stop="show = false">
    </div>
    <span @click.stop="show = false" class="el-image-viewer__btn el-image-viewer__close">
      <i class="el-icon-circle-close">
      </i>
    </span>
    <span v-show="urls.length>1" @click.stop="leftFun" class="el-image-viewer__btn el-image-viewer__prev">
      <i class="el-icon-arrow-left">
      </i>
    </span>
    <span v-show="urls.length>1" @click.stop="rightFun" class="el-image-viewer__btn el-image-viewer__next">
      <i class="el-icon-arrow-right">
      </i>
    </span>
    <div class="el-image-viewer__btn el-image-viewer__actions">
      <div class="el-image-viewer__actions__inner">
        <i @click="scaleOutFun" class="el-icon-zoom-out">
        </i>
        <i @click="scaleInFun" class="el-icon-zoom-in">
        </i>
        <i class="el-image-viewer__actions__divider">
        </i>
        <i v-show="scale ===1" class="el-icon-full-screen">
        </i>
        <i v-show="scale !==1" @click="scale=1" class="el-icon-c-scale-to-original">
        </i>
        <i class="el-image-viewer__actions__divider">
        </i>
        <i @click="rotateLeftFun" class="el-icon-refresh-left">
        </i>
        <i @click="rotateRightFun" class="el-icon-refresh-right">
        </i>
      </div>
    </div>
    <div class="el-image-viewer__canvas">
      <img
        :src="urls[index]"
        class="el-image-viewer__img"
        :style="'transform: scale('+scale+') rotate('+rotate+'deg); margin-left: 0px; margin-top: 0px; max-height: 80%; max-width: 80%;'">
      <!---->
    </div>
  </div>
</template>

<script>

export default {
  name: 'imgShow',
  components: {},
  data() {
    return {
      show: false,
      maxIndex: 0,
      index: 0,
      urls: [],
      rotate: 0,
      scale: 1,
      canSwitch: false
    }
  },
  methods: {
    setUrls(val) {
      if (typeof val === 'string') {
        let url_ = val.split(',');
        this.urls = [...url_].filter(en => en);
      } else {
        this.urls = val.filter(en => en);
      }
      this.maxIndex = this.urls.length - 1;
    },
    leftFun() {
      this.scale = 1;
      this.rotate = 0;
      if (this.index === 0) {
        this.index = this.maxIndex;
      } else {
        this.index = this.index - 1;
      }
    },
    rightFun() {
      this.scale = 1;
      this.rotate = 0;
      if (this.index === this.maxIndex) {
        this.index = 0;
      } else {
        this.index = this.index + 1;
      }
    },
    rotateLeftFun() {
      this.rotate -= 90;
    },
    rotateRightFun() {
      this.rotate += 90;
    },
    scaleOutFun() {
      this.scale -= 0.2;
      if (this.scale < 0.1) {
        this.scale = 0.2;
      }
    },
    scaleInFun() {
      this.scale += 0.2;
    },
    showImg(url, index = 0) {
      this.setUrls(url);
      this.index = index;
      this.show = true;
    }
  }
}
</script>
<style>
.el-image .el-image-viewer__wrapper {
  z-index: 2008;
}
</style>
