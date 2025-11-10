import Mobile from './mobile';
import ShootImgSrc from './assets/images/lasersw.png';

export default class Shoot extends Mobile {
    static MOBILE_WIDTH = 36;
    static MOBILE_HEIGHT = 8;

    constructor(x, y) {
        super(x, y, 8, 0, ShootImgSrc, Shoot.MOBILE_WIDTH, Shoot.MOBILE_HEIGHT);
    }

    detectCollision(mobile) {
        return this.x < mobile.x + mobile.width &&
               this.x + this.width > mobile.x &&
               this.y < mobile.y + mobile.height &&
               this.y + this.height > mobile.y;
    }

    findCollision(saucers) {
        return saucers.find(saucer => this.detectCollision(saucer));
    }
}