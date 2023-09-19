export class Ground{
    canvas: HTMLCanvasElement;
    
    constructor(canvas:HTMLCanvasElement){
        this.canvas = canvas;
    }
    draw(ctx:CanvasRenderingContext2D){
        ctx.fillStyle = "#b3762f";
        ctx.strokeStyle  = "orange"

        ctx.fillRect(0, this.canvas.height-50, this.canvas.width, 50);
        // ctx.moveTo(this.canvas.width/2-50, this.canvas.height-100);
        // ctx.lineTo(this.canvas.width/2+50, this.canvas.height-100);
        // ctx.lineTo(this.canvas.width/2+100, this.canvas.height-50);
        // ctx.lineTo(this.canvas.width/2-100, this.canvas.height-50);
        ctx.fill()

        ctx.closePath();
        ctx.stroke();


    
    }
}

