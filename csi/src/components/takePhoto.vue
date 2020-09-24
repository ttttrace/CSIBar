<template>
    <div class="wrapper">
        <video
            ref="video"
            :width="width"
            :height="height"
            autoplay
            style="width= 100%; height=100%; object-fit: fill"
        ></video>
        <canvas ref="canvas" width="300" height="300" v-show="taked"></canvas>
    </div>
</template>
<script>
export default {
    name: "takePhoto",
    props: {
        width: {
            default: 300, // 不传默认300
        },
        height: {
            default: 300, // 不传默认400
        },
    },
    data() {
        return {
            video: null,
            track: "",
            taked: false,
        };
    },
    methods: {
        init(call) {
            this.taked = false;
            this.video = this.$refs.video;
            navigator.getUserMedia =
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia;
            if (navigator.getUserMedia) {
                navigator.getUserMedia(
                    { video: true },
                    (stream) => {
                        this.track = stream.getTracks()[0]; // 通过这个关闭摄像头
                        try {
                            this.video.src = window.URL.createObjectURL(stream); // chrome版本<=70
                        } catch (e) {
                            this.video.srcObject = stream; // chrome版本>70
                        }
                        this.video.onloadedmetadata = (e) => {
                            console.log(e);
                            this.video.play();
                            call(true);
                        };
                    },
                    (err) => {
                        console.log(err);
                        call(false);
                    }
                );
            } else {
                call(false);
            }
        },
        takePhoto(call) {
            let canvas = this.$refs.canvas;
            let context2D = canvas.getContext("2d");
            context2D.fillStyle = "#ffffff";
            context2D.fillRect(0, 0, this.width, this.height);
            context2D.drawImage(this.video, 0, 0, this.width, this.height);
            var image = new Image();
	        image.src = canvas.toDataURL("image/png");
            this.taked = true;
            call(true, image);
            if (null != this.track) {
                this.track.stop(); //关闭摄像头
            }
        },
    },
    destroyed() {
        if (null != this.track) {
            this.track.stop(); //关闭摄像头
        }
    },
};
</script>
<style scoped>
canvas {
    position:absolute;
    margin:auto;
    z-index: 1000;
}
.wrapper {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>