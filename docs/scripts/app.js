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