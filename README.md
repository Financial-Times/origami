#FT Typography <small>*o-ft-typography*</small>

Typographical styles for FT branded sites - fonts, weight, colors, sizes and vertical rhythm

## Usage

### Default classes

See docs/demo.html for examples of the classes provided and their effects. As most typographical styles are inherited, classes can often be applied to a container element and all the children will be styled appropriately.

### Placeholder classes

To apply the styles to elements you can't or don't wish to add classes to extend the module's placeholder classes e.g.

    .article {
    	p,
    	blockquote {
 			@extend %o-ft-typography-body__block;   		
    	}

    }

### Silent mode (Product developers only)

To prevent the module outputting all its default classes and style rules by default set `$o-ft-typography-is-silent: true`. This may result in some origami dependencies which rely on the default styles' presence breaking, so this should be done with care. You will also need to include one or more of the following lines in your sass in order to load the fonts required by the typography you are using (due to the limitations of sass' mixins, this cannot at present be done automatically)

	@include oFontsInclude(BentonSans);
	@include oFontsInclude(BentonSans, bold);
	@include oFontsInclude(MillerDisplay);


## TODO
* Specify and enforce the vertical rhythm using a variable and mixins