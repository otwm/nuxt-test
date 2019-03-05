let confirmResolve;

// TODO: rename
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
    const {
      openConfirm: open,
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

  Yes({ hook } = {}) {
    const { closeConfirm: close } = this
    close()
    if ( hook ) hook()
    if ( confirmResolve ) confirmResolve(true)
  }

  No({ hook } = {}) {
    const { closeConfirm: close } = this
    close()
    if ( hook ) hook()
    if ( confirmResolve ) confirmResolve(false)
  }
}

const confirmFactory = new ConfirmFactory()

export default confirmFactory
