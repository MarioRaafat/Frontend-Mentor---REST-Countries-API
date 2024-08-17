async function country_page(element, data, card) {
    let cssContent;
    await fetch("../CSS/countryPage.css")
        .then(data => data.text())
        .then(async data => {
            cssContent = data;
        });

    // let jsContent;
    // await fetch("./countryPage.js")
    //     .then(data => data.text())
    //     .then(async data => {
    //         jsContent = data;
    //     });

    const name = element.name.replace(/\s*\(.*?\)\s*/g, '');
    const name_without_spacing = name.replace(/\s/g, '-').replace(/\s*\(.*?\)\s*/g, '').replace(/\,/g, '').replace(/\'/g, '');
    // console.log(name_without_spacing);
    const nativeName = element.nativeName;
    const population = element.population;
    const region = element.region;
    const subregion = element.subregion;
    const capital = element.capital;
    const topLevelDomain = element.topLevelDomain.join(", ");
    const currencies = element.currencies.map(currency => currency.name).join(", ");
    const languages = element.languages.map(language => language.name).join(", ");
    const borders = element.borders;
    const flag_path = element.flags.png;

    let borders_list;
    if (borders !== undefined) {
        borders.map(ele => data.find(e => e.alpha3Code === ele).name);
        borders_list = document.createElement('div');
        borders_list.classList.add('borders');
        for (border of borders) {
            const item = document.createElement('span');
            item.innerText = border;
            borders_list.appendChild(item);
        }
    } else {
        borders_list = document.createElement('div');
        borders_list.classList.add('borders');
        borders_list.innerText = "";
    }

    card.addEventListener('click', () => {
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">

                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&display=swap">
                <title>${name}</title>
                <style>
                    ${cssContent}
                </style>
            </head>
            <body >
                
                <main>
                    <div class="main-container">
                    
                    </div>

                    <div class="card">
                            <img src="${flag_path}" alt="${name}">
                            <div class="card-text">
                                <div class="column_1">
                                    <h1>${name}</h1>
                                        <div class="column-text">
                                        <p>Native Name: ${nativeName}</p>
                                        <p>Population: ${population}</p>
                                        <p>Region: ${region}</p>
                                        <p>Sub Region: ${subregion}</p>
                                        <p>Capital: ${capital}</p>
                                    </div>
                                </div>
                                <div class="column_2">
                                    <h2>  </h2>
                                    <div class="column-text">
                                        <p>Top Level Domain: ${topLevelDomain}</p>
                                        <p>Currencies: ${currencies}</p>
                                        <p>Languages: ${languages}</p>
                                    </div>
                                </div>
                                <div class="card-text-footer">
                                    <div>Border Countries: </div>
                                    ${borders_list.outerHTML}
                                </div>
                            </div>
                    </div>
                </main>
                <script>
                    ${jsContent}
                </script>
            </body>
            </html>
        `;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        const a = document.querySelector(`#${name_without_spacing}-card a`);
        a.href = url;
        a.target = '_blank';
        a.click();
    });
}
const cards_section = document.getElementById('cards-section');

if (cards_section === null) {
    console.error("cards_section is null");
}
// search functionality
let selectedRegion = document.querySelector('.filter-select');
selectedRegion.value = 'All';
let searchinput = document.querySelector('.search input');
let searchbtn = document.querySelector('.search-btn');
let deleteSearch = document.querySelector('.delete-search');
async function search(data, countryTosearch) {
    for (let i = 0; i < data.length; i++) {
        if (countryTosearch.length > data[i].name.length) {
            let coun = data[i].name.replace(/[^a-zA-Z]/g, '').toLowerCase();
            let hidecard = document.querySelector(`#${coun}`);
            if (hidecard) {
                hidecard.style.display = 'none';
            }
        } else {
            let coun = data[i].name.replace(/[^a-zA-Z]/g, '').toLowerCase();
            if (coun.includes(countryTosearch.toLowerCase()) && (data[i].region === selectedRegion.value || selectedRegion.value === 'All')) {
                let hidecard = document.querySelector(`#${coun}`);
                if (hidecard) {
                    hidecard.style.display = 'block';
                }
            } else {
                let hidecard = document.querySelector(`#${coun}`);
                if (hidecard) {
                    hidecard.style.display = 'none';
                }
            }
        }
    }
}
// filter functionality
async function filter(data, region) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].region === region) {
            let coun = data[i].name.replace(/[^a-zA-Z]/g, '').toLowerCase();
            let hidecard = document.querySelector(`#${coun}`);
            if (hidecard) {
                hidecard.style.display = 'block';
            }
        } else {
            let coun = data[i].name.replace(/[^a-zA-Z]/g, '').toLowerCase();
            let hidecard = document.querySelector(`#${coun}`);
            if (hidecard) {
                hidecard.style.display = 'none';
            }
        }
    }
}
fetch("../../data.json")
    .then(data => data.json())
    .then(data => {
        data.forEach(async (element, idx, arr) => {
            const name = element.name.replace(/\s*\(.*?\)\s*/g, '');
            const name_without_spacing = name.replace(/\s/g, '-').replace(/\s*\(.*?\)\s*/g, '').replace(/\,/g, '').replace(/\'/g, '');
            const region = element.region;
            const population = element.population;
            const capital = element.capital;
            const flag_path = element.flags.png;

            const card = document.createElement('li');
            card.classList.add('country-card');
            // card.setAttribute('id', `${name_without_spacing}-card`);
            card.setAttribute('name', name_without_spacing);
            card.setAttribute('id', element.name.replace(/[^a-zA-Z]/g, '').toLowerCase());
            card.innerHTML = `
                <a></a>
                <img src=${flag_path}>
                <div class="card-text">
                    <h2>${name}</h2>
                    <p>Capital: ${capital}</p>
                    <p>Region: ${region}</p>
                    <p>Population: ${population}</p>
            `;
            await country_page(element, arr, card);
            cards_section.appendChild(card);
        });
        // calling search
        searchbtn.onclick = async () => {
            if (searchinput) {
                await search(data, searchinput.value);
            }
        }
        // or 
        searchinput.addEventListener('input', async (e) => {
            if (e.target.value !== '') {
                await search(data, searchinput.value);
            } else {
                if (selectedRegion.value === 'All') {
                    returndata();
                } else {
                    filter(data, selectedRegion.value);
                }
            }
        });
        deleteSearch.addEventListener('click', async () => {
            if (searchinput.value) {
                if(selectedRegion.value === 'All') {
                    returndata();
                }
                else {
                    filter(data, selectedRegion.value);
                }
                searchinput.value = '';
            }
        })
        // calling filter 
        selectedRegion.addEventListener('change', async (e) => {
            if (e.target.value === 'All') {
                returndata();
            } else {
                filter(data, e.target.value);
            }
            searchinput.value = '';
        })
    });

async function returndata() {
    let allcountries = document.querySelectorAll('.country-card');
    allcountries.forEach((country) => {
        country.style.display = 'block';
    })
}
