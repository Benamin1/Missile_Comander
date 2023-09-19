
export class Enemy{
    y: number;
    x: number;
    dX: number;
    dY: number;
    active: boolean;
    direction: number;
    targets: number[][];
    hit: number;
    splited: boolean;
    split: boolean;
    
    constructor(private canvas:HTMLCanvasElement,public type:string, private startX:number, private StartY:number,  public target:number,private speed:number ){
        this.targets = [[this.canvas.width/20*1+50,670],[this.canvas.width/20*4+50,670],[this.canvas.width/20*7+50,670],[this.canvas.width/20*9+75,640],[this.canvas.width - (this.canvas.width/20*7)-50,670],[this.canvas.width - (this.canvas.width/20*4)-50,670],[this.canvas.width - (this.canvas.width/20*1)-50,670]]
        this.hit=-1
        this.active = true
        this.split = false
        this.splited = false
        //obliczanie kąta i prędkości
        this.x = this.startX
        this.y = this.StartY
        let dy = this.targets[target][1]- this.StartY
        let dx = this.targets[target][0]- this.startX
        this.direction = Math.atan(dy/dx)
        this.direction *= 180 / Math.PI
        if(this.direction<0){
            this.direction=this.direction+180
        }
        this.dX = Math.cos(this.direction * Math.PI / 180); 
        this.dY = Math.sin(this.direction * Math.PI / 180); 



        //właściwości
        if(this.type=='rocket'||this.type=='cluster'){
            // this.speed = 0.4
        }
        if(this.type=='fast'){
            this.speed*=1.8
        }

    }
    check(ctx:CanvasRenderingContext2D){
        var data = ctx.getImageData(this.x-3,this.y-3,6,6)
        let sum = 0
        data.data.forEach(e=>{
            sum+=e
        })
        if(sum/data.data.length>100){
            this.active = false
        }
    }
    draw(ctx:CanvasRenderingContext2D){
        
        if(this.y>this.targets[this.target][1]){
            this.active = false
            this.hit = this.target

        }
        if(this.type=='cluster'&&this.y>this.canvas.height/3&&!this.splited){
            this.split = true
        }

        ctx.strokeStyle  = "#FF7272"
        ctx.lineWidth = 3
        ctx.beginPath();
        ctx.moveTo(this.startX, this.StartY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        ctx.strokeStyle  = "red"
        ctx.lineWidth = 3
        ctx.beginPath();
        ctx.moveTo(this.x-(this.dX*4), this.y-(this.dY*4));
        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        // ctx.strokeStyle  = "red"

        // ctx.moveTo(this.x, this.x);
        // ctx.lineTo(this.x, this.y);

        ctx.stroke();
        this.x+=this.dX*this.speed
        this.y+=this.dY*this.speed

    }
    
    
}

