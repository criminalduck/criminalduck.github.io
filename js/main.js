// Loads proj item data form json
async function loadJSON(jsonDir) {
    try {
        const response = await fetch(jsonDir);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Loaded JSON: ${jsonDir.slice(3)}`, data);
        return data;
    } catch (error) {
        console.error(`Error loading JSON from ${jsonDir}:`, error);
        return null;
    }
}

// Searches projData for Items of ID
function searchId(input) {
    input = input.trim().toLowerCase()
    if (projData.length > 0) {
        return projData.find(item => item.id.toLowerCase() === input);
    } else {
        console.error("Array projData not loaded (or null), unable to execute searchId()")
        return null;
    }
}

// Load data on page load
let projData = []
document.addEventListener("DOMContentLoaded", async () => {
    projData = await loadJSON("data-json/proj-data.json");
    if (projData.length > 0) {
        displayItems(projData, visibleItems);
        displayIDs = await loadJSON("data-json/display-ids.json");
        displayIDs.length > 0 ? initialiseDisplay() : loadDisplayFailed();
    } else
        loadProjListFailed();
});




// DISPLAY
let displayIDs = [];
let displayData = [];
let currentDisplayIndex = 0;
const intervalTime = 10000; // ms
let cycleInterval;

const bulletList = document.getElementById('bullet-list');
const displaySlider = document.getElementById('display-slider');

// Initialize the display with data based on displayIDs
function initialiseDisplay() {
    displayIDs.forEach(id => {
        displayData.push(searchId(id));
    });
    console.log("Loaded DATA: displayData", displayData)

    bulletList.innerHTML = ``;
    for (let i = 0; i < displayIDs.length; i++)
        bulletList.appendChild(createBullet());
    bulletList.firstElementChild.classList.add('is-active');

    displaySlider.innerHTML = ``;
    for (let i = 0; i < displayIDs.length; i++)
        displaySlider.appendChild(createSlideItem(i));
    updateSliderPosition();
    displaySlider.children[currentDisplayIndex].classList.add('current');

    cycleDisplay();
}

// Handle Cycling the Display Table
async function cycleDisplay() {
    cycleInterval = setInterval(() => {
        shiftSlider(1);
    }, intervalTime);
}

// Cycle to Index by Bullet Pressed
function cycleToPosition(event) {
    bulletList.children[currentDisplayIndex].classList.remove('is-active');
    displaySlider.children[currentDisplayIndex].classList.remove('current')
    currentDisplayIndex = Array.from(event.target.parentElement.children).indexOf(event.target);
    bulletList.children[currentDisplayIndex].classList.add('is-active');
    displaySlider.children[currentDisplayIndex].classList.add('current')
    updateSliderPosition();
    resetCycleTimer();
}

// Reset the automatic cycle timer
function resetCycleTimer() {
    clearInterval(cycleInterval);
    cycleDisplay();
}

// Moves the Slider
function updateSliderPosition() {
    displaySlider.style.transform = `translateX(${-currentDisplayIndex * 100}%)`;
}

// 1 to Next, -1 to Prev
function shiftSlider(direction) {
    bulletList.children[currentDisplayIndex].classList.remove('is-active');
    displaySlider.children[currentDisplayIndex].classList.remove('current');

    currentDisplayIndex = (currentDisplayIndex + direction + displayIDs.length) % displayIDs.length;

    bulletList.children[currentDisplayIndex].classList.add('is-active');
    displaySlider.children[currentDisplayIndex].classList.add('current');
    updateSliderPosition();
}

// Registers all bullet items and click event handlers
function createBullet() {
    const bullet = document.createElement('li');
    bullet.className = "bullet";
    bullet.addEventListener('click', cycleToPosition);
    return bullet;
}

// Creates all slider items for display
function createSlideItem(index) {
    const item = document.createElement('li')
    const data = displayData[index];
    item.className = "slider-item";
    item.style = `url('${data.images[1]}')`;
    item.innerHTML = `
        <div class="bar">
            <p class="main-tag">${data.tags[0].toUpperCase()}</p>
            <h1>${data.title}</h1>
        </div>
        <div class="row">
            <div class="column">
            <p>${data.description}</p>
            <a class="btn btn-tertiary info" href="${data.id}.html"><i class="fa-solid fa-circle-info"></i>More Info</a>
            </div>
            <div class="column">
            <img src="${data.images[0]}" alt="${data.id}-cover">
            <img src="${data.images[2]}" alt="${data.id}-image2">
            </div>
        </div>
    `;
    return item;
}

// Click Events for Slider Buttons
document.getElementById('slider-prev').addEventListener('click', () => {shiftSlider(-1); resetCycleTimer();});
document.getElementById('slider-next').addEventListener('click', () => {shiftSlider(1); resetCycleTimer();});

// Handles pop-up for failed load
function loadDisplayFailed() {

}






// PROJECT LIST
let visibleItems = 10;

// Filters the item data and loads it
function filterItems() {
    visibleItems = 10;
    if (activeFilters.length === 0) {
        displayItems(projData, visibleItems);
        return;
    }
    const filteredItems = projData.filter(item =>
        activeFilters.some(tag => item.tags.includes(tag))
    );
    displayItems(filteredItems, visibleItems);
}

// Display filtered project items
function displayItems(items, limit) {
    const container = document.getElementById('project-list');
    container.innerHTML = ''; // Clear existing items
    const itemsToShow = items.slice(0, limit);
    if (itemsToShow.length === 0) {
        return noneProjFound();
    }
    itemsToShow.forEach(item => container.appendChild(createProjectItem(item)));
    if (limit < items.length) {
        container.appendChild(createViewMoreButton(items));
    }
}

// Create project item div
function createProjectItem(item) {
    const div = document.createElement('div');
    div.className = "project-item";
    div.innerHTML = `
        <div class="column">
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <a class="btn btn-tertiary" href="${item.id}.html">
                <i class="fa-solid fa-circle-info"></i> More Info
            </a>
        </div>
        <img src="${item.images[0] || 'images/default-image.jpg'}" alt="${item.id}">
    `;
    return div;
}

// Create "View More" button
function createViewMoreButton(items) {
    const box = document.createElement('div');
    box.className = "view-more";
    const resultsAmount = document.createElement('p');
    resultsAmount.textContent = `Showing ${visibleItems} out of ${items.length} Results`;
    box.appendChild(resultsAmount);
    const viewMoreBtn = document.createElement('a');
    viewMoreBtn.className = "btn btn-tertiary";
    viewMoreBtn.id = "view-more";
    viewMoreBtn.innerHTML = `<i class="fa-solid fa-eye"></i>View More`;
    viewMoreBtn.addEventListener('click', () => loadMoreItems(items));
    box.appendChild(viewMoreBtn);
    return box;
}

// Handle empty search/filter results
function noneProjFound() {
    const container = document.getElementById('project-list');
    container.innerHTML = `
        <div class="non-found-error">
            <p class="icon"><i class="fa-solid fa-circle-exclamation"></i></p>
            <h1 class="title">! No Items Found !</h1>
        </div>
    `;
}

// Loads more items when "View More" is clicked
function loadMoreItems(items) {
    visibleItems += 10;
    displayItems(items, visibleItems);
}

// UI Handle for failed json load
function loadProjListFailed() {
    const container = document.getElementById('project-list');
    container.innerHTML = `
        <div class="non-found-error">
            <p class="icon"><i class="fa-solid fa-circle-exclamation"></i></p>
            <h1 class="title">! Failed to load List data !</h1>
            <p class="sub-text">Try Refreshing the Page</p>
        </div>
    `;
}





// FILTERS AND MENUS
const filters = ['clear', 'gamedev', 'unity', 'java']
let activeFilters = []

function registerFilters() {
    filters.forEach(filter => {
        const tag = document.getElementById(filter + "-filter");
        if (filter === 'clear') {
            tag.addEventListener('click', () => {
                if (activeFilters.length > 0) {
                    activeFilters = [];
                    displayItems(projData, visibleItems);
                    document.querySelectorAll('.btn-pressed').forEach(btn => btn.classList.remove('btn-pressed'));
                }
            });
        } else {
            tag.addEventListener('click', () => {
                activeFilters.includes(filter) ? activeFilters = activeFilters.filter(f => f !== filter) : activeFilters.push(filter);
                activeFilters.length > 0 ? filterItems() : displayItems(projData, visibleItems);
                tag.classList.toggle('btn-pressed');
            });
        }
    });
}
document.addEventListener("DOMContentLoaded", registerFilters);

// Dropdown
const dropdownBtn = document.getElementById("dropdown-toggle");
const dropdownMenu = document.getElementById("filters");

document.getElementById("dropdown-toggle").addEventListener('click', () => {
    dropdownMenu.style.display = (dropdownMenu.style.display === 'flex') ? 'none' : 'flex';
    dropdownMenu.classList.toggle("show");
    dropdownBtn.classList.toggle("arrow");
});

// Searchbar
function search() {
    const input = document.getElementById("searchInput").value.trim().toLowerCase();
    if (input === "") {
        displayItems(projData, visibleItems); // Reset when empty
        return;
    }
    const results = projData.filter(item => item.title.toLowerCase().includes(input));
    results.length > 0 ? displayItems(results, visibleItems) : noneFound();
}
document.getElementById("searchInput").addEventListener("input", search);

document.getElementById("clearBtn").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    displayItems(projData, visibleItems);
});