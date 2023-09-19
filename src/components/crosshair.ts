export class Crosshair{
    canvas: HTMLCanvasElement;
    x:number;
    y:number
    a: number;
    img: HTMLImageElement;
    keyPressed: String[];
    
    constructor(canvas:HTMLCanvasElement){
        this.canvas = canvas
        this.x=300
        this.y=650
        this.a= 100
        this.img = new Image();   // Create new img element
        this.img.src = '../src/assets/crosshair.png'; // Set source path
        this.keyPressed=[]





        
        document.addEventListener("keydown", e=>{if (!e.repeat)this.pressed(e)}, false);
        document.addEventListener("keyup", e=>{this.relased(e)}, false);
        window.addEventListener('blur', e=>{this.reset()});
        document.addEventListener('mousemove',e=>{
            this.x = e.clientX
            if(e.clientY<this.canvas.height-100){
                this.y = e.clientY

            }

        });
    }
    pressed(data:KeyboardEvent){
        this.keyPressed.push(data.key)
    }
    relased(data:KeyboardEvent){
        this.keyPressed.splice(this.keyPressed.indexOf(data.key),1)

    }
    reset(){
        this.keyPressed=[]
    }
    movemeant(){

        // this.y = e.clientY

        // this.keyPressed.forEach(e=>{
        //     if(e=="ArrowUp"&& this.y>0){
        //             this.y-=10
        //     }
        //     if(e=="ArrowDown"&&this.y<this.canvas.height-150){
        //         this.y+=10
        //     }
        //     if(e=="ArrowLeft"&&this.x>0){
        //         this.x-=10
        //     }
        //     if(e=="ArrowRight"&&this.x<this.canvas.width-20){
        //         this.x+=10
        //     }
        // })
    }
    draw(ctx:CanvasRenderingContext2D){
        let that = this
        ctx.drawImage(this.img, this.x, this.y);

    }
}

