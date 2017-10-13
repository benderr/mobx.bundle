import {Field} from 'mobx-react-form';
import {computed} from 'mobx';

class BaseField extends Field {
  constructor(props) {
    super(props);
  }

  @computed get submitFailed() {
    return this.state.form.submitFailed;
  }
}

export default BaseField