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
    image: "https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/175642733_2954588398135546_1552561514058234681_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=174925&_nc_ohc=H7NQXNgyvrEAX-LwBmE&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_sqxeOXpl0MUq6GmQQl5yp9j1jF_rtuNMb1BAYTzwAvw&oe=61DA24AC",
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
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
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
