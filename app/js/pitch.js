import { PitchDetector } from "./vendor/pitchy.js";


class Pitch {

    constructor(bufferSize) {
        this.detector = PitchDetector.forFloat32Array(bufferSize);
        this.detector.minVolumeDecibels = -15;
    }

    update(input, sampleRate) {
        return this.detector.findPitch(input, sampleRate);
    }
}

export default Pitch;