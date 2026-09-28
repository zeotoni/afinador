import Tuner from "./audio.js";

const tuner = new Tuner();

const btn = document.getElementById("micButton");

btn.addEventListener('click', () => {
    if(window.confirm("Ligar microfone para capturar o som ?")) {
        tuner.init();
        tuner.startRecord();
    }
})