let currentTime = 0;
function skipAndMuteAds() {
    // console.log("I am running bro");
    const video = document.querySelector('video');
    if (!video) return;
    let originalVolume = video.volume; // To remember volume level

    // const adPlaying = document.querySelector('ytp-ad-player-overlay-layout');
    const adPlaying = document.querySelector(".ytp-ad-player-overlay-layout");

    if (adPlaying) {
        currentTime -= 2;
        if (currentTime < 0) {
            currentTime = 0;
        }
        const currentURL = window.location.href;
        let UpdatedURL = "";
        console.log("Current Video time " + currentTime);

        if (currentURL.includes("&t=")) {
            UpdatedURL = currentURL.replace(/&t=\d+s/, "&t=" + currentTime + "s");
            console.log("Time stamp is updated to new time");
        } else {
            UpdatedURL = currentURL + "&t=" + currentTime + "s";
            console.log("Add fresh Time stamp");
        }
        // const UpdatedURL = window.location.href + "&t=" + currentTime + "s";
        // console.log("currentTime: " + currentTime + ", currentURL: " + currentURL + " - Ad detected, skipping...");
        console.log("Page is reloaded with " + UpdatedURL);
        location.replace(UpdatedURL);
        return;
        // if (!video.muted) {
        //     originalVolume = video.volume;
        //     video.muted = true;
        // }
        // currentTime: 1.9535, 
        // currentURL: https://www.youtube.com/watch?v=V9vuCByb6js&list=RDV9vuCByb6js&start_radio=1&t=27
        // - Ad detected, skipping...
        // https://youtu.be/R-sh3kfdHQ4?si=3YVJEOvCkBo0yrrQ&t=27
    } else {
        let NewVideoTime = video.currentTime;
        if (currentTime >= 10) {
            if (NewVideoTime <= 3) {
                console.log("Add is come at middle of the video, " + NewVideoTime);
            } else {
                currentTime = NewVideoTime;
            }
        } else {
            currentTime = NewVideoTime;
        }
    }
    console.log("Current Video time " + currentTime);

}
setTimeout(() => {
    console.log("Auto Skip Ad is started");
    StartCycle();
}, 2000);
function StartCycle() {
    const hostname = window.location.hostname;
    if (hostname.includes('youtube.com')) {
        setInterval(skipAndMuteAds, 1000);
    }
}
// else{
//     console.log("not interested");
// }
