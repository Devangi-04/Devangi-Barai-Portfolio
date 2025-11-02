// Typewriter Effect
const text = "Passionate Full-Stack Developer and Student";
let index = 0;
const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
    if (index < text.length) {
        typewriterElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// Start typewriter when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Contact Form with AJAX submission (no redirect)
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show sending state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        formMessage.innerHTML = '';
        
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                formMessage.innerHTML = '<p class="text-green-600 font-semibold">✓ Message sent successfully! I\'ll get back to you soon.</p>';
                contactForm.reset();
            } else {
                formMessage.innerHTML = '<p class="text-red-600 font-semibold">✗ Failed to send. Please email me directly at devangibarai0403@gmail.com</p>';
            }
        } catch (error) {
            formMessage.innerHTML = '<p class="text-red-600 font-semibold">✗ Error sending message. Please try again or email me directly.</p>';
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Chatbot Functionality
const chatbotButton = document.getElementById('chatbot-button');
const chatbotWindow = document.getElementById('chatbot-window');
const closeChatBtn = document.getElementById('close-chat');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');

// Chatbot responses
const botResponses = {
    'hello': 'Hi! I\'m Devangi\'s assistant. How can I help you today?',
    'hi': 'Hello! How can I assist you?',
    'skills': 'Devangi is proficient in Java, JavaScript, React.js, Node.js, Next.js, Tailwind CSS, Express.js, MySQL, Supabase, and more!',
    'experience': 'Devangi has worked as a Full Stack Developer Intern at 10xGrowth (2 months) and Prodigy (1 month).',
    'education': 'Devangi is currently pursuing TY BSc Computer Science at Pillai College of Arts, Commerce and Science (PCACS), expected graduation in 2026.',
    'projects': 'Some notable projects include MSA Smart Attendance WebApp, Chatting App, and TalentExcel platform.',
    'contact': 'You can reach Devangi at devangibarai0403@gmail.com or call 9967313355.',
    'email': 'Devangi\'s email is devangibarai0403@gmail.com',
    'phone': 'You can call Devangi at 9967313355',
    'github': 'Check out Devangi\'s GitHub: VersatileMentor04',
    'linkedin': 'Connect on LinkedIn: linkedin.com/in/devangi-barai-295692295',
    'default': 'I can help you with information about Devangi\'s skills, experience, education, projects, or contact details. What would you like to know?'
};

function addMessage(text, isBot = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isBot ? 'bot' : 'user'}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(botResponses)) {
        if (message.includes(key)) {
            return response;
        }
    }
    
    return botResponses.default;
}

chatbotButton.addEventListener('click', () => {
    chatbotWindow.classList.add('active');
    if (chatMessages.children.length === 0) {
        addMessage('Hello! I\'m here to help you learn more about Devangi. Ask me anything!');
    }
});

closeChatBtn.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
});

sendButton.addEventListener('click', () => {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, false);
        chatInput.value = '';
        
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            addMessage(botResponse);
        }, 500);
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
function updateThemeIcon() {
    const theme = htmlElement.getAttribute('data-theme');
    const icon = themeToggle.querySelector('svg');
    
    if (theme === 'dark') {
        // Sun icon for light mode
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
    } else {
        // Moon icon for dark mode
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
    }
}

updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// Projects Management
let projects = JSON.parse(localStorage.getItem('projects')) || [
    {
        id: 1,
        title: 'MSA Smart Attendance WebApp',
        description: 'A comprehensive digital attendance system for teachers and students.',
        technologies: ['React.js', 'Node.js', 'MySQL'],
        github: 'https://github.com/VersatileMentor04/msa-attendance',
        live: null
    },
    {
        id: 2,
        title: 'Chatting App (Simple)',
        description: 'A real-time chat application built with WebSocket technology.',
        technologies: ['JavaScript', 'WebSocket', 'Node.js'],
        github: 'https://github.com/VersatileMentor04/chatting-app',
        live: null
    },
    {
        id: 3,
        title: 'TalentExcel (10xGrowth Project)',
        description: 'A professional platform for skill and talent management.',
        technologies: ['React.js', 'Express.js', 'Supabase'],
        github: 'https://github.com/VersatileMentor04/talentexcel',
        live: null
    }
];

function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'bg-white rounded-2xl overflow-hidden shadow-lg hover-lift';
        projectCard.style.backgroundColor = 'var(--card-bg)';
        
        projectCard.innerHTML = `
            <div class="h-48 gradient-bg flex items-center justify-center">
                <svg class="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                </svg>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold mb-3" style="color: var(--text-dark)">${project.title}</h3>
                <p class="mb-4" style="color: var(--text-gray)">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-3">
                    ${project.technologies.map(tech => `
                        <span class="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">${tech}</span>
                    `).join('')}
                </div>
                ${project.github ? `
                    <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="github-link">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        View on GitHub
                    </a>
                ` : ''}
                ${project.live ? `
                    <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="github-link" style="background: var(--success); margin-left: 8px;">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                        Live Demo
                    </a>
                ` : ''}
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
    
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Download Resume
const downloadResumeLink = document.getElementById('download-resume');

downloadResumeLink.addEventListener('click', (e) => {
    e.preventDefault();
    const resume = localStorage.getItem('resume');
    const resumeName = localStorage.getItem('resumeName') || 'resume.pdf';
    
    if (resume) {
        const link = document.createElement('a');
        link.href = resume;
        link.download = resumeName;
        link.click();
    } else {
        alert('Resume download functionality - Please add your resume PDF link here!');
    }
});

// Initialize projects on page load
window.addEventListener('load', () => {
    renderProjects();
});
