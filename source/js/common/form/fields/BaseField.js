class BaseField extends Field {
  constructor (props) {
    super(props)
    this.ref = null
    this.getForm = function () {
      return props.form
    }
    this.submitFailed = function () {
      return props.form.submitFailed
    }
  }
}

export default BaseField