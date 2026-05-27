/* TOKEN */

const token = localStorage.getItem("token");

/* REDIRECT */

if(!token){

    window.location.href = "./login.html";

}

/* LOGOUT */

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href = "./login.html";

});

/* NAVIGATION */

const navItems = document.querySelectorAll(
    ".nav-item"
);

const dashboardSections = document.querySelectorAll(
    ".dashboard-section"
);

navItems.forEach((item) => {

    item.addEventListener("click", () => {

        navItems.forEach((nav) => {
            nav.classList.remove("active");
        });

        dashboardSections.forEach((section) => {
            section.classList.remove("active-section");
        });

        item.classList.add("active");

        const sectionId = item.dataset.section;

        document.getElementById(sectionId)
        .classList.add("active-section");

    });

});

/* DASHBOARD COUNTS */

const fetchDashboardData = async () => {

    try{

        const projectsResponse = await fetch(
            `${BASE_URL}/api/projects`
        );

        const projects = await projectsResponse.json();

        document.getElementById(
            "projectCount"
        ).innerText = projects.length;

        const skillsResponse = await fetch(
            `${BASE_URL}/api/skills`
        );

        const skills = await skillsResponse.json();

        document.getElementById(
            "skillCount"
        ).innerText = skills.length;

        const experienceResponse = await fetch(
            `${BASE_URL}/api/experiences`
        );

        const experience = await experienceResponse.json();

        document.getElementById(
            "experienceCount"
        ).innerText = experience.length;

        const messagesResponse = await fetch(
            `${BASE_URL}/api/contact`,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const messages = await messagesResponse.json();

        document.getElementById(
            "messageCount"
        ).innerText = messages.length;

        renderDashboardMessages(messages);

    }
    catch(error){

        console.log(error);

    }

};

const renderDashboardMessages = (messages) => {
    const dashboardMessages = document.getElementById(
        "dashboardMessages"
    );

    const dashboardMessageCount = document.getElementById(
        "dashboardMessageCount"
    );

    if (!dashboardMessages || !dashboardMessageCount) {
        return;
    }

    dashboardMessages.innerHTML = "";
    dashboardMessageCount.innerText = messages.length;

    const recentMessages = messages.slice(0, 4);

    recentMessages.forEach((message) => {
        const card = document.createElement("div");
        card.classList.add("dashboard-message");

        const createdAt = message.created_at
            ? new Date(message.created_at).toLocaleDateString()
            : "";

        card.innerHTML = `

            <h4>${message.name}</h4>
            <p>${message.message}</p>
            <span>${createdAt}</span>

        `;

        dashboardMessages.appendChild(card);
    });
};

/* MODAL */

const projectModal = document.getElementById(
    "projectModal"
);

const openProjectModal = document.getElementById(
    "openProjectModal"
);

const closeProjectModal = document.getElementById(
    "closeProjectModal"
);

openProjectModal.addEventListener("click", () => {

    projectModal.classList.add("active");

});

closeProjectModal.addEventListener("click", () => {

    projectModal.classList.remove("active");

});

/* FETCH PROJECTS */

const fetchProjects = async () => {

    try{

        const response = await fetch(
            `${BASE_URL}/api/projects`
        );

        const projects = await response.json();

        const projectsContainer = document.getElementById(
            "projectsContainer"
        );

        projectsContainer.innerHTML = "";

        projects.forEach((project) => {

            const card = document.createElement("div");

            card.classList.add("project-card");

            card.innerHTML = `

                <img
                src="${project.image_url}"
                alt="project">

                <div class="project-content">

                    <h3>
                        ${project.title}
                    </h3>

                    <p>
                        ${project.description}
                    </p>

                    <div class="tech-stack">

                        ${(project.techstack || []).map(
                            (tech) => `
                                <span>${tech}</span>
                            `
                        ).join("")}

                    </div>

                    <div class="project-actions">

                        <button
                        class="edit-btn"
                        onclick="editProject(${project.id})">

                            Edit

                        </button>

                        <button
                        class="delete-btn"
                        onclick="deleteProject(${project.id})">

                            Delete

                        </button>

                    </div>

                </div>

            `;

            projectsContainer.appendChild(card);

        });

    }
    catch(error){

        console.log(error);

    }

};

/* ADD + UPDATE PROJECT */

const projectForm = document.getElementById("projectForm");

projectForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const projectId = document.getElementById(
        "projectId"
    ).value;

    const title = document.getElementById("title").value;

    const description = document.getElementById(
        "description"
    ).value;

    const tech = document.getElementById("tech")
    .value
    .split(",");

    const github = document.getElementById("github").value;

    const live = document.getElementById("live").value;

    const image = document.getElementById("image").value;

    const projectData = {

        title,
        description,

        techstack: tech,

        github_link: github,

        live_link: live,

        image_url: image

    };

    try{

        let response;

        /* UPDATE */

        if(projectId){

            response = await fetch(

                `${BASE_URL}/api/projects/${projectId}`,

                {
                    method: "PUT",

                    headers:{

                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`

                    },

                    body: JSON.stringify(projectData)
                }

            );

        }

        /* CREATE */

        else{

            response = await fetch(

                `${BASE_URL}/api/projects`,

                {
                    method: "POST",

                    headers:{

                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`

                    },

                    body: JSON.stringify(projectData)
                }

            );

        }

        if(response.ok){

            projectForm.reset();

            document.getElementById(
                "projectId"
            ).value = "";

            document.getElementById(
                "modalTitle"
            ).innerText = "Add Project";

            projectModal.classList.remove("active");

            fetchProjects();

            fetchDashboardData();

        }

    }
    catch(error){

        console.log(error);

    }

});

