import Shoot from './shoot';
import Saucer from './saucer';
import StarShip from './starship';
import Boss from './boss';
import ExplosionImgSrc from './assets/images/explosion.png';

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.shoots = [];
        this.saucers = [];
        this.boss = null;
        this.score = 0;
        this.saucersDestroyed = 0;
        this.saucersNeededToSpawnBoss = 10; // Initial number of saucers needed to spawn the boss
        this.player = new StarShip(40, canvas.height / 2); // Position initiale du joueur
        this.lastShootTime = 0; // Timestamp du dernier tir
        this.shootCooldown = 300; // Délai entre les tirs en millisecondes
        this.scoreElement = document.getElementById('score'); // Élément HTML pour le score
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    handleKeyDown(event) {
        switch (event.code) {
            case 'Space':
                this.shoot();
                break;
            case 'ArrowUp':
                this.player.moveUp();
                break;
            case 'ArrowDown':
                this.player.moveDown();
                break;
        }
    }

    handleKeyUp(event) {
        switch (event.code) {
            case 'ArrowUp':
            case 'ArrowDown':
                this.player.stop();
                break;
        }
    }

    shoot() {
        const currentTime = Date.now();
        if (currentTime - this.lastShootTime >= this.shootCooldown) {
            const shoot = new Shoot(this.player.x + this.player.width, this.player.y + this.player.height / 2);
            this.shoots.push(shoot);
            this.lastShootTime = currentTime;
        }
    }

    addSaucer() {
        if (this.boss) return; // Stop spawning saucers if the boss is present
        const y = Math.random() * (this.canvas.height - Saucer.MOBILE_HEIGHT);
        const saucer = new Saucer(this.canvas.width, y);
        this.saucers.push(saucer);
    }

    removeSaucer(saucer) {
        console.log(`Removing saucer at position (${saucer.x}, ${saucer.y})`);
        this.saucers = this.saucers.filter(s => s !== saucer);
        this.saucersDestroyed += 1;
        if (this.saucersDestroyed >= this.saucersNeededToSpawnBoss) {
            this.spawnBoss();
        }
    }

    spawnBoss() {
        this.saucers = []; // Remove all saucers
        const boss = new Boss(this.canvas.width, this.canvas.height / 2 - Boss.MOBILE_HEIGHT / 2, this);
        this.boss = boss;
    }

    removeBoss(boss) {
        console.log(`Removing boss at position (${boss.x}, ${boss.y})`);
        this.boss = null;
        this.saucersDestroyed = 0; // Reset the saucer counter
        this.saucersNeededToSpawnBoss *= 2; // Double the number of saucers needed to spawn the boss
    }

    updateScore() {
        this.scoreElement.textContent = this.score;
    }

    update() {
        this.checkCollisions();
        this.updateShoots();
        this.updateSaucers();
        this.updateBoss();
        this.player.move(this.canvas);
    }

    checkCollisions() {
        this.shoots.forEach(shoot => {
            const collidedSaucer = shoot.findCollision(this.saucers);
            if (collidedSaucer) {
                console.log(`Saucer hit by shoot at position (${collidedSaucer.x}, ${collidedSaucer.y})`);
                this.score += 200;
                this.updateScore();
                collidedSaucer.explode();
                this.shoots = this.shoots.filter(s => s !== shoot);
            }

            if (this.boss && shoot.detectCollision(this.boss)) {
                console.log(`Boss hit by shoot at position (${this.boss.x}, ${this.boss.y})`);
                this.score += 100;
                this.updateScore();
                this.boss.takeHit();
                this.shoots = this.shoots.filter(s => s !== shoot);
            }
        });
    }

    updateShoots() {
        this.shoots.forEach(shoot => shoot.move());
        this.shoots = this.shoots.filter(shoot => shoot.x <= this.canvas.width);
    }

    updateSaucers() {
        this.saucers.forEach(saucer => {
            saucer.move(this.canvas, this);
            if (saucer.x + saucer.width < 0) {
                console.log(`Saucer passed left edge at position (${saucer.x}, ${saucer.y})`);
                this.score -= 1000;
                this.updateScore();
                this.removeSaucer(saucer);
            }
            if (saucer.y > this.canvas.height) {
                this.saucers = this.saucers.filter(s => s !== saucer);
            }
        });
    }

    updateBoss() {
        if (this.boss) {
            this.boss.move(this.canvas, this);
        }
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.context);
        this.shoots.forEach(shoot => shoot.draw(this.context));
        this.saucers.forEach(saucer => saucer.draw(this.context));
        if (this.boss) {
            this.boss.draw(this.context);
        }
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(this.animate.bind(this));
    }
}