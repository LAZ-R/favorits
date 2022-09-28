import * as SERVICE_PWA from '../../services/pwa.service.js';
import * as SERVICE_STORAGE from '../../services/storage.service.js';
import * as HEADER from '../../components/header/header.component.js'
import * as FOOTER from '../../components/footer/footer.component.js'

const pageTitle = 'Modifier voiture';

let picturesNumber = 0;

const renderView = () => {

    const isEditing = new URLSearchParams(window.location.search).get('isEditing');

    const carId = new URLSearchParams(window.location.search).get('carId');
    const carBrand = new URLSearchParams(window.location.search).get('carBrand');
    const carName = new URLSearchParams(window.location.search).get('carName');
    const carYear = new URLSearchParams(window.location.search).get('carYear');


    if (isEditing == "true") {
        let imagesArray = [];

        for (let index = 1; index <= 100; index++) {
            const carPicture = new URLSearchParams(window.location.search).get(`imageURL${index}`);
            if (carPicture !== null) {
                imagesArray.push(carPicture);
            } else {
                break;
            }
        }

        //picturesNumber = imagesArray.length;

        SERVICE_PWA.setHTMLTitle(pageTitle);

        const form = document.createElement('form');
            form.innerHTML = `
                <span class="form-title">${pageTitle}</span>
                <div class="form-row-group">
                    <div class="form-row" id="carIdRow" style="display:none;">
                        <label for="carId"><b>ID</b></label>
                        <input id="carId" name="carId" value="${carId}" />
                    </div>
                    <div class="form-row" id="carBrandRow">
                        <label for="carBrand"><b>Marque</b></label>
                        <select id="carBrand" name="carBrand"></select>
                    </div>
                    <div class="form-row" id="carNameRow">
                        <label for="carName"><b>Nom du modèle</b></label>
                        <input id="carName" name="carName" type="text" value="${carName}" />
                    </div>
                    <div class="form-row" id="carYearRow">
                        <label for="carYear"><b>Année</b></label>
                        <input id="carYear" name="carYear" type="number" value="${carYear}" />
                    </div>
                    <div class="form-row" id="carPicturesRow">
                        <label for="carPictures"><b>Images</b></label>
                    </div>
                    <div class="form-row picture-uploader" id="carPicturesUploader">
                        <span id="addPictureButton">+</span>
                    </div>
                </div>
                <div class="form-submit-row">
                    <input type="submit" value="Modifier" class="primary-button">
                </div>
            `;
        
        document.getElementById('main').appendChild(form);

        const brands = SERVICE_STORAGE.getBrands();
        brands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand.id;
            option.innerHTML = brand.name;
            if (carBrand == brand.id) {
                option.selected = true;
            }
            document.getElementById('carBrand').appendChild(option);
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
        });

        imagesArray.forEach(image => {
            let pictureId = picturesNumber + 1;
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('id', `imageURL${pictureId}`);
            input.setAttribute('name', `imageURL${pictureId}`);
            input.setAttribute('placeholder', `URL image n°${pictureId}`);
            input.setAttribute('value', `${image}`);
            document.getElementById('carPicturesUploader').insertBefore(input, document.getElementById('addPictureButton'));
            picturesNumber = pictureId;
        });
    } else {
        if (carName == "" || carYear == "") {
            window.location = './newCar.html';
        }

        let newImagesArray = [];

        for (let index = 1; index <= 100; index++) {
            const carPicture = new URLSearchParams(window.location.search).get(`imageURL${index}`);
            if (carPicture !== null) {
                newImagesArray.push(carPicture);
            } else {
                break;
            }
        }
        
        const editedCar = {
            id: carId,
            brandId: carBrand,
            model: carName,
            year: carYear,
            images: newImagesArray
        };

        SERVICE_STORAGE.editCar(editedCar);
        window.location = './';
    }

    
}
HEADER.renderView();
renderView();
FOOTER.renderView();