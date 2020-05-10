class GameObject extends HTMLElement{

    protected posx           : number = 0
    protected posy           : number = 0

    protected speedX      : number = 1
    protected speedY      : number = 1

    constructor(tagName : string){
        super()
        let foreground  = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this);
        this.posx= Math.random() * window.innerWidth;
    }

    public update() : void {
        //this.posx += this.speedX
        this.posy += this.speedY

       this.draw() 
    }

    protected draw() {
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`
    }
}