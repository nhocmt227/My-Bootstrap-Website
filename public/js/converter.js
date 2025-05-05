window.addEventListener("load", init);
window.addEventListener("load", loadContent);
window.addEventListener("load", adjustView);
// Ensure content loads properly on page load
document.addEventListener("DOMContentLoaded", loadContent);

// Listen for hash changes
window.addEventListener("hashchange", loadContent);

// Handle scroll-based navigation
window.addEventListener("wheel", function(event) {
    let width = window.innerWidth;
    console.log("wheel: " + width);
    if (width < 1200) return;
    if (event.deltaY > 50) { // Adjust sensitivity
        loadNextHashPage(); // Scroll down
    } else if (event.deltaY < -50) {
        loadPrevHashPage(); // Scroll up
    }
});

window.addEventListener("resize", adjustView);