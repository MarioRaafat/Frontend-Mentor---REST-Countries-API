/********************                  Important comments                 ************************/
/*
    1. The console has 2 errors IDK why
    2. Read console logs what is fucking that a7a
    3. We need to increse accessability to that website the score was 64 lol
    4. I make some changes so go to github and see what has changed
*/



let selectedRegion = document.querySelector('.filter-select');
selectedRegion.value = 'All';
let searchinput = document.querySelector('.search input');
let searchbtn = document.querySelector('.search-btn');  // where???!!!
let deleteSearch = document.querySelector('.delete-search');
const cards_section = document.getElementById('cards-section');

if (cards_section === null) {
    console.error("cards_section is null");
}
if (searchbtn === undefined) {
    console.error("searchbtn is undefined");
}



async function country_page(element, data, card) {
    let cssContent;
    await fetch("../CSS/countryPage.css")
        .then(data => data.text())
        .then(async data => {
            cssContent = data;
        });

    await fetch("../CSS/header.css")
        .then(data => data.text())
        .then(async data => {
            cssContent += data;
        });

    await fetch("../CSS/darkMode.css")
        .then(data => data.text())
        .then(async data => {
            cssContent += data;
        });

    await fetch("../CSS/all.min.css")
        .then(data => data.text())
        .then(async data => {
            cssContent += data;
        });

    let jsContent;
    await fetch("../JS/darkMode.js")
        .then(data => data.text())
        .then(async data => {
            jsContent = data;
        });

    const name = element.name.replace(/\s*\(.*?\)\s*/g, '');
    const name_id = element.name.replace(/[^a-zA-Z]/g, '').toLowerCase();
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
                <link rel="icon" href="${flag_path}" type="image/x-icon">
                <title>${name}</title>
                <style>
                    ${cssContent}
                </style>
            </head>
            <body >
                <header id="main-header">
                    <div class="header">
                        <h2>Where in the world?</h2>
                        <div class="darkmode">
                            <i class="fa-solid fa-moon dark"></i>
                            <span>Dark Mode</span>
                        </div>
                    </div>
                </header>
                
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

        const a = document.querySelector(`#${name_id} a`);
        a.href = url;
        a.target = '_blank';
        a.click();
    });
}


// search functionality

async function search(data, countryTosearch) {  // why aysnc??
    for (let i = 0; i < data.length; i++) {
        const name_id = data[i].name.replace(/[^a-zA-Z]/g, '').toLowerCase();
        const card = document.querySelector(`#${name_id}`);

        if (countryTosearch.length > data[i].name.length) {          
            if (card) {
                card.style.display = 'none';
            }
        } else {
            if (name_id.includes(countryTosearch.toLowerCase()) && (data[i].region === selectedRegion.value || selectedRegion.value === 'All')) {
                if (card) {
                    card.style.display = 'block';
                }
            } else {
                if (card) {
                    card.style.display = 'none';
                }
            }
        }
    }
}

// filter functionality
async function filter(data, region) {
    for (let i = 0; i < data.length; i++) {
        const name_id = data[i].name.replace(/[^a-zA-Z]/g, '').toLowerCase();
        const card = document.querySelector(`#${name_id}`);

        if (data[i].region === region) {
            if (card) {
                card.style.display = 'block';
            }
        } else {
            if (card) {
                card.style.display = 'none';
            }
        }
    }
}


fetch("../../data.json")
    .then(data => data.json())
    .then(data => {
        // countries cards
        data.forEach(async (element, idx, arr) => {
            const name = element.name.replace(/\s*\(.*?\)\s*/g, '');
            const name_id = element.name.replace(/[^a-zA-Z]/g, '').toLowerCase();
            const region = element.region;
            const population = element.population;
            const capital = element.capital;
            const flag_path = element.flags.png;

            const card = document.createElement('li');
            card.classList.add('country-card');
            // card.setAttribute('name', name_without_spacing);
            card.setAttribute('id', name_id);
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
        searchbtn.onclick = async () => { // where
            if (searchinput) {
                await search(data, searchinput.value);
            }
        }
        
        // or 
        searchinput.addEventListener('input', async (e) => {
            if (e.target.value !== '') {
                await search(data, searchinput.value);
            }// else {
            //     if (selectedRegion.value === 'All') {
            //         returndata();
            //     } else {
            //         filter(data, selectedRegion.value);
            //     }
            // }
        });

        deleteSearch.addEventListener('click', async () => {
            if (searchinput.value) {
                // if(selectedRegion.value === 'All') {
                //     returndata();
                // }
                // else {
                //     filter(data, selectedRegion.value);
                // }
                searchinput.value = searchinput.value.slice(0, -1);
                search(data, searchinput.value);
            }
        })

        // calling filter 
        selectedRegion.addEventListener('change', async (e) => {
            if (e.target.value === 'All') {
                // returndata();
                search(data, searchinput.value); // if he was searching for something and click all because he has selected a wrong region
            } else {
                filter(data, e.target.value);
                searchinput.value = '';
            }
            
        })
    });

// async function returndata() {
//     let allcountries = document.querySelectorAll('.country-card');
//     allcountries.forEach((country) => {
//         country.style.display = 'block';
//     })
// }
