# Devangi Barai - Portfolio Website

A modern, responsive personal portfolio website for Devangi Banshilal Barai, showcasing her skills, experience, projects, and contact information.

## Features

- **Modern Design**: Clean and professional layout with pastel blue and lavender gradient theme
- **Responsive**: Fully mobile-responsive design that works on all devices
- **Smooth Animations**: Hover effects, transitions, and typewriter effect for tagline
- **Interactive Chatbot**: AI assistant to help visitors learn more about Devangi
- **Contact Form**: Functional contact form for visitor inquiries
- **Smooth Scrolling**: Navigation with smooth scroll behavior

## Technologies Used

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework via CDN
- **JavaScript**: Vanilla JS for interactivity
- **Google Fonts**: Poppins font family

## Sections

1. **Hero Section**: Name, tagline with typewriter effect, profile photo placeholder, CTA buttons
2. **Education**: Academic background at PCACS
3. **Experience**: Internship details at 10xGrowth and Prodigy
4. **Skills**: Technical stack organized by categories
5. **Projects**: Featured projects with descriptions
6. **Interests & Strengths**: Personal attributes
7. **Contact**: Contact information and message form
8. **Chatbot**: Interactive assistant for visitor queries

## File Structure

```
DEVANGI BARAI PROFILE/
├── index.html          # Main HTML file (to be completed)
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
├── contact-section.html # Contact section template
├── part1.html          # Partial HTML (reference)
└── README.md           # This file
```

## Setup Instructions

1. **Open the website**: Simply open `index.html` in a web browser
2. **No build process required**: All dependencies are loaded via CDN
3. **Customize**: 
   - Replace profile photo placeholder with actual image
   - Add resume PDF link in the "View Resume" button
   - Configure email API for contact form (EmailJS, Formspree, etc.)

## Customization

### Adding Your Resume
Update the download button in `script.js`:
```javascript
document.getElementById('download-resume').addEventListener('click', (e) => {
    e.preventDefault();
    window.open('path/to/your/resume.pdf', '_blank');
});
```

### Email Integration
The contact form is ready for integration with services like:
- **EmailJS**: https://www.emailjs.com/
- **Formspree**: https://formspree.io/
- **Custom Backend**: Node.js + Nodemailer

### Profile Photo
Replace the SVG placeholder in the hero section with:
```html
<img src="path/to/your/photo.jpg" alt="Devangi Barai" class="w-full h-full object-cover">
```

## Chatbot Responses

The chatbot can answer questions about:
- Skills and technologies
- Work experience
- Education background
- Projects
- Contact information
- GitHub and LinkedIn profiles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contact Information

- **Email**: devangibarai0403@gmail.com
- **Phone**: 9967313355
- **GitHub**: VersatileMentor04
- **LinkedIn**: linkedin.com/in/devangi-barai-295692295

## License

© 2024 Devangi Banshilal Barai. All rights reserved.

## Future Enhancements

- Add dark mode toggle
- Integrate blog section
- Add project live demos
- Implement analytics
- Add testimonials section
- Create downloadable resume generator
