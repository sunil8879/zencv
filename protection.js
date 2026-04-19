/* --- CONFIGURATION --- */
const SECRET_PASS = "MUMBAI99"; // Change this to your desired password
const CONTACT_INFO = "xyz@rediffmail.com OR 9999988888";

// 1. INJECT THE POPUP UI (So you don't have to edit every HTML file)
document.write(`
<div id="downloadModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:9999999; flex-direction:column; align-items:center; justify-content:center; font-family:sans-serif;">
    <div style="background:white; padding:40px; border-radius:20px; text-align:center; width:320px; border: 4px solid #7FFFD4;">
        <h2 style="color:black; margin-top:0;">Download Locked 🔒</h2>
        <p style="color:#555; font-size:14px;">To download this professional CV without watermarks, please enter the Access Password.</p>
        <hr style="border:0; border-top:1px solid #eee; margin:20px 0;">
        <input id="passInput" type="text" placeholder="Enter Password" style="width:100%; padding:15px; border:2px solid #ddd; border-radius:10px; font-size:16px; box-sizing:border-box; margin-bottom:15px; text-align:center;">
        <button onclick="verifyDownload()" style="width:100%; background:black; color:#7FFFD4; border:none; padding:15px; font-weight:900; border-radius:10px; cursor:pointer; font-size:16px;">UNLOCK PDF</button>
        <div style="margin-top:20px; font-size:12px; color:#333; line-height:1.5;">
            <b>Contact for Password:</b><br>
            ${CONTACT_INFO}
        </div>
        <button onclick="closeLock()" style="margin-top:15px; background:none; border:none; color:red; cursor:pointer; font-size:12px; text-decoration:underline;">Close</button>
    </div>
</div>
`);

// 2. SECURITY: DISABLE RIGHT-CLICK & INSPECT SHORTCUTS
document.addEventListener('contextmenu', event => event.preventDefault()); // No right-click
document.onkeydown = function(e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) || (e.ctrlKey && e.keyCode == 85)) {
        alert("Code protection enabled. Contact admin for access.");
        return false;
    }
};

// 3. OVERRIDE THE PRINT FUNCTION
// Call this function from your download buttons: onclick="attemptDownload()"
function attemptDownload() {
    // If they already unlocked it this session, just print
    if (sessionStorage.getItem("cv_unlocked") === "TRUE") {
        window.print();
    } else {
        document.getElementById("downloadModal").style.display = "flex";
    }
}

function verifyDownload() {
    const input = document.getElementById("passInput").value;
    if (input === SECRET_PASS) {
        sessionStorage.setItem("cv_unlocked", "TRUE");
        document.getElementById("downloadModal").style.display = "none";
        window.print();
    } else {
        alert("Invalid Password. Please contact " + CONTACT_INFO);
    }
}

function closeLock() {
    document.getElementById("downloadModal").style.display = "none";
}