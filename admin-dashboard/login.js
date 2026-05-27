/* global BASE_URL */

const loginForm = document.getElementById("loginForm");

const message = document.getElementById("message");

/* LOGIN FORM */

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    /* GET INPUT VALUES */

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{

        /* API REQUEST */
        const apiBaseUrl = typeof BASE_URL === "string"
            ? BASE_URL
            : "http://localhost:5000";

        const response = await fetch(
            `${apiBaseUrl}/api/auth/login`,
            {

                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password

                })
            }
        );

        const data = await response.json();

        /* SUCCESS */

        if(response.ok){
            /* STORE TOKEN */
            localStorage.setItem(
                "token",
                data.token
            );

            message.innerText = "Login Successful 🚀";

            /* REDIRECT */
            setTimeout(() => {
                window.location.href = "./dashboard.html";
            },1000);
        }
        else{
            message.innerText = data.error;
        }
    }
    catch(error){
        console.log(error);
        message.innerText = "Something went wrong";
    }
});