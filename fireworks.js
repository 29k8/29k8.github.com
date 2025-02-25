class Firework {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.colors = ['#e74c3c', '#f1c40f', '#3498db', '#ffffff'];
    }

    createParticles(x, y, count = 80) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 4;
            const size = 2 + Math.random() * 2;
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];

            this.particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size,
                color,
                alpha: 1,
                life: 0.8 + Math.random() * 0.4
            });
        }
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];

            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // gravity
            p.alpha -= 0.01;
            p.life -= 0.01;

            this.ctx.globalAlpha = p.alpha;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();

            if (p.life <= 0) {
                this.particles.splice(i, 1);
                i--;
            }
        }

        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.update());
        }
    }

    launch(x, y) {
        this.createParticles(x, y);
        this.update();
    }
} 