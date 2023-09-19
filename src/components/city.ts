export class City{
    canvas: HTMLCanvasElement;
    city: HTMLImageElement;
    destroyed: boolean;
    
    constructor(canvas:HTMLCanvasElement, public posX:number, public posY:number){
        this.canvas = canvas;
        this.city = new Image()
        this.city.src = '../src/assets/city.png'; // Set source path
        this.destroyed=false
    }
    update(a:Number){

    }
    destroy(){
        setTimeout(()=>{this.city.src = '../src/assets/brokencity.png'},1000)
        this.destroyed=true

    }
    draw(ctx:CanvasRenderingContext2D){
        ctx.drawImage(this.city, this.posX+50, this.posY);
    
    }
}

