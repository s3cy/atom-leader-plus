# Atom Leader [![Build Status](https://travis-ci.org/s3cy/atom-leader-plus.svg?branch=master)](https://travis-ci.org/s3cy/atom-leader-plus)

similar to vim/spacemacs leader key. A fork of [leader](https://github.com/xream/atom-leader).

# Installation

1. download.
2. `cd` to the path.
3. `apm link`

# Differences

- No more timeout. Remain in leader mode till next key.
- Simple look.
- This package is under development. I will add new features soon.

# Keybindings

- no default keybindings.
- mine (I am a vim-mode-plus user):
```cson
'atom-workspace:not(.leader-mode) atom-text-editor:not(.mini).vim-mode-plus:not(.insert-mode)':
  ',': 'leader:enable'

'atom-workspace.leader-mode atom-text-editor:not(.mini)':
  ',': 'leader:disable'
  'w': 'core:close'
  'p': 'pane:split-down-and-move-active-item'
  # and more
```
