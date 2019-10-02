const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouseCoordinates = {
  x: undefined,
  y: undefined
}

const maxRadius = 40;
const minRadius = 2;

let circleArray = [];
const numberOfCircles = 800;

const colorArray = [
  '#0424D9',
  '#031CA6',
  '#03178C',
  '#020F59',
  '#3DADF2'
];

canvas.addEventListener('mousemove', function(event) {
  mouseCoordinates.x = event.x;
  mouseCoordinates.y = event.y;
//  this.console.log(mouseCoordinates);
});

canvas.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  initialize();
});

canvas.addEventListener('mouseleave', function() {
  mouseCoordinates.x = -300;
  mouseCoordinates.y = -300;
});

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() *                    colorArray.length)];
  }

  drawCircles () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2,        false);
    c.fillStyle = this.color;
    c.fill();
  }

  // update () {
  //   // circle bumps into the left/right side of window
  //   if (this.x + this.radius > innerWidth ||
  //       this.x - this.radius < 0) {
  //         this.dx = -this.dx;    // reverse velocity
  //   } 
  //   // circle bumps into the top/bottom of window
  //   if (this.y + this.radius > innerHeight ||
  //       this.y - this.radius < 0) {
  //         this.dy = -this.dy;
  //   }   
  
  //   this.x += this.dx;   
  //   this.y += this.dy;
  
  //   //interactivity  
  //   if (mouseCoordinates.x - this.x < 50 &&   
  //       mouseCoordinates.x - this.x > -50 &&
  //       mouseCoordinates.y - this.y < 50 &&
  //       mouseCoordinates.y - this.y > -50) {
  //     if (this.radius < maxRadius) {
  //       this.radius += 1;
  //     }    
  //   } else if (this.radius > this.minRadius) {
  //     this.radius -= 1;
  //   }
  
  //   this.drawCircles();
  // }

  update () {
    //interactivity  
    if (mouseCoordinates.x - this.x < 50 &&   
      mouseCoordinates.x - this.x > -50 &&
      mouseCoordinates.y - this.y < 50 &&
      mouseCoordinates.y - this.y > -50) {
        if (this.radius < maxRadius) {
          this.radius += 1;
        }    
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    // circle bumps into the left/right side of window
    if (this.x + this.radius > innerWidth ||
        this.x - this.radius < 0) {
          this.dx = -this.dx;    // reverse velocity
    } 
    // circle bumps into the top/bottom of window
    if (this.y + this.radius > innerHeight ||
        this.y - this.radius < 0) {
          this.dy = -this.dy;
    }   
  
    this.x += this.dx;   
    this.y += this.dy;

        //interactivity  
        // if (mouseCoordinates.x - this.x < 50 &&   
        //   mouseCoordinates.x - this.x > -50 &&
        //   mouseCoordinates.y - this.y < 50 &&
        //   mouseCoordinates.y - this.y > -50) {
        //     if (this.radius < maxRadius) {
        //       this.radius += 1;
        //     }    
        // } else if (this.radius > this.minRadius) {
        //   this.radius -= 1;
        // }
  
    this.drawCircles();
  }
}

function initialize() {
  circleArray = [];
  // create all circles
  for (let i = 0; i < numberOfCircles; i++) {
    const radius = Math.random() * 3 + 1;
    const x = Math.random() * (innerWidth - (radius * 2)) +          radius;
    const y = Math.random() * (innerHeight - (radius * 2)) +         radius;
    const dx = (Math.random() - 0.5);  // x velocity
    const dy = (Math.random() - 0.5);  // y velocity
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animateCircles() {
  requestAnimationFrame(animateCircles); // recursive call
  c.clearRect(0,0, innerWidth, innerHeight );

  circleArray.forEach(elem => elem.update());
}

initialize();
animateCircles();