class Blob {
    constructor(canvas, canvas2) {
        if(!canvas || !canvas2) {
            throw Error("Error: Please add two canvas element to Blob class")
        }
        this.canvas = canvas
        this.canvasTwo = canvas2
        this.c = this.canvas.getContext("2d");
        this.c2 = this.canvasTwo.getContext("2d");

        this.canvas.width = canvas.parentNode.offsetWidth
        this.canvas.height = canvas.parentNode.offsetHeight

        this.canvasTwo.width = canvas2.parentNode.offsetWidth
        this.canvasTwo.height = canvas2.parentNode.offsetHeight
        

        this.SCALE = 1;
        this.TWO_PI = Math.PI * 2;
        this.HALF_PI = Math.PI / 2;
        this.wobbleIncrement = 0;
        // use this to change the size of the blob
        this.radius = this.canvas.height;
        // think of this as detail level
        // number of conections in the `bezierSkin`
        this.segments = 12;
        this.step = this.HALF_PI / this.segments;
        this.anchors = [];
        this.radii = [];
        this.thetaOff = [];

        const bumpRadius = 100;
        const halfBumpRadius = bumpRadius / 2;

        for (let i = 0; i < this.segments + 2; i++) {
            this.radii.push(Math.random() * bumpRadius - halfBumpRadius);
            this.thetaOff.push(Math.random() * this.TWO_PI);
        }

        this.theta = 0;
        this.thetaRamp = -7;
        this.thetaRampDest = 12;
        this.rampDamp = 30;
    }
    update() {
        this.thetaRamp += (this.thetaRampDest - this.thetaRamp) / this.rampDamp;
        this.theta += 0.015;

        this.anchors = [0, this.radius];
        for (let i = 0; i <= this.segments + 2; i++) {
            const sine = Math.sin(this.thetaOff[i] + this.theta + this.thetaRamp);
            const rad = this.radius + this.radii[i] * sine;
            const theta = this.step * i;
            const x = rad * Math.sin(theta);
            const y = rad * Math.cos(theta);
            this.anchors.push(x, y);
        }

        this.c.scale(this.SCALE, this.SCALE);
        this.c.fillStyle = "#1E222D";
        this.c.beginPath();
        this.bezierSkin(this.anchors, false);
        this.c.lineTo(0, 0);
        this.c.fill();
        this.c.restore();

        this.c2.scale(this.SCALE, this.SCALE);
        this.c2.fillStyle = "#1E222D";
        this.c2.beginPath();
        this.bezierSkin(this.anchors, false);
        this.c2.lineTo(0, 0);
        this.c2.fill();
        this.c2.restore();
    }

    bezierSkin(bez) {
        const avg = this.calcAvgs(bez);
        const leng = bez.length;
        for (let i = 2; i < leng; i += 2) {
            let n = i + 1;
            this.c.quadraticCurveTo(bez[i], bez[n], avg[i], avg[n]);
            this.c2.quadraticCurveTo(bez[i], bez[n], avg[i], avg[n]);
        }
    }

    calcAvgs(p) {
        const avg = [];
        const leng = p.length;
        let prev;
        for (let i = 2; i < leng; i++) {
            prev = i - 2;
            avg.push((p[prev] + p[i]) / 2);
        }
        // close
        return avg;
    }
}

const blob = new Blob(document.querySelector("#blob-wave-right"), document.querySelector("#blob-wave-left"));

window.addEventListener('resize', () => {onResize()})


function onResize() {
    blob.canvas.width = blob.canvas.parentNode.offsetWidth
    blob.canvas.height = blob.canvas.parentNode.offsetHeight
    blob.canvasTwo.width = blob.canvasTwo.parentNode.offsetWidth
    blob.canvasTwo.height = blob.canvasTwo.parentNode.offsetHeight
    blob.radius = blob.canvas.height;
}

function loop() {
    blob.c.clearRect(0, 0, blob.canvas.width, blob.canvas.height);
    blob.c2.clearRect(0, 0, blob.canvas.width, blob.canvas.height);
    blob.update();
    window.requestAnimationFrame(loop);
}
loop();
