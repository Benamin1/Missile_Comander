import { Crosshair } from "./components/crosshair"
import { Ground } from "./components/ground"
import { Rocket } from "./components/rocket"
import { Explosion } from "./components/explosion"
import { Enemy } from "./components/enemy"
import { City } from "./components/city"
import { Plane } from "./components/plane"
import { PlaneCorpse } from "./components/planeCorpse"
import { Drone } from "./components/drone"
import { Base } from "./components/base"

export class Game{


  canvas:HTMLCanvasElement
  crosshair:Crosshair
  ctx: CanvasRenderingContext2D;
  elements:Ground[]|City[]
  rockets:Rocket[]
  explosions: Explosion[]
  color: number
  counter: number
  enemies: Enemy[]
  cities: City[]|Base[]
  planes: Plane[]
  planeCorpses: PlaneCorpse[]
  drones:Drone[]
  missles:number
  usedMissles: number
  points: number
  level: number
  message: string
  speed: number
  lost: boolean
  constructor(){
    this.lost=false
    this.speed = 0.5
    this.message=''
    this.points=0
    this.usedMissles = 0
    this.missles=6
    this.canvas = document.createElement('canvas')
    this.resize()
    this.ctx = this.canvas.getContext("2d")!;
    document.getElementById('main')!.appendChild(this.canvas)
    this.crosshair = new Crosshair(this.canvas)
    this.cities = [new City(this.canvas,this.canvas.width/20*1-50,650),new City(this.canvas,this.canvas.width/20*4-50,650),new City(this.canvas,this.canvas.width/20*7-50,650),new Base(this.canvas,this.canvas.width/20*9-50,640,this.missles),new City(this.canvas,this.canvas.width - (this.canvas.width/20*7)-150,650),new City(this.canvas,this.canvas.width - (this.canvas.width/20*4)-150,650),new City(this.canvas,this.canvas.width - (this.canvas.width/20*1)-150,650)]
    this.elements=[new Ground(this.canvas)];
    this.rockets=[]
    this.planes = [];
    this.explosions = []  
    this.enemies = []
    this.planeCorpses = []
    this.drones = []
    this.color=0
    this.counter=0
    this.level=0
    this.eventlistiners()
    this.nextWave()
    this.sounds()
    requestAnimationFrame(()=>{this.draw()});

  }
  resize(){
    this.canvas.width = 1536
    this.canvas.height = 746
    console.log(window.innerWidth, window.innerHeight)
    console.log('resized')

  }
  sounds(){
  }
  eventlistiners(){
    document.addEventListener('keypress',e=>{
      if(e.key==' '&&!this.cities[3].destroyed){
        if(this.missles>0){
          console.log(this.missles)
          this.rockets.push(new Rocket(this.canvas,this.crosshair.x+7,this.crosshair.y+7))
          this.missles-=1
          this.usedMissles+=1
          this.cities[3].update(this.missles)
          if(this.missles==0&&this.usedMissles<60){
            setTimeout(()=>{
              this.missles=6
              this.cities[3].update(6)
            },2000)
          }
      
        }
      }
    })
  }
  nextLevel(){
    this.level++
    this.counter=0
    this.missles=6
    this.speed+=0.3
    let cities = 0
    this.cities.forEach(e=>{
      if(!e.destroyed){
        this.points+=200*(this.level)
        cities++
      }
    })
    if(this.usedMissles<60){
      this.points+=(60-this.usedMissles)*25*this.level
    }
    if(!this.cities[3].destroyed){
      cities-=1
    }
    if(cities==0){
      this.message='You lost'
      this.lost = true  
    }else{
      this.cities[3].update(6)
      this.cities[3].city.src = '../src/assets/base.png'
      this.cities[3].destroyed=false
      this.message = 'Level Compleated'
      let str = String((cities*200)+((60-this.usedMissles)*25)*this.level)
      setTimeout(()=>{
        this.message = ''
      },1000)
      setTimeout(()=>{
        var audio = new Audio('../src/assets/roll-up-2.mp3');
        audio.play();        
        this.message = str+' Bonus Points'
      },2000)
      setTimeout(()=>{
        this.message = ''
      },3000)
      setTimeout(()=>{
        this.message = 'x '+String(this.level+1)+' Points'
      },4000)
      setTimeout(()=>{
        this.message = ''
      },5000)
      setTimeout(()=>{
        this.message = 'Level '+String(this.level+1)
      },6000)
      setTimeout(()=>{
        this.message = ''
      },7000)

      this.usedMissles=0

    }

  }
  nextWave(){
    let chances =[[30,65,100],[30,65,90],[30,60,85],[30,50,75],[30,50,75],[30,50,75],[30,50,75],[30,50,75],[30,50,75],[30,50,75],[30,50,75],[30,50,75],[30,50,75],[30,50,75],[30,50,75],[30,50,75]]
    let attack = Math.floor(Math.random()*100)
    if(attack<chances[this.level][0]){
      let pos = Math.random()*this.canvas.width
      let target =Math.floor(Math.random()*5)
      this.enemies.unshift(new Enemy(this.canvas,'fast',pos,0,target,this.speed))
      this.enemies.unshift(new Enemy(this.canvas,'fast',pos+100,0,target+1,this.speed))
      this.enemies.unshift(new Enemy(this.canvas,'fast',pos+200,0,target+2,this.speed))

    }
    else if(attack<chances[this.level][1]){
      let pos = Math.random()*800+100
      let target =Math.floor(Math.random()*4)
      this.enemies.unshift(new Enemy(this.canvas,'rocket',Math.random()*this.canvas.width,0,Math.floor(Math.random()*7),this.speed))
      this.enemies.unshift(new Enemy(this.canvas,'cluster',Math.random()*this.canvas.width,0,Math.floor(Math.random()*7),this.speed))
      this.enemies.unshift(new Enemy(this.canvas,'rocket',Math.random()*this.canvas.width,0,Math.floor(Math.random()*7),this.speed))
      this.enemies.unshift(new Enemy(this.canvas,'rocket',Math.random()*this.canvas.width,0,Math.floor(Math.random()*7),this.speed))

    }else if(attack<chances[this.level][2]){
      if(Math.floor(Math.random()*2)==0){
        if(Math.floor(Math.random()*2)==0){
        this.planes.unshift(new Plane(this.canvas,'plane',0,Math.random()*this.canvas.height/2+this.canvas.height/4-100,this.speed))
        }else{
          this.planes.unshift(new Plane(this.canvas,'plane',this.canvas.width,Math.random()*this.canvas.height/2+this.canvas.height/4-100,this.speed))

        }
      }else{
        if(Math.floor(Math.random()*2)==0){
          this.planes.unshift(new Plane(this.canvas,'covid',0,Math.random()*this.canvas.height/2+this.canvas.height/4-100,this.speed))
          }else{
            this.planes.unshift(new Plane(this.canvas,'covid',this.canvas.width,Math.random()*this.canvas.height/2+this.canvas.height/4-100,this.speed))
  
          }
  
      }
    }else{
      this.drones.unshift(new Drone(this.canvas,Math.random()*this.canvas.width,0,Math.floor(Math.random()*7),this.speed))
      this.drones.unshift(new Drone(this.canvas,Math.random()*this.canvas.width,0,Math.floor(Math.random()*7),this.speed))

    }



  }
  draw(){
    if(this.counter%480==0&&this.counter<3000){
      this.nextWave()


    }
    if(this.counter>3000&&this.enemies.length==0&&this.drones.length==0&&this.planes.length==0){
      this.nextLevel()
      console.log('next level')
    }





    if(this.counter%5==0){
      this.color++
      if(this.color==4){
        this.color=0
      }
    }

    //ruch celownika
    this.crosshair.movemeant()


    //tło
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

 
    //explozje
    this.explosions.forEach((item, index, object)=>{
      if(item.delete){
        object.splice(index, 1);

      }else{
        item.draw(this.ctx,this.color)
      }
    })

    //kolizje
    this.drones.forEach(e=>{
      e.check(this.ctx)
    })
    this.enemies.forEach(e=>{
      e.check(this.ctx)
    })
    this.planes.forEach(e=>{
      e.check(this.ctx)
    })
    //tło
    // let colors=['black','gray']
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

   //pasywne elementy
   this.elements.forEach(e=>{
    e.draw(this.ctx)
  })

  //miasta
  this.cities.forEach(e=>{
    e.draw(this.ctx)
  })



    //twoje rakiety
    this.rockets.forEach((item, index, object) => {
      item.draw(this.ctx)
      if(item.state=='stop'){
        
        this.explosions.push(new Explosion(this.canvas,item.endX,item.endY))
        object.splice(index, 1);

      }
    })
    //wrogowie
    this.enemies.forEach((item, index, object)=>{
      if(item.active){
        item.draw(this.ctx)
        if(item.split){
          var audio = new Audio('../src/assets/missile-2.mp3');
          audio.play();
  
          item.splited=true
          item.split=false

          if(item.target<3){
            this.enemies.unshift(new Enemy(this.canvas,'rocket',item.x,item.y,item.target+1,this.speed))
            this.enemies.unshift(new Enemy(this.canvas,'fast',item.x,item.y,item.target+2,this.speed))
            this.enemies.unshift(new Enemy(this.canvas,'rocket',item.x,item.y,item.target+3,this.speed))
  
          }else{
            this.enemies.unshift(new Enemy(this.canvas,'rocket',item.x,item.y,item.target-1,this.speed))
            this.enemies.unshift(new Enemy(this.canvas,'fast',item.x,item.y,item.target-2,this.speed))
            this.enemies.unshift(new Enemy(this.canvas,'rocket',item.x,item.y,item.target-3,this.speed))

          }
    
        }
      }else{
        object.splice(index, 1)
        if(item.hit==3&&!this.cities[3].destroyed){
          this.explosions.push(new Explosion(this.canvas,item.x,item.y))
          setTimeout(() =>{this.explosions.push(new Explosion(this.canvas,item.x,item.y+40))},1000)
          this.cities[item.hit].destroy()

        }else{
          this.explosions.push(new Explosion(this.canvas,item.x,item.y))
          if(item.hit!=-1){
            this.cities[item.hit].destroy()
          }else{
            this.points+=25*(this.level+1)
          }
  
        }

      }
    })
    //samoloty
    this.planes.forEach((item, index, object) => {
      item.draw(this.ctx)
      if(item.active){
        if(Math.floor(Math.random()*1000)==1){
          this.enemies.unshift(new Enemy(this.canvas,'rocket',item.x-10,item.y-28,Math.floor(Math.random()*7),this.speed))
          this.enemies.unshift(new Enemy(this.canvas,'rocket',item.x-10,item.y-28,Math.floor(Math.random()*7),this.speed))

        }else if(Math.floor(Math.random()*1000)==2){
          this.enemies.unshift(new Enemy(this.canvas,'fast',item.x-10,item.y-28,Math.floor(Math.random()*7),this.speed))

        }
        if(item.x>this.canvas.width+200){
          object.splice(index, 1);

        }
      }else{
        object.splice(index, 1);
        this.points+=100*(this.level+1)
        if(item.type!='covid'){
            this.planeCorpses.push(new PlaneCorpse(this.canvas,item.x,item.y,item.reverse))


          this.explosions.push(new Explosion(this.canvas,item.x-25,item.y-25))  
        }else{
          this.explosions.push(new Explosion(this.canvas,item.x-25,item.y-25))  

        }

      }
    })
    this.planeCorpses.forEach((item, index, object) => {
      item.draw(this.ctx)
      if(!item.active){
        object.splice(index, 1);

      }
    })

    //drony
    this.drones.forEach((item, index, object) => {
      item.draw(this.ctx)
      if (!item.active){
        object.splice(index, 1);
        if(item.hit==3&&!this.cities[3].destroyed){
          this.explosions.push(new Explosion(this.canvas,item.x+20,item.y))
          setTimeout(() =>{this.explosions.push(new Explosion(this.canvas,item.x+20,item.y+40))},1000)
          this.cities[item.hit].destroy()
        }else{
          this.explosions.push(new Explosion(this.canvas,item.x+18,item.y+9))
          if(item.hit!=-1){
            this.cities[item.hit].destroy()
          }else{
            this.points+=250*(this.level+1)

          }
        }

      }
    })


    //explozje
    this.explosions.forEach((item, index, object)=>{
      if(item.delete){
        object.splice(index, 1);

      }else{
        item.draw(this.ctx,this.color)
      }
    })

    //celownik
    this.crosshair.draw(this.ctx)

    this.ctx.font = "30px Comic Sans MS";
    this.ctx.fillStyle = "red";

    this.ctx.fillText('Points: '+String(this.points), 300, 50);
    this.ctx.fillText('Ammo:'+String(60-this.usedMissles), 100, 50);

    this.ctx.font = "60px Comic Sans MS";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";

    this.ctx.fillText(this.message, this.canvas.width/2, this.canvas.height/2-100);

    if(!this.lost){
      requestAnimationFrame(()=>{this.draw()});

    }
    this.counter++
  }

}
new Game()

