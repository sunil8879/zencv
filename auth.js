/**
 * ZEN CV - GLOBAL AUTHENTICATION GATEKEEPER
 * This file protects sub-pages from unauthorized access.
 */

(function () {
    // 1. Check for the specific 'YES' value set by index.html
    const isUnlocked = localStorage.getItem("zencv_unlocked") === "YES";

    // 2. Gatekeeper Logic
    if (!isUnlocked) {
        // Stop the browser from rendering the CV immediately (Prevents Flicker)
        document.documentElement.style.display = 'none';
        
        // Force redirect to the login page
        window.location.replace("index.html");
    }
})();

/**
 * Global Logout Function
 * Can be called from any page if you add a logout button.
 */
function logout() {
    localStorage.removeItem("zencv_unlocked");
    alert("Logging out...");
    window.location.replace("index.html");
}