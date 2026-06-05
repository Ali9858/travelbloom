const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

// Получение локального времени
function getTime(timeZone) {
    if (!timeZone) return "";
    return new Date().toLocaleTimeString("en-US", {
        timeZone,
        hour12: true,
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    });
}

// Отображение карточек
function display(items, showTime = false) {
    results.classList.remove("hidden");
    results.innerHTML = "";

    items.forEach(item => {
        const images = Array.isArray(item.imageUrl) ? item.imageUrl : [item.imageUrl];

        let timeBlock = "";
        if (showTime && item.timeZone) {
            timeBlock = `<p class="time"><strong>Local Time:</strong><br>${getTime(item.timeZone)}</p>`;
        }

        results.innerHTML += `
            <div class="card">
                ${images.map(img => `<img src="${img}" alt="${item.name}">`).join('')}
                <div class="card-body">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    ${timeBlock}
                    <div class="card-buttons">
                        <button class="btn visit">Visit</button>
                        <button class="btn book">Book Now</button>
                    </div>
                </div>
            </div>
        `;
    });
}
// Клик по кнопкам Visit / Book Now
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("visit")) {
        const name = e.target.closest(".card").querySelector("h3").textContent;
        alert(`Visiting ${name}`);
    }
    if(e.target.classList.contains("book")) {
        const name = e.target.closest(".card").querySelector("h3").textContent;
        alert(`Booking ${name}`);
    }
});

// Поиск
function search() {
    const keyword = searchInput.value.toLowerCase().trim();
    if (!keyword) return;

    if (keyword.includes("beach")) {
        display(travelData.beaches);
        return;
    }
    if (keyword.includes("temple")) {
        display(travelData.temples);
        return;
    }

    const country = travelData.countries.find(c => c.name.toLowerCase().includes(keyword));
    if (country) {
        display(country.cities, true);
        return;
    }

    for (const c of travelData.countries) {
        const city = c.cities.find(city => city.name.toLowerCase().includes(keyword));
        if (city) {
            display([city], true);
            return;
        }
    }

    results.innerHTML = `<p>No results found</p>`;
}

// События поиска
searchBtn.addEventListener("click", search);
clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    results.innerHTML = "";
    results.style.display = "none";
});