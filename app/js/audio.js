import Display from "./display.js";
import Note from "./note.js";
import Pitch from "./pitch.js";

class Tuner {
    constructor() {
        this.bufferSize = 4096;
        this.pitch = new Pitch(this.bufferSize);
        this.note = new Note();
        this.display = new Display();
    }


    init() {
        this.audioContext = new window.AudioContext();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = this.bufferSize;
    }

    startRecord() {
        const self = this;
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(function (stream) {
                self.input = new Float32Array(self.pitch.detector.inputLength);
                self.audioContext.createMediaStreamSource(stream).connect(self.analyser);
                self.readLoop();

            })
            .catch(function (error) {
                alert(error.name + ": " + error.message);
            });
    };

    readLoop() {
        this.analyser.getFloatTimeDomainData(this.input);

        const [pitch, clarity] = this.pitch.update(
            this.input,
            this.audioContext.sampleRate
        );

        if (clarity > 0.9) {
            const fullNote = this.note.getFullNote(pitch);
            this.display.update(fullNote);
        }


        requestAnimationFrame(() => this.readLoop());
    }
}

export default Tuner;
