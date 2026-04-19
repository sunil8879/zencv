/* --- CONFIGURATION --- */

const SECRET_KEYS = ["MUMBAI999", "BRIGHT24", "ELITE01"]; // Add as many as you want here
const CONTACT_INFO = "sv@nexusai-group.in.com OR 8879267011";

// 1. INJECT THE POPUP UI
document.write(`
<div id="downloadModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:9999999; flex-direction:column; align-items:center; justify-content:center; font-family:sans-serif;">
    <div style="background:white; padding:40px; border-radius:20px; text-align:center; width:320px; border: 4px solid #7FFFD4; box-shadow: 0 10px 50px rgba(127,255,212,0.3);">
        <h2 style="color:black; margin-top:0;">Download Locked 🔒</h2>
        <p style="color:#555; font-size:14px;">Please enter the Access Password to download your file.</p>
        <hr style="border:0; border-top:1px solid #eee; margin:20px 0;">
        <input id="passInput" type="text" placeholder="Enter Password" style="width:100%; padding:15px; border:2px solid #ddd; border-radius:10px; font-size:16px; box-sizing:border-box; margin-bottom:15px; text-align:center; color: black !important; background: white !important;">
        <button onclick="verifyAndExecute()" style="width:100%; background:black; color:#7FFFD4; border:none; padding:15px; font-weight:900; border-radius:10px; cursor:pointer; font-size:16px;">UNLOCK NOW</button>
        <div style="margin-top:20px; font-size:12px; color:#333; line-height:1.5;">
            <b>Contact for Password:</b><br>
            ${CONTACT_INFO}
        </div>
        <button onclick="closeLock()" style="margin-top:15px; background:none; border:none; color:red; cursor:pointer; font-size:12px; text-decoration:underline;">Cancel</button>
    </div>
</div>
`);

// 2. THE NUCLEAR OVERRIDE: HIJACK THE PRINT COMMAND ITSELF
const originalPrint = window.print; // Save the real print function
window.print = function() {
    if (sessionStorage.getItem("cv_unlocked") === "TRUE") {
        originalPrint(); // Run real print if unlocked
    } else {
        document.getElementById("downloadModal").style.display = "flex"; // Show modal
    }
};

// 3. HIJACK OTHER DOWNLOADS (Word/Image)
document.addEventListener('click', function(e) {
    // Look for any click that mentions download, export, or save
    const target = e.target.closest('button, a');
    if (!target) return;
    
    const action = (target.getAttribute('onclick') || '').toLowerCase();
    const isDownload = action.includes('export') || action.includes('download') || action.includes('save');

    if (isDownload && sessionStorage.getItem("cv_unlocked") !== "TRUE") {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById("downloadModal").style.display = "flex";
    }
}, true);

// 4. VERIFY PASSWORD
function verifyAndExecute() {
    const input = document.getElementById("passInput").value.toUpperCase().trim();
    
    // This checks if the entered password is ANYWHERE in your list
    if (SECRET_KEYS.includes(input)) {
        sessionStorage.setItem("cv_unlocked", "TRUE");
        document.getElementById("downloadModal").style.display = "none";
        alert("System Unlocked! You can now download any template.");
        // If it was a print command, trigger it automatically now
        if (typeof originalPrint === "function") {
            // This is optional if you want it to trigger immediately
        }
    } else {
        alert("Invalid Password. Please contact " + CONTACT_INFO);
    }
}

function closeLock() {
    document.getElementById("downloadModal").style.display = "none";
}

// 5. SECURITY: DISABLE RIGHT-CLICK & INSPECT
document.addEventListener('contextmenu', e => e.preventDefault());
document.onkeydown = e => {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) || (e.ctrlKey && e.keyCode == 85)) return false;
};