/* EDIT PROJECT */

const editProject = async (id) => {

    try{

        const response = await fetch(
            `${BASE_URL}/api/projects`
        );

        const projects = await response.json();

        const project = projects.find(
            item => item.id === id
        );

        document.getElementById(
            "modalTitle"
        ).innerText = "Update Project";

        document.getElementById(
            "projectId"
        ).value = project.id;

        document.getElementById(
            "title"
        ).value = project.title;

        document.getElementById(
            "description"
        ).value = project.description;

        document.getElementById(
            "tech"
        ).value = (project.techstack || []).join(",");

        document.getElementById(
            "github"
        ).value = project.github_link;

        document.getElementById(
            "live"
        ).value = project.live_link;

        document.getElementById(
            "image"
        ).value = project.image_url;

        projectModal.classList.add("active");

    }
    catch(error){

        console.log(error);

    }

};

/* DELETE PROJECT */

const deleteProject = async (id) => {

    try{

        await fetch(

            `${BASE_URL}/api/projects/${id}`,

            {
                method: "DELETE",

                headers:{
                    Authorization: `Bearer ${token}`
                }
            }

        );

        fetchProjects();

        fetchDashboardData();

    }
    catch(error){

        console.log(error);

    }

};

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

/* ======================================== */
/* SKILL MODAL */
/* ======================================== */

const skillModal = document.getElementById(
    "skillModal"
);

const openSkillModal = document.getElementById(
    "openSkillModal"
);

const closeSkillModal = document.getElementById(
    "closeSkillModal"
);

openSkillModal.addEventListener("click", () => {

    skillModal.classList.add("active");

});

closeSkillModal.addEventListener("click", () => {

    skillModal.classList.remove("active");

});

/* ======================================== */
/* FETCH SKILLS */
/* ======================================== */

const fetchSkills = async () => {

    try{

        const response = await fetch(

            `${BASE_URL}/api/skills`

        );

        const skills = await response.json();

        const skillsContainer = document.getElementById(

            "skillsContainer"

        );

        skillsContainer.innerHTML = "";

        skills.forEach((skill) => {

            const card = document.createElement("div");

            card.classList.add("skill-card");

            card.innerHTML = `

                <i class="${buildSkillIconClass(skill.icon)}"></i>

                <h3>

                    ${skill.name}

                </h3>

                <div class="skill-actions">

                    <button
                    class="edit-btn"
                    onclick="editSkill(${skill.id})">

                        Edit

                    </button>

                    <button
                    class="delete-btn"
                    onclick="deleteSkill(${skill.id})">

                        Delete

                    </button>

                </div>

            `;

            skillsContainer.appendChild(card);

        });

    }
    catch(error){

        console.log(error);

    }

};

/* ======================================== */
/* ADD + UPDATE SKILL */
/* ======================================== */

const skillForm = document.getElementById(
    "skillForm"
);

skillForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const skillId = document.getElementById(
        "skillId"
    ).value;

    const name = document.getElementById(
        "skillName"
    ).value;

    const icon = document.getElementById(
        "skillIcon"
    ).value;

    const skillData = {

        name,
        icon

    };

    try{

        let response;

        /* UPDATE */

        if(skillId){

            response = await fetch(

                `${BASE_URL}/api/skills/${skillId}`,

                {

                    method: "PUT",

                    headers: {

                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`

                    },

                    body: JSON.stringify(skillData)

                }

            );

        }

        /* CREATE */

        else{

            response = await fetch(

                `${BASE_URL}/api/skills`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`

                    },

                    body: JSON.stringify(skillData)

                }

            );

        }

        if(response.ok){

            skillForm.reset();

            document.getElementById(
                "skillId"
            ).value = "";

            document.getElementById(
                "skillModalTitle"
            ).innerText = "Add Skill";

            skillModal.classList.remove("active");

            fetchSkills();

            fetchDashboardData();

        }

    }
    catch(error){

        console.log(error);

    }

});

/* ======================================== */
/* EDIT SKILL */
/* ======================================== */

const editSkill = async (id) => {

    try{

        const response = await fetch(

            `${BASE_URL}/api/skills`

        );

        const skills = await response.json();

        const skill = skills.find(

            item => item.id === id

        );

        document.getElementById(
            "skillModalTitle"
        ).innerText = "Update Skill";

        document.getElementById(
            "skillId"
        ).value = skill.id;

        document.getElementById(
            "skillName"
        ).value = skill.name;

        document.getElementById(
            "skillIcon"
        ).value = skill.icon;

        skillModal.classList.add("active");

    }
    catch(error){

        console.log(error);

    }

};

/* ======================================== */
/* DELETE SKILL */
/* ======================================== */

const deleteSkill = async (id) => {

    try{

        await fetch(

            `${BASE_URL}/api/skills/${id}`,

            {

                method: "DELETE",

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        fetchSkills();

        fetchDashboardData();

    }
    catch(error){

        console.log(error);

    }

};

/* ======================================== */
/* EXPERIENCE MODAL */
/* ======================================== */

const experienceModal = document.getElementById(
    "experienceModal"
);

const openExperienceModal = document.getElementById(
    "openExperienceModal"
);

const closeExperienceModal = document.getElementById(
    "closeExperienceModal"
);

if (openExperienceModal) {
    openExperienceModal.addEventListener("click", () => {

        experienceModal.classList.add("active");

    });
}

if (closeExperienceModal) {
    closeExperienceModal.addEventListener("click", () => {

        experienceModal.classList.remove("active");

    });
}

/* ======================================== */
/* FETCH EXPERIENCES */
/* ======================================== */

const fetchExperiences = async () => {

    try{

        const response = await fetch(

            `${BASE_URL}/api/experiences`

        );

        const experiences = await response.json();

        const experienceContainer = document.getElementById(

            "experienceContainer"

        );

        experienceContainer.innerHTML = "";

        experiences.forEach((experience) => {

            const card = document.createElement("div");

            card.classList.add("experience-card");

            card.innerHTML = `

                <h3>
                    ${experience.title}
                </h3>

                <p>
                    ${experience.duration}
                </p>

                <p>
                    ${experience.description}
                </p>

                <div class="project-actions">

                    <button
                    class="edit-btn"
                    onclick="editExperience(${experience.id})">

                        Edit

                    </button>

                    <button
                    class="delete-btn"
                    onclick="deleteExperience(${experience.id})">

                        Delete

                    </button>

                </div>

            `;

            experienceContainer.appendChild(card);

        });

    }
    catch(error){

        console.log(error);

    }

};

/* ======================================== */
/* ADD + UPDATE EXPERIENCE */
/* ======================================== */

const experienceForm = document.getElementById(
    "experienceForm"
);

if (experienceForm) {
    experienceForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const experienceId = document.getElementById(
            "experienceId"
        ).value;

        const title = document.getElementById(
            "experienceTitle"
        ).value;

        const duration = document.getElementById(
            "experienceDuration"
        ).value;

        const description = document.getElementById(
            "experienceDescription"
        ).value;

        const experienceData = {

            title,
            duration,
            description

        };

        try{

            let response;

            /* UPDATE */

            if(experienceId){

                response = await fetch(

                    `${BASE_URL}/api/experiences/${experienceId}`,

                    {
                        method: "PUT",

                        headers:{

                            "Content-Type": "application/json",

                            Authorization: `Bearer ${token}`

                        },

                        body: JSON.stringify(experienceData)

                    }

                );

            }

            /* CREATE */

            else{

                response = await fetch(

                    `${BASE_URL}/api/experiences`,

                    {
                        method: "POST",

                        headers:{

                            "Content-Type": "application/json",

                            Authorization: `Bearer ${token}`

                        },

                        body: JSON.stringify(experienceData)

                    }

                );

            }

            if(response.ok){

                experienceForm.reset();

                document.getElementById(
                    "experienceId"
                ).value = "";

                document.getElementById(
                    "experienceModalTitle"
                ).innerText = "Add Experience";

                experienceModal.classList.remove("active");

                fetchExperiences();

                fetchDashboardData();

            }

        }
        catch(error){

            console.log(error);

        }

    });
}

