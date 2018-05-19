jquery-paintable
=========
jquery-paintable is a jQuery plugin that makes any HTML `<canvas>` element paintable

Demo
----
[http://golfsinteppadon.com/paint/](http://golfsinteppadon.com/paint/)

Usage
-----

1. Download and include jquery-paintable.js

    `<script src="jquery-paintable.js"></script>`

2. Initialize paintable

    `$('#canvas').paintable();`

Initializing paintable allows users to draw on the canvas

Options
-------

**color** `String` Default: 'black'

> Set the color to draw

**cursor** `CSS string` Default: 'crosshair'

> Set the cursor style over the canvas

**width** `Float` Default: 1.5

> Set the width of the line

Methods
-------

**option** `.paintable('option', key, [value])`

> Get or set any option. If no value is specified, will act as a getter

**options** `.paintable('options', options)`

> Set multiple options at once by providing an options object

**save** `.paintable('save')`

> Open a new window showing an image of the canvas

**undo** `.paintable('undo')`

> Undo the last user action