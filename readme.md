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

## Updating sass binary

To update this project to the latest dart-sass, run the `npm update` command.