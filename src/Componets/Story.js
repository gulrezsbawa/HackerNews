import React, { useEffect, useState } from "react";

import Badge from "./Badge";
import "../CSS/Story.css";
const $ = require("jquery");
function Story(props) {
  useEffect(() => {
    // $("#myModal").show();
  }, []);

  const [selectedId, setSelectedId] = useState(0);
  //   console.log(props);
  const { id, title, by, time, kids, url, type, text } = props.items;
  return (
    <div key={id} className="storyItem">
      <div className="storyTitleBar">
        <div>
          {type === "story" ? (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="titleAnchor"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            ></a>
          ) : (
            <span
              dangerouslySetInnerHTML={{
                __html: text,
              }}
            ></span>
          )}
        </div>
        <div>
          <span
            className={
              (type === "story" ? "btn-link commentsBtn" : "") + " m-0 p-0"
            }
            onClick={() => {
              props.setSelectedKids(kids.slice(0, 20), id, "myModal");
            }}
          >
            {kids ? <Badge childLength={kids?.length} /> : null}
            {/* {kids && kids.length > 0 ? kids.length : 0} comments */}
          </span>
        </div>
      </div>
      <div className="storyFooter">
        <div>
          <span className="storyBy">{by}</span>
        </div>
        <div>
          {new Date(time * 1000).toLocaleDateString("en-US", {
            hour: "numeric",
            minute: "numeric",
          })}{" "}
        </div>
      </div>
    </div>
  );
}

export default Story;
