var app = angular.module('OngakuPlay', []);

app.controller('MainController', function($scope){

	var nowIndex = 0;
	$scope.currentSongTime = "0:00";
	$scope.songTime = "0:00";

	var music = document.getElementById('audiotrack');
	var seekbar = document.getElementById('seekbar');
	seekbar.value = 0;
	var volumeControl = document.getElementById('volume');
	music.volume = 0.5;

	music.addEventListener("ended", function(){
		music.currentTime = 0;
		setPlayButton();
	});

	music.ondurationchange = setUpSeekbar;
	music.addEventListener("durationchange", setUpSeekbar);
	music.addEventListener("timeupdate", updateUI);
	$('#volume').on("change", function(){
		music.volume =  volumeControl.value;
	});

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
		$scope.currentSongTime = timeConverter(music.currentTime);
		$scope.$digest();
    }

	var seekVolume = function() {
		console.log("I HAVE BEEN USED!");
        music.volume = volumeControl.value;
    }

    seekbar.onchange = seekAudio;
    music.ontimeupdate = updateUI;

    var timeConverter = function(songDuration){
    	var mins = parseInt(songDuration/60);
    	var secs = parseInt((songDuration+1) % 60);
		if(secs < 10)
			secs = "0" + secs;
    	return mins +":"+ secs;
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
		"/media/eric/82C48964C4895AF51/Users/Light/Music/Stones/The Black Keys/[2011] El Camino/03 - Gold On The Ceiling.mp3",
		"/media/eric/82C48964C4895AF51/Users/Light/Music/日本の音楽/goose house/光るなら - EP/01 光るなら.m4a",
		"/media/eric/82C48964C4895AF51/Users/Light/Music/Anime/坂道のアポロン/02. Chick's Diner.mp3",
		"/media/eric/82C48964C4895AF51/Users/Light/Music/한국 음악/싸이 - 강남스타일.mp3"
	];

	$scope.currentSong = $scope.songs[nowIndex];
	
	var setSongInfo = function(){
		$scope.songNowData = $scope.currentSong.substr($scope.currentSong.lastIndexOf('/') + 1);
	}

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
		$scope.songNowData = song.substr(song.lastIndexOf('/') + 1);
		nowIndex = event.target.id;
		seekbar.value = 0;
		$scope.isPlaying = true;
		getSongTime();
	}

	$scope.advanceTrack = function(){
		if(nowIndex > $scope.songs.length - 1)
			nowIndex = 0;
		else	
			nowIndex++;
		$scope.currentSong = $scope.songs[nowIndex];
		$scope.stopTrack();
		setSongInfo();
	}

	$scope.backTrack = function(){
		if(nowIndex == 0)
			nowIndex = $scope.songs.length;
		else	
			nowIndex--;
		$scope.currentSong = $scope.songs[nowIndex];
		$scope.stopTrack();
		setSongInfo();
	}

	$scope.loopTrack = function(){
		if(music.loop){
			music.loop = false;
		} else{
			music.loop = true;
		}
	}

	$scope.mute = function (){
		if(music.muted)
			music.muted = false;
		else
			music.muted = true;
	}

	$scope.maxVol = function(){
		music.muted = false;
		music.volume = 1;
	}

	setSongInfo();

	$scope.addFileQueue = function(){
		$scope.songs.push($scope.filepath);
		console.log($scope.songs.length);
	}

});