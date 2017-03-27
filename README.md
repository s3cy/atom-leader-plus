# Atom Leader

Here be dragons.

```
'atom-workspace:not(.leader-mode), atom-workspace:not(.leader-mode) atom-text-editor:not(.mini)':
  'space': 'leader:enable'
'atom-workspace.leader-mode, atom-workspace.leader-mode atom-text-editor:not(.mini)':
  'w': "core:close"
  'p \\': "pane:split-right"
  'p -' : "pane:split-down"
```
