var app = angular.module('OngakuPlay', []);

app.controller('MainController', function($scope){
	console.log("Loaded! :)");

	var nowIndex = 0;
	var music = document.getElementById('audiotrack');

	$scope.songs = [
		//test files
		"/media/eric/82C48964C4895AF51/Users/Light/Music/Ambient_-Ortiiz-10445_hifi.mp3",
		"/media/eric/82C48964C4895AF51/Users/Light/Music/04 - Everything Is Under Control (DJ Kentaro remix).mp3",
		"/media/eric/82C48964C4895AF51/Users/Light/Music/The Strokes/[2003] Room On Fire/02 - Reptilia.mp3",
		"/media/eric/82C48964C4895AF51/Users/Light/Music/日本の音楽/goose house/光るなら - EP/01 光るなら.m4a",
		"/media/eric/82C48964C4895AF51/Users/Light/Music/Anime/坂道のアポロン/02. Chick's Diner.mp3",
		"/media/eric/82C48964C4895AF51/Users/Light/Music/한국 음악/싸이 - 강남스타일.mp3"
	];

	$scope.currentSong = $scope.songs[nowIndex];

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

	$scope.playAudio = function() {
		getSongTime();
		if (music.paused) {
			$scope.isPlaying = true;
			music.play();
		} else {
			$scope.isPlaying = false;
			music.pause();
		}
	}

	$scope.playThisSong = function(song){
		$scope.currentSong = song;
		getSongTime();
		var parsers = mm(fs.createReadStream($scope.currentSong), function(err, metadata){
			if(err) throw err;
			$scope.songNowData = metadata;
		});
	}

	$scope.advanceTrack = function(){
		console.log("advanced");
		nowIndex++;
	}

	$scope.backTrack = function(){
		console.log("backwards");
		nowIndex--;
	}


});