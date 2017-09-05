'use babel'

import { CompositeDisposable } from 'atom'

export default {
  config: {
  },
  isEnabled: false,
  subscriptions: null,
  statusBarTile: null,
  statusBarItem: null,
  workspace: atom.views.getView(atom.workspace),

  consumeStatusBar (statusBar) {
    this.statusBarItem = document.createElement('leader-status')
    this.statusBarItem.classList.add('inline-block')
    this.statusBarItem.innerHTML = ''
    this.statusBarTile = statusBar.addRightTile({
      item: this.statusBarItem, priority: 1000
    })
  },

  activate (state) {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'leader:enable': () => this.enable(),
      'leader:disable': () => this.disable()
    }))

    this.subscriptions.add(atom.keymaps.onDidMatchBinding(e => {
      if (e.binding.command !== 'leader:enable') {
        this.disable()
      }
    }))
  },

  deactivate () {
    this.isEnabled = false
    this.subscriptions.dispose()
    this.statusBarTile.destroy && this.statusBarTile.destroy()
    this.statusBarTile = null
  },

  enable () {
    this.isEnabled = true
    this.statusBarItem.classList.add('on')
    this.statusBarItem.innerHTML = 'Λ'
    this.workspace.classList.add('leader-mode')
  },

  disable () {
    if (this.isEnabled) {
      this.isEnabled = false
      this.statusBarItem.classList.remove('on')
      this.statusBarItem.innerHTML = ''
      this.workspace.classList.remove('leader-mode')
    }
  }

}
