let confirmResolve

class ConfirmBinder {
  super () {
    this.openConfirm = null
    this.closeConfirm = null
    this.setText = null
    this.setComponent = null
  }

  bind ({openConfirm, closeConfirm, setText, setComponent, clean}) {
    this.openConfirm = openConfirm
    this.closeConfirm = closeConfirm
    this.setText = setText
    this.setComponent = setComponent
    this.clean = clean
  }

  get Confirm () {
    const {
      openConfirm: open,
      setText,
      setComponent
    } = this

    const _Confirm = ({ component, componentArgument, message }) => new Promise((resolve) => {
      if (message) {
        setText(message)
      }
      if (component) {
        setComponent(component, componentArgument)
      }
      open()
      confirmResolve = resolve
    })
    return _Confirm
  }

  determine ({ hook, result } = {}) {
    const { closeConfirm: close, clean } = this
    close()
    if (hook) hook()
    if (confirmResolve) confirmResolve(result)
    clean()
  }

  Yes ({ hook } = {}) {
    this.determine({ result: true, hook })
  }

  No ({ hook } = {}) {
    this.determine({ result: false, hook })
  }
}

const confirmBinder = new ConfirmBinder()
export default confirmBinder
