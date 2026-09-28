import Tuner from "./audio.js";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
    });
}

const tuner = new Tuner();
const btn = document.getElementById("micButton");

btn.addEventListener('click', () => {
    if (window.confirm("Ligar microfone para capturar o som ?")) {
        tuner.init();
        tuner.startRecord();
    }
})