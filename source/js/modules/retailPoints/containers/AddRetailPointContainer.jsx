/**
 * Created by RobertSabiryanov on 23.05.17.
 */
import React from 'react';
import DefaultLayerLayout from 'components/DefaultLayerLayout';
import RetailPointForm from '../components/RetailPointForm/RetailPointForm'

class AddRetailPointContainer extends DefaultLayerLayout {
    onSave() {

    }

    render() {
        return (
            <article class="page">
                <div class="page_header">
                    {this.getCloseButton()}
                    {this.getToogleButton()}
                    <h1>Добавление точки продаж</h1>
                </div>
                <RetailPointForm onSave={::this.onSave} onCancel={::this.closeLayer}/>

            </article>)
    }
}

export default AddRetailPointContainer;