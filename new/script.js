import * as THREE from 'three';

// data
const RESUME = {
  name: "ARYAN KAFLE",
  role: "Computer Engineer (BCT)",
  contact: {
    location: "Bafal, Kathmandu",
    phone: "9869021060",
    email: "aryan.078bct014@acem.edu.np",
    github: "https://github.com/aryankaflegithub"
  },
  profile: "Computer engineering undergraduate with hands-on experience in web development, generative AI, reinforcement learning, and system design. Skilled in building projects, maintaining websites, and developing applications. Strong analytical skills with a background in mathematics and applied computing.",
  skills: [
    {
      category: "Programming",
      items: ["Python", "JavaScript", "HTML", "CSS", "C", "C++", "C#"]
    },
    {
      category: "Web Development",
      items: ["Frontend Development", "Basic Backend", "Website Maintenance", "React", "Tailwind CSS"]
    },
    {
      category: "AI / ML",
      items: ["Generative AI", "Reinforcement Learning", "State Space Modeling", "PyTorch/TensorFlow"]
    },
    {
      category: "Professional",
      items: ["Problem Solving", "Critical Thinking", "Communication", "Teamwork", "Project Documentation"]
    },
    {
      category: "Tools & Other",
      items: ["Graphic Design", "Video Editing", "Git/GitHub", "Pygame"]
    }
  ],
  education: [
    {
      degree: "Bachelor in Computer Engineering",
      institution: "Advance College of Engineering & Management, Tribhuvan University",
      status: "Ongoing"
    }
  ],
  experience: [
    "Built and maintained multiple websites.",
    "Developed a game using Python (Pygame).",
    "Worked as a graphic designer and video editor.",
    "Conducted research on text-to-image generative models.",
    "Currently working on reinforcement learning algorithms and satellite related state space modeling."
  ]
};

const PROJECTS = [
  {
    id: 101,
    name: "Satellite_attitude_control",
    description: "Reinforcement learning algorithms applied to satellite state space modeling and control systems.",
    html_url: "https://github.com/aryankaflegithub/Satellite_attitude_control",
    language: "Python",
    stargazers_count: 12,
    updated_at: new Date().toISOString()
  },
  {
    id: 102,
    name: "Text-to-Image-Gen",
    description: "Research and implementation of latent diffusion models for generative AI image synthesis.",
    html_url: "https://github.com/aryankaflegithub/minor_project",
    language: "Python",
    stargazers_count: 8,
    updated_at: new Date().toISOString()
  },
  {
    id: 103,
    name: "Pygame",
    description: "A fully functional 2D adventure game built with Python and Pygame demonstrating OOP principles.",
    html_url: "https://github.com/aryankaflegithub/game",
    language: "Python",
    stargazers_count: 5,
    updated_at: new Date().toISOString()
  },
  {
    id: 104,
    name: "Student-management-system",
    description: "A student management system for handling student records, attendance, and grades.",
    html_url: "https://github.com/aryankaflegithub/Student-management-system",
    language: "C++",
    stargazers_count: 3,
    updated_at: new Date().toISOString()
  },
  {
    id: 105,
    name: "Earth-3D",
    description: "Interactive 3D Earth model using Three.js showcasing geographical data and animations.",
    html_url: "https://github.com/aryankaflegithub/3d-earth",
    language: "JavaScript",
    stargazers_count: 4,
    updated_at: new Date().toISOString()
  }
];

