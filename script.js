// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');
const API_BASE_URL = 'http://localhost:3001/api';


hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate Links
    links.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close mobile menu when clicking on a link
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        links.forEach(link => {
            link.style.animation = '';
        });
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        item.classList.toggle('active');
        
        // Close other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
    });
});

// Snowflakes Animation
function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const snowflakeCount = 50;
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        // Random position
        snowflake.style.left = `${Math.random() * 100}%`;
        
        // Random animation duration between 5s and 15s
        const duration = Math.random() * 10 + 5;
        snowflake.style.animation = `fall ${duration}s linear infinite`;
        
        // Random delay
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        
        // Random opacity
        snowflake.style.opacity = Math.random();
        
        snowflakesContainer.appendChild(snowflake);
    }
}

// Add snowflakes animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(-10vh) rotate(0deg);
        }
        100% {
            transform: translateY(110vh) rotate(360deg);
        }
    }
    
    .snowflake {
        position: absolute;
        background-color: white;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
    }
`;
document.head.appendChild(style);

// Create snowflakes when page loads
window.addEventListener('load', createSnowflakes);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form Handler
document.querySelector('.join-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.querySelector('#name').value,
        email: this.querySelector('#email').value,
        phone: this.querySelector('#phone').value || null, // handle jika kosong
        session: this.querySelector('#session').value
    };

    try {
        const response = await fetch(`${API_BASE_URL}/join-requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Gagal mengirim formulir');
        }
        
        const result = await response.json();
        alert(result.message || 'Formulir berhasil dikirim!');
        this.reset();
    } catch (error) {
        console.error('Error:', error);
        alert(`Error: ${error.message}\n\nSilakan coba lagi atau hubungi admin.`);
    }
});


// Contoh fungsi untuk submit form
async function submitJoinForm(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/join-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
}

