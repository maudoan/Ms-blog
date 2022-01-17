let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Khát vọng ngày đông",
    artist: "Người kể chuyện",
    image: "https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/240662557_3000046163589769_7471450404746417042_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=174925&_nc_ohc=xu_pCFzD9zUAX8qe_Ra&tn=xPRBCGX4An7MyVPr&_nc_ht=scontent.fhan5-11.fna&oh=00_AT-Pf7yDTKALu1Fpi9nZYe8vwafQIx0F-m7OFPzlInz7Vw&oe=61DA9447",
    path: "./assests/blog radio 1.MP3"
  },
  {
    name: "Tuổi thanh xuân của chúng ta",
    artist: "Người kể chuyện",
    image: "https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/175642733_2954588398135546_1552561514058234681_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=174925&_nc_ohc=P9E8_Q0s0ekAX9gwGSq&_nc_ht=scontent.fhan5-2.fna&oh=00_AT-ShCudGX-qi047iBFOYoHSv2rma6jKykzDpeAi9Cni_w&oe=61E20DAC",
    path: "./assests/blog radio 8.MP3"
  },
  {
    name: "Bước qua tuổi 30 và ngã rẽ hạnh phúc",
    artist: "Người kể chuyện",
    image: "https://scontent.fhan5-6.fna.fbcdn.net/v/t1.6435-9/142118544_2827365094191211_7714339831070763439_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=174925&_nc_ohc=NTzgPJ8DMPkAX8vOCof&tn=xPRBCGX4An7MyVPr&_nc_ht=scontent.fhan5-6.fna&oh=00_AT-aU3sp5UQUT3yxORfqqGIpHc5uSa18W4RMpWlS8alCzA&oe=61F95A59",
    path: "./assests/blog radio 09.mp3",
  },
  {
    name: "Nếu anh đến trước liệu em có",
    artist: "Người kể chuyện",
    image: "https://scontent.fhan5-7.fna.fbcdn.net/v/t1.6435-9/132997109_2801703406757380_4168251688518913050_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=174925&_nc_ohc=E9U7-IG30EkAX_V5MA4&tn=xPRBCGX4An7MyVPr&_nc_ht=scontent.fhan5-7.fna&oh=00_AT_bUwZTZs4j2u99G4O1ejA1wfTVvhQ9gtHGDrO3xdMUwg&oe=61FA38AD",
    path: "./assests/blog radio 010.mp3",
  },
  {
    name: "Mùa hoa oải hương của tôi",
    artist: "Người kể chuyện",
    image: "https://scontent.fhan5-9.fna.fbcdn.net/v/t1.6435-9/177658802_2893005387627181_6298218403844870878_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=ELeDntug2ZEAX98imgm&_nc_ht=scontent.fhan5-9.fna&oh=00_AT96mx_Kv_BVXBXYN6nr5A0tA8Cd5oQJ7ME0CZCYYFLE9A&oe=61F92C78",
    path: "./assests/blog radio s15.mp3",
  },
  {
    name: "Tình đầu khó quên",
    artist: "Người kể chuyện",
    image: "https://scontent.fhan5-2.fna.fbcdn.net/v/t1.6435-9/124090115_2764074430520278_7574235944374264078_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=0debeb&_nc_ohc=xdphGzXS45MAX8_FRtv&_nc_ht=scontent.fhan5-2.fna&oh=00_AT8vkY-DCUnEyBbJ10b_94SyS7SdehIgM9pZ1rMnM_7oaA&oe=61FC8328",
    path: "./assests/blog radio số 17.mp3",
  },
  {
    name: "Hoa nắng",
    artist: "Người kể chuyện",
    image: "https://scontent.fhan5-6.fna.fbcdn.net/v/t1.6435-9/124175171_2764074297186958_2260330411826009066_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=0debeb&_nc_ohc=0fD_GW2MWaAAX8sMpnp&_nc_ht=scontent.fhan5-6.fna&oh=00_AT9-WJj7JuB6Vtj9yM5YMKE1s75_TvV8nAiuiMKcZTIZfw&oe=61FAF2C9",
    path: "./assests/blog radio số 19.mp3",
  },
  {
    name: "Những ngày cuối đông",
    artist: "Người kể chuyện",
    image: "https://scontent.fhan5-11.fna.fbcdn.net/v/t1.6435-9/124362037_2762195984041456_2524471736213598031_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=HE4A8f29OYoAX86wZSZ&tn=xPRBCGX4An7MyVPr&_nc_ht=scontent.fhan5-11.fna&oh=00_AT9fqfY4cfyr2BJmHqnnHnfLxwrMsWxtn256q2EkvCpYGg&oe=61F96753",
    path: "./assests/blog radio2.MP3",
  },
  {
    name: "Bạn có cảm thấy mệt mỏi",
    artist: "Người kể chuyện",
    image: "https://scontent.fhan5-11.fna.fbcdn.net/v/t1.6435-9/90224347_2565791140348609_6748946879758729216_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=0debeb&_nc_ohc=btZeGUF2CygAX-gaFxE&tn=xPRBCGX4An7MyVPr&_nc_ht=scontent.fhan5-11.fna&oh=00_AT8JtF5sDXdFi74fL2FoZjNo0I3BTFYkkA_GD543KH_6Jw&oe=61F98663",
    path: "./assests/blog radio10.MP3",
  },
];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;

}


