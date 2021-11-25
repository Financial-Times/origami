# Origami Bower Safe Version Supervisor

This is command-line application for use in projects which have not finished their miigration to npm-only Origami.

The application will exit with a non-zero exit code if it detects that an npm-only Origami dependency has been installed and will print out a detailed message about how to resolve the situation.

### How To Use

1. First, install as a development dependency

   ```shell
   npm install --save-dev "@financial-times/origami-bower-safe-version-supervisor"
   ```

2. Then add it as a postinstall script within your project's package.json file.

   ```json
   {
       "scripts": {
           "postinstall": "o-no"
       }
   }
   ```

3. That's it! Any time `npm install` is ran within your project, `o-no` will run and check that no npm-only Origami depdencies were installed. Once your project has finished the migration to npm-only Origami, you can remove the postinstall script and the development dependency @financial-times/origami-bower-helper.
