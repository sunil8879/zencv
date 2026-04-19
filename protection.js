/* --- CONFIGURATION --- */
const SECRET_PASS = "MUMBAI99"; 
const CONTACT_INFO = "xyz@rediffmail.com OR 9999988888";

// Variable to store the original button action
let hijackedAction = null;

// 1. INJECT THE POPUP UI (Same as before)
document.write(`
<div id="downloadModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:9999999; flex-direction:column; align-items:center; justify-content:center; font-family:sans-serif;">
    <div style="background:white; padding:40px; border-radius:20px; text-align:center; width:320px; border: 4px solid #7FFFD4; box-shadow: 0 10px 50px rgba(127,255,212,0.3);">
        <h2 style="color:black; margin-top:0;">Download Locked 🔒</h2>
        <p style="color:#555; font-size:14px;">Please enter the Access Password to download your file.</p>
        <hr style="border:0; border-top:1px solid #eee; margin:20px 0;">
        <input id="passInput" type="text" placeholder="Enter Password" style="width:100%; padding:15px; border:2px solid #ddd; border-radius:10px; font-size:16px; box-sizing:border-box; margin-bottom:15px; text-align:center; color: black !important;">
        <button onclick="verifyDownload()" style="width:100%; background:black; color:#7FFFD4; border:none; padding:15px; font-weight:900; border-radius:10px; cursor:pointer; font-size:16px;">UNLOCK & DOWNLOAD</button>
        <div style="margin-top:20px; font-size:12px; color:#333; line-height:1.5;">
            <b>Contact for Password:</b><br>
            ${CONTACT_INFO}
        </div>
        <button onclick="closeLock()" style="margin-top:15px; background:none; border:none; color:red; cursor:pointer; font-size:12px; text-decoration:underline;">Cancel</button>
    </div>
</div>
`);

// 2. SECURITY: DISABLE RIGHT-CLICK & INSPECT
document.addEventListener('contextmenu', e => e.preventDefault());
document.onkeydown = e => {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) || (e.ctrlKey && e.keyCode == 85)) return false;
};

// 3. THE HIJACKER LOGIC (This is the magic part)
window.onload = function() {
    // We look for every button on your page
    const allButtons = document.querySelectorAll('button, a, input[type="button"]');
    
    allButtons.forEach(btn => {
        const onClickAttr = btn.getAttribute('onclick');
        
        // If the button has an action like 'print', 'export', 'download', or 'save'
        if (onClickAttr && (
            onClickAttr.includes('print') || 
            onClickAttr.includes('Export') || 
            onClickAttr.includes('download') || 
            onClickAttr.includes('save') ||
            onClickAttr.includes('html2')
        )) {
            // Step A: Steal the function and save it
            btn.dataset.originalClick = onClickAttr;
            
            // Step B: Remove the original action so it doesn't run
            btn.removeAttribute('onclick');
            
            // Step C: Add our password prompt instead
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (sessionStorage.getItem("cv_unlocked") === "TRUE") {
                    eval(this.dataset.originalClick); // Run original if already unlocked
                } else {
                    hijackedAction = this.dataset.originalClick; // Save this specific button's action
                    document.getElementById("downloadModal").style.display = "flex";
                }
            });
        }
    });
};

// 4. VERIFICATION
function verifyDownload() {
    const input = document.getElementById("passInput").value;
    if (input === SECRET_PASS) {
        sessionStorage.setItem("cv_unlocked", "TRUE");
        document.getElementById("downloadModal").style.display = "none";
        // Run the original function we "stole" earlier
        if (hijackedAction) {
            eval(hijackedAction);
        }
    } else {
        alert("Invalid Password. Please contact " + CONTACT_INFO);
    }
}

function closeLock() {
    document.getElementById("downloadModal").style.display = "none";
}