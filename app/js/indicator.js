class Indicator {

    indicatorContainer = document.querySelector(".indicator");

    cx = 160;
    cy = 160;
    radius = 140;

    tickCount = 9;
    centerIndex = Math.floor(this.tickCount / 2);
    centerInnerOffset = 30;
    tickInnerOffset = 20; 
    centerStrokeWidth = 6;
    tickStrokeWidth = 4;

    inTuneTolerance = 3;

    svg;
    ticks = [];
    activeTickIndex;
    inTune;

    constructor() {
        const svgNS = "http://www.w3.org/2000/svg";

        this.colors = {
            locked: this.readCssVariable("--locked"),
            primary: this.readCssVariable("--primary"),
            tick: this.readCssVariable("--tick"),
        };

        this.svg = document.createElementNS(svgNS, "svg");
        this.svg.setAttribute("viewBox", "0 0 320 160");
        this.svg.setAttribute("aria-hidden", "true");

        for (let i = 0; i < this.tickCount; i++) {
            const isCenter = i === this.centerIndex;
            const angle = this.angleForTick(i);
            const innerRadius = isCenter
                ? this.radius - this.centerInnerOffset
                : this.radius - this.tickInnerOffset;

            const x1 = this.cx + Math.sin(angle) * innerRadius;
            const y1 = this.cy - Math.cos(angle) * innerRadius;
            const x2 = this.cx + Math.sin(angle) * this.radius;
            const y2 = this.cy - Math.cos(angle) * this.radius;

            const line = document.createElementNS(svgNS, "line");
            line.setAttribute("x1", x1);
            line.setAttribute("y1", y1);
            line.setAttribute("x2", x2);
            line.setAttribute("y2", y2);
            line.setAttribute("stroke", this.colors.tick);
            line.setAttribute("stroke-width", isCenter ? this.centerStrokeWidth : this.tickStrokeWidth);
            line.setAttribute("stroke-linecap", "round");

            this.svg.appendChild(line);
            this.ticks.push(line);
        }

        this.indicatorContainer.appendChild(this.svg);
    }

    readCssVariable(name) {
        return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }

    angleForTick(index) {
        const degrees = -90 + (index / (this.tickCount - 1)) * 180;
        return degrees * (Math.PI / 180);
    }

    update(fullNote) {
        const normalized = (fullNote.cents / 50) * this.centerIndex;
        this.activeTickIndex = Math.round(
            Math.max(-this.centerIndex, Math.min(this.centerIndex, normalized))
        );
        this.inTune = Math.abs(fullNote.cents) <= this.inTuneTolerance;

        this.ticks.forEach((line, i) => {
            const isActive = i === this.centerIndex + this.activeTickIndex;
            const stroke = isActive
                ? (this.inTune ? this.colors.locked : this.colors.primary)
                : this.colors.tick;
            line.setAttribute("stroke", stroke);
        });
    }
}

export default Indicator;