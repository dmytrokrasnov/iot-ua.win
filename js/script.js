/* ==========================================================
   IoT-UA
   Premium Script
   Part 1
========================================================== */

"use strict";

/* ===========================================
   HEADER
=========================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.style.background = "rgba(5,8,22,.88)";
        header.style.boxShadow = "0 10px 35px rgba(0,0,0,.35)";

    } else {

        header.style.background = "rgba(5,8,22,.55)";
        header.style.boxShadow = "none";

    }

});


/* ===========================================
   SCROLL ANIMATION
=========================================== */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: .15

});

document.querySelectorAll("section").forEach(section => {

    section.classList.add("hidden");

    observer.observe(section);

});


/* ===========================================
   PARTICLES
=========================================== */

const canvas = document.createElement("canvas");

canvas.id = "particleCanvas";

document.getElementById("particles").appendChild(canvas);

const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

class Particle {

    constructor() {

        this.reset();

    }

    reset() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + .5;

        this.speedX = (Math.random() - .5) * .25;
        this.speedY = (Math.random() - .5) * .25;

        this.alpha = Math.random() * .6 + .2;

    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        if (
            this.x < 0 ||
            this.x > canvas.width ||
            this.y < 0 ||
            this.y > canvas.height
        ) {

            this.reset();

        }

    }

    draw() {

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(46,167,255,${this.alpha})`;

        ctx.fill();

    }

}

for (let i = 0; i < 120; i++) {

    particles.push(new Particle());

}

function connectParticles() {

    for (let a = 0; a < particles.length; a++) {

        for (let b = a + 1; b < particles.length; b++) {

            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;

            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {

                ctx.beginPath();

                ctx.moveTo(particles[a].x, particles[a].y);

                ctx.lineTo(particles[b].x, particles[b].y);

                ctx.strokeStyle =
                    "rgba(46,167,255," + (1 - dist / 120) * .15 + ")";

                ctx.stroke();

            }

        }

    }

}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {

        p.update();

        p.draw();

    });

    connectParticles();

    requestAnimationFrame(animate);

}

animate();
/* ===========================================
   LOADER
=========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.remove();

        },800);

    },1800);

});


/* ===========================================
   CURSOR GLOW
=========================================== */

const glow = document.getElementById("cursorGlow");

document.addEventListener("mousemove", e => {

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

});


/* ===========================================
   CARD TILT
=========================================== */

document.querySelectorAll(".service-card").forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY = (x / rect.width - .5) * 18;

        const rotateX = -(y / rect.height - .5) * 18;

        card.style.transform =

            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-12px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* ===========================================
   COUNTERS
=========================================== */

document.querySelectorAll(".stats h3").forEach(counter => {

    const target = parseInt(counter.textContent);

    if (!target) return;

    let current = 0;

    const speed = target / 80;

    const update = () => {

        current += speed;

        if (current >= target) {

            current = target;

        }

        if (counter.textContent.includes("%")) {

            counter.textContent = Math.floor(current) + "%";

        } else if (counter.textContent.includes("+")) {

            counter.textContent = Math.floor(current) + "+";

        } else {

            counter.textContent = Math.floor(current);

        }

        if (current < target) {

            requestAnimationFrame(update);

        }

    };

    update();

});