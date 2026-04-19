const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxMlm5NB0IzPqEBi0NoI7digq59CKQ5yodtzK44bTYJjKmy1ZZCTz7IDeUW4vcFkSSq/exec";

// 1. UI CONTROL FUNCTION
function checkAuthUI() {
    const isUnlocked = localStorage.getItem("zencv_unlocked") === "true";
    const lockScreen = document.getElementById("lockScreen");
    const logoutBtn = document.getElementById("logoutBtn");

    if (isUnlocked) {
        if (lockScreen) lockScreen.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "block";
    } else {
        if (lockScreen) lockScreen.style.display = "flex";
        if (logoutBtn) logoutBtn.style.display = "none";
        
        // Redirect if trying to access a sub-page without being logged in
        if (!window.location.pathname.includes("index.html") && window.location.pathname !== "/") {
            window.location.href = "index.html";
        }
    }
}

// 2. LOGIN FUNCTION
async function login() {
    const e = document.getElementById('uEmail').value;
    const p = document.getElementById('uPass').value;
    const b = document.getElementById('uBtn');

    if(!e || !p) return alert("Please enter both Email and Password.");

    b.innerText = "Verifying...";
    b.disabled = true;

    try {
        const resp = await fetch(`${SCRIPT_URL}?email=${encodeURIComponent(e)}&pass=${encodeURIComponent(p)}`);
        const result = await resp.text();

        if (result.includes("SUCCESS")) {
            localStorage.setItem("zencv_unlocked", "true");
            checkAuthUI(); // Immediately update UI
        } else {
            alert("Invalid Credentials. Please check your email/password or contact support.");
            b.innerText = "Unlock Now";
            b.disabled = false;
        }
    } catch (err) {
        alert("Connection Error. Please check your internet.");
        b.innerText = "Unlock Now";
        b.disabled = false;
    }
}

// 3. LOGOUT FUNCTION
function logout() {
    localStorage.removeItem("zencv_unlocked");
    // This handles both hiding the button and showing the lock screen
    checkAuthUI();
    // Redirect to home page
    window.location.href = "index.html";
}

// 4. RUN ON LOAD
window.addEventListener('DOMContentLoaded', checkAuthUI);