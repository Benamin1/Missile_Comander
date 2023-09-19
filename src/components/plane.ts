export class Plane{
    y: number;
    x: number;
    active: boolean;
    targets: number[][];
    img: HTMLImageElement;
    bomb: boolean;
    reverse: boolean;
    constructor(public canvas:HTMLCanvasElement,public type:string, public startX:number, public StartY:number,  public speed:number ){
        var audio = new Audio('../src/assets/alert.mp3');
        audio.play();

        this.targets = [[this.canvas.width/20*1+50,670],[this.canvas.width/20*4+50,670],[this.canvas.width/20*7+50,670],[this.canvas.width - (this.canvas.width/20*7)-50,670],[this.canvas.width - (this.canvas.width/20*4)-50,670],[this.canvas.width - (this.canvas.width/20*1)-50,670]]
        if (this.startX>this.canvas.width/2){
            this.speed*=-2
            this.reverse=true
        }
        else{
            this.speed*=2
            this.reverse=false

        }
        this.active = true
        this.x = this.startX
        this.y = this.StartY
        this.img = new Image()
        if(this.type=='covid'){
            this.img.src='../src/assets/covid.png'

        }else{
            if(this.reverse){
                this.img.src='../src/assets/planeReverse.png'

            }else{
                this.img.src='../src/assets/plane.png'

            }

        }
        this.bomb = false


    }
    check(ctx:CanvasRenderingContext2D){
        let data = ctx.getImageData(this.x-50,this.y-40,50,30)

    
        let sum = 0
        data.data.forEach(e=>{
            sum+=e
        })
            if(sum/data.data.length>100){
            this.active = false
        }

    }
    draw(ctx:CanvasRenderingContext2D){
        ctx.drawImage(this.img, this.x-50, this.y-50,50,50);
        this.x+=this.speed
        if(this.x>this.canvas.width+150||this.x<-150){
            this.active = false
        }

    }
    
    
}

