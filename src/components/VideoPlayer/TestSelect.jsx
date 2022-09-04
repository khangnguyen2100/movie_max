import React, {useEffect} from "react";

const TestSelect = ({ subtitlesList, subtitlesIndex, app }) => {
  
  return (
    <select
      onChange={(e) => app.onSubtitlesIndexChange(e)}
      name="a"
      id=""
      value={subtitlesIndex}
    >
      {subtitlesList?.map((sub, i) => {
        return (
          <option key={i} value={i}>
            {sub.language}
          </option>
        );
      })}
    </select>
  );
};

export default TestSelect;
