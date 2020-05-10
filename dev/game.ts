class Game {
    
    public score: number = 0
    public destroyed: number = 0
    private textfield: HTMLElement
    private statusbar: HTMLElement
    private bomb:Bomb[]
    private car: Car
    
    constructor() {
        this.textfield  = document.getElementsByTagName("textfield")[0] as HTMLElement
        this.statusbar  = document.getElementsByTagName("bar")[0] as HTMLElement

        this.bomb = [new Bomb(this), new Bomb(this), new Bomb(this), new Bomb(this), new Bomb(this)]
        this.car        =new Car()
        
        // call method gameLoop
        this.gameLoop()
    }
    
    private gameLoop():void{
        console.log("updating the game")
        this.car.update()
        for (let b of this.bomb){
            b.update()
        }
        if (this.destroyed < 4){
            // add request animation frame
            requestAnimationFrame(() => this.gameLoop())
        }else{
            this.textfield.innerHTML = "Lost game - Score:"  + this.score
        }       
    }

    public destroyBuilding(){
        this.destroyed ++
        this.statusbar.style.backgroundPositionX = 0 - (this.destroyed * 70) + "px"
        console.log("buildings destroyed " + this.destroyed)
    }

    public restartBuilding(){
        this.destroyed = 0
        this.statusbar.style.backgroundPositionX = "0px"
    }
       
    public scorePoint() {
        this.score ++
        this.textfield.innerHTML = "Score: " + this.score
    }

} 

window.addEventListener("load", () => new Game())