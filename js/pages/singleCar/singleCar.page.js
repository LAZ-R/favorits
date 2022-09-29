import * as SERVICE_PWA from '../../services/pwa.service.js';
import * as SERVICE_STORAGE from '../../services/storage.service.js';
import * as HEADER from '../../components/header/header.component.js'
import * as FOOTER from '../../components/footer/footer.component.js'


const renderView = () => {

    
    const carId = new URLSearchParams(window.location.search).get('carId');
    const cars = SERVICE_STORAGE.getCars();
    let car;
    cars.forEach(carFromArray => {
        if (carFromArray.id == carId) {
            car = carFromArray;
        }
    });

    let stringImages = '';
    car.images.forEach((image, index) => {
        stringImages += `&imageURL${index + 1}=${image}`;
    });
    
    const pageTitle = `${SERVICE_STORAGE.getBrandNameFromId(car.brandId)} ${car.model} (${car.year})`;
    SERVICE_PWA.setHTMLTitle(pageTitle);

    const singleCarPage = document.createElement('div');
    singleCarPage.setAttribute('id', `singleCarPage`);
    singleCarPage.setAttribute('class', 'single-car-page');
    singleCarPage.innerHTML = `
        <span class="single-car-brand">${SERVICE_STORAGE.getBrandNameFromId(car.brandId)}</span>
        <span class="single-car-model">${car.model}</span>
        <span class="single-car-year"><i>(${car.year})</i></span>
        <span class="single-car-year"><a href="./editCar.html?isEditing=true&carId=${car.id}&carBrand=${car.brandId}&carName=${car.model}&carYear=${car.year}${stringImages}">...</a></span>
    `;

    car.images.forEach(image => {
        const imageDisplay = document.createElement('img');
        imageDisplay.setAttribute('class', 'car-picture');
        imageDisplay.setAttribute('src', `${image}`);
        singleCarPage.appendChild(imageDisplay);
    });
document.getElementById('main').appendChild(singleCarPage);
    
}
HEADER.renderView();
renderView();
FOOTER.renderView();