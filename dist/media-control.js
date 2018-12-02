var MediaControl = function (media) {
	this.media = media;
	this.state = {
		duration: this.media.duration,
		currentTime: 0,
		progress: 0
	};
	this.init();
}

MediaControl.prototype.init = function () {
	this.media.addEventListener('timeupdate', function() {
		this.state.currentTime = this.media.currentTime;
		this.state.progress = Math.floor((this.media.currentTime / this.media.duration) * 100)
		this.update(this.state);
	}.bind(this));
}

MediaControl.prototype.play = function () {
	this.media.play();
}

MediaControl.prototype.pause = function () {
	this.media.pause();
}

MediaControl.prototype.stop = function () {
	this.media.pause();
	this.media.currentTime = 0;
}

MediaControl.prototype.mute = function () {
	this.media.muted = !this.media.muted;
}

MediaControl.prototype.seekPercent = function (percent) {
	this.media.currentTime = this.media.duration * percent / 100;
}

MediaControl.prototype.seekTime = function (time) {
	this.media.currentTime = time;
}

MediaControl.prototype.getPrettyTime = function (seconds) {
	seconds = Math.floor(seconds);
	var minutes = Math.floor(seconds / 60);
	var seconds = seconds - minutes * 60;
	return minutes + ':' + seconds;
}

MediaControl.prototype.fullscreen = function () {
	var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
	if (!fullScreenEnabled) {
		return false;
	}
	var isFullScreen = !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
	if (isFullScreen) {
		if (document.exitFullscreen) document.exitFullscreen();
		else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
		else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
		else if (document.msExitFullscreen) document.msExitFullscreen();
   }
   else {
    	if (this.media.requestFullscreen) this.media.requestFullscreen();
    	else if (this.media.mozRequestFullScreen) this.media.mozRequestFullScreen();
    	else if (this.media.webkitRequestFullScreen) this.media.webkitRequestFullScreen();
     	else if (this.media.msRequestFullscreen) this.media.msRequestFullscreen();
   }
}

MediaControl.prototype.update = function (state) {}