/*
This program is only for educational purposes.
Do not use it in production or share it with anyone.
It may break the terms of service of the website you are using it on.
Use it at your own risk.
*/
let currentTime = 0;
let IntervalID = null;
let VideoID = null;

Initialize();
function Initialize() {
    StartCycle();
    // setTimeout(StartCycle, 1000);// for ease and safety
}

function StartCycle() {
    const hostname = window.location.hostname;
    if (hostname.includes('youtube.com')) {
        console.log("Auto Skip Ad is started");
        IntervalID = setInterval(YtAdsSkipFun, 300);
    }
}

function YtAdsSkipFun() {
    // console.log("I am running bro");
    const video = document.querySelector('video');
    if (!video) return;
    // let originalVolume = video.volume; // To remember volume level

    // const adPlaying = document.querySelector('ytp-ad-player-overlay-layout');
    const adPlaying = document.querySelector(".ytp-ad-player-overlay-layout");
    const URL = window.location.href;
    const CurrentVideoId = URL.split('v=')[1]?.split('&')[0];
    let videoTimeStamp = URL.split('&t=')[1]?.split('s')[0];
    if (videoTimeStamp == undefined) {
        videoTimeStamp = 0;
    }
    if (VideoID != CurrentVideoId) {// if the video is new
        VideoID = CurrentVideoId;
        currentTime = 0;
        // console.log("New Video is detected, reset the time");
    }
    // console.log("Video ID is " + videoId);
    // console.log("Video Time Stamp is " + videoTimeStamp);

    if (adPlaying) {
        clearInterval(IntervalID);
        currentTime -= 1;// 1 second back to avoid skipping main video content
        if (currentTime < 0) {
            currentTime = 0;
        } else if (currentTime < 2 && currentTime < videoTimeStamp) {
            currentTime = videoTimeStamp;
            console.log("Multiple ads come in raw");
        }
        const currentURL = window.location.href;
        let UpdatedURL = "";
        // console.log("Current Video time " + currentTime);

        if (currentURL.includes("&t=")) {
            UpdatedURL = currentURL.replace(/&t=\d+s/, "&t=" + currentTime + "s");
            // console.log("Time stamp is updated to new time");
        } else {
            UpdatedURL = currentURL + "&t=" + currentTime + "s";
            // console.log("Add fresh Time stamp");
        }
        // const UpdatedURL = window.location.href + "&t=" + currentTime + "s";
        // console.log("currentTime: " + currentTime + ", currentURL: " + currentURL + " - Ad detected, skipping...");
        // console.log("Page is reloaded with " + UpdatedURL);
        location.replace(UpdatedURL);
        return;
        // if (!video.muted) { // mute the video if not already muted
        //     originalVolume = video.volume;
        //     video.muted = true;
        // }
    } else {
        let NewVideoTime = video.currentTime;
        if (currentTime >= 10) {
            if (NewVideoTime <= 3) {
                // console.log("Add is come at middle of the video, " + NewVideoTime);
            } else {
                currentTime = NewVideoTime;
            }
        } else {
            currentTime = NewVideoTime;
        }
    }
    // console.log("Current Video time " + currentTime);

}