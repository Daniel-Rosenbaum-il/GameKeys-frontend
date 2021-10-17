import React from "react";
// import PropTypes from "prop-types";

export function Video({ url }) {
    if(url.includes('=')) url = `https://www.youtube.com/embed/${url.slice(url.indexOf('=')+1)}`
    console.log('video', url);
    return (
        <div className="video-responsive">
            <iframe
                autoPlay={true}
                width="853"
                height="480"
                src={url}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            // sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation"
            />
        </div>
    );
}

// Video.propTypes = {
//     embedId: PropTypes.string.isRequired
// };

// export default Video;