import React from 'react';
import AddUser from '../components/AddUser/AddUser';
import DefaultLayerLayout from 'components/DefaultLayerLayout'

class AddUserPage extends DefaultLayerLayout {
  render() {
    return (
      <article className="page" {...this.layerOptions}>
        <div className="page_header">
          {this.getCloseButton()}
          {this.getToggleButton()}
          <h1>Добавление</h1>
        </div>
        <div className="page_content">
          <AddUser onClose={::this.closeLayer}/>
        </div>
      </article>
    );
  }
}

export default AddUserPage;
