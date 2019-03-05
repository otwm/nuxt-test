class ConfirmFactory {
  super() {
    this.openConfirm = null
    this.closeConfirm = null
    this.setText = null
    this.setComponent = null
  }

  bind({openConfirm, closeConfirm, setText, setComponent}) {
    this.openConfirm = openConfirm
    this.closeConfirm = closeConfirm
    this.setText = setText
    this.setComponent = setComponent
  }

  get Confirm() {
    let confirmResolve;
    const {
      openConfirm: open,
      closeConfirm: close,
      setText,
      setComponent,
    } = this

    const _Confirm = ({ component, message }) => new Promise((resolve) => {
      if (message) {
        setText(message)
      }
      if (component) {
        setComponent(component)
      }
      open()
      confirmResolve = resolve
    })
    return _Confirm
  }
}

const confirmFactory = new ConfirmFactory()
export default confirmFactory
