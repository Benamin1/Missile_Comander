export class Rocket{
    y: number
    x: number
    startX: number
    startY: number
    state: string
    target: HTMLImageElement
    dX: number
    dY: number
    speed: number
    
    constructor(private canvas:HTMLCanvasElement, public endX:number, public endY:number){
        // console.log(this.endX, this.endY)
        this.startX = this.canvas.width/2+2
        this.startY = this.canvas.height-90
        this.x = this.startX
        this.y = this.startY
        this.state = 'launching'
        // console.log(-(this.startY-this.endY)/(this.startX-this.endX))
        // console.log(this.startY-this.endY)
        this.target = new Image()
        this.target.src = '../src/assets/target.png'; // Set source path

        //obliczanie kąta
        let dy = this.endY- this.startY
        let dx = this.endX- this.startX
        let direction = Math.atan(dy/dx)
        direction *= 180/Math.PI
        if(direction<0){
            direction=direction+180
        }

        //wyliczanie przesunięcia w czasie klatki
        this.dX = Math.cos(direction * Math.PI / 180); 
        if (this.dX==0){
            this.dX+=1
        }
        this.dY = Math.sin(direction * Math.PI / 180); 
        this.speed = 12

    }
    draw(ctx:CanvasRenderingContext2D){
        if(this.state == 'launching'){
        ctx.drawImage(this.target, this.endX-7, this.endY-7);

        ctx.strokeStyle  = "blue"
        ctx.lineWidth = 3
        ctx.beginPath();
        ctx.moveTo(this.canvas.width/2+2, this.canvas.height-90);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        let distance = Math.sqrt(Math.abs(this.startX-this.endX)+Math.abs(this.startY-this.endY));
        this.x-=this.dX*this.speed
        this.y-=this.dY*this.speed

        }
        if(this.y<this.endY){
            this.state='stop'
        }


    }
}

