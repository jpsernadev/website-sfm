document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DEL MENÚ HAMBURGUESA (NUEVO) ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Alternar la clase que muestra/oculta el menú
            navLinks.classList.toggle('nav-active');
            
            // Opcional: Cambiar el icono de barras a una "X"
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('nav-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            });
        });
    }
    // ---------------------------------------------

    // Navegación suave (Smooth Scrolling)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Manejo del formulario de contacto (Simulación)
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Gracias por tu mensaje, Silvia se pondrá en contacto contigo pronto.');
            form.reset();
        });
    }

    // --- GESTIÓN DE COOKIES Y RGPD ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');

    // Nombre de la clave en localStorage
    const CONSENT_KEY = 'silvia_cookie_consent';

    // Función para cargar scripts de terceros (Google Analytics, Pixels, etc.)
    // Solo se ejecutará si el usuario acepta
    const loadThirdPartyScripts = () => {
        console.log('Cookies aceptadas: Cargando scripts de análisis...');
        // AQUÍ PEGARÍAS EL CÓDIGO DE GOOGLE ANALYTICS EN EL FUTURO
        // Ejemplo:
        // window.dataLayer = window.dataLayer || [];
        // function gtag(){dataLayer.push(arguments);}
        // gtag('js', new Date());
        // gtag('config', 'UA-XXXXX-Y');
    };

    // 1. Comprobar si ya existe consentimiento guardado
    const consent = localStorage.getItem(CONSENT_KEY);

    if (!consent) {
        // Si no hay decisión, mostrar banner tras una pequeña pausa
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    } else if (consent === 'true') {
        // Si ya aceptó anteriormente, cargamos los scripts directamente
        loadThirdPartyScripts();
    }

    // 2. Botón Aceptar
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem(CONSENT_KEY, 'true');
            cookieBanner.classList.remove('show');
            loadThirdPartyScripts();
        });
    }

    // 3. Botón Rechazar
    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            localStorage.setItem(CONSENT_KEY, 'false');
            cookieBanner.classList.remove('show');
            console.log('Cookies rechazadas: No se cargarán rastreadores.');
        });
    }
});