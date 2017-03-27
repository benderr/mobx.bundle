import React from 'react';
import {connect} from 'react-redux';
import { reduxForm } from 'redux-form'

const signInForm = props => {
    return (
        <div className="form">
            <div className="form_group">
                <div className="input_group column twelve">
                    <div className="input_group_addon addon_code big">+7</div>
                    <input type="text" name="phone" placeholder="Телефон *" id="phone" className="big"
                           required/>
                </div>
            </div>
        </div> )
};

export default connect(mapStateToProps, mapDispatchToProps)(signInForm);


function mapStateToProps(state) {
    return {
        asyncData: state.account.get('asyncData'),
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}