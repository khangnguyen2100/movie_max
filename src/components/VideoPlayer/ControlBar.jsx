import React from "react";
import { RiArrowGoBackLine, RiArrowGoForwardFill } from "react-icons/ri";

import {
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
} from "@vime/react";
const ControlBar = ({
  app,
  valueRate,
  definition,
  definitionList,
  subtitlesIndex,
  subtitlesLink,
}) => {
  return (
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
          <RiArrowGoForwardFill size={23} onClick={() => app.seekForward()} />
        </Control>
        <PipControl />
        <SettingsControl key="s" />
        <FullscreenControl keys="f" tooltip-direction="left" />
      </Controls>

      <Settings>
        <Submenu label="Speeds">
          <MenuRadioGroup value={valueRate} onVmCheck={app.onValueRateChange}>
            <MenuRadio label="0.5" value="0.5" />
            <MenuRadio label="0.75" value="0.75" />
            <MenuRadio label="Normal" value="1" />
            <MenuRadio label="1.25" value="1.25" />
            <MenuRadio label="1.5" value="1.5" />
            <MenuRadio label="2" value="2" />
          </MenuRadioGroup>
        </Submenu>

        <Submenu label="Qualities">
          <MenuRadioGroup value={definition} onVmCheck={app.onDefinitionChange}>
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
      <Spinner showWhenMediaLoading={true} />
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
  );
};

export default ControlBar;
