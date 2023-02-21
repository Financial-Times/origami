const visibleVideos = new Set();

let videoObserver;

export default function startObserving(viewPort, target, threshold = 0.5, playAction) {
  const observedArea = viewPort // || document.querySelector("main");
  
  const observerOptions = {
    root: observedArea,
    rootMargin: "0px",
    threshold
  };
  
  console.log("Starting observer with the following options", observerOptions, target);
  
  videoObserver = new IntersectionObserver((entries, observer) => intersectionCallback(entries, observer, playAction), observerOptions);
  
  if(target) observeVideo(target);
  
  // Only play when the window/tab is visible
  // document.addEventListener("visibilitychange", handleVisibilityChange);
}

function compareRatio (currentPlayer) {
  return (videoPlayer) => { 
    if(videoPlayer.prevRatio < currentPlayer.prevRatio){
      videoPlayer.pause();
    }
  };
}


function intersectionCallback(observedVideoElement, observer, action) {
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

            const shouldItPlay = compareRatio(videoPlayer);

            // Stop playing any other visible videos with a lower intersection ratio than the current video
            visibleVideos.forEach(shouldItPlay)
            
        } else {
            videoPlayer.pause();
            visibleVideos.delete(videoPlayer);
        }
    });
}

  

// function handleVisibilityChange() {
//   if (document.hidden) {
//     if (!previouslyVisibleVideos) {
//       previouslyVisibleVideos = visibleVideos;
//       visibleVideos = [];
      
//       previouslyVisibleVideos.forEach((videoPlayer) => {
//         updateAdTimer(videoPlayer);
//         videoPlayer.dataset.lastViewStarted = 0;
//       });
//     }
//   } else {
//     previouslyVisibleVideos.forEach((videoPlayer) => {
//       videoPlayer.dataset.lastViewStarted = performance.now();
//     });

//     visibleVideos = previouslyVisibleVideos;
    
//     previouslyVisibleVideos = null;
//   }
// }


function observeVideo(videoElement) {
//   if (videoElement) {
//     videoObserver.unobserve(videoElement);
//   }

//   if (!videoElement) {
//     observedArea.appendChild(videoPlayer);
//   }

  videoObserver.observe(videoElement);
}
