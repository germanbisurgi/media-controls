# media-controls
Crossbrowser controls for media elements (video, audio)

[demo](https://germanbisurgi.github.io/media-controls/.)

# example code

```html
<video class="video" src="assets/videos/video.mp4" width="320" height="240"></video>
    <div class="media-controls flex-row">
      <div class="flex-xs-1">
        <i class="play fas fa-play"></i>
      </div>
      <div class="flex-xs-1">
        <i class="pause fas fa-pause"></i>
      </div>
      <div class="flex-xs-1">
        <i class="stop fas fa-stop"></i>
      </div>
      <div class="flex-xs-1">
        <i class="mute fa fa-volume-mute"></i>
      </div>
      <div class="flex-xs-2">
        <span class="current-time">0.0</span> / <span class="duration">0.0</span>
      </div>
      <div class="flex-xs-5">
        <input class="seek-bar" type="range" value="0" step="0.1" max="100">
      </div>
      <div class="flex-xs-1">
        <i class="fullscreen fas fa-expand"></i>
      </div>
    </div>
```

```javascript
window.addEventListener('load', function() {

    var media = document.querySelector('.video');
    var play = document.querySelector('.play');
    var pause = document.querySelector('.pause');
    var stop = document.querySelector('.stop');
    var mute = document.querySelector('.mute');
    var fullscreen = document.querySelector('.fullscreen');
    var seekBar = document.querySelector('.seek-bar');
    var currentTime = document.querySelector('.current-time');
    var duration = document.querySelector('.duration');
    var canSeek = false;
    var mc = new MediaControl(media);

    play.addEventListener('pointerup', function() {
        mc.play();
    })

    pause.addEventListener('pointerup', function() {
        mc.pause();
    })

    stop.addEventListener('pointerup', function() {
        mc.stop();
    })

    mute.addEventListener('pointerup', function() {
        mc.mute();
    })

    fullscreen.addEventListener('pointerup', function() {
        mc.fullscreen();
    })

    seekBar.addEventListener('pointerdown', function() {
        canSeek = true;
    });

    seekBar.addEventListener('pointermove', function(e) {
        if (canSeek) {
            var percent = (e.pageX - this.offsetLeft) / this.offsetWidth * 100;
            mc.seekPercent(percent);
        }
    });

    seekBar.addEventListener('pointerup', function(e) {
        if (canSeek) {
            var percent = (e.pageX - this.offsetLeft) / this.offsetWidth * 100;
            mc.seekPercent(percent);
        }
        canSeek = false;
    });

    mc.update = function(state) {
        seekBar.value = state.progress;
        currentTime.textContent = mc.getPrettyTime(state.currentTime)
        duration.textContent = mc.getPrettyTime(state.duration)
    }

})
```
