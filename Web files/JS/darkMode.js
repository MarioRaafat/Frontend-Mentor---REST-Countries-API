let btnDark = document.querySelector('#darkModeToggle');
let isDarkMode = document.body.classList.contains('dark-mode');

// to handle the case that dark mode is enabled in the browser and click on a counter card
if (isDarkMode) {
    btnDark.click();
    document.documentElement.style.setProperty('--main-color', '#1f2d36');
    document.documentElement.style.setProperty('--head-color', '#2b3743');
    document.documentElement.style.setProperty('--text-color', '#fff');
    document.documentElement.style.setProperty('--cards-background', '#2b3743');
}

btnDark.addEventListener('click', () => {
    isDarkMode = document.body.classList.contains('dark-mode');
    if (!isDarkMode) {
        document.documentElement.style.setProperty('--main-color', '#1f2d36');
        document.documentElement.style.setProperty('--head-color', '#2b3743');
        document.documentElement.style.setProperty('--text-color', '#fff');
        document.documentElement.style.setProperty('--cards-background', '#2b3743');
    } else {
        document.documentElement.style.setProperty('--main-color', '#efefef');
        document.documentElement.style.setProperty('--head-color', '#ffffff');
        document.documentElement.style.setProperty('--text-color', '#000000');
        document.documentElement.style.setProperty('--cards-background', '#ffffff');
    }
    document.body.classList.toggle('dark-mode', !isDarkMode);
})


