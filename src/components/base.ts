export class Base{
    canvas: HTMLCanvasElement;
    city: HTMLImageElement;
    destroyed: boolean;
    missle: HTMLImageElement;
    
    constructor(canvas:HTMLCanvasElement, public posX:number, public posY:number,private missles:Number){
        this.canvas = canvas;
        this.city = new Image()
        this.city.src = '../src/assets/base.png'; // Set source path
        this.destroyed = false
        this.missle = new Image()
        this.missle.src = '../src/assets/rocket.png'; // Set source path

    }
    destroy(){
        
        setTimeout(()=>{this.city.src = '../src/assets/baseDestroyed.png' 
        this.posY-=1
        this.destroyed=true
    },2000)
    

    }
    update(a: Number){
        this.missles=a
    }
    draw(ctx:CanvasRenderingContext2D){
        let list = [[this.posX+120, this.posY+10,18,20],[this.posX+100, this.posY+30,18,20],[this.posX+140, this.posY+30,18,20],[this.posX+120, this.posY+50,18,20],[this.posX+80, this.posY+50,18,20],[this.posX+160, this.posY+50,18,20]]
        ctx.drawImage(this.city, this.posX+70, this.posY+10,120,67);
        if(!this.destroyed){
            for(let i=0;i<this.missles;i++){
                ctx.drawImage(this.missle, list[i][0], list[i][1],list[i][2],list[i][3]);

            }
        }
    }
}

