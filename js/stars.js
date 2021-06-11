window.onload = function() {
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.style.width = window.innerWidth;
      canvas.style.height = window.innerHeight;
      canvas.height = window.innerHeight;
      document.body.appendChild(canvas);
      
      window.addEventListener('resize', onresize, false);
      function onresize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
      }
      //Placeholder
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      var particles = {},
          particleIndex = 0,
          settings = {
            density: 20,
            particleSize: 10,
          };

      function Particle() {
        this.x = Math.floor(Math.random() * canvas.width);
        this.y = Math.floor(Math.random() * canvas.height);

        particleIndex ++;
        particles[particleIndex] = this;
        this.id = particleIndex;
        this.life = 0;
        this.lifeTick = 0;
        this.maxLife = Math.floor(Math.random() * 20) + 10;
        this.dying = false;
      }

      Particle.prototype.draw = function() {
        if (this.life < this.lifeMax && this.dying == false) {
            this.lifeTick++;
            if (this.lifeTick >= 3) {
                  this.life++;
                  this.lifeTick = 0;
            }
        }
        else {
              this.dying = true;
              this.life--;
        }
        if (this.life <= 0 && this.dying == true) {
          delete particles[this.id];
        }
        context.clearRect(settings.leftWall, settings.groundLevel, canvas.width, canvas.height);
        context.beginPath();
        context.fillStyle="#ffffff";
        context.moveTo(this.x + this.life, this.y);
        context.lineTo(this.x, this.y + this.life);
        context.lineTo(this.x - this.life, this.y);
        context.lineTo(this.x, this.y - this.life);   
        context.closePath(); 
        context.fill();
        console.log(this.lifeMax);
        console.log(this.dying);
      }

      setInterval(function() {
        context.fillStyle = "rgba(10,10,10,0.8)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        new Particle();
        for (var i in particles) {
          particles[i].draw();
        }
      }, 30);
};
