/// <reference path="gameObject.ts"/>

class Car extends GameObject{
    
    
        
    constructor() {
        super("car")
        
        this.posx = 100
        this.reset() 
    }

    private reset() {
        this.posx = -200 - Math.random() * 200
        this.posy = window.innerHeight - 180
    }

    public update():void {
        super.update()
        this.posx += 5
        this.posy = window.innerHeight - 160
        this.drive()
        if(this.posx > window.innerWidth) {
            this.reset()
        }
    }

    protected draw():void {
        super.draw()
    }

    protected drive():void {
        let w = window.innerWidth
        this.posx = this.posx + this.speedX
        if(this.posx>w) this.posx = 0
    }
}

window.customElements.define("car-component", Car as any)