/* ======================================== */
/* EDIT EXPERIENCE */
/* ======================================== */

const editExperience = async (id) => {

    try{

        const response = await fetch(

            `${BASE_URL}/api/experiences`

        );

        const experiences = await response.json();

        const experience = experiences.find(

            item => item.id === id

        );

        document.getElementById(
            "experienceModalTitle"
        ).innerText = "Update Experience";

        document.getElementById(
            "experienceId"
        ).value = experience.id;

        document.getElementById(
            "experienceTitle"
        ).value = experience.title;

        document.getElementById(
            "experienceDuration"
        ).value = experience.duration;

        document.getElementById(
            "experienceDescription"
        ).value = experience.description;

        experienceModal.classList.add("active");

    }
    catch(error){

        console.log(error);

    }

};

/* ======================================== */
/* DELETE EXPERIENCE */
/* ======================================== */

const deleteExperience = async (id) => {

    try{

        await fetch(

            `${BASE_URL}/api/experiences/${id}`,

            {
                method: "DELETE",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        fetchExperiences();

        fetchDashboardData();

    }
    catch(error){

        console.log(error);

    }

};

/* ======================================== */
/* RESUME */
/* ======================================== */

const resumeForm = document.getElementById("resumeForm");
const resumeUrlInput = document.getElementById("resumeUrl");
const resumePreview = document.getElementById("resumePreview");

const loadResume = async () => {

    if (!resumeForm) {
        return;
    }

    try{

        const response = await fetch(

            `${BASE_URL}/api/resume`

        );

        if (!response.ok) {
            return;
        }

        const resume = await response.json();

        if (resumeUrlInput) {
            resumeUrlInput.value = resume.resume_url || "";
        }

        if (resumePreview && resume.resume_url) {
            resumePreview.href = resume.resume_url;
        }

    }
    catch(error){

        console.log(error);

    }

};

if (resumeForm) {
    resumeForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const resume_url = resumeUrlInput.value;

        try{

            const response = await fetch(

                `${BASE_URL}/api/resume`,

                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ resume_url })
                }

            );

            if(response.ok){

                const data = await response.json();

                if (resumePreview && data.resume?.resume_url) {
                    resumePreview.href = data.resume.resume_url;
                }

            }

        }
        catch(error){

            console.log(error);

        }

    });
}

/* ======================================== */
/* MESSAGES */
/* ======================================== */

const fetchMessages = async () => {

    try{

        const response = await fetch(

            `${BASE_URL}/api/contact`,

            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const messages = await response.json();

        const messagesContainer = document.getElementById(

            "messagesContainer"

        );

        messagesContainer.innerHTML = "";

        messages.forEach((message) => {

            const card = document.createElement("div");

            card.classList.add("message-card");

            const createdAt = message.created_at
                ? new Date(message.created_at).toLocaleString()
                : "";

            card.innerHTML = `

                <h4>
                    ${message.name}
                </h4>

                <p class="message-meta">
                    ${message.email}
                </p>

                <p>
                    ${message.message}
                </p>

                <p class="message-meta">
                    ${createdAt}
                </p>

                <div class="project-actions">

                    <button
                    class="delete-btn"
                    onclick="deleteMessage(${message.id})">

                        Delete

                    </button>

                </div>

            `;

            messagesContainer.appendChild(card);

        });

    }
    catch(error){

        console.log(error);

    }

};

const deleteMessage = async (id) => {

    try{

        await fetch(

            `${BASE_URL}/api/contact/${id}`,

            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        fetchMessages();

        fetchDashboardData();

    }
    catch(error){

        console.log(error);

    }

};

fetchDashboardData();
fetchProjects();
fetchSkills();
fetchExperiences();
loadResume();
fetchMessages();
