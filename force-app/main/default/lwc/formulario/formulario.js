import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Formulario extends LightningElement {

    name = '';
    email = '';
    message = '';

    errors = {
        name: '',
        email: '',
        message: ''
    };

    get nameClass() {
        return this.errors.name ? 'error-border' : '';
    }

    get emailClass() {
        return this.errors.email ? 'error-border' : '';
    }

    get messageClass() {
        return this.errors.message ? 'error-border' : '';
    }

    handleChange(event) {
        const field = event.target.name;
        const value = event.target.value;

        this[field] = value;
        this.validateField(field);
    }

    handleBlur(event) {
        const field = event.target.name;
        this.validateField(field);
    }

    validateField(field) {
        switch (field) {

            case 'name':
                this.errors.name =
                    this.name.trim().length === 0
                        ? 'El nombre es obligatorio'
                        : '';
                break;

            case 'email':
                this.errors.email = this.validateEmail(this.email)
                    ? ''
                    : 'Email no válido';
                break;

            case 'message':
                this.errors.message =
                    this.message.trim().length < 10
                        ? 'El mensaje debe tener al menos 10 caracteres'
                        : '';
                break;
        }
    }

    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    get isInvalid() {
        return (
            !this.name ||
            !this.email ||
            !this.message ||
            this.errors.name ||
            this.errors.email ||
            this.errors.message
        );
    }

    handleSubmit() {
    this.validateField('name');
    this.validateField('email');
    this.validateField('message');

    if (this.isInvalid) {
        this.showToast(
            'Error',
            'Revisa los campos del formulario antes de enviar',
            'error'
        );
        return;
    }

    this.showToast(
        'Éxito',
        'Formulario enviado correctamente',
        'success'
    );

    this.resetForm();
}

    resetForm() {
        this.name = '';
        this.email = '';
        this.message = '';

        this.errors = {
            name: '',
            email: '',
            message: ''
        };
    }

    showToast(title, message, variant) {
    const event = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant,
        mode: 'dismissable'
    });

    this.dispatchEvent(event);
}


}