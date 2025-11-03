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

// Chatbot responses with comprehensive keywords
const botResponses = {
    // Greetings
    'hello': 'Hi! I\'m Devangi\'s assistant. How can I help you today? You can ask me about skills, experience, education, projects, interests, strengths, or contact information.',
    'hi': 'Hello! How can I assist you? Feel free to ask about Devangi\'s skills, experience, education, projects, interests, strengths, or how to get in touch!',
    'hey': 'Hey there! I\'m here to help you learn more about Devangi. What would you like to know?',
    'greetings': 'Greetings! I\'m here to answer any questions about Devangi. What would you like to explore?',
    'good morning': 'Good morning! How can I help you learn more about Devangi today?',
    'good afternoon': 'Good afternoon! What would you like to know about Devangi?',
    'good evening': 'Good evening! How can I assist you with information about Devangi?',
    
    // Skills & Technologies
    'skills': 'Devangi is proficient in:\n\n💻 Programming Languages:\n   • HTML, CSS\n   • Java, JavaScript\n   • React.js, Node.js, Next.js\n   • Tailwind CSS\n\n🔧 Frameworks:\n   • Hibernate\n   • Spring Framework\n\n🗄️ Databases:\n   • MySQL, Supabase\n   • SQLite, PHP\n\n🛠️ Tools:\n   • Git, VS Code\n   • Postman, NetBeans\n   • Figma',
    'skill': 'Devangi is proficient in:\n\n💻 Programming Languages:\n   • HTML, CSS\n   • Java, JavaScript\n   • React.js, Node.js, Next.js\n   • Tailwind CSS\n\n🔧 Frameworks:\n   • Hibernate\n   • Spring Framework\n\n🗄️ Databases:\n   • MySQL, Supabase\n   • SQLite, PHP\n\n🛠️ Tools:\n   • Git, VS Code\n   • Postman, NetBeans\n   • Figma',
    'technology': 'Devangi works with modern technologies including React.js, Node.js, Next.js, Java, Spring Framework, Hibernate, MySQL, and more. She\'s skilled in both frontend and backend development!',
    'technologies': 'Devangi works with modern technologies including React.js, Node.js, Next.js, Java, Spring Framework, Hibernate, MySQL, and more. She\'s skilled in both frontend and backend development!',
    'tech': 'Devangi works with modern technologies including React.js, Node.js, Next.js, Java, Spring Framework, Hibernate, MySQL, and more. She\'s skilled in both frontend and backend development!',
    'programming': 'Devangi knows HTML, CSS, Java, JavaScript, React.js, Node.js, Next.js, and Tailwind CSS. She\'s proficient in both frontend and backend programming!',
    'languages': 'Devangi knows HTML, CSS, Java, JavaScript, React.js, Node.js, Next.js, and Tailwind CSS!',
    'framework': 'Devangi works with Hibernate and Spring Framework for backend development.',
    'frameworks': 'Devangi works with Hibernate and Spring Framework for backend development.',
    'database': 'Devangi has experience with MySQL, Supabase, SQLite, and PHP databases.',
    'databases': 'Devangi has experience with MySQL, Supabase, SQLite, and PHP databases.',
    'tools': 'Devangi uses Git, VS Code, Postman, NetBeans, and Figma for development.',
    'react': 'Yes! Devangi is proficient in React.js and has used it in multiple projects including TalentExcel and MSA Smart Attendance.',
    'java': 'Yes! Devangi knows Java and works with Java frameworks like Hibernate and Spring Framework.',
    'javascript': 'Yes! Devangi is proficient in JavaScript and uses it extensively in her full-stack projects.',
    'node': 'Yes! Devangi has experience with Node.js for backend development in projects like TalentExcel and MSA Smart Attendance.',
    
    // Experience & Work
    'experience': 'Devangi has worked as:\n\n🏢 Full Stack Developer Intern at 10xGrowth (2 months)\n   • Worked on TalentExcel project\n   • Developed frontend UI components\n   • Implemented backend authentication\n\n🏢 Full Stack Developer Intern at Prodigy (1 month)\n   • Built responsive UIs\n   • Implemented authentication systems\n   • Collaborated on full-stack tasks',
    'work': 'Devangi has completed internships at 10xGrowth (2 months) and Prodigy (1 month), working on full-stack development projects including TalentExcel and various web applications.',
    'job': 'Devangi has completed internships at 10xGrowth (2 months) and Prodigy (1 month), working on full-stack development projects.',
    'internship': 'Devangi has completed two internships:\n\n1. 10xGrowth - Full Stack Developer Intern (2 months)\n2. Prodigy - Full Stack Developer Intern (1 month)\n\nBoth focused on full-stack development with React.js and Node.js.',
    'internships': 'Devangi has completed two internships:\n\n1. 10xGrowth - Full Stack Developer Intern (2 months)\n2. Prodigy - Full Stack Developer Intern (1 month)\n\nBoth focused on full-stack development with React.js and Node.js.',
    'intern': 'Devangi has completed internships at 10xGrowth and Prodigy as a Full Stack Developer Intern.',
    '10xgrowth': 'Devangi worked as a Full Stack Developer Intern at 10xGrowth for 2 months, where she worked on the TalentExcel project, developed frontend UI components, and implemented backend authentication.',
    'prodigy': 'Devangi worked as a Full Stack Developer Intern at Prodigy for 1 month, where she built responsive UIs, implemented authentication systems, and collaborated on full-stack development tasks.',
    'talentexcel': 'TalentExcel is a professional skill management platform that Devangi worked on during her internship at 10xGrowth. Built with React.js, Express.js, and Supabase. Visit: talentexcel.com',
    
    // Education
    'education': 'Devangi\'s complete educational background:\n\n🎓 Bachelor of Science (BSc) Computer Science\n   📍 Pillai College of Arts, Commerce and Science (PCACS)\n   📅 Currently in Third Year (TY BSc)\n   🎯 Expected Graduation: 2026\n\n🎓 12th Higher Secondary Certificate (HSC)\n   📍 DSP Jr. College\n   📚 Stream: PCMB + IT (Physics, Chemistry, Mathematics, Biology + Information Technology)\n   📅 Completed: 2023\n\n🎓 10th Secondary School Certificate (SSC)\n   📍 DSP Public School\n   📅 Completed: 2021',
    'college': 'Devangi is currently pursuing TY BSc Computer Science at Pillai College of Arts, Commerce and Science (PCACS), expected to graduate in 2026.',
    'university': 'Devangi is currently pursuing TY BSc Computer Science at Pillai College of Arts, Commerce and Science (PCACS), expected to graduate in 2026.',
    'school': 'Devangi completed her 12th HSC (PCMB + IT) from DSP Jr. College in 2023 and 10th SSC from DSP Public School in 2021.',
    'degree': 'Devangi is pursuing a Bachelor of Science (BSc) in Computer Science from Pillai College (PCACS), currently in her third year with expected graduation in 2026.',
    'qualification': 'Devangi\'s qualifications:\n• TY BSc Computer Science (Ongoing - 2026)\n• 12th HSC PCMB + IT (2023)\n• 10th SSC (2021)',
    'qualifications': 'Devangi\'s qualifications:\n• TY BSc Computer Science (Ongoing - 2026)\n• 12th HSC PCMB + IT (2023)\n• 10th SSC (2021)',
    'study': 'Devangi is currently studying Computer Science (TY BSc) at Pillai College (PCACS), expected to graduate in 2026.',
    'studying': 'Devangi is currently studying Computer Science (TY BSc) at Pillai College (PCACS), expected to graduate in 2026.',
    'student': 'Yes! Devangi is a TY BSc Computer Science student at Pillai College (PCACS), expected to graduate in 2026.',
    'graduate': 'Devangi is expected to graduate in 2026 with a BSc in Computer Science from Pillai College (PCACS).',
    'graduation': 'Devangi\'s expected graduation is in 2026 with a BSc in Computer Science from Pillai College (PCACS).',
    
    // Projects
    'projects': 'Notable projects by Devangi:\n\n📱 MSA Smart Attendance WebApp\n   • Digital attendance system with QR & GPS\n   • Tech: Node.js, Express.js, Prisma ORM, SQLite/PostgreSQL\n   • Features: JWT Auth, QR Scanning, GPS Tracking, Excel Export\n   • Live: msa-smart-attendance.vercel.app\n\n💬 Chatting App (Simple)\n   • Real-time chat with WebSocket\n   • Tech: JavaScript, WebSocket, Node.js\n   • GitHub: PRODIGY_FS_4\n\n🎯 TalentExcel (10xGrowth Project)\n   • Professional skill management platform\n   • Tech: React.js, Express.js, Supabase\n   • Live: talentexcel.com',
    'project': 'Devangi has built several projects including MSA Smart Attendance WebApp, a Chatting App, and TalentExcel platform. Would you like details about any specific project?',
    'portfolio': 'Devangi has built several impressive projects including MSA Smart Attendance WebApp, a real-time Chatting App, and TalentExcel platform. Check out her GitHub: Devangi-04',
    'msa': 'MSA Smart Attendance WebApp is a comprehensive digital attendance system for Mathematics and Statistics Association.\n\n🛠️ Technologies:\n   • Node.js + Express.js\n   • Prisma ORM + SQLite/PostgreSQL\n   • JWT Authentication + bcrypt\n   • QR Code Generation & Scanning\n   • GPS Location Tracking\n   • ExcelJS for Reports\n   • Bootstrap 5 + Font Awesome\n\n✨ Features: QR code scanning, GPS verification, attendance tracking, Excel export\n\n🌐 Live at: msa-smart-attendance.vercel.app',
    'attendance': 'MSA Smart Attendance WebApp is a comprehensive digital attendance system for Mathematics and Statistics Association.\n\n🛠️ Technologies:\n   • Node.js + Express.js\n   • Prisma ORM + SQLite/PostgreSQL\n   • JWT Authentication + bcrypt\n   • QR Code Generation & Scanning\n   • GPS Location Tracking\n   • ExcelJS for Reports\n   • Bootstrap 5 + Font Awesome\n\n✨ Features: QR code scanning, GPS verification, attendance tracking, Excel export\n\n🌐 Live at: msa-smart-attendance.vercel.app',
    'chat': 'Devangi built a real-time Chatting App using JavaScript, WebSocket, and Node.js. Check it out on GitHub: PRODIGY_FS_4',
    'chatting': 'Devangi built a real-time Chatting App using JavaScript, WebSocket, and Node.js. Check it out on GitHub: PRODIGY_FS_4',
    
    // Interests & Strengths
    'interests': 'Devangi is passionate about:\n\n❤️ Web Development\n   Building modern, responsive websites\n\n❤️ Full-Stack Development\n   Creating end-to-end solutions\n\n❤️ AI Integration\n   Exploring AI in web applications\n\nShe loves building innovative solutions and staying updated with the latest technologies!',
    'interest': 'Devangi is passionate about:\n\n❤️ Web Development\n   Building modern, responsive websites\n\n❤️ Full-Stack Development\n   Creating end-to-end solutions\n\n❤️ AI Integration\n   Exploring AI in web applications\n\nShe loves building innovative solutions and staying updated with the latest technologies!',
    'passion': 'Devangi is passionate about Web Development, Full-Stack Development, and AI Integration. She loves creating innovative solutions!',
    'passions': 'Devangi is passionate about Web Development, Full-Stack Development, and AI Integration. She loves creating innovative solutions!',
    'hobby': 'Devangi loves Web Development, Full-Stack Development, and exploring AI Integration in web applications!',
    'hobbies': 'Devangi loves Web Development, Full-Stack Development, and exploring AI Integration in web applications!',
    'strengths': 'Devangi\'s key strengths:\n\n⚡ Leadership\n   Guides teams effectively and takes initiative\n\n⚡ Time Management\n   Delivers projects on schedule\n\n⚡ Creativity\n   Innovative problem-solving approach\n\n⚡ Sincerity\n   Dedicated and committed to excellence\n\nThese qualities make her an excellent team player and developer!',
    'strength': 'Devangi\'s key strengths:\n\n⚡ Leadership\n   Guides teams effectively and takes initiative\n\n⚡ Time Management\n   Delivers projects on schedule\n\n⚡ Creativity\n   Innovative problem-solving approach\n\n⚡ Sincerity\n   Dedicated and committed to excellence\n\nThese qualities make her an excellent team player and developer!',
    'quality': 'Devangi\'s key qualities include Leadership, Time Management, Creativity, and Sincerity. She\'s a dedicated and reliable team player!',
    'qualities': 'Devangi\'s key qualities include Leadership, Time Management, Creativity, and Sincerity. She\'s a dedicated and reliable team player!',
    
    // Contact Information
    'contact': 'You can reach Devangi at:\n\n📧 Email: devangibarai0403@gmail.com\n📱 Phone: 9967313355\n💼 LinkedIn: linkedin.com/in/devangi-barai-295692295\n🐙 GitHub: Devangi-04',
    'reach': 'You can reach Devangi at:\n\n📧 Email: devangibarai0403@gmail.com\n📱 Phone: 9967313355\n💼 LinkedIn: linkedin.com/in/devangi-barai-295692295\n🐙 GitHub: Devangi-04',
    'email': '📧 Devangi\'s email: devangibarai0403@gmail.com\n\nFeel free to reach out for any queries!',
    'mail': '📧 Devangi\'s email: devangibarai0403@gmail.com\n\nFeel free to reach out for any queries!',
    'phone': '📱 You can call Devangi at: 9967313355',
    'call': '📱 You can call Devangi at: 9967313355',
    'number': '📱 You can call Devangi at: 9967313355',
    'github': '🐙 Check out Devangi\'s GitHub: github.com/Devangi-04\n\nExplore her open-source projects and contributions!',
    'git': '🐙 Check out Devangi\'s GitHub: github.com/Devangi-04\n\nExplore her open-source projects and contributions!',
    'linkedin': '💼 Connect on LinkedIn: linkedin.com/in/devangi-barai-295692295\n\nLet\'s connect professionally!',
    'social': 'Connect with Devangi:\n\n💼 LinkedIn: linkedin.com/in/devangi-barai-295692295\n🐙 GitHub: Devangi-04',
    
    // About & Personal
    'who': 'Devangi Banshilal Barai is a passionate Full-Stack Developer and Computer Science student at PCACS. She specializes in web development with expertise in React.js, Node.js, Java, and modern web technologies. She has completed internships at 10xGrowth and Prodigy.',
    'about': 'Devangi is a TY BSc Computer Science student at PCACS with a passion for full-stack development. She has completed internships at 10xGrowth and Prodigy, working on projects like TalentExcel and MSA Smart Attendance. Her interests include Web Development, Full-Stack Development, and AI Integration.',
    'name': 'Her full name is Devangi Banshilal Barai. She\'s a passionate Full-Stack Developer and Computer Science student.',
    'developer': 'Yes! Devangi is a Full-Stack Developer with experience in React.js, Node.js, Java, and modern web technologies. She has completed internships at 10xGrowth and Prodigy.',
    'fullstack': 'Yes! Devangi is a Full-Stack Developer proficient in both frontend (React.js, HTML, CSS) and backend (Node.js, Java, Spring Framework) technologies.',
    'full-stack': 'Yes! Devangi is a Full-Stack Developer proficient in both frontend (React.js, HTML, CSS) and backend (Node.js, Java, Spring Framework) technologies.',
    'frontend': 'Devangi is skilled in frontend development with HTML, CSS, JavaScript, React.js, Next.js, and Tailwind CSS.',
    'backend': 'Devangi is skilled in backend development with Node.js, Java, Spring Framework, Hibernate, and databases like MySQL and Supabase.',
    
    // Help & Misc
    'help': 'I can help you with:\n\n• Skills & Technologies\n• Work Experience & Internships\n• Complete Education Background\n• Projects Portfolio\n• Interests & Passions\n• Strengths & Qualities\n• Contact Information\n\nJust ask me anything!',
    'what': 'I can help you with information about Devangi\'s skills, experience, education, projects, interests, strengths, or contact details. What specifically would you like to know?',
    'tell': 'I can tell you about Devangi\'s skills, experience, education, projects, interests, strengths, or contact information. What would you like to know?',
    'know': 'I can share information about Devangi\'s skills, experience, education, projects, interests, strengths, or how to contact her. What interests you?',
    'thanks': 'You\'re welcome! Feel free to ask if you need any more information about Devangi. 😊',
    'thank': 'You\'re welcome! Feel free to ask if you need any more information about Devangi. 😊',
    'thankyou': 'You\'re welcome! Feel free to ask if you need any more information about Devangi. 😊',
    'ty': 'You\'re welcome! 😊',
    'bye': 'Goodbye! Feel free to come back if you have more questions about Devangi. Have a great day! 👋',
    'goodbye': 'Goodbye! Feel free to come back if you have more questions about Devangi. Have a great day! 👋',
    'see you': 'See you later! Feel free to return anytime. 👋',
    'ok': 'Great! Let me know if you need anything else about Devangi. 😊',
    'okay': 'Great! Let me know if you need anything else about Devangi. 😊',
    'default': 'I can help you with information about Devangi\'s skills, experience, education, projects, interests, strengths, or contact details. What would you like to know?'
};

function addMessage(text, isBot = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isBot ? 'bot' : 'user'}`;
    // Replace \n with <br> for proper line breaks
    messageDiv.innerHTML = text.replace(/\n/g, '<br>');
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Check for exact match first
    if (botResponses[message]) {
        return botResponses[message];
    }
    
    // Check for word boundaries (whole word match)
    for (const [key, response] of Object.entries(botResponses)) {
        const regex = new RegExp('\\b' + key + '\\b', 'i');
        if (regex.test(message)) {
            return response;
        }
    }
    
    // Check for partial match as fallback
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
        addMessage('Hello! 👋 I\'m Devangi\'s virtual assistant.\n\nI can help you with:\n• Skills & Technologies\n• Work Experience\n• Education\n• Projects\n• Interests & Strengths\n• Contact Information\n\nWhat would you like to know?');
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