function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  audio.pause();
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
  audio.pause();
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
  audio.pause();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
  audio.pause();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}





window.requestAnimFrame = ( function() {
	return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function( callback ) {
					window.setTimeout( callback, 1000 / 60 );
				};
})();

// now we will setup our basic variables for the demo
var canvas = document.getElementById( 'canvas' ),
		ctx = canvas.getContext( '2d' ),
		// full screen dimensions
		cw = window.innerWidth,
		ch = window.innerHeight,
		// firework collection
		fireworks = [],
		// particle collection
		particles = [],
		// starting hue
		hue = 120,
		// when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
		limiterTotal = 5,
		limiterTick = 0,
		// this will time the auto launches of fireworks, one launch per 80 loop ticks
		timerTotal = 80,
		timerTick = 0,
		mousedown = false,
		// mouse x coordinate,
		mx,
		// mouse y coordinate
		my;
		
// set canvas dimensions
canvas.width = cw;
canvas.height = ch;

// now we are going to setup our function placeholders for the entire demo

// get a random number within a range
function random( min, max ) {
	return Math.random() * ( max - min ) + min;
}

// calculate the distance between two points
function calculateDistance( p1x, p1y, p2x, p2y ) {
	var xDistance = p1x - p2x,
			yDistance = p1y - p2y;
	return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
}

// create firework
function Firework( sx, sy, tx, ty ) {
	// actual coordinates
	this.x = sx;
	this.y = sy;
	// starting coordinates
	this.sx = sx;
	this.sy = sy;
	// target coordinates
	this.tx = tx;
	this.ty = ty;
	// distance from starting point to target
	this.distanceToTarget = calculateDistance( sx, sy, tx, ty );
	this.distanceTraveled = 0;
	// track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
	this.coordinates = [];
	this.coordinateCount = 3;
	// populate initial coordinate collection with the current coordinates
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	this.angle = Math.atan2( ty - sy, tx - sx );
	this.speed = 2;
	this.acceleration = 1.05;
	this.brightness = random( 50, 70 );
	// circle target indicator radius
	this.targetRadius = 1;
}

// update firework
Firework.prototype.update = function( index ) {
	// remove last item in coordinates array
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	
	// cycle the circle target indicator radius
	if( this.targetRadius < 8 ) {
		this.targetRadius += 0.3;
	} else {
		this.targetRadius = 1;
	}
	
	// speed up the firework
	this.speed *= this.acceleration;
	
	// get the current velocities based on angle and speed
	var vx = Math.cos( this.angle ) * this.speed,
			vy = Math.sin( this.angle ) * this.speed;
	// how far will the firework have traveled with velocities applied?
	this.distanceTraveled = calculateDistance( this.sx, this.sy, this.x + vx, this.y + vy );
	
	// if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
	if( this.distanceTraveled >= this.distanceToTarget ) {
		createParticles( this.tx, this.ty );
		// remove the firework, use the index passed into the update function to determine which to remove
		fireworks.splice( index, 1 );
	} else {
		// target not reached, keep traveling
		this.x += vx;
		this.y += vy;
	}
}

