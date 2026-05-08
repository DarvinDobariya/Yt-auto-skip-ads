/*
This program is only for educational purposes.
Do not use it in production or share it with anyone.
It may break the terms of service of the website you are using it on.
Use it at your own risk.
*/
let currentTime = 0;
let IntervalID = null;
let VideoID = null;
let lastReloadTime = 0;

Initialize();
function Initialize() {
    StartCycle();
}

function StartCycle() {
    const hostname = window.location.hostname;
    if (hostname.includes('youtube.com')) {
        console.log("Auto Skip Ad is started");
        IntervalID = setInterval(YtAdsSkipFun, 300);
    }
}

function YtAdsSkipFun() {
    const video = document.querySelector('video');
    if (!video) return;

    const adPlaying = document.querySelector(".ytp-ad-player-overlay-layout");
    const URL = window.location.href;

    const CurrentVideoId = URL.split('v=')[1]?.split('&')[0];
    let videoTimeStamp = parseInt(URL.split('&t=')[1]?.split('s')[0], 10);
    if (isNaN(videoTimeStamp)) {
        videoTimeStamp = 0;
    }

    // Bug 1 fix: return early so we don't overwrite currentTime with stale video.currentTime this tick
    if (VideoID != CurrentVideoId) {
        VideoID = CurrentVideoId;
        currentTime = 0;
        return;
    }

    if (adPlaying) {
        // Bug 2 fix: guard against rapid consecutive reloads that cause browser freeze
        const now = Date.now();
        if (now - lastReloadTime < 1500) return;

        // Mute ad audio immediately before the page reloads
        if (!video.muted) {
            video.muted = true;
        }

        clearInterval(IntervalID);

        currentTime -= 1;

        // Bug 3 fix: two separate ifs instead of if/else if so both clamp and timestamp rescue can apply
        if (currentTime < 0) {
            currentTime = 0;
        }
        if (currentTime < 2 && videoTimeStamp > currentTime) {
            currentTime = videoTimeStamp;
            console.log("Multiple ads in a row, restoring to: " + currentTime);
        }

        const currentURL = window.location.href;
        let UpdatedURL = "";

        if (currentURL.includes("&t=")) {
            UpdatedURL = currentURL.replace(/&t=\d+s/, "&t=" + currentTime + "s");
        } else {
            UpdatedURL = currentURL + "&t=" + currentTime + "s";
        }

        lastReloadTime = Date.now();
        location.replace(UpdatedURL);
        return;
    } else {
        let NewVideoTime = video.currentTime;
        if (currentTime >= 10) {
            if (NewVideoTime <= 3) {
                // Don't update: video just reloaded, hasn't seeked to timestamp yet
            } else {
                currentTime = NewVideoTime;
            }
        } else {
            currentTime = NewVideoTime;
        }
    }
}
