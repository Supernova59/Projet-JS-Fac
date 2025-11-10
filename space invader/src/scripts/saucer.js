import Mobile from './mobile';
import SaucerImgSrc from './assets/images/tie.png';
import ExplosionImgSrc from './assets/images/explosion.png';

export default class Saucer extends Mobile {
    static MOBILE_WIDTH = 48;
    static MOBILE_HEIGHT = 38;

    constructor(x, y) {
        super(x, y, -3, 0, SaucerImgSrc, Saucer.MOBILE_WIDTH, Saucer.MOBILE_HEIGHT);
        this.exploding = false;
        this.explosionTime = 0;
        this.falling = false;
        this.imageLoaded = false;

        this.image.onload = () => {
            this.imageLoaded = true;
        };
        this.image.onerror = () => {
            console.error('Failed to load image:', this.image.src);
        };
    }

    explode() {
        this.falling = true;
        this.deltaX = 0;
        this.deltaY = 3;
    }

    move(canvas, game) {
        if (this.falling) {
            this.y += this.deltaY;
            if (this.y + this.height >= canvas.height) {
                this.exploding = true;
                this.explosionTime = Date.now();
                this.image.src = ExplosionImgSrc;
                this.falling = false;
            }
        } else if (this.exploding) {
            if (Date.now() - this.explosionTime > 300) {
                game.removeSaucer(this);
            }
        } else {
            this.x += this.deltaX;
            if (this.x + this.width < 0) {
                game.removeSaucer(this);
            }
        }
    }

    draw(context) {
        if (this.imageLoaded) {
            context.save();
            context.translate(this.x + this.width / 2, this.y + this.height / 2);
            context.rotate(-90 * Math.PI / 180); // Rotate 90 degrees to the left
            context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
            context.restore();
        }
    }
}