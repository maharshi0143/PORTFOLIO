const API_BASE_URL = typeof BASE_URL === "string"
    ? BASE_URL
    : "http://localhost:5000";

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

const buildSkillIconClass = (icon) => {
    const value = (icon || "").trim();
    if (!value) {
        return "devicon-code-plain colored";
    }
    if (value.includes("devicon-") || value.includes("fa-")) {
        return value;
    }
    return `devicon-${value}-plain colored`;
};

const normalizeTechStack = (techstack) => {
    if (Array.isArray(techstack)) {
        return techstack;
    }
    if (typeof techstack === "string") {
        return techstack
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean);
    }
    return [];
};

const createSkillCard = (skill) => {
    const card = document.createElement("div");
    card.classList.add("skill-card");
    card.innerHTML = `
        <i class="${buildSkillIconClass(skill.icon)}"></i>
        <h3>${skill.name || "Skill"}</h3>
    `;
    return card;
};

const createProjectCard = (project) => {
    const card = document.createElement("div");
    card.classList.add("project-card");

    const techStack = normalizeTechStack(project.techstack);
    const techMarkup = techStack
        .map((tech) => `<span>${tech}</span>`)
        .join("");

    const buttons = [];

    if (project.github_link) {
        buttons.push(
            `<a href="${project.github_link}" target="_blank" rel="noopener">GitHub Repo</a>`
        );
    }

    if (project.live_link) {
        buttons.push(
            `<a href="${project.live_link}" target="_blank" rel="noopener">Live Demo</a>`
        );
    }

    card.innerHTML = `
        <img src="${project.image_url || ""}" alt="${project.title || "Project"}">
        <div class="project-content">
            <h3>${project.title || "Project"}</h3>
            <p>${project.description || ""}</p>
            <div class="project-tech">
                ${techMarkup}
            </div>
            <div class="project-buttons">
                ${buttons.join("")}
            </div>
        </div>
    `;

    return card;
};

const createExperienceItem = (experience) => {
    const item = document.createElement("div");
    item.classList.add("timeline-item");
    item.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-content">
            <h3>${experience.title || "Experience"}</h3>
            <p>${experience.duration || ""}</p>
            <p>${experience.description || ""}</p>
        </div>
    `;
    return item;
};

const fetchSkills = async () => {
    const container = document.querySelector(".skills-container");
    if (!container) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/skills`);
        if (!response.ok) {
            return;
        }
        const skills = await response.json();
        skills.forEach((skill) => {
            container.appendChild(createSkillCard(skill));
        });
    } catch (error) {
        console.log(error);
    }
};

const fetchProjects = async () => {
    const container = document.querySelector(".projects-container");
    if (!container) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/projects`);
        if (!response.ok) {
            return;
        }
        const projects = await response.json();
        projects.forEach((project) => {
            container.appendChild(createProjectCard(project));
        });
    } catch (error) {
        console.log(error);
    }
};

const fetchExperiences = async () => {
    let timeline = document.getElementById("experienceTimeline");
    if (!timeline) {
        const experienceSection = document.querySelector(".experience");
        if (!experienceSection) {
            return;
        }
        timeline = document.createElement("div");
        timeline.classList.add("timeline");
        experienceSection.appendChild(timeline);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/experiences`);
        if (!response.ok) {
            return;
        }
        const experiences = await response.json();
        experiences.forEach((experience) => {
            timeline.appendChild(createExperienceItem(experience));
        });
    } catch (error) {
        console.log(error);
    }
};

const wireContactForm = () => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("contactStatus");

    const isValidEmail = (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    if (!form) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = form.querySelector("[name='name']")?.value.trim();
        const email = form.querySelector("[name='email']")?.value.trim();
        const message = form.querySelector("[name='message']")?.value.trim();

        if (!name || !email || !message) {
            if (status) {
                status.textContent = "Please fill out all fields.";
            }
            return;
        }

        if (!isValidEmail(email)) {
            if (status) {
                status.textContent = "Please enter a valid email address.";
            }
            return;
        }

        if (status) {
            status.textContent = "Sending...";
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    message
                })
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                if (status) {
                    status.textContent = data.error || "Failed to send message.";
                }
                return;
            }

            form.reset();
            if (status) {
                status.textContent = "Message sent successfully.";
            }
        } catch (error) {
            console.log(error);
            if (status) {
                status.textContent = "Failed to send message.";
            }
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    fetchSkills();
    fetchProjects();
    fetchExperiences();
    wireContactForm();
});