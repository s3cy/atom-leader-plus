'use babel'

import { CompositeDisposable } from 'atom'

export default {
  config: {
    leaderTimeout: {
      type: 'integer',
      default: 100,
    },
    partialMatchTimeout: {
      type: 'integer',
      default: atom.keymaps.getPartialMatchTimeout(),
    },
  },
  subscriptions: null,
  exit: false,
  statusBarTile: null,
  statusBarItem: null,
  workspace: null,

  getWorkspace() {
    if (!this.workspace) {
      this.workspace = document.querySelector('atom-workspace')
    }
    return this.workspace
  },

  consumeStatusBar (statusBar) {
    this.statusBarItem = document.createElement('leader-status')
    this.statusBarItem.classList.add('inline-block')
    this.statusBarItem.innerHTML = 'λ'
    this.statusBarTile = statusBar.addLeftTile({item: this.statusBarItem, priority: 100})
  },

  activate(state) {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'leader:enable': () => this.enable(),
      'leader:test': () => this.test(),
    }))

    this.subscriptions.add(atom.keymaps.onDidMatchBinding(e => {
      if (e.binding.selector.includes('atom-workspace.leader-mode')) {
        this.disable()
      }
    }))

    this.subscriptions.add(atom.keymaps.onDidPartiallyMatchBindings(e => {
      this.exit = false
      if (e.partiallyMatchedBindings[0].selector.includes('atom-workspace.leader-mode')) {
        this.exit = true
      }
    }))

    this.subscriptions.add(atom.config.onDidChange('leader.partialMatchTimeout', ({ newValue }) => {
      atom.keymaps.partialMatchTimeout = newValue
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
    this.statusBarTile.destroy && this.statusBarTile.destroy()
    this.statusBarTile = null
  },

  send() {
    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
      const classList = [...document.querySelector('atom-text-editor:not(.mini)').classList]
      if (!classList.includes('vim-mode-plus') || classList.includes('insert-mode')) {
        editor.insertText(' ')
      }
    }
  },

  enable() {
    this.statusBarItem.classList.add('on')
    this.statusBarItem.innerHTML = 'Λ'
    this.getWorkspace().classList.add('leader-mode')
    setTimeout(() => {
      if (this.exit) {
        this.exit = false
        return
      }
      if ([...this.getWorkspace().classList].includes('leader-mode')) {
        this.disable()
        this.send()
      }
    }, atom.config.get('leader.leaderTimeout'))
  },

  test() {
    atom.workspace.getActiveTextEditor().insertText('test!')
  },

  disable() {
    this.statusBarItem.classList.remove('on')
    this.statusBarItem.innerHTML = 'λ'
    this.exit = false
    this.getWorkspace().classList.remove('leader-mode')
  },

}
