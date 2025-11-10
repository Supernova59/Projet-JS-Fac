import Mobile from './mobile';
import StarShipImgSrc from './assets/images/xwing.png';
import ExplosionImgSrc from './assets/images/explosion.png';

export default class StarShip extends Mobile {
    static MOBILE_WIDTH = 48;
    static MOBILE_HEIGHT = 38;

    constructor(x, y) {
        super(x, y, 0, 0, StarShipImgSrc, StarShip.MOBILE_WIDTH, StarShip.MOBILE_HEIGHT);
        this.moving = null;
        this.exploding = false;
        this.explosionTime = 0;
    }

    get up() {
        return this.moving === 'up';
    }

    get down() {
        return this.moving === 'down';
    }

    moveUp() {
        this.moving = 'up';
        this.deltaY = -8;
    }

    moveDown() {
        this.moving = 'down';
        this.deltaY = 8;
    }

    stop() {
        this.moving = null;
        this.deltaY = 0;
    }

    move(canvas) {
        if ((this.y + this.deltaY >= 0) && (this.y + this.deltaY + this.height <= canvas.height)) {
            super.move();
        }
    }

    explode() {
        this.exploding = true;
        this.explosionTime = Date.now();
        this.image.src = ExplosionImgSrc;
    }

    detectCollision(mobile) {
        return this.x < mobile.x + mobile.width &&
               this.x + this.width > mobile.x &&
               this.y < mobile.y + mobile.height &&
               this.y + this.height > mobile.y;
    }

    draw(context) {
        context.save();
        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.rotate(90 * Math.PI / 180);
        context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        context.restore();
    }
}