import React, { useEffect, useRef } from 'react';

const YouTubeVideo = ({ videoId }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    let player;
    const initializePlayer = () => {
      player = new window.YT.Player(playerRef.current, {
        videoId: videoId,
        playerVars: {
            playsinline: 1,
            controls: 1,
            autoplay: 1,
          },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };

    const onPlayerReady = (event) => {
      event.target.playVideo();
    };

    const onPlayerStateChange = (event) => {
      if (event.data === window.YT.PlayerState.ENDED) {
        // Video playback ended
        // Do something
      }
    };

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      // Load the YouTube API script dynamically
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initializePlayer;
    }

    return () => {
      // Clean up the player when the component unmounts
      //player.destroy();
    };
  }, [videoId]);

  return <div className="youtubeVideoContainer" ref={playerRef}></div>;
};

export default YouTubeVideo;
