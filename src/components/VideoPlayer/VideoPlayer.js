/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RiArrowGoBackLine, RiArrowGoForwardFill } from "react-icons/ri";
import { Box, Input, Text, Flex } from "@chakra-ui/react";
import { AiOutlineUpload } from "react-icons/ai";
import "@vime/core/themes/default.css";
import "@vime/core/themes/light.css";
import "./index.css";
import IconShow from "./IconShow";
import ModalPopup from "./ModalPopup";
import {
  Player,
  Hls,
  Ui,
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
  Captions,
} from "@vime/react";
import { movieDetailSelector } from "../../redux/selector";
import { getMovieMedia } from "../../services/movieMediaSlice";
function VideoPlayer({
  videoSource,
  poster,
  subtitlesLink,
  definitionList,
  handleClickEpisode,
}) {
  const player = useRef();
  const dispatch = useDispatch();
  const params = useParams();
  const { category, id, episodeId = 0 } = params;

  const { movieDetail } = useSelector(movieDetailSelector);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const isPlaying = useRef(playing);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);

  const [valueRate, setValueRate] = useState("1");
  const [definition, setDefinition] = useState(definitionList[0].code);
  const [subtitlesIndex, setSubtitlesIndex] = useState(0);
  const [subtitlesList, setSubtitlesList] = useState([...subtitlesLink]);

  useEffect(() => {
    setSubtitlesList([...subtitlesLink]);
  }, [subtitlesLink]);

  const handlePlayerPress = (e) => {
    if (document.activeElement.tagName !== "INPUT") {
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
      if (event.detail !== 0) {
        document.cookie = `currentTime=${event.detail}`;
      }
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
    },
    handleDispatchMedia: function () {
      dispatch(
        getMovieMedia({
          path: `media/previewInfo`,
          params: {
            category,
            contentId: id,
            episodeId:
              episodeId !== 0 ? episodeId : movieDetail?.episodeVo?.[0]?.id,
            definition: definition,
          },
        })
      );
    },
    onPlaybackEnded: function () {
      player?.current?.exitFullscreen();

      const length = movieDetail?.episodeVo?.length;
      if (movieDetail?.episodeVo?.[length - 1].id !== +episodeId)
        setModalOpen(!modalOpen);
    },
    goToNextEpisode: useCallback(
      function () {
        movieDetail?.episodeVo?.forEach((item, i) => {
          const nextEpisode = movieDetail?.episodeVo?.[i + 1];
          if ((i === 0 && episodeId === 0) || +episodeId === item.id) {
            handleClickEpisode(nextEpisode?.id, i + 1);
          }
        });
      },
      [movieDetail]
    ),
    onError: function (info) {
      const type = info.detail.data.type;
      if (type !== "mediaError") {
        app.handleDispatchMedia();
        console.clear();
        console.log("RELOAD...");
      }
    },
    getCookie: function (cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    onSubtitlesIndexChange: function (event) {
      let value = +event?.target?.value;

      if (event === undefined) {
        value = 0;
      }

      setSubtitlesIndex(value);
      // bi lech index
      player?.current?.setCurrentTextTrack(value);
      // console.log(subtitlesList[value]?.language);
    },
  };

  useEffect(() => {
    subtitlesList?.forEach((sub, i) => {
      if (sub.languageAbbr === "vi") {
        setSubtitlesIndex(i);
        player?.current?.setCurrentTextTrack(i);
      }
    });
  }, [subtitlesLink]);
  
  useEffect(() => {
    document.cookie = "currentTime=0";
  }, [id, episodeId]);

  useEffect(() => {
    window.addEventListener("keydown", (e) => handlePlayerPress(e));
    return () =>
      window.removeEventListener("keydown", (e) => handlePlayerPress(e));
  }, []);

  const handleImportSub = (e) => {
    const file = e.target.files[0];
    const srtType = file.name.endsWith("vtt");
    // check bang kiem tra dau co phai webvtt hay ko
    if (srtType) {
      const url = URL.createObjectURL(file);
      // sub active set mat tieu
      //  sub truoc sub active hien tai thanh 2 cai
      // sub 0 mat va tat ca bi lech index+1
      setSubtitlesList((prev) => {
        return [
          {
            language: file.name,
            languageAbbr: "fileImport",
            subtitlingUrl: url,
            translateType: 1,
          },
          ...prev,
        ];
      });
      setSubtitlesIndex(0);
      player?.current?.setCurrentTextTrack(0);
    }
    // {
    //   // var reader = new FileReader();
    //   // reader.readAsText(file);
    //   // reader.onload = function () {
    //   //   var srtxt = reader.result.split("\n");
    //   //   let txt = "WEBVTT\n";

    //   //   let isContent = false;
    //   //   const subtitleData = [];
    //   //   let stampIndex = 0;
    //   //   let timeInfo = [];
    //   //   for (let i = 0; i < srtxt.length; i++) {
    //   //     if (
    //   //       srtxt[i].match(
    //   //         /[0-9]+:[0-9]+:[0-9]+,[0-9]+\s-->\s[0-9]+:[0-9]+:[0-9]+,[0-9]+/g
    //   //       )
    //   //     ) {
    //   //       const time = srtxt[i].replace(/,/g, ".");
    //   //       txt = txt + time + "\n";
    //   //       stampIndex = i;
    //   //       isContent = true;
    //   //       timeInfo = time.split("-->");
    //   //     } else {
    //   //       txt = txt + srtxt[i] + "\n";
    //   //       if (isContent) {
    //   //         subtitleData.push({
    //   //           index: +srtxt[stampIndex - 1],
    //   //           timeStart: timeInfo[0],
    //   //           timeEnd: timeInfo[1],
    //   //           content: srtxt[stampIndex + 1],
    //   //         });
    //   //       }
    //   //     }
    //   //   }
    //   //   const video = document.querySelector('.lazy.sc-vm-file.sc-vm-file-s')
    //   //   let captiontrack = video.addTextTrack(
    //   //     "subtitles",
    //   //     "Captions",
    //   //     "en"
    //   //   );
    //   //   captiontrack.mode = "showing";
    //   //   captiontrack.addCue(new VTTCue(0, 1, "Hildy 1"));
    //   //   captiontrack.addCue(new VTTCue(2, 3, "Hildy 2222"));
    //   // };
    // }
  };
  return (
    <Box position={"relative"}>
      <Player
        autoplay
        theme="dark"
        style={{
          "--vm-player-theme": "#777",
          "--vm-blocker-z-index": "50",
          cursor: "pointer",
          maxHeight: "100%",
          maxWidth: "100%",
        }}
        ref={player}
        volume={volume}
        playbackRate={valueRate}
        currentTime={currentTime}
        onClick={(e) => app.handleClickPlayer(e)}
        onVmPlaybackReady={() => {
          setCurrentTime(+app.getCookie("currentTime"));
          if (!playing) setPlaying(true);
        }}
        onVmCurrentTimeChange={app.onTimeUpdate}
        onVmPlayingChange={app.onPlayingUpdate}
        onVmPlaybackEnded={() => app.onPlaybackEnded()}
      >
        <Hls
          onVmError={(info) => app.onError(info)}
          crossOrigin="anonymous"
          poster={poster}
          preload="auto"
        >
          <source type="application/x-mpegURL" data-src={videoSource} />
          {subtitlesList?.map((sub, i) => {
            let url = "https://srt2vttphp.herokuapp.com/index.php?url=";
            if (sub.languageAbbr === "fileImport") {
              url = "";
            }
            return (
              <track
                key={i}
                kind="subtitles"
                id={i}
                default={subtitlesIndex === i}
                src={`${url}${sub.subtitlingUrl}`}
                data-vs={`${url}${sub.subtitlingUrl}`}
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
              <Flex justify={"space-between"} align="center">
                <label
                  htmlFor="upload-sub"
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginLeft: "16px",
                    padding: "8px 5px",
                    borderBottom: "1px solid #555",
                  }}
                >
                  <Text fontSize={"16px"} fontWeight="500">
                    Import subtitle (.vtt){" "}
                  </Text>
                  <AiOutlineUpload size={24} />
                </label>
                <Input
                  display={"none"}
                  w={"0"}
                  type="file"
                  accept=".vtt"
                  placeholder="vtt file"
                  id="upload-sub"
                  visibility={"hidden"}
                  onChange={(e) => handleImportSub(e)}
                />
              </Flex>
              <MenuRadioGroup
                onVmCheck={app.onSubtitlesIndexChange}
                value={subtitlesIndex}
              >
                {subtitlesList?.map((sub, i) => {
                  return <MenuRadio key={i} label={sub.language} value={i} />;
                })}
              </MenuRadioGroup>
            </Submenu>
          </Settings>
          <Spinner showWhenMediaLoading={true} />
          <DblClickFullscreen />
          <ClickToPlay />
          <Poster />
          <Captions />
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

      {!playing && <IconShow status="play" />}
      {playing && <IconShow status="pause" />}
      <ModalPopup
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        goToNextEpisode={app.goToNextEpisode}
      />
    </Box>
  );
}
export default memo(VideoPlayer);
