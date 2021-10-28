let playBtn = document.querySelector(".play-btn");
let pauseBtn = document.querySelector(".pause-btn");
let stopBtn = document.querySelector(".stop-btn");
let fullScreenBtn = document.querySelector(".full-scr-btn");
let volumeBtn = document.querySelector(".volume-btn");
let mutedBtn = document.querySelector(".muted-btn");
let settingsBtn = document.querySelector(".settings");
let video = document.querySelector(".video video");
let videoContainer = document.querySelector(".video");
let fillBar = document.querySelector(".fill-bar");
let timeBar = document.querySelector(".time-bar");
let btns = document.querySelector(".buttons");
let container = document.querySelector(".container");

playBtn.addEventListener("click", () => {
    document.querySelector(".buttons").classList.add("active-video");
    togglePlayPause();
})
pauseBtn.addEventListener("click", () => {
    document.querySelector(".buttons").classList.remove("active-video");
    togglePlayPause();
})
stopBtn.addEventListener("click", () => {
    video.pause();
    video.currentTime = 0;
    if (btns.classList.contains("active-video")) {
        btns.classList.remove("active-video")
    }
})
function toggleFullScreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
        videoContainer.style.maxWidth = "800px";
    } else {
        container.requestFullscreen();
        videoContainer.style.maxWidth = "100%";
    }
}
fullScreenBtn.addEventListener("click", toggleFullScreen)

function togglePlayPause() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

video.addEventListener("timeupdate", () => {
    let fillPosition = video.currentTime / video.duration;
    fillBar.style.width = fillPosition * 100 + "%";
    if (video.ended) {
        document.querySelector(".buttons").classList.remove("active-video");
    }
})

volumeBtn.addEventListener("click", () => {
    volumeBtn.parentNode.classList.add("muted");
    video.muted = true;
    range.value = 0;
})
mutedBtn.addEventListener("click", () => {
    volumeBtn.parentNode.classList.remove("muted");
    video.muted = false;
    range.value = 50;
})

document.querySelectorAll(".playback-speed p").forEach(speed => {
    speed.addEventListener("click", () => {
        resetTextDecoration();
        if (speed.classList.contains('speed-0.5')) {
            video.playbackRate = 0.5;
            speed.style.textDecoration = "underline";
        } else if (speed.classList.contains('speed-0.75')) {
            video.playbackRate = 0.75;
            speed.style.textDecoration = "underline";
        } else if (speed.classList.contains('speed-normal')) {
            video.playbackRate = 1;
            speed.style.textDecoration = "underline";
        } else if (speed.classList.contains('speed-1.5')) {
            video.playbackRate = 1.5;
            speed.style.textDecoration = "underline";
        } else if (speed.classList.contains('speed-2')) {
            video.playbackRate = 2;
            speed.style.textDecoration = "underline";
        }



    })
})
function resetTextDecoration() {
    document.querySelectorAll(".playback-speed p").forEach(speed => {
        speed.style.textDecoration = "none";
    })
}

let range = document.querySelector(".range");
video.volume = range.value / 100;
console.log(video.volume);
range.addEventListener("change", () => {
    video.volume = range.value / 100;
    console.log(video.volume);
})

timeBar.addEventListener("click", (e) => {
    changeVideoTime(e);
    fillProgressBar();
})

fillProgressBar();
function fillProgressBar() {
    fillBar.style.width = (video.currentTime / video.duration) * 100 + "%";
}
function changeVideoTime(e) {
    const newTime = e.offsetX * video.duration / timeBar.offsetWidth;
    video.currentTime = newTime;
}