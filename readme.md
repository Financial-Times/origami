# sass 

> Prebuilt dart-sass binaries available via npm

## API

```
$ npm install --save @financial-times/sass
```

```js
const execFile = require('child_process').execFile;
const sass = require('@financial-times/sass');

execFile(sass, ['styles.scss'], (err, stdout) => {
	console.log(stdout);
});
```
