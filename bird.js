class Bird extends Obstacle {
    constructor() {
        let birdProperties = Bird.initBird();
        super(birdProperties.x, birdProperties.y, birdProperties.width, birdProperties.height);
        
        this.displayBirdImg1 = true;
        this.animTimer = 0;
        this.speed = birdProperties.speed;
        this.isBird = true;
    }

    static initBird() {
        let x = width + 225;
        let y = random(1) < 0.5 ? height - 206 - 250 : height - 206 - 350;
        let birdWidth = birdImg1.width;
        let birdHeight = birdImg1.height;
        let speed = random(-gameSpeed / 8, gameSpeed / 8);
        return { x, y, width: birdWidth, height: birdHeight, speed };
    }

    move() {
        this.x -= gameSpeed + this.speed;
    }

    update() {
        this.move();
        this.animTimer++;
        if (this.animTimer === 25) {
            this.animTimer = 0;
            this.displayBirdImg1 = !this.displayBirdImg1;
        }
    }

    show() {
        const birdImage = this.displayBirdImg1 ? birdImg1 : birdImg2;
        image(birdImage, this.x, this.y, this.width, this.height);
    }
}
