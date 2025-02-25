class Firework {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.colors = ['#e74c3c', '#f1c40f', '#3498db', '#ffffff'];
        this.active = false;
        this.duration = 10000; // 10 seconds duration
        this.startTime = 0;
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
                life: 0.95 + Math.random() * 0.05 // Longer life for particles
            });
        }
    }

    update() {
        if (!this.active) return;

        // Calculate elapsed time
        const elapsed = Date.now() - this.startTime;
        const progress = Math.min(elapsed / this.duration, 1);

        // Check if duration has passed
        if (elapsed >= this.duration) {
            this.active = false;
            this.particles = [];
            // Clear the canvas one last time
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Occasionally add new particles during the show
        if (Math.random() < 0.1 && this.active) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * (this.canvas.height / 3);
            this.createParticles(x, y, 20);
        }

        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];

            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.03; // Reduced gravity for slower fall
            p.alpha -= 0.003; // Slower fade
            p.life -= 0.003; // Slower life reduction

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

        requestAnimationFrame(() => this.update());
    }

    launch(x, y) {
        this.active = true;
        this.startTime = Date.now();
        this.particles = [];
        this.createParticles(x, y, 100);
        this.update();
    }
} 