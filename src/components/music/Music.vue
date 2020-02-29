<template>
  <div class="music"
       :class="{'a-run': playing, 'a-stop': !playing}"
       @click.stop="handleChangePlay">
    <Icon type="md-musical-note"
          :size="size"
          :color="color"/>
    <audio ref="music"
           autoplay
           loop
           hidden
           :src="resourceSrc"></audio>
  </div>
</template>

<script>
  import loadResource from '@/mixins/loadResource'

  export default {
    name: 'Music',
    mixins: [loadResource],
    props: {
      size: {
        type: [String, Number],
        default: 45
      },
      color: {
        String,
        default: '#000'
      },
      speed: {
        Number,
        default: 10
      },
      autoPlay: {
        Boolean,
        default: true
      },
      src: {
        String,
        default: 'assets/media/bgm.mp3'
      }
    },
    data () {
      return {
        playing: true,
        musicEl: null
      }
    },
    created () {
      this.loadResource(this.src)
    },
    mounted () {
      this.init()
    },
    methods: {
      handleChangePlay () {
        this.playing = !this.playing

        if (this.playing) {
          this.play()
        } else {
          this.pause()
        }
      },
      play () {
        this.musicEl && this.musicEl.play()
      },
      pause () {
        this.musicEl && this.musicEl.pause()
      },
      init () {
        this.musicEl = this.$refs.music
      }
    },
    watch: {
      autoPlay: {
        immediate: true,
        handler (val) {
          this.playing = val
        }
      },
      src: {
        immediate: true,
        handler (val) {
          this.loadResource(val)
        }
      }
    }
  }
</script>

<style scoped
       lang="less">
  @import './Music';
</style>
