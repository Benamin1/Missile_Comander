export class PlaneCorpse{
    y: number;
    x: number;
    active: boolean;
    targets: number[][];
    img: HTMLImageElement;
    bomb: boolean;
    
    constructor(public canvas:HTMLCanvasElement, public startX:number, public StartY:number,private reverse:boolean){
        this.targets = [[this.canvas.width/20*1+50,670],[this.canvas.width/20*4+50,670],[this.canvas.width/20*7+50,670],[this.canvas.width - (this.canvas.width/20*7)-50,670],[this.canvas.width - (this.canvas.width/20*4)-50,670],[this.canvas.width - (this.canvas.width/20*1)-50,670]]
        this.active = true
        this.x = this.startX
        this.y = this.StartY
        this.img = new Image()
        if(this.reverse){
            this.img.src='../src/assets/planeCorpseReverse.png'

        }else{
            this.img.src='../src/assets/planeCorpse.png'

        }
        this.bomb = false
        setTimeout(() =>{this.active=false},500)

    }
    draw(ctx:CanvasRenderingContext2D){

        ctx.drawImage(this.img, this.x-50, this.y-50,50,50);

    }
    
    
}

