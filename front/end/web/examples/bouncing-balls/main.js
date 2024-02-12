// ball
class Ball  {
    constructor(x, y, vx, vy, radius, color)  {
        this.x = x; this.y = y; this.vx = vx; this.vy = vy;
        this.radius = radius; this.color = color;
    }

    draw(ctx)  {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    update(canvasWidth, canvasHeight) {
        if ((this.x + this.radius) >= canvasWidth) {
            this.vx = -this.vx;
        }

        if ((this.x - this.radius) <= 0) {
            this.vx = -this.vx;
        }

        if ((this.y + this.radius) >= canvasHeight) {
            this.vy = -this.vy;
        }

        if ((this.y - this.radius) <= 0) {
            this.vy = -this.vy;
        }

        this.x += this.vx;
        this.y += this.vy;
    }

    collisionDetect(ballList) {
        for (let ball of ballList) {
            if (ball === this) continue;
            if (Math.sqrt((this.x - ball.x) ** 2 + (this.y - ball.y) ** 2) <= this.radius + ball.radius) {
                ball.color = this.color = randomRGB();
            }
        }
    }
}

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

const balls = [];

while (balls.length < 20) {
    const radius = random(10, 20);
    balls.push(new Ball(random(radius, canvas.width - radius), random(radius, canvas.height - radius), random(-7, 7), random(-7, 7), radius, randomRGB()));
}

function loop()  {
    ctx.fillStyle = "rgba(0, 0, 0, 0.37)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let ball of balls) {
        ball.draw(ctx);
        ball.collisionDetect(balls);
        ball.update(canvas.width, canvas.height);
    }
    requestAnimationFrame(loop)
}

loop()
