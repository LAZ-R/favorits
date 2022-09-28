import * as SERVICE_PWA from '../../services/pwa.service.js';
import * as SERVICE_STORAGE from '../../services/storage.service.js';
import * as HEADER from '../../components/header/header.component.js'
import * as FOOTER from '../../components/footer/footer.component.js'

const pageTitle = 'Nouvelle marque';

const renderView = () => {

    const brandName = new URLSearchParams(window.location.search).get('brandName');

    if (brandName == null) {
        SERVICE_PWA.setHTMLTitle(pageTitle);

        const form = document.createElement('form');
            form.innerHTML = `
                <span class="form-title">${pageTitle}</span>
                <div class="form-row-group">
                    <div class="form-row" id="typeSelectorRow">
                        <label for="brandName"><b>Nom de la marque</b></label>
                        <input id="brandName" name="brandName" type="text" />
                    </div>
                </div>
                <div class="form-submit-row">
                    <input type="submit" value="Ajouter" class="primary-button">
                </div>
            `;
        
        document.getElementById('main').appendChild(form);
    } else {
        console.log('adding new brand');
        const newBrandId = SERVICE_STORAGE.getBrandNextId();
        console.log(`next id : ${newBrandId}`);
        
        const newBrand = {
            id: newBrandId,
            name: brandName
        };

        SERVICE_STORAGE.addBrand(newBrand);
        window.location = './';
    }

    
}
HEADER.renderView();
renderView();
FOOTER.renderView();