
function skipAndMuteAds() {
    // console.log("I am running bro");
    const video = document.querySelector('video');
    if (!video) return;
    let originalVolume = video.volume; // To remember volume level

    // const adPlaying = document.querySelector('ytp-ad-player-overlay-layout');
    const adPlaying = document.querySelector(".ytp-ad-player-overlay-layout");

    if (adPlaying) {
        location.reload();
        if (!video.muted) {
            originalVolume = video.volume;
            video.muted = true;
        }
    }
    // else {
    //     if (video.muted) {
    //         video.muted = false;
    //         video.volume = originalVolume;
    //         // console.log("Ad ended, sound restored");
    //     }
    //     return;
    // }

    // const skipButton = document.querySelector('.ytp-skip-ad-button:not([disabled])');
    // if (skipButton) {
    //     // console.log('Ad skipped v3');
    //     location.reload();
    // }
}
const hostname = window.location.hostname;
if (hostname.includes('youtube.com')) {
    setInterval(skipAndMuteAds, 300);
}
// else{
//     console.log("not interested");
// }
