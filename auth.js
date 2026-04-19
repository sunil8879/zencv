const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzTxS4GcRI_YyaCdu4qwDtuf5ydOyMIp5ump01oywyD6C5U7527ewPXr6khBJRsXsLk/exec";

// 1. AUTO-PROTECT PAGE
(function() {
    const isLoginPage = window.location.pathname.includes("index.html") || window.location.pathname === "/";
    const authStatus = localStorage.getItem("zencv_unlocked");

    if (!authStatus && !isLoginPage) {
        // If not logged in and trying to access a CV page, kick them back to home
        window.location.href = "index.html";
    }
})();

// 2. LOGIN FUNCTION
async function login() {
    const e = document.getElementById('uEmail').value;
    const p = document.getElementById('uPass').value;
    const b = document.getElementById('uBtn');

    if(!e || !p) return alert("Enter details");

    b.innerText = "Verifying...";
    
    try {
        const resp = await fetch(`${SCRIPT_URL}?email=${e}&pass=${p}`);
        const result = await resp.text();

        if (result === "SUCCESS") {
            localStorage.setItem("zencv_unlocked", "true");
            location.reload(); // Unlocks the page
        } else {
            alert("Invalid Login. Contact +91 XXXXX XXXXX");
            b.innerText = "Unlock Now";
        }
    } catch (err) {
        alert("Error connecting. Check internet.");
        b.innerText = "Unlock Now";
    }
}

// 3. LOGOUT (Optional)
function logout() {
    localStorage.removeItem("zencv_unlocked");
    window.location.href = "index.html";
}