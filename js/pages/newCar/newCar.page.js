import * as SERVICE_PWA from '../../services/pwa.service.js';
import * as SERVICE_STORAGE from '../../services/storage.service.js';
import * as HEADER from '../../components/header/header.component.js'
import * as FOOTER from '../../components/footer/footer.component.js'

const pageTitle = 'Nouvelle voiture';

let picturesNumber = 0;

const renderView = () => {

    const carBrand = new URLSearchParams(window.location.search).get('carBrand');
    const carName = new URLSearchParams(window.location.search).get('carName');
    const carYear = new URLSearchParams(window.location.search).get('carYear');

    if (carBrand == null && carName == null && carYear == null) {
        SERVICE_PWA.setHTMLTitle(pageTitle);

        const form = document.createElement('form');
            form.innerHTML = `
                <span class="form-title">${pageTitle}</span>
                <div class="form-row-group">
                    <div class="form-row" id="carBrandRow">
                        <label for="carBrand"><b>Marque</b></label>
                        <select id="carBrand" name="carBrand"></select>
                    </div>
                    <div class="form-row" id="carNameRow">
                        <label for="carName"><b>Nom du modèle</b></label>
                        <input id="carName" name="carName" type="text" />
                    </div>
                    <div class="form-row" id="carYearRow">
                        <label for="carYear"><b>Année</b></label>
                        <input id="carYear" name="carYear" type="number" />
                    </div>
                    <div class="form-row" id="carPicturesRow">
                        <label for="carPictures"><b>Images</b></label>
                    </div>
                    <div class="form-row picture-uploader" id="carPicturesUploader">
                        <span id="addPictureButton">+</span>
                    </div>
                </div>
                <div class="form-submit-row">
                    <input type="submit" value="Ajouter" class="primary-button">
                </div>
            `;
        
        document.getElementById('main').appendChild(form);

        const brands = SERVICE_STORAGE.getBrands();
        brands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand.id;
            option.innerHTML = brand.name;
            document.getElementById('carBrand').appendChild(option)
        });

        const addPictureButton = document.getElementById('addPictureButton');
        addPictureButton.addEventListener('click', () => {
            let pictureId = picturesNumber + 1;
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('id', `imageURL${pictureId}`);
            input.setAttribute('name', `imageURL${pictureId}`);
            input.setAttribute('placeholder', `URL image n°${pictureId}`);
            document.getElementById('carPicturesUploader').insertBefore(input, document.getElementById('addPictureButton'));
            picturesNumber = pictureId;
        })
    } else {
        if (carName == "" || carYear == "") {
            window.location = './newCar.html';
        }
        console.log('adding new car');
        const newCarId = SERVICE_STORAGE.getCarNextId();
        console.log(`next id : ${newCarId}`);

        let imagesArray = [];

        for (let index = 1; index <= 100; index++) {
            const carPicture = new URLSearchParams(window.location.search).get(`imageURL${index}`);
            if (carPicture !== null) {
                imagesArray.push(carPicture);
            } else {
                break;
            }
        }
        
        const newcar = {
            id: newCarId,
            brandId: carBrand,
            model: carName,
            year: carYear,
            images: imagesArray
        };

        SERVICE_STORAGE.addCar(newcar);
        window.location = './';
    }

    
}
HEADER.renderView();
renderView();
FOOTER.renderView();