"use strict";
class GameObject extends HTMLElement {
    constructor(tagName) {
        super();
        this.posx = 0;
        this.posy = 0;
        this.speedX = 1;
        this.speedY = 1;
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this);
        this.posx = Math.random() * window.innerWidth;
    }
    update() {
        this.posy += this.speedY;
        this.draw();
    }
    draw() {
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
    }
}
class Bomb extends GameObject {
    constructor(g) {
        super("bomb");
        this.game = g;
        this.posy = 200;
        this.posx = 220;
        this.addEventListener("click", () => this.onClick());
        this.reset();
    }
    reset() {
        this.speedY = 2 + Math.random() * 4;
        this.posy = -224 - Math.random() * 800;
        this.posx = Math.random() * (window.innerWidth - 142);
    }
    update() {
        super.update();
        this.posy += this.speedY;
        if (this.posy > window.innerHeight) {
            this.game.destroyBuilding();
            this.reset();
        }
    }
    draw() {
        super.draw();
    }
    drive() {
        let h = window.innerHeight;
        this.posy = this.posy + this.speedY;
        if (this.posy > h)
            this.posy = 10;
    }
    onClick() {
        this.game.scorePoint();
        this.reset();
    }
}
window.customElements.define("bomb-component", Bomb);
class Car extends GameObject {
    constructor() {
        super("car");
        this.posx = 100;
        this.reset();
    }
    reset() {
        this.posx = -200 - Math.random() * 200;
        this.posy = window.innerHeight - 180;
    }
    update() {
        super.update();
        this.posx += 5;
        this.posy = window.innerHeight - 160;
        this.drive();
        if (this.posx > window.innerWidth) {
            this.reset();
        }
    }
    draw() {
        super.draw();
    }
    drive() {
        let w = window.innerWidth;
        this.posx = this.posx + this.speedX;
        if (this.posx > w)
            this.posx = 0;
    }
}
window.customElements.define("car-component", Car);
class Game {
    constructor() {
        this.score = 0;
        this.destroyed = 0;
        this.textfield = document.getElementsByTagName("textfield")[0];
        this.statusbar = document.getElementsByTagName("bar")[0];
        this.bomb = [new Bomb(this), new Bomb(this), new Bomb(this), new Bomb(this), new Bomb(this)];
        this.car = new Car();
        this.gameLoop();
    }
    gameLoop() {
        console.log("updating the game");
        this.car.update();
        for (let b of this.bomb) {
            b.update();
        }
        if (this.destroyed < 4) {
            requestAnimationFrame(() => this.gameLoop());
        }
        else {
            this.textfield.innerHTML = "Lost game - Score:" + this.score;
        }
    }
    destroyBuilding() {
        this.destroyed++;
        this.statusbar.style.backgroundPositionX = 0 - (this.destroyed * 70) + "px";
        console.log("buildings destroyed " + this.destroyed);
    }
    restartBuilding() {
        this.destroyed = 0;
        this.statusbar.style.backgroundPositionX = "0px";
    }
    scorePoint() {
        this.score++;
        this.textfield.innerHTML = "Score: " + this.score;
    }
}
window.addEventListener("load", () => new Game());
//# sourceMappingURL=main.js.map