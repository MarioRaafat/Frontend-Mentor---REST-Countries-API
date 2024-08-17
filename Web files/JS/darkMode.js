// handel dark mode
let btnDark = document.querySelector('.dark');
let flagdark = true;
btnDark.addEventListener('click', () => {
    if (flagdark) {
        document.documentElement.style.setProperty('--main-color', '#1f2d36');
        document.documentElement.style.setProperty('--head-color', '#2b3743');
        document.documentElement.style.setProperty('--text-color', '#fff');
        btnDark.classList.remove('fa-moon');
        btnDark.classList.add('fa-sun');
        flagdark = false;
    } else {
        document.documentElement.style.setProperty('--main-color', '#e7e7e7');
        document.documentElement.style.setProperty('--head-color', '#ffffff');
        document.documentElement.style.setProperty('--text-color', '#000');
        btnDark.classList.remove('fa-sun');
        btnDark.classList.add('fa-moon');
        flagdark = true;
    }
})