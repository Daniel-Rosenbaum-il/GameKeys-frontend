import React from "react";
// import PropTypes from "prop-types";

export function Video({ url }) {
    return (
        <div className="video-responsive">
            <iframe
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