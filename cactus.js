class Cactus extends Obstacle {
    constructor() {
        let cactusProperties = Cactus.initCactus();
        super(cactusProperties.x, cactusProperties.y, cactusProperties.width, cactusProperties.height);
        this.cactusImg = cactusProperties.cactusImg;
    }

    static initCactus() {
        let cactusImg = allCactiImgs[floor(random(0, 6))];
        return {
            x: width + 225,
            y: height - 206 - cactusImg.height,
            width: cactusImg.width,
            height: cactusImg.height,
            cactusImg: cactusImg,
        };
    }

    move() {
        this.x -= gameSpeed;
    }

    update() {
        this.move();
    }

    show() {
        image(this.cactusImg, this.x, this.y, this.width, this.height);
    }
}
