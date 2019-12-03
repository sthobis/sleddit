import React, { ReactElement } from "react";

interface EmbedMediaProps {
  type: string;
  url: string;
  domain: string;
}

// https://gist.github.com/takien/4077195
function getYoutubeId(url: string): string {
  let id = "";
  let parsed = url
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (parsed[2] !== undefined) {
    id = parsed[2].split(/[^0-9a-z_\-]/i)[0];
  } else {
    id = parsed[0];
  }
  return id;
}

const EmbedMedia = ({ type, url, domain }: EmbedMediaProps) => {
  let media: ReactElement;
  if (type === "comment") {
    if (/\.(gif|jpe?g|tiff|png)$/i.test(url)) {
      // image files that can be inlined
      media = <img className="embed-image" alt={url} src={url} />;
    } else if (domain === "gfycat.com") {
      // gfycat links
      const gfycatId = url.split("gfycat.com/")[1];
      media = (
        <div className="embed-iframe">
          <iframe src={`https://gfycat.com/ifr/${gfycatId}`} frameBorder={0} />
        </div>
      );
    } else if (domain === "youtube.com" || domain === "youtu.be") {
      // youtube links
      const youtubeId = getYoutubeId(url);
      media = (
        <div className="embed-iframe">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
            frameBorder={0}
            allowFullScreen
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      );
    } else {
      // text-based and any other unidentified post
      media = (
        <a className="embed-text" href={url}>
          {url.length <= 40 ? url : url.substring(0, 40) + "..."}
        </a>
      );
    }
  } else {
    // text-based and any other unidentified post
    media = (
      <a className="embed-text" href={url}>
        {url.length <= 40 ? url : url.substring(0, 40) + "..."}
      </a>
    );
  }

  return (
    <div className="root">
      {media}
      <style jsx>{`
        .root :global(.embed-image) {
          max-width: 100%;
          max-height: 400px;
          border-radius: 4px;
          margin: 6px 0 0 0;
        }

        .root :global(.embed-text) {
          color: #0576b9;
          text-decoration: none;
        }

        .root :global(.embed-iframe) {
          position: relative;
          width: 100%;
          overflow: hidden;
          margin: 6px 0 0 0;
        }

        .root :global(.embed-iframe::before) {
          content: "";
          display: block;
          padding-top: 75%;
        }

        .root :global(.embed-iframe iframe) {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
        }

        .root :global(.embed-text) {
          word-break: break-word;
        }
      `}</style>
    </div>
  );
};

export default EmbedMedia;
