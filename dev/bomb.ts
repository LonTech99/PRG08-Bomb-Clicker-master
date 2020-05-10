/// <reference path="gameobject.ts"/>

class Bomb extends GameObject{

    protected game:Game
        
    constructor(g:Game) {
        super("bomb")
        this.game = g
        
        this.posy = 200
        this.posx = 220
        this.addEventListener("click",() => this.onClick())
        this.reset()
    }

    private reset(){
        this.speedY = 2 + Math.random() * 4
        this.posy = -224 - Math.random() * 800
        this.posx = Math.random() * (window.innerWidth - 142)
    }

    public update():void {
        super.update()
        this.posy += this.speedY
        
        if(this.posy > window.innerHeight) {
            this.game.destroyBuilding()
            this.reset()
        }

    }

    protected draw():void {
        super.draw()
    }

    protected drive():void {
        let h = window.innerHeight
        this.posy = this.posy + this.speedY
        if(this.posy>h) this.posy = 10
    }


    private onClick():void {
        this.game.scorePoint()
        this.reset()
    }
}

window.customElements.define("bomb-component", Bomb as any)
