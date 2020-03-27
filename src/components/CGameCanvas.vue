<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <div>
          <canvas id="canvas" width="800" height="600">
            Sorry, browser does not support canvas.
          </canvas>
        </div>
        <img src="../assets/bar.png" id="bar" style="display:none"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'GameCanvas',
    data: () => ({
      canvas: null,
      ctx: null,
      dx: 1,
      dy: 2,
      bar: null,
      circle: null,
      dxBar: 6,
      timer: null,
      barImg: null
    }),
    created() {
      var vm = this
      this.$nextTick(() => {
        window.addEventListener("keydown",vm.doKeyDown,false);
        vm.barImg=document.getElementById("bar");
        vm.canvas = document.getElementById("canvas");
        console.log(vm.canvas)
        vm.ctx = vm.canvas.getContext("2d");
        vm.timer=setInterval(vm.draw, 10);
        vm.bar = new vm.Bar(400,500)
        vm.circle = new vm.Circle(400,30,10)
      })

      return this.timer;
    },
    methods: {
      Bar(x,y){
        this.x=x;
        this.y=y;
      },
      Circle(x,y,r){
        this.x=x;
        this.y=y;
        this.r=r;
      },
      drawBall(c) {
        this.ctx.beginPath();
        this.ctx.arc(c.x, c.y, c.r, 0, Math.PI*2, true);
        this.ctx.fill();
      },
      doKeyDown(e){
        if(e.keyCode==37){
          if(this.bar.x-this.dxBar>0)
            this.bar.x-=this.dxBar;
        }
        else if(e.keyCode==39){
          if(this.bar.x+this.dxBar<this.canvas.width)
            this.bar.x+=this.dxBar;
        }
      },
      draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#FAF7F8";
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.fillStyle = "#003300";
        this.drawBall(this.circle);
        if (this.circle.x +this.dx > this.canvas.width || this.circle.x +this.dx < 0)
          this.dx=-this.dx;
        if(this.circle.y+this.dy>this.bar.y && this.circle.x>this.bar.x && this.circle.x<this.bar.x+this.barImg.width)
          this.dy=-this.dy;
        if (this.circle.y +this.dy > this.canvas.height || this.circle.y +this.dy < 0)
          this.dy=-this.dy;
        this.circle.x += this.dx;
        this.circle.y += this.dy;
        this.ctx.drawImage(this.barImg,this.bar.x,this.bar.y);
        if(this.circle.y>this.bar.y){
          clearTimeout(this.timer);
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          alert("Game Over");
        }
      }
    }
  }
</script>
