document.addEventListener('DOMContentLoaded', () => {

    // Hamburger toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('nav ul');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e){
            if(this.classList.contains('btn') || this.classList.contains('secondary-btn')) return;
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) target.scrollIntoView({behavior:'smooth'});
            if(navLinks.classList.contains('show')) navLinks.classList.remove('show'); // Close menu on click
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 80) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    // Hero typewriter effect
    const heroText = document.getElementById('hero-text');
    const phrases = ["I Build Intelligent Solutions.","I Love to Code.","I Am Mastering AI & ML.","I Ship Full Stack Apps.","I Won A Hackathon"];
    let i=0, j=0, deleting=false;
    function typeEffect(){
        if(!deleting && j<=phrases[i].length){
            heroText.innerHTML = phrases[i].substring(0,j++);
            setTimeout(typeEffect,70);
        } else if(deleting && j>=0){
            heroText.innerHTML = phrases[i].substring(0,j--);
            setTimeout(typeEffect,40);
        } else {
            deleting = !deleting;
            if(!deleting) i=(i+1)%phrases.length;
            setTimeout(typeEffect,1000);
        }
    }
    setTimeout(typeEffect,500);

    // ScrollReveal animations
    ScrollReveal().reveal('.hero-text-area > *',{interval:150,origin:'bottom',distance:'40px',duration:1200});
    ScrollReveal().reveal('section h2',{origin:'top',distance:'30px',duration:1000});
    ScrollReveal().reveal('.about-card',{origin:'bottom',distance:'30px',duration:1200});
    ScrollReveal().reveal('.skills-grid',{origin:'bottom',interval:100});
    ScrollReveal().reveal('.project-card',{origin:'bottom',interval:200});
    ScrollReveal().reveal('.exp-card, .edu-card',{origin:'left',interval:150});
    ScrollReveal().reveal('.achievement-card',{origin:'bottom',distance:'30px',interval:150});
    ScrollReveal().reveal('#contact .contact-intro',{origin:'top',distance:'20px'});
    ScrollReveal().reveal('.contact-card',{origin:'bottom',distance:'20px',interval:150});

    // Star canvas
    const canvas = document.getElementById('star-canvas');
    const ctx = canvas.getContext('2d');
    let stars=[];

    function resizeCanvas(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function initStars(){
        stars=[];
        for(let i=0;i<300;i++){
            stars.push({
                x:Math.random()*canvas.width,
                y:Math.random()*canvas.height,
                radius:Math.random()*2+0.8,
                alpha:Math.random(),
                speed:Math.random()*1+0.3
            });
        }
    }

    function drawStars(){
        ctx.fillStyle = 'rgba(20,20,20,1)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        stars.forEach(star=>{
            star.y+=star.speed;
            if(star.y>canvas.height){star.y=0; star.x=Math.random()*canvas.width;}
            star.alpha+=(Math.random()-0.5)*0.08;
            star.alpha=Math.min(Math.max(star.alpha,0),1);
            ctx.beginPath();
            ctx.arc(star.x,star.y,star.radius,0,Math.PI*2);
            ctx.fillStyle=`rgba(0,173,181,${star.alpha*0.8})`;
            ctx.shadowColor=`rgba(0,173,181,${star.alpha})`;
            ctx.shadowBlur = star.radius*7;
            ctx.fill();
        });
        requestAnimationFrame(drawStars);
    }

    window.addEventListener('resize',()=>{
        resizeCanvas();
        initStars();
    });

    resizeCanvas();
    initStars();
    drawStars();

});
