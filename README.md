# Footer module [![Build Status](https://circleci.com/gh/Financial-Times/o-footer.png?style=shield&circle-token=e3626fa5fcb3e2f16bbf587ee697d441b93a6aa2)](https://circleci.com/gh/Financial-Times/o-footer)

Origami module for the responsive FT page footer.

## Data

For convenience a JSON file with an example of footer links has been provided (`footer.json`).  It's anticipated that in a future version of the footer, this data will be the canonical footer content that should appear in most uses of the footer.  For the moment, it is just sample data.

## Browser support

Tested and working on:

|  Browsers  |           |
|:----------:|:---------:|
|   Chrome   |    35+    |
|   Firefox  |    20+    |
|   Safari   |    7+     |
|   IE       |    8+     |

## Upgrading from 3.x.x to 4.x.x

Note that o-footer v4 relies on o-grid v4.

### Markup changes

```diff
 <nav class="o-footer__row o-footer__nav">
 	<div class="o-footer__col o-footer__col--full-width">
 		…
+ 		<div class="o-footer__divider"></div>
 	</div>
 </nav>
```

----

## License

Copyright (c) 2016 Financial Times Ltd. All rights reserved.

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).
