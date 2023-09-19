export class Drone{
    y: number;
    x: number;
    active: boolean;
    targets: number[][];
    img: HTMLImageElement;
    direction: number;
    hit: number;
    dx: any;
    dy: any;
    
    constructor(public canvas:HTMLCanvasElement, public startX:number, public StartY:number,  public target:number, private speed:number ){
        this.targets = [[this.canvas.width/20*1+30,670],[this.canvas.width/20*4+30,670],[this.canvas.width/20*7+30,670],[this.canvas.width/20*9+55,640],[this.canvas.width - (this.canvas.width/20*7)-60,670],[this.canvas.width - (this.canvas.width/20*4)-60,670],[this.canvas.width - (this.canvas.width/20*1)-60,670]]
        this.speed*=1.5
        this.active = true
        this.x = this.startX
        this.y = this.StartY
        this.img = new Image()
        this.img.src='../src/assets/drone.png'
        this.direction = 0
        this.hit = -1

        var audio = new Audio('../src/assets/alert.mp3');
        audio.play();

    }
    check(ctx:CanvasRenderingContext2D){
        this.dy = this.targets[this.target][1]- this.y
        this.dx = this.targets[this.target][0]- this.x
        this.direction = Math.atan(this.dy/this.dx)
        this.direction *= 180 / Math.PI
        if(this.direction<0){
            this.direction=this.direction+180
        }



        var data = ctx.getImageData(this.x,this.y,28,18)
        let sum = 0
        data.data.forEach(e=>{
            sum+=e
        })
        if(sum/data.data.length>100){
            this.active = false
        }
        
        let danger=[]


        //evasions

        if(this.y<600){

            
            //check down

            var data = ctx.getImageData(this.x-10,this.y+10,50,90)
            sum = 0
            data.data.forEach(e=>{
                sum+=e
            })
            if(sum/data.data.length>100){
                danger.push('down')
                // this.direction=270
                // this.direction+=180
            }

            //check right

            var data = ctx.getImageData(this.x+20,this.y,60,30)
            sum = 0
            data.data.forEach(e=>{
                sum+=e
            })
            if(sum/data.data.length>100){
                // this.direction+=90
                danger.push('right')

            }

            //check left

            var data = ctx.getImageData(this.x+10,this.y,-60,30)
            sum = 0
            data.data.forEach(e=>{
                sum+=e
            })
            if(sum/data.data.length>120){
                this.direction-=90
                danger.push('left')

            }
            //check leftDown

            var data = ctx.getImageData(this.x,this.y+20,-40,40)
            sum = 0
            data.data.forEach(e=>{
                sum+=e
            })
            if(sum/data.data.length>100){
                this.direction-=90
                danger.push('leftDown')

            }

            //check rightDown

            var data = ctx.getImageData(this.x+70,this.y+20,-40,40)
            sum = 0
            data.data.forEach(e=>{
                sum+=e
            })
            if(sum/data.data.length>100){
                this.direction-=90
                danger.push('rightDown')

            }

            // ctx.fillStyle = "orange";
            // ctx.fillRect(this.x+13,this.y+9,2,2);



            if(danger.includes('rightDown')&&!danger.includes('leftDown')){
                this.direction=225

            }else if(!danger.includes('rightDown')&&danger.includes('leftDown')){
                this.direction=315
            }else if(danger.includes('down')){
                this.direction=270
            }else if(danger.includes('rightDown')&&danger.includes('leftDown')){
                this.direction=270
            }
            else if(danger.includes('left')&&!danger.includes('right')){
                this.direction=0

            }
            else if(!danger.includes('left')&&danger.includes('right')){
                this.direction=180

            }

        }

    }
    draw(ctx:CanvasRenderingContext2D){
        




        ctx.drawImage(this.img, this.x, this.y,30,18);

        this.dx = Math.cos(this.direction * Math.PI / 180); 
        this.dy = Math.sin(this.direction * Math.PI / 180); 
        this.x+=this.dx*this.speed
        this.y+=this.dy*this.speed
        if(this.y>this.targets[this.target][1]){
            this.active = false
            this.hit = this.target

        }

    }
    
    
}

