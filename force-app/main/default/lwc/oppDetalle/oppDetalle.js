import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

// Campos de Opportunity
import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';
import AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';
import CLOSE_FIELD from '@salesforce/schema/Opportunity.CloseDate';

export default class OppDetalle extends LightningElement {

    @api recordId; 

    isDark = false;

    @wire(getRecord, {
        recordId: '$recordId',
        fields: [NAME_FIELD, STAGE_FIELD, AMOUNT_FIELD, CLOSE_FIELD]
    })
    opportunity;

    get opportunityName() {
        return this.opportunity?.data?.fields?.Name?.value;
    }

    get stageName() {
        return this.opportunity?.data?.fields?.StageName?.value;
    }

    get amount() {
        return this.opportunity?.data?.fields?.Amount?.value;
    }

    get closeDate() {
        return this.opportunity?.data?.fields?.CloseDate?.value;
    }

    toggleTheme() {
        this.isDark = !this.isDark;
    }

    get containerClass() {
        return this.isDark ? 'container dark' : 'container light';
    }

    get themeLabel() {
        return this.isDark ? 'Modo claro' : 'Modo oscuro';
    }
}