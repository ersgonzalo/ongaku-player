var app = angular.module('OngakuPlay', []);

app.controller('MainController', function($scope){
	// console.log("Loaded! :)");

	var nowIndex = 0;
	var music = document.getElementById('audiotrack');
	var seekbar = document.getElementById('seekbar');
	seekbar.value = 0;

	music.addEventListener("ended", function(){
		music.currentTime = 0;
		setPlayButton();
	});

	music.ondurationchange = setUpSeekbar;
	music.addEventListener("durationchange", setUpSeekbar);
	music.addEventListener("timeupdate", updateUI);

	var setUpSeekbar = function(){
		seekbar.min = music.startTime;
		seekbar.max = music.startTime + music.duration;
	}
	var seekAudio = function() {
        music.currentTime = seekbar.value;
    }
	var updateUI = function(){
		var lastBuffered = music.buffered.end(music.buffered.length-1);
		seekbar.min = music.startTime;
		seekbar.max = lastBuffered;
		seekbar.value = music.currentTime;
    }
    seekbar.onchange = seekAudio;
    music.ontimeupdate = updateUI;

    var timeConverter = function(songDuration){
    	if (songDuration < 60)
    		return Math.ceil(songDuration + 1) + " seconds"
    	else{
    		var mins = parseInt(songDuration/60) + " minutes and ";
    		var secs = parseInt(songDuration % 60) + " seconds";
    		return mins + secs;
    	}
    }

    var getSongTime = function(){
    	var initTime = null;
    	initTime = music.duration;
    	$scope.songTime = timeConverter(initTime);
    }

	$scope.isPlaying = true;

	var setPlayButton = function(){
		$scope.isPlaying = true;
		$scope.$digest();
	}

	$scope.songs = [
		//test files
		"/media/eric/82C48964C4895AF51/Users/Light/Music/Ambient_-Ortiiz-10445_hifi.mp3",
		"/media/eric/82C48964C4895AF51/Users/Light/Music/Persona 4 Chime.mp3",
		"/media/eric/82C48964C4895AF51/Users/Light/Music/04 - Everything Is Under Control (DJ Kentaro remix).mp3",
		"/media/eric/82C48964C4895AF51/Users/Light/Music/The Strokes/[2003] Room On Fire/02 - Reptilia.mp3",
		"/media/eric/82C48964C4895AF51/Users/Light/Music/日本の音楽/goose house/光るなら - EP/01 光るなら.m4a",
		"/media/eric/82C48964C4895AF51/Users/Light/Music/Anime/坂道のアポロン/02. Chick's Diner.mp3",
		"/media/eric/82C48964C4895AF51/Users/Light/Music/한국 음악/싸이 - 강남스타일.mp3"
	];

	$scope.currentSong = $scope.songs[nowIndex];


	$scope.playTrack = function() {
		getSongTime();
		if (music.paused) {
			$scope.isPlaying = false;
			music.play();
		} else {
			$scope.isPlaying = true;
			music.pause();
		}
	}

	$scope.stopTrack = function(){
		music.pause();
		music.currentTime = 0;
		$scope.isPlaying = true;
	}

	$scope.playThisSong = function(song){
		$scope.currentSong = song;
		seekbar.value = 0;
		$scope.isPlaying = true;
		getSongTime();
		// var parsers = mm(fs.createReadStream($scope.currentSong), function(err, metadata){
		// 	if(err) throw err;
		// 	$scope.songNowData = metadata;
		// });
	}

	$scope.advanceTrack = function(){
		console.log("advanced");
		nowIndex++;
	}

	$scope.backTrack = function(){
		console.log("backwards");
		nowIndex--;
	}

	$scope.loopTrack = function(){
		if(music.loop){
			music.loop = false;
			$('.fa-retweet').css('background-color: #673AB7');
		}else{
			music.loop = true;
			$('.fa-retweet').css('background-color: #F44336');
		}
	}

});