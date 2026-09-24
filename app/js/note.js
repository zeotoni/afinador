class Note {

    constructor() {
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

    noteByFrequence(frequency) {
        const note = 12 * (Math.log(frequency / 440) / Math.log(2));
        return Math.round(note) + 69;
    };
   
    noteStandard(note) {
        return 440 * Math.pow(2, (note - 69) / 12);
    };

    getDifference(frequency, note) {
        return Math.floor(
            (1200 * Math.log(frequency / this.noteStandard(note))) / Math.log(2)
        );
    };

}

export default Note;