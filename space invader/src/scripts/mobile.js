export default class Mobile {
    constructor(x, y, deltaX = 0, deltaY = 0, imageSrc, width, height) {
        this.x = x;
        this.y = y;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = width;
        this.height = height;
    }

    draw(context) {
        if (this.image.complete && this.image.naturalWidth !== 0) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    move() {
        this.x += this.deltaX;
        this.y += this.deltaY;
    }
}