// draw firework
Firework.prototype.draw = function() {
	ctx.beginPath();
	// move to the last tracked coordinate in the set, then draw a line to the current x and y
	ctx.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
	ctx.lineTo( this.x, this.y );
	ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
	ctx.stroke();
	
	ctx.beginPath();
	// draw the target for this firework with a pulsing circle
	ctx.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
	ctx.stroke();
}

// create particle
function Particle( x, y ) {
	this.x = x;
	this.y = y;
	// track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
	this.coordinates = [];
	this.coordinateCount = 5;
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	// set a random angle in all possible directions, in radians
	this.angle = random( 0, Math.PI * 2 );
	this.speed = random( 1, 10 );
	// friction will slow the particle down
	this.friction = 0.95;
	// gravity will be applied and pull the particle down
	this.gravity = 1;
	// set the hue to a random number +-50 of the overall hue variable
	this.hue = random( hue - 50, hue + 50 );
	this.brightness = random( 50, 80 );
	this.alpha = 1;
	// set how fast the particle fades out
	this.decay = random( 0.015, 0.03 );
}

// update particle
Particle.prototype.update = function( index ) {
	// remove last item in coordinates array
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	// slow down the particle
	this.speed *= this.friction;
	// apply velocity
	this.x += Math.cos( this.angle ) * this.speed;
	this.y += Math.sin( this.angle ) * this.speed + this.gravity;
	// fade out the particle
	this.alpha -= this.decay;
	
	// remove the particle once the alpha is low enough, based on the passed in index
	if( this.alpha <= this.decay ) {
		particles.splice( index, 1 );
	}
}

// draw particle
Particle.prototype.draw = function() {
	ctx. beginPath();
	// move to the last tracked coordinates in the set, then draw a line to the current x and y
	ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
	ctx.lineTo( this.x, this.y );
	ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
	ctx.stroke();
}

// create particle group/explosion
function createParticles( x, y ) {
	// increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
	var particleCount = 30;
	while( particleCount-- ) {
		particles.push( new Particle( x, y ) );
	}
}

// main demo loop
function loop() {
	// this function will run endlessly with requestAnimationFrame
	requestAnimFrame( loop );
	
	// increase the hue to get different colored fireworks over time
	//hue += 0.5;
  
  // create random color
  hue= random(0, 360 );
	
	// normally, clearRect() would be used to clear the canvas
	// we want to create a trailing effect though
	// setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
	ctx.globalCompositeOperation = 'destination-out';
	// decrease the alpha property to create more prominent trails
	ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
	ctx.fillRect( 0, 0, cw, ch );
	// change the composite operation back to our main mode
	// lighter creates bright highlight points as the fireworks and particles overlap each other
	ctx.globalCompositeOperation = 'lighter';
	
	// loop over each firework, draw it, update it
	var i = fireworks.length;
	while( i-- ) {
		fireworks[ i ].draw();
		fireworks[ i ].update( i );
	}
	
	// loop over each particle, draw it, update it
	var i = particles.length;
	while( i-- ) {
		particles[ i ].draw();
		particles[ i ].update( i );
	}
	
	// launch fireworks automatically to random coordinates, when the mouse isn't down
	if( timerTick >= timerTotal ) {
		if( !mousedown ) {
			// start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
			fireworks.push( new Firework( cw / 2, ch, random( 0, cw ), random( 0, ch / 2 ) ) );
			timerTick = 0;
		}
	} else {
		timerTick++;
	}
	
	// limit the rate at which fireworks get launched when mouse is down
	if( limiterTick >= limiterTotal ) {
		if( mousedown ) {
			// start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
			fireworks.push( new Firework( cw / 2, ch, mx, my ) );
			limiterTick = 0;
		}
	} else {
		limiterTick++;
	}
}

// mouse event bindings
// update the mouse coordinates on mousemove
canvas.addEventListener( 'mousemove', function( e ) {
	mx = e.pageX - canvas.offsetLeft;
	my = e.pageY - canvas.offsetTop;
});

// toggle mousedown state and prevent canvas from being selected
canvas.addEventListener( 'mousedown', function( e ) {
	e.preventDefault();
	mousedown = true;
});

canvas.addEventListener( 'mouseup', function( e ) {
	e.preventDefault();
	mousedown = false;
});

// once the window loads, we are ready for some fireworks!
window.onload = loop;

function scrollWin() {
  window.scrollTo(0, 700);
  var audio = document.getElementById("audio");
        audio.play();
      
}