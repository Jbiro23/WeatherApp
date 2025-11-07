export function applyTheme(isNight) {
    if (isNight) {
        document.body.style.backgroundColor = "#181830";
        document.body.style.color = "#ffffff";
        document.body.style.fontSize = "large";
        document.body.style.fontWeight = 600;
        document.body.classList.add("night");
        document.body.classList.remove("day");
    } else {
        document.body.style.backgroundColor = "#4da1f1";
        document.body.style.color = "#2c2c2c";
        document.body.style.fontSize = "large";
        document.body.style.fontWeight = 600;
        document.body.classList.add("day");
        document.body.classList.remove("night");
    }
}

