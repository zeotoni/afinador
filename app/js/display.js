class Display {

    noteContainer = document.querySelector(".note");
    noteSpan;
    frequencySpan;

    constructor() {
        this.noteSpan = document.createElement("span");
        this.frequencySpan = document.createElement("span");
        this.noteContainer.appendChild(this.noteSpan);
        this.noteContainer.appendChild(this.frequencySpan);
    }

    update(fullNote) {
        this.noteSpan.textContent = fullNote.note;
        this.frequencySpan.textContent = `${fullNote.frequency.toFixed(2)} Hz`;
    }

}

export default Display;