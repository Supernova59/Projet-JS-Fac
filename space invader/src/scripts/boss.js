import Mobile from './mobile';
import BossImgSrc from './assets/images/boss.png';
import ExplosionImgSrc from './assets/images/explosion.png';

export default class Boss extends Mobile {
    static MOBILE_WIDTH = 288; // 96 * 3
    static MOBILE_HEIGHT = 228; // 76 * 3

    constructor(x, y, game) {
        super(x, y, -0.67, 0, BossImgSrc, Boss.MOBILE_WIDTH, Boss.MOBILE_HEIGHT); // Move 3 times slower
        this.exploding = false;
        this.explosionTime = 0;
        this.imageLoaded = false;
        this.health = 20; // Boss health
        this.game = game; // Reference to the game instance

        this.image.onload = () => {
            this.imageLoaded = true;
        };
        this.image.onerror = () => {
            console.error('Failed to load image:', this.image.src);
        };
    }

    takeHit() {
        this.health -= 1;
        if (this.health <= 0) {
            this.explode();
        }
    }

    explode() {
        this.exploding = true;
        this.explosionTime = Date.now();
        this.image.src = ExplosionImgSrc;
    }

    move(canvas, game) {
        if (this.exploding) {
            if (Date.now() - this.explosionTime > 300) {
                game.removeBoss(this);
            }
        } else {
            this.x += this.deltaX;
            if (this.x + this.width < 0) {
                game.removeBoss(this);
            }
        }
    }

    draw(context) {
        if (this.imageLoaded) {
            context.save();
            context.translate(this.x + this.width / 2, this.y + this.height / 2);
            context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
            context.restore();

            // Draw health bar
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y - 10, this.width, 5);
            context.fillStyle = 'green';
            context.fillRect(this.x, this.y - 10, this.width * (this.health / 20), 5);
        }
    }
}