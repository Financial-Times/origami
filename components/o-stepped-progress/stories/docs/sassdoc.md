# o-stepped-progress Sass Documentation
## Mixins
### oSteppedProgress
Outputs all available features and styles for stepped progress.


The output includes the `.o-stepped-progress` class definition as well as class definitions for every available theme.
#### Examples
##### Example 1
All stepped progress styles

```scss
@include oSteppedProgress();
```
##### Example 2
Base styles with 'heavy' theme

```scss
@include oSteppedProgress((
	'themes': (
		'heavy'
	)
));
```
## Variables
### o-stepped-progress-is-silent (`Boolean`)
Silent mode: on (true) or off (false)
Set to false to output default stepped progress classes


