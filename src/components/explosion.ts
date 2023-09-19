export class Explosion{
    radius: number;
    expanding: boolean;
    delete: boolean;
    colorList: string[];
    
    constructor(private canvas:HTMLCanvasElement, private x:number, private y:number){
        this.radius = 0
        this.expanding = true
        this.delete=false
        this.colorList=['lightgreen','lightblue','lightpink','aqua','red']
        var audio = new Audio('../src/assets/explode.mp3');
        audio.play();
        
    }
    draw(ctx:CanvasRenderingContext2D,color:number){
        ctx.beginPath();
        // console.log(color)
        ctx.fillStyle  = this.colorList[color]
        // ctx.fillStyle = 
        ctx.strokeStyle  = "black"

        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill()
        ctx.stroke();
        if(this.expanding){
            this.radius+=0.4
            if(this.radius>=50){
                this.expanding=false
            }
        }else{
            this.radius-=0.4
            if(this.radius<=0){
                this.delete=true
            }

        }


    }
}

