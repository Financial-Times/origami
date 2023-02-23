const visibleVideos = new Set();

let videoObserver;

export default function startObserving(viewPort, target, threshold = 0.5, playAction) {
  const observedArea = viewPort // || document.querySelector("main");
  
  const observerOptions = {
    root: observedArea,
    rootMargin: "0px",
    threshold
  };
  
  
  videoObserver = new IntersectionObserver(intersectionCallback, observerOptions);
  
  if(target) observeVideo(target);

}

function compareRatio (currentPlayer) {
  return (videoPlayer) => { 
    if(videoPlayer.prevRatio <= currentPlayer.prevRatio){
      videoPlayer.pause();
    }
  };
}


function intersectionCallback(observedVideoElement) {
    observedVideoElement.forEach((videoBox) => {
        const videoPlayer = videoBox.target;
  
        if (videoBox.isIntersecting) {
            // Add video to set of visible videos
            visibleVideos.add(videoPlayer);

            // Play the video
			      videoPlayer.muted="muted";
            videoPlayer.play();

            // Track the ratios of those showing by adding property to the element
            videoPlayer.prevRatio = videoBox.intersectionRatio;

            // const shouldItPlay = compareRatio(videoPlayer);

            // Stop playing any other visible videos with a lower intersection ratio than the current video
            // visibleVideos.forEach(shouldItPlay)
            
        } else {
            videoPlayer.pause();
            visibleVideos.delete(videoPlayer);
        }
    });
}

  



function observeVideo(videoElement) {
  videoObserver.observe(videoElement);
}
