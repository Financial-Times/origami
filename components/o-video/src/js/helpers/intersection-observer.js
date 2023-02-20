const visibleVideos = new Set();

let previouslyVisibleVideos = null;

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

  observeVideo(target);

  // Only play when the window/tab is visible
  // document.addEventListener("visibilitychange", handleVisibilityChange);
}


function intersectionCallback(allObservedVideoElements, observer, action) {
    console.log(allObservedVideoElements)

    allObservedVideoElements.forEach((videoBox) => {
        console.log(videoBox);
        const videoPlayer = videoBox.target;
  
        if (videoBox.isIntersecting) {
            console.log("Now playing")
			videoPlayer.muted="muted"
			action();

            if (videoBox.intersectionRatio > prevRatio) {
                console.log("This is coming more into view")
                action();
            } else {
                console.log("This is going out of view")
                videoPlayer.pause();
            }
            
            prevRatio = videoBox.intersectionRatio;

            if (videoBox.intersectionRatio >= 0.75) {
                visibleVideos.add(videoPlayer);
            }
        } else {
            console.log("Now pausing")
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
