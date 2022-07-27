import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";

import { RiArrowGoBackLine, RiArrowGoForwardFill } from "react-icons/ri";
import { AiOutlinePause } from "react-icons/ai";
import { FiPlay } from "react-icons/fi";
import ButtonBg from "../Buttons/ButtonBg";
import "@vime/core/themes/default.css";
import "@vime/core/themes/light.css";
import "./index.css";

import {
  Player,
  Ui,
  Hls,
  Poster,
  ClickToPlay,
  ControlSpacer,
  TimeProgress,
  Spinner,
  Tooltip,
  Skeleton,
  DblClickFullscreen,
  Controls,
  ScrubberControl,
  PlaybackControl,
  PipControl,
  VolumeControl,
  SettingsControl,
  FullscreenControl,
  Control,
  Submenu,
  MenuRadio,
  MenuRadioGroup,
  Settings,
} from "@vime/react";

import { movieDetailSelector } from "../../redux/selector";
import { getMovieMedia } from "../../services/movieMediaSlice";
function VideoPlayer({ videoSource, poster, subtitlesLink, definitionList, handleClickEpisode,handleDispatchMedia }) {
  const player = useRef();
  const dispatch = useDispatch();
  const params = useParams();

  const [modalOpen, setModalOpen] = useState(false);
  const { category, id, episodeId = 0 } = params;
  const { movieDetail } = useSelector(movieDetailSelector);
  const [currentTime, setCurrentTime] = useState(0);

  const [videoSrc, setVideoSrc] = useState();
  useEffect(() => {
    setVideoSrc(videoSource);
  }, [videoSource]);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const isPlaying = useRef(playing);
  const [subtitlesIndex, setSubtitlesIndex] = useState(0);
  const [valueRate, setValueRate] = useState("1");
  const [definition, setDefinition] = useState(definitionList[0].code);
  
  const handlePlayerPress = (e) => {
    if(document.activeElement.tagName !== "INPUT") {
      switch (e.key) {
      case " ":
      case "k":
        e.preventDefault();
        app.playBack();
        break;

      case "ArrowRight":
        app.seekForward();
        break;

      case "ArrowLeft":
        app.seekBackward();
        break;
      case "ArrowUp":
        e.preventDefault();
        app.increaseVolume();
        break;

      case "ArrowDown":
        e.preventDefault();
        app.decreaseVolume();
        break;
      case "m": {
        app.muteVolume();
        break;
      }
      case "f": {
        app.enterFullScreen();
        break;
      }
      default:
        break;
    }
    }
  };
  const app = {
    playBack: function () {
      if (isPlaying.current) {
        player?.current?.pause();
      } else {
        player?.current?.play();
      }
    },
    seekForward: function () {
      setCurrentTime(player?.current?.currentTime + 10);
    },
    seekBackward: function () {
      setCurrentTime(player?.current?.currentTime - 10);
    },
    increaseVolume: function () {
      setVolume(player?.current?.volume + 10);
    },
    decreaseVolume: function () {
      setVolume(player?.current?.volume - 10);
    },
    muteVolume: function () {
      setIsMuted((isMuted) => !isMuted);
    },
    enterFullScreen: function () {
      if (player?.current?.isFullscreenActive) {
        player?.current?.exitFullscreen();
      } else {
        player?.current?.enterFullscreen();
      }
    },
    onPlayingUpdate: function (event) {
      setPlaying((prev) => {
        isPlaying.current = event.detail;
        return event.detail;
      });
    },
    onTimeUpdate: function (event) {
      setCurrentTime(event.detail);
      if(event.detail !== 0) {
        document.cookie = `currentTime=${event.detail}`;
      }
    },
    onSubtitlesIndexChange: function (event) {
      setSubtitlesIndex(event.target.value);
      player?.current?.setCurrentTextTrack(event.target.value);
    },
    onValueRateChange: function (event) {
      setValueRate(event.target.value);
    },
    handleClickPlayer: function (e) {
      if (e.target.id === "vm-player-1") {
        app.playBack();
      }
    },
    onDefinitionChange: function (event) {
      setDefinition(event.target.value);
      const episodeIdCurrent =
      episodeId !== 0 ? episodeId : movieDetail?.episodeVo?.[0]?.id;
      
      dispatch(
        getMovieMedia({
          path: `media/previewInfo`,
          params: {
            category,
            contentId: id,
            episodeId: episodeIdCurrent,
            definition: event.target.value,
          },
        })
      );

      // setCurrentTime(+app.getCookie('currentTime'))
    },
    onPlaybackEnded: function () {
      player?.current?.exitFullscreen()

      const length = movieDetail?.episodeVo?.length
      if(movieDetail?.episodeVo?.[length-1].id !== +episodeId ) setModalOpen(!modalOpen);
    },
    goToNextEpisode : function ()  {
      movieDetail?.episodeVo?.forEach((item, i) => {
        const nextEpisode = movieDetail?.episodeVo?.[i+1]
        if((i === 0 && episodeId === 0 )|| (+episodeId === item.id)) {
          handleClickEpisode(nextEpisode?.id,i+1)
        }
      })
    },
    onError : function () {
      handleDispatchMedia()
      console.log('reload...');
      // console.log('Sorry if you get this error. This happen because this is not my server. I tried my best but I cannot do anything about this error');
      // setCurrentTime(+app.getCookie('currentTime'))
    },
    getCookie : function (cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  };

  useEffect(() => {
    document.cookie = 'currentTime=0'
    console.log(app.getCookie('currentTime'));
  },[id,episodeId])

  useEffect(() => {
    subtitlesLink?.forEach((sub, i) => {
      if (sub.languageAbbr === "vi") {
        setSubtitlesIndex(i);
      }
    });
  }, [subtitlesLink]);

  useEffect(() => {
    window.addEventListener("keydown", (e) => handlePlayerPress(e));
    return () =>
      window.removeEventListener("keydown", (e) => handlePlayerPress(e));
  }, []);
  return (
    <Box position={"relative"}>
      <Player
        autoplay
        theme="dark"
        style={{
          "--vm-player-theme": "#777",
          "--vm-blocker-z-index": "50",
          cursor: "pointer",
          maxHeight : '100%',
          maxWidth : "100%"
        }}
        onVmPlaybackReady={() => {
          setCurrentTime(+app.getCookie('currentTime'))
          if(!playing) setPlaying(true)
          
        }}

        volume={volume}
        playbackRate={valueRate}
        currentTime={currentTime}
        onVmCurrentTimeChange={app.onTimeUpdate}
        onVmPlayingChange={app.onPlayingUpdate}
        onVmPlaybackEnded={() => app.onPlaybackEnded()}
        ref={player}
        onClick={(e) => app.handleClickPlayer(e)}
      >
        <Hls onVmError={() => app.onError()} crossOrigin="anonymous" poster={poster} preload="none">
          <source type="application/x-mpegURL" data-src={videoSrc} />
          {subtitlesLink?.map((sub, i) => {
            return (
              <track
                key={i}
                kind="subtitles"
                default={subtitlesIndex == i}
                src={`https://srt-to-vtt.vercel.app/?url=${sub.subtitlingUrl}`}
                srcLang={sub.languageAbbr}
                label={sub.language}
              />
            );
          })}
        </Hls>
        <Ui>
          <Controls fullWidth>
            <ScrubberControl
              style={{
                bottom: "50px",
                "--vm-scrubber-loading-stripe-size": "50px",
              }}
            />
          </Controls>

          <Controls pin="bottomLeft" full-width>
            <PlaybackControl tooltip-direction="right" />
            <VolumeControl vocab="10" step={10} />
            <TimeProgress />

            <ControlSpacer />

            <Control>
              <Tooltip>Backward 10s</Tooltip>
              <RiArrowGoBackLine size={23} onClick={() => app.seekBackward()} />
            </Control>
            <Control>
              <Tooltip>Forward 10s</Tooltip>
              <RiArrowGoForwardFill
                size={23}
                onClick={() => app.seekForward()}
              />
            </Control>
            <PipControl />
            <SettingsControl key="s" />
            <FullscreenControl keys="f" tooltip-direction="left" />
          </Controls>

          <Settings>
            <Submenu label="Speeds">
              <MenuRadioGroup
                value={valueRate}
                onVmCheck={app.onValueRateChange}
              >
                <MenuRadio label="0.5" value="0.5" />
                <MenuRadio label="0.75" value="0.75" />
                <MenuRadio label="Normal" value="1" />
                <MenuRadio label="1.25" value="1.25" />
                <MenuRadio label="1.5" value="1.5" />
                <MenuRadio label="2" value="2" />
              </MenuRadioGroup>
            </Submenu>

            <Submenu label="Qualities">
              <MenuRadioGroup
                value={definition}
                onVmCheck={app.onDefinitionChange}
              >
                {definitionList?.map((definition, i) => {
                  return (
                    <MenuRadio
                      key={i}
                      label={definition.description}
                      value={definition.code}
                    />
                  );
                })}
              </MenuRadioGroup>
            </Submenu>

            <Submenu label="Subtitles">
              <MenuRadioGroup
                onVmCheck={app.onSubtitlesIndexChange}
                value={subtitlesIndex}
              >
                {subtitlesLink?.map((sub, i) => {
                  return <MenuRadio key={i} label={sub.language} value={i} />;
                })}
              </MenuRadioGroup>
            </Submenu>
          </Settings>
          <Spinner
            showWhenMediaLoading={true}
          />
          <DblClickFullscreen />
          <ClickToPlay />
          <Poster />
          
          <Skeleton
            effect="sheen"
            style={{
              "--vm-skeleton-sheen-color": "rgba(50,138,241,.15)",
              "--vm-skeleton-color": "rgba(50,138,241,.05)",
              "--vm-skeleton-z-index": "0",
            }}
          />
        </Ui>
      </Player>
      {!playing && (
        <Box
          position={"absolute"}
          top="50%"
          left="50%"
          transform={"translate(-50%,-50%)"}
          zIndex={"55"}
          cursor="pointer"
        >
          <motion.div
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FiPlay size={45} />
          </motion.div>
        </Box>
      )}
      {playing && (
        <Box
          position={"absolute"}
          top="50%"
          left="50%"
          transform={"translate(-50%,-50%)"}
          zIndex={"55"}
          cursor="pointer"
        >
          <motion.div
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AiOutlinePause size={45} />
          </motion.div>
        </Box>
      )}
      <Modal
        onClose={() => setModalOpen(false)}
        isOpen={modalOpen}
        motionPreset="slideInBottom"
        position={"absolute"} top="50%" left="50%" transform={"translate(-50%,-50%)"} zIndex={"55"}
      >
        <ModalOverlay />
        <ModalContent
          bg='bgColor'
          height='minContent'
          m={'auto'}
        >
          <ModalHeader
            color='textColor'
          >Episode Ended</ModalHeader>
          <ModalCloseButton
            color='textColor'
           />
          <ModalFooter
            display={'flex'} justifyContent='space-between' alignItems={'center'} w='full'
          >
            <Button fontWeight={'light'} variant='ghost' mr={3} onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Box
              onClick={() => app.goToNextEpisode()}
            >
              <ButtonBg>
                Go To next episode
              </ButtonBg>
            </Box>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
export default VideoPlayer;
