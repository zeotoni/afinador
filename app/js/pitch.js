import { PitchDetector } from "https://esm.sh/pitchy@4";


class Pitch {

    constructor(bufferSize) {
        this.detector = PitchDetector.forFloat32Array(bufferSize);
        this.detector.minVolumeDecibels = -10;
    }

    update(input, sampleRate) {
        return this.detector.findPitch(input, sampleRate);
    }
}

export default Pitch;