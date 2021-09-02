import React, { Component, useEffect, useState, useReducer, useCallback } from 'react';
import './videoplayer.css'
import $ from 'jquery'

/**
 * hodots. Video Player
 * 
 * @param {string} src Source of the video
 * @param {string} placeholder Placeholder of the video, Thumbnail is the default one
 * @param {Number} maxHeight Maximum height of the video viewport
 */
class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.videoPause = this.videoPause.bind(this)
        this.state = {
            xPos: "0px",
            yPos: "0px",
            showMenu: false,
            keysDisabled: this.props.keysDisabled
        }
        this.KeySettingVideo = this.KeySettingVideo.bind(this)
    }

    componentDidMount() {
        var scope = this
        window.addEventListener('keydown', this.KeySettingVideo)

        const Seekbar = document.getElementById("videoprogress-bar")
        Seekbar.addEventListener("mousedown", function (e) {
            document.addEventListener("mousemove", this.ResizeSeeking, false)
        }, false)
        document.addEventListener("mouseup", function () {
            document.removeEventListener("mousemove", this.ResizeSeeking, false)
        }, false)

        const Viewport = document.getElementById("VideoViewport")
        Viewport.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            const xPos = event.pageX + "px";
            const yPos = event.pageY + "px";
            //console.log(xPos + ", " + yPos)
        });

        $(document).click(function (e) {
            if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                console.log(e)
            }
            var videocon = $(".VideoPost");

            if (!videocon.is(e.target) && videocon.has(e.target).length === 0) {
                if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                    console.log("clicked outside")
                }
                scope.setState({ keysDisabled: true })
            } else {
                if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                    console.log("clicked inside")
                }
                scope.setState({ keysDisabled: false })
            }
        })
    }

    ResizeSeeking(e) {
        console.log(e.clientX)
        /*const LocatedToSize = e.clientX / this.refs.videoProgScrub.offsetWidth
        this.refs.videoProgScrub.offsetWidth = LocatedToSize*/
    }

    KeySettingVideo(event) {
        /*event.preventDefault();*/
        if (!this.state.keysDisabled) {
            if (event.keyCode === 37) {
                this.refs.videoRefer.currentTime -= 5;
            }
            if (event.keyCode === 39) {
                this.refs.videoRefer.currentTime += 5;
            }
            if (event.keyCode === 32) {
                event.preventDefault();
                this.videotogglePlay()
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.KeySettingVideo)
    }

    //Video
    videotogglePlay() {
        if (this.refs.videoRefer.paused) {
            this.refs.playbtn.className = 'pause';
            this.refs.videoRefer.play();
        } else {
            this.refs.playbtn.className = 'play';
            this.refs.videoRefer.pause();
        }
    }
    videoPause() {
        this.refs.playbtn.className = 'play';
        this.refs.videoRefer.pause();
    }
    videotimeUpdate() {
        var progpos = this.refs.videoRefer.currentTime / this.refs.videoRefer.duration;
        this.refs.videoprogressfilled.style.width = progpos * 100 + "%";
        if (this.refs.videoRefer.ended) {
            this.refs.playbtn.className = 'play';
        }
        var cursecs = parseInt(this.refs.videoRefer.currentTime % 60);
        var curmins = parseInt(this.refs.videoRefer.currentTime / 60, 10);
        var dursecs = parseInt(this.refs.videoRefer.duration % 60);
        var durmins = parseInt(this.refs.videoRefer.duration / 60, 10);

        if (cursecs < 10) { cursecs = "0" + cursecs; }
        if (dursecs < 10) { dursecs = "0" + dursecs; }
        if (curmins < 10) { curmins = "0" + curmins; }
        if (durmins < 10) { durmins = "0" + durmins; }

        this.refs.videoCurrent.innerHTML = curmins + ":" + cursecs;
        this.refs.videoDuration.innerHTML = durmins + ":" + dursecs;
    }
    videoProgScrub(e) {
        const scrubTime = (e.clientX / this.refs.videoProgScrub.offsetWidth) * this.refs.videoRefer.duration;
        this.refs.videoRefer.currentTime = scrubTime;
    }
    videoTimeReturnCurrent() {
        return this.refs.videoRefer.currentTime;
    }

    PostVideo(src, thumbplace) {
        const videoSrc = src;
        const thumb = thumbplace;

        if (this.props.keysDisabled) {
            this.videoPause()
        }

        let mousedown = false;


        var videoViewportFullTarget = document.getElementById("VideoViewport")


        function FullscreenOn() {
            //videoViewportFullTarget.requestFullscreen()
        }

        return (
            <div className="Media">
                <div>
                    <div className="VideoPost" id="VideoViewport">
                        <div className="c-video">{/*Video*/}
                            <video ref="videoRefer" id="videoviewport"
                                placeholder={thumb}
                                onClick={this.videotogglePlay.bind(this)}
                                onTimeUpdate={this.videotimeUpdate.bind(this)}
                                preload={'auto'}
                                crossOrigin={"anonymous"}
                                style={{
                                    maxHeight: this.props.maxHeight,
                                    height: "100%",
                                }}
                                loop autoPlay playsinline>
                                    <source
                                    src={videoSrc}
                                    type={'video/mp4'}
                                    />
                                </video>
                            <div className="controls">
                                <div ref="videoProgScrub"
                                    onMouseMove={(e) => mousedown && this.videoProgScrub.bind(this)}
                                    onMouseDown={() => mousedown = true}
                                    onMouseUp={() => mousedown = false}
                                    onClick={this.videoProgScrub.bind(this)}
                                    id="videoprogress-bar">
                                    <div id="videoprogress-loaded">

                                    </div>
                                    <div ref="videoprogressfilled" id="videoprogress-filled">

                                    </div>
                                </div>
                                <div id="videobuttons">
                                    <button ref="playbtn" id="play-pause" className="pause" onClick={this.videotogglePlay.bind(this)}></button>
                                    <span id="videoTime"><span ref="videoCurrent" /> / <span ref="videoDuration" /></span>
                                    <span id="close-caption-button">CC</span>
                                    <span id="fullScreenVideo" onClick={() => FullscreenOn()}>&#8597;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    render() {
        return (<div>
            {this.PostVideo(this.props.src, this.props.placeholder)}
        </div>)
    }
}

export default VideoPlayer;