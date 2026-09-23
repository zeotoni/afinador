class Tuner {
    constructor() {
        this.middleA = 440;
        this.semitone = 69;
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
        const arr = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(arr);

        const media = arr.reduce((soma, valor) => soma + valor, 0) / arr.length;

        this.frameCount = (this.frameCount || 0) + 1;
        if (this.frameCount % 15 === 0) {
            console.log(Math.round(media));
        }

        requestAnimationFrame(() => this.readLoop());
    }
}
