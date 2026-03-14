// 1. Effet Machine à Écrire
const textElement = document.getElementById("typing-text");
const words = ["Freelance créatif", "Développeur Web", "Designer Graphique"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}
document.addEventListener("DOMContentLoaded", type);

// 2. Mode Sombre / Clair
const themeIcon = document.getElementById("theme-icon");
themeIcon.onclick = () => {
    document.body.classList.toggle("light-theme");
    if(document.body.classList.contains("light-theme")){
        themeIcon.classList.replace("fa-moon", "fa-sun");
    } else {
        themeIcon.classList.replace("fa-sun", "fa-moon");
    }
};

// 3. Menu Mobile
const menuToggle = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

if(menuToggle) {
    menuToggle.onclick = () => {
        navLinks.classList.toggle("active");
    };
}

// Fermer le menu au clic sur un lien (mobile)
document.querySelectorAll(".nav-links a").forEach(link => {
    link.onclick = () => navLinks.classList.remove("active");
});

// 4. Gestion Unique du Scroll (Barre, Header, Reveal, BackToTop)
window.addEventListener("scroll", () => {
    let winScroll = document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    
    // Barre de progression
    const progressBar = document.getElementById("progress-bar");
    if(progressBar) progressBar.style.width = scrolled + "%";

    // Header & Bouton BackToTop
    const header = document.querySelector("header");
    const btt = document.getElementById("backToTop");
    
    if (winScroll > 50) {
        header.classList.add("header-scrolled");
        if(btt) btt.style.display = "block";
    } else {
        header.classList.remove("header-scrolled");
        if(btt) btt.style.display = "none";
    }

    // Animation au scroll (Reveal)
    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
});

// Action du bouton retour en haut
const bttBtn = document.getElementById("backToTop");
if(bttBtn) {
    bttBtn.onclick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
}

//contact

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const button = document.getElementById("submit-btn");

form.addEventListener("submit", async function(e) {

    e.preventDefault();

    button.innerText = "Envoi...";

    const data = new FormData(form);

    try {

const response = await fetch(form.action, {
method: form.method,
body: data,
headers: {
'Accept': 'application/json'
}
});

if (response.ok) {

status.innerHTML = "✅ Message envoyé avec succès !";
status.style.color = "lightgreen";

form.reset();
button.innerText = "Envoyer";

} else {

status.innerHTML = "❌ Une erreur est survenue.";
status.style.color = "red";

}

} catch (error) {

status.innerHTML = "❌ Impossible d'envoyer le message.";
status.style.color = "red";

}

});