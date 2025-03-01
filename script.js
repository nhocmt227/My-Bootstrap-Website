const hash = ["home", "about", "experiences", "projects", "contact"];
let isScrolling = false; // Prevents multiple rapid scrolls
let currentBreakpoint = "xl"; 


// load content of the page, called when hash page change
function loadContent() {
    console.log("loadContent called");
    let currentHash = window.location.hash.replace("#", "") || "home";

    if (currentBreakpoint === "" && currentBreakpoint === "sm" && currentBreakpoint === "md" && currentBreakpoint === "lg") {
        console.log(currentBreakpoint);
        // display all section
        document.querySelectorAll(".section").forEach(section => {
            section.classList.remove("d-none");
        });

    } else {
        // Remove active class from all nav items
        document.querySelectorAll("nav a").forEach(link => {
            link.classList.remove("active");
        });
        // Add active class to the current nav link
        let activeLink = document.querySelector("#nav-" + currentHash);
        if (activeLink) activeLink.classList.add("active");

        // Hide all sections and show the current section
        document.querySelectorAll(".section").forEach(section => {
            section.classList.add("d-none");
            section.classList.remove("d-block");
        }); 

        let activeSection = document.querySelector("#" + currentHash);
        if (activeSection) activeSection.classList.remove("d-none");
    
        // Adjust the progress bar height
        let progressBarRight = document.querySelector(".progress-inner-right");
        let progressBarLeft = document.querySelector(".progress-inner-left");
        let progressHeight = getHeightByHash(currentHash);
    
        if (progressBarRight && progressBarLeft) {
            progressBarRight.style.height = 100 - progressHeight + "%";
            progressBarLeft.style.height = progressHeight + "%";
        }
    }
}

function loadNextHashPage() {
    console.log("loadNextHashPage is called");
    if (isScrolling) return;
    isScrolling = true;

    let currentHash = window.location.hash.replace("#", "") || "home";
    let newHash = getNextHash(currentHash);

    if (newHash) window.location.hash = newHash;

    setTimeout(() => (isScrolling = false), 800); // Prevent rapid scrolls
}

function loadPrevHashPage() {
    console.log("loadPrevHashPage is called");
    if (isScrolling) return;
    isScrolling = true;

    let currentHash = window.location.hash.replace("#", "") || "home";
    let newHash = getPrevHash(currentHash);

    if (newHash) window.location.hash = newHash;

    setTimeout(() => (isScrolling = false), 800);
}

function getNextHash(currentHash) {
    let index = hash.indexOf(currentHash);
    return index >= 0 && index < hash.length - 1 ? hash[index + 1] : null;
}

function getPrevHash(currentHash) {
    let index = hash.indexOf(currentHash);
    return index > 0 ? hash[index - 1] : null;
}

function getHeightByHash(hash) {
    const heights = {
        home: 0,
        about: 28,
        experiences: 53,
        projects: 77,
        contact: 100
    };
    return heights[hash];
}

function init() {
    console.log("Initializing");
    currentBreakpoint = getCurrentBreakPoint();
    adjustScrollBar();  
    adjustView();
    console.log(document.body.style.overflow);
}

// Detect viewport changes and update layout accordingly
function detectChange(newBreakpoint) {
    if (newBreakpoint === currentBreakpoint) return false;
    currentBreakpoint = newBreakpoint;
    return true;
}

function adjustScrollBar(newBreakpoint) {
    if (newBreakpoint === "xl" || newBreakpoint === "xxl") {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "visible";
    }
}

// Set up the content based on the newBreakpoint, called when window size change
function adjustView() {
    console.log("adjust view called");
    let newBreakpoint = getCurrentBreakPoint();

    // if (!detectChange(newBreakpoint)) return;   
    adjustScrollBar();
    switch (newBreakpoint) {
        case "":
            document.querySelectorAll(".section").forEach(section => {
                section.classList.remove("d-none");
            });
        case "sm":
            document.querySelectorAll(".section").forEach(section => {
                section.classList.remove("d-none");
            });
        case "md":
            
            document.querySelectorAll(".section").forEach(section => {
                section.classList.remove("d-none");
            });
        case "lg":
            document.querySelectorAll(".section").forEach(section => {
                section.classList.remove("d-none");
            });
            break;
        case "xl":
            loadContent();
            break;
    }
    
}


// Get the current breakpoint (related to window size)
function getCurrentBreakPoint() {
    let width = window.innerWidth;
    if (width < 576) {
        return "";
    } else if (width < 768) {
        return "sm";
    } else if (width < 992) {
        return "md";
    } else if (width < 1200) {
        return "lg";
    } else if (width < 1400) {
        return "xl";
    } else {
        return "xxl";
    }
}