const birdDom = document.querySelector(".bird");
const birdStyles = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const birdTop = parseFloat(birdStyles.top);
const birdLeft = parseFloat(birdStyles.left);
const gameDom = document.querySelector(".game");
const gameHeight = document.querySelector(".game").clientHeight;

class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
        this.g = 1500;
        this.maxY = gameHeight - landHeight - this.height;
        this.swingStatus = 1;
        this.timer = null;
        this.render();

    }
    render(){
        super.render();
        this.dom.className = `bird swing${this.swingStatus}`;
    }
    startSwing() {
        if(this.timer){
            return;
        }
        this.timer = setInterval(() => {
            this.swingStatus = this.swingStatus++ % 3 + 1;
            this.render();
        }, 200);
    }
    stopSwing() {
        clearInterval(this.timer);
        this.timer = null;
    }
    move(duration) {
        super.move(duration);
        this.ySpeed += this.g * duration;
    }
    onMove() {
        if (this.top < 0) {
            this.top = 0;
        } else if (this.top > this.maxY) {
            this.top = this.maxY;
        }
    }
    jump() {
        this.ySpeed = -200;
    }
}

