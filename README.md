# onFrame

Returns a function, that, as long as it continues to be invoked, will not be triggered. 
The function will be called after it stops being called for N (`frameLength`) animation frames.

## API

```js
  const debounce = onFrame(fn, frameLength = 10);
```

### fn
Callback function

### frameLength
Length of frames to wait before callback is called.

**NOTE:** Setting the `frameLength` to `1` will call the callback on the first frame.

## Cancel
It is possible to `cancel` a running debounced function, by calling `cancel` on the return `object`

```js
  debounce.cancel();
```

## Example

```js

import onFrame from 'onframe';

const efficientResize = onFrame(function() {
  // will be debounced to after 5 frames
}, 5);

window.addEventListener('resize', efficientResize);

// Somewhere else
efficientResize.cancel();

```
