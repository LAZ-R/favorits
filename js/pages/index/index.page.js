import * as SERVICE_PWA from '../../services/pwa.service.js';
import * as SERVICE_STORAGE from '../../services/storage.service.js';
import * as UTILS from '../../services/utils.service.js';
import * as HEADER from '../../components/header/header.component.js'
import * as FOOTER from '../../components/footer/footer.component.js'

const pageTitle = 'Test CSS';

const renderView = () => {

    SERVICE_PWA.setHTMLTitle(pageTitle);
    let user = SERVICE_STORAGE.getUser();

    if (user.brands.length == 0) {
        window.location = './newBrand.html';
    }

    /* --------------------------------------------------------------------- */
    
    const page = document.createElement('div');
    page.setAttribute('id', 'indexSection1');
    page.setAttribute('class', 'page-section section1');

    const filter = document.createElement('button');
    filter.setAttribute('class', 'black-filter');
    filter.innerHTML =
            `ALL CARS`; 
    filter.onclick = () => {
        window.location = './allCars.html'
    }
    page.appendChild(filter);
    
    document.getElementById('main').appendChild(page);

    /* --------------------------------------------------------------------- */

    const page2 = document.createElement('div');
    page2.setAttribute('id', 'indexSection2');
    page2.setAttribute('class', 'page-section section2');   
    
    let currentScroll = 0;

    /**
     * Traitement en cas de swipe à droite
     */
    function onLeftSwipe() {
        const maxScroll = document.getElementById('elementsDiv').scrollWidth - window.innerWidth;
        const newScroll = currentScroll + window.innerWidth <= maxScroll ? (currentScroll + window.innerWidth) : maxScroll;
        document.getElementById('indexSection2').scrollLeft = newScroll;
        currentScroll = newScroll;
    }

    /**
     * Traitement en cas de swipe à droite
     */
    function onRightSwipe() {
        const newScroll = currentScroll - window.innerWidth >= 0 ? currentScroll - window.innerWidth : 0;
        document.getElementById('indexSection2').scrollLeft = newScroll;
        currentScroll = newScroll;
    }

    const elementsDiv = document.createElement('div');
    elementsDiv.setAttribute('id', 'elementsDiv');
    elementsDiv.setAttribute('class', 'elements-div');  
    page2.appendChild(elementsDiv); 

    

    user.cars.reverse().forEach(car => {
        const tile = document.createElement('div');
        tile.setAttribute('class', 'index-tile');

        const filter = document.createElement('button');
        filter.setAttribute('class', 'black-filter');

        tile.appendChild(filter)

        filter.innerHTML =
            `<div class="index-tile-cars-infos">
            <div>
            <span>${SERVICE_STORAGE.getBrandNameFromId(car.brandId)}<br>${car.model}</span>
            </div>
            </div>`;
        tile.style.backgroundImage = `url(${car.images[0]})`;
        tile.onclick = () => {
            window.location = `./singleCar.html?carId=${car.id}`;
        }
        UTILS.handleSwipe(tile, 111, onLeftSwipe, onRightSwipe);
        elementsDiv.appendChild(tile);
    });
    document.getElementById('main').appendChild(page2);

    /* --------------------------------------------------------------------- */

    const page3 = document.createElement('div');
    page3.setAttribute('id', 'indexSection2');
    page3.setAttribute('class', 'page-section section3');

    const addNewCarButton = document.createElement('button');
    addNewCarButton.setAttribute('id', 'addNewCarButton');
    addNewCarButton.setAttribute('class', 'add-new-button new-car');
    addNewCarButton.onclick = () => window.location = './newCar.html';
    addNewCarButton.innerHTML = `ADD NEW CAR`;
    page3.appendChild(addNewCarButton);

    const addNewBrandButton = document.createElement('button');
    addNewBrandButton.setAttribute('id', 'addNewBrandButton');
    addNewBrandButton.setAttribute('class', 'add-new-button new-Brand');
    addNewBrandButton.onclick = () => window.location = './newBrand.html';
    addNewBrandButton.innerHTML = `ADD NEW BRAND`;
    page3.appendChild(addNewBrandButton);
    
    document.getElementById('main').appendChild(page3);
    
}

SERVICE_STORAGE.checkFirstTime();
HEADER.renderView();
renderView();
FOOTER.renderView();
SERVICE_PWA.setViewportSize();
