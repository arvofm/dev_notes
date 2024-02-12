const audioElement = document.querySelector('audio');

const playButton = document.querySelector('#play-pause');
const currentTimeDisplay = document.querySelector('#current-time');

const volumeSlider = document.querySelector('#volume-slider');
const volumeValue = document.querySelector('#volume-value');
const volumeReset = document.querySelector('#reset-volume');

const stereoSlider = document.querySelector('#stereo-slider');
const stereoValue = document.querySelector('#stereo-value');
const stereoReset = document.querySelector('#reset-stereo');

const frequencyDisplayCanvas = document.querySelector('canvas');

const audioContext = new AudioContext();
const track = audioContext.createMediaElementSource(audioElement);


// connect the source directly to a destination
// track.connect(audioContext.destination);

// connect the source first to a modification node (gainNode in this case), then to the destination
/* min -3.4028235E38 and a max of about 3.4028235E38 --- gain, default is 1, I will use 2 max min 0 */
const gainNode = audioContext.createGain();     // AudioParam
// track.connect(gainNode).connect(audioContext.destination);

// stereo panner
const pannerOptions = {pan: 0};
const panner = new StereoPannerNode(audioContext, pannerOptions);
// track.connect(gainNode).connect(panner).connect(audioContext.destination);

// Now comes the visualizations
/* The frequencies are spread linearly from 0 to 1/2 of the sample rate. Default here is 44100 (/2) */
const analyser = new AnalyserNode(audioContext, {fftSize: 2048});
const bufferLength = analyser.frequencyBinCount;    // fftSize / 2
const dataArray = new Uint8Array(bufferLength);
analyser.getByteFrequencyData(dataArray);

// connect nodes from beginning to the end
track.connect(analyser).connect(gainNode).connect(panner).connect(audioContext.destination);

/************************************************************************************************/

const resolutionY = 256;

frequencyDisplayCanvas.width = 22050/20;
frequencyDisplayCanvas.height = frequencyDisplayCanvas.width * 9 / 16;
const WIDTH = frequencyDisplayCanvas.width;
const HEIGHT = frequencyDisplayCanvas.height;
const ctx = frequencyDisplayCanvas.getContext('2d');
ctx.clearRect(0, 0, WIDTH, HEIGHT);

window.requestAnimationFrame(eventLoop);

let barWidth = (WIDTH / bufferLength);
let barHeight = 0;
let barX = 0;

// event loop
function eventLoop() {
    // display current time and volume
    currentTimeDisplay.innerHTML = Number(audioElement.currentTime).toFixed(2);
    volumeValue.innerHTML = Number(volumeSlider.value*100).toFixed(0) + "%";

    // bad freq monitor
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    barX = 0;
    for (let i = 0; i < bufferLength; i++) {
        barHeight = HEIGHT*(dataArray[i]/bufferLength);
        barHeight *= bufferLength/resolutionY;
        ctx.fillStyle = `rgb(${barHeight},20,${barX*(barHeight/HEIGHT)})`;
        ctx.fillRect(barX, HEIGHT-barHeight, barWidth, barHeight);
        barX += barWidth;
    }

    // you sometimes do do that
    window.requestAnimationFrame(eventLoop);
}











// Events
// play pause
playButton.addEventListener('click', () => {
    if (playButton.dataset.playing === 'true') {
        audioElement.pause();   ////////////////////////////
        playButton.dataset.playing = 'false';
    } 
    else if (playButton.dataset.playing === 'false') {
        audioElement.play();    ////////////////////////////
        playButton.dataset.playing = 'true';
    }
});
audioElement.addEventListener('ended', () => {
    playButton.dataset.playing = 'false';
});

// change gain
volumeSlider.onchange = () => {
    gainNode.gain.value = volumeSlider.value;
};

// reset gain
volumeReset.onclick = () => {
    gainNode.gain.value = 1;
    volumeSlider.value = 1;
};


// adjust stereo
stereoSlider.onchange = () => {
    panner.pan.value = stereoSlider.value;
}


// reset stereo
stereoReset.onclick = () => {
    panner.pan.value = 0;
    stereoSlider.value = 0;
}
