import * as SERVICE_PWA from '../../services/pwa.service.js';
import * as SERVICE_STORAGE from '../../services/storage.service.js';
import * as HEADER from '../../components/header/header.component.js'
import * as FOOTER from '../../components/footer/footer.component.js'

const pageTitle = 'Nouvelle marque';

const renderView = () => {

    const isEditing = new URLSearchParams(window.location.search).get('isEditing');
    const brandId = new URLSearchParams(window.location.search).get('brandId');
    const brandName = new URLSearchParams(window.location.search).get('brandName');

    if (isEditing == "true") {
        SERVICE_PWA.setHTMLTitle(pageTitle);

        const form = document.createElement('form');
            form.innerHTML = `
                <span class="form-title">${pageTitle}</span>
                <div class="form-row-group">
                    <div class="form-row" id="brandIdRow" style="display:none;">
                        <label for="brandId"><b>ID</b></label>
                        <input id="brandId" name="brandId" value="${brandId}" />
                    </div>
                    <div class="form-row" id="typeSelectorRow">
                        <label for="brandName"><b>Nom de la marque</b></label>
                        <input id="brandName" name="brandName" type="text" value="${brandName}" />
                    </div>
                </div>
                <div class="form-submit-row">
                    <input type="submit" value="Modifier" class="primary-button">
                </div>
            `;
        
        document.getElementById('main').appendChild(form);

    } else {
        const newBrandId = SERVICE_STORAGE.getBrandNextId();
        
        const editedBrand = {
            id: brandId,
            name: brandName
        };

        SERVICE_STORAGE.editBrand(editedBrand);
        window.location = './allBrands.html';
    }

    
}
HEADER.renderView();
renderView();
FOOTER.renderView();