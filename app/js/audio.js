import Note from "./note.js";
import Pitch from "./pitch.js";

class Tuner {
    constructor() {
        this.bufferSize = 4096;
        this.noteStrings = [
            "C",
            "C♯",
            "D",
            "D♯",
            "E",
            "F",
            "F♯",
            "G",
            "G♯",
            "A",
            "A♯",
            "B",
        ];

        this.pitch = new Pitch(this.bufferSize);
        this.note = new Note();

    }


    init() {
        this.audioContext = new window.AudioContext();
        this.analyser = this.audioContext.createAnalyser();
    }

    startRecord() {
        const self = this;
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(function (stream) {
                self.audioContext.createMediaStreamSource(stream).connect(self.analyser);
                self.readLoop();

            })
            .catch(function (error) {
                alert(error.name + ": " + error.message);
            });
    };

    readLoop() {
        const input = new Float32Array(this.pitch.detector.inputLength);

        this.analyser.getFloatTimeDomainData(input);

        const [pitch, clarity] = this.pitch.update(
            input,
            this.audioContext.sampleRate
        );

        if (clarity > 0.9) {
            this.note.noteByFrequence(pitch);
        }


        requestAnimationFrame(() => this.readLoop());
    }
}

export default Tuner;