//BACKGROUND
function initThreeJS() {
    const container = document.getElementById('canvas-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const starGroup = new THREE.Group();
    scene.add(starGroup);

    // Create Texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.4, 'rgba(240, 248, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(canvas);

    // Points
    const count = 2500;
    const radius = 45;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = radius * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        map: texture,
        size: 0.8,
        sizeAttenuation: true,
        transparent: true,
        opacity: 1.0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: 0xffffff
    });

    const points = new THREE.Points(geometry, material);
    starGroup.add(points);

    let mouseX = 0;
    let mouseY = 0;
    let targetOpacity = 1.0;

    window.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);

        const targetRotX = -mouseY * 0.5; 
        const targetRotY = mouseX * 0.5; 

        starGroup.rotation.x = THREE.MathUtils.lerp(starGroup.rotation.x, targetRotX, 0.05);
        starGroup.rotation.y = THREE.MathUtils.lerp(starGroup.rotation.y, targetRotY, 0.05);

        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        let scrollFraction = 0;
        
        if (maxScroll > 0) {
            scrollFraction = scrollY / maxScroll;
        }

        targetOpacity = Math.max(0.1, 1 - (scrollFraction * 1.2));
        
        material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.1);

        renderer.render(scene, camera);
    }
    animate();

    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function renderUI() {
    // Nav Links
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const navContainer = document.getElementById('nav-links');
    sections.forEach(sec => {
        const btn = document.createElement('button');
        btn.textContent = sec.charAt(0).toUpperCase() + sec.slice(1);
        btn.id = `nav-${sec}`;
        btn.className = "px-4 py-2 rounded-full text-sm font-medium transition-all text-slate-400 hover:text-white";
        btn.onclick = () => {
            document.getElementById(sec)?.scrollIntoView({ behavior: 'smooth' });
        };
        navContainer.appendChild(btn);
    });

    // Profile Text
    document.getElementById('profile-text').textContent = RESUME.profile;

    // Education
    const eduContainer = document.getElementById('education-list');
    RESUME.education.forEach(edu => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p class="text-cyan-400 font-medium">${edu.degree}</p>
            <p class="text-slate-400">${edu.institution}</p>
            <p class="text-xs text-slate-500 mt-1 uppercase tracking-wider">${edu.status}</p>
        `;
        eduContainer.appendChild(div);
    });

    // Experience
    const expContainer = document.getElementById('experience-list');
    RESUME.experience.forEach(exp => {
        const li = document.createElement('li');
        li.className = "flex items-start";
        li.innerHTML = `
            <svg class="h-6 w-6 text-cyan-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-slate-300">${exp}</span>
        `;
        expContainer.appendChild(li);
    });

    // Skills
    const skillsContainer = document.getElementById('skills-grid');
    RESUME.skills.forEach(group => {
        const div = document.createElement('div');
        div.className = "bg-slate-800/60 p-6 rounded-xl hover:bg-slate-800/60 transition-colors border border-slate-700/50 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10";
        const itemsHtml = group.items.map(item => `
            <span class="px-3 py-1 bg-slate-700/60 text-slate-300 text-sm rounded-md border border-slate-600/30">
                ${item}
            </span>
        `).join('');
        div.innerHTML = `
            <h3 class="text-lg font-semibold text-cyan-400 mb-4">${group.category}</h3>
            <div class="flex flex-wrap gap-2">${itemsHtml}</div>
        `;
        skillsContainer.appendChild(div);
    });

    // Projects
    const projectsContainer = document.getElementById('projects-grid');
    PROJECTS.forEach(repo => {
        const a = document.createElement('a');
        a.href = repo.html_url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.className = "group block h-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-cyan-500/50 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10";
        a.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">${repo.name}</h3>
                <span class="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300 group-hover:bg-slate-600">
                    ${repo.language || 'Code'}
                </span>
            </div>
            <p class="text-slate-400 text-sm mb-6 line-clamp-3">
                ${repo.description || "No description provided."}
            </p>
            <div class="flex items-center text-slate-500 text-sm mt-auto">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span>${repo.stargazers_count} Stars</span>
                <span class="mx-2">•</span>
                <span>Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
        `;
        projectsContainer.appendChild(a);
    });

    // Contact
    const contactContainer = document.getElementById('contact-info');
    const contactItems = [
        { 
            label: 'Email', 
            val: RESUME.contact.email, 
            href: `mailto:${RESUME.contact.email}`,
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />` 
        },
        { 
            label: 'Phone', 
            val: RESUME.contact.phone,
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />`
        },
        { 
            label: 'Location', 
            val: RESUME.contact.location,
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />`
        }
    ];

    contactItems.forEach(item => {
        const div = document.createElement('div');
        div.className = "bg-slate-800/50 p-6 rounded-xl flex flex-col items-center min-w-[200px] border border-slate-700/50 backdrop-blur-sm";
        const contentHtml = item.href 
            ? `<a href="${item.href}" class="text-cyan-400 text-sm hover:underline break-all">${item.val}</a>`
            : `<p class="text-slate-300 text-sm">${item.val}</p>`;
        
        div.innerHTML = `
            <div class="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center text-cyan-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    ${item.icon}
                </svg>
            </div>
            <h3 class="text-white font-medium mb-1">${item.label}</h3>
            ${contentHtml}
        `;
        contactContainer.appendChild(div);
    });

    document.getElementById('year').textContent = new Date().getFullYear();
}

function initScrollSpy() {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            const element = document.getElementById(sec);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top >= -100 && rect.top <= 300) {
                    current = sec;
                }
            }
        });

        if (current) {
            sections.forEach(sec => {
                const btn = document.getElementById(`nav-${sec}`);
                if (btn) {
                    if (sec === current) {
                        btn.className = "px-4 py-2 rounded-full text-sm font-medium transition-all bg-cyan-500/10 text-cyan-400 border border-cyan-500/20";
                    } else {
                        btn.className = "px-4 py-2 rounded-full text-sm font-medium transition-all text-slate-400 hover:text-white";
                    }
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    renderUI();
    initScrollSpy();
});

