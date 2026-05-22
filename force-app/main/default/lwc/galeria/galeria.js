import { LightningElement, track } from 'lwc';

export default class Galeria extends LightningElement {

    selectedImage = '';
    selectedIndex = 0;
    isFading = false;

    @track images = [
       { id: 1, url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=650', title: 'Montaña' },
    { id: 2, url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=650', title: 'Perro' },
    { id: 3, url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=650', title: 'Naturaleza' },
    { id: 4, url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=650', title: 'Ciudad' }
    ];

    get fadeClass() {
        return this.isFading ? 'main-image fade' : 'main-image no-fade';
    }

    get computedImages() {
        return this.images.map((img, index) => {
            return {
                ...img,
                thumbnailClass: index === this.selectedIndex ? 'thumb selected' : 'thumb'
            };
        });
    }

    connectedCallback() {
        this.selectedImage = this.images[0].url;
    }

    selectImage(index) {
        this.isFading = true;

        setTimeout(() => {
            this.selectedIndex = index;
            this.selectedImage = this.images[index].url;
        }, 150);

        setTimeout(() => {
            this.isFading = false;
        }, 300);
    }

    handleSelect(event) {
        const id = parseInt(event.currentTarget.dataset.id, 10);
        const index = this.images.findIndex(img => img.id === id);
        if (index !== -1) {
            this.selectImage(index);
        }
    }

    nextImage() {
        let newIndex = this.selectedIndex + 1;
        if (newIndex >= this.images.length) {
            newIndex = 0;
        }
        this.selectImage(newIndex);
    }

    prevImage() {
        let newIndex = this.selectedIndex - 1;
        if (newIndex < 0) {
            newIndex = this.images.length - 1;
        }
        this.selectImage(newIndex);
    }
}