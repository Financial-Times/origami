export const langTemplates = {
	html: `<div class="some-class" data-attribute="value">
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consectetur est in urna iaculis tempus.</p>
	<p>Nam faucibus feugiat lectus, <a href="#">sit amet blandit</a> purus bibendum et.</p>
	<button type="button" name="button">Button.</button>
	<!-- <span>Comment</span> -->
</div>`,
	js: `import defaultExport from "module-name";
	import * as name from "module-name";
	import { prop } from "module-name";
	import { prop as alias } from "module-name";
	import { export1 , export2 } from "module-name";
	import { export3 , export2 as alias4 } from "module-name";
	import defaultExport1, { export5 , export6 as alias2 } from "module-name";
	import defaultExport2, * as name1 from "module-name";
	import "module-name";

	try {
	/*
	This
	Is a multiline
	comment!
	//  <= it can contain singline comments!
	*/
	class Thing extends Object {
		constructor({propertyA: foo} = {}) {
			super();

			label: for (var i = 0;i<2;i++) {
				break label;
				continue;
			}

			const obj = {foo:"bar"};
			delete obj.foo;
			foo in obj

			this instanceof Thing

			do {
				console.log("Fun")
			} while(0)
				console.log("keywords:", \`as; async; await; break; case;
	catch; class; const; continue; debugger;
	default; delete; do; else; enum;
	export; extends; finally; for;
	from; function; get; if; implements;
	import; in; instanceof; interface; let;
	new; null; of; package; private;
	protected; public; return; set; static;
	super; switch; this; throw;
	try; typeof; var; void; while;
	with; yield;\`)
				console.log("operators:", \`- -- -=
	+ ++ +=
	< <= << <<=
	> >= >> >>= >>> >>>=
	= == === =>
	! != !==
	& && &=
	| || |=
	* ** *= **=
	/ /= ~
	^ ^= % %=
	? ...\`);
			console.log(/regex literal/);
			console.log("This is"+ "/, not a regex")
			3 >= 2 || 2 <= 4 && 3 === 3 && 2 == 2
			var a = 4;
			a--
			a -= 2
			a = a+ 1
			a++
			a += 2
			a< 3
			a<= 4
			a<< 2
			a <<= 3
			a> 3
			a>= 3
			a>> 3
			a>>= 3
			a>>> 3
			a>>>= 3
			a = !a
			a!= a
			a!==a
			a & 2
			a && a
			a &= 2
			a| 2
			a || a
			a|=2
			a * 2
			a*= 2
			a**=2
			a/ 2
			a/= 3
			~a
			a=a^2
			a^= 3
			a% 3
			a%=3

			a ? a : a

			42
			3.14159
			4e10
			3.2E+6
			2.1e-10
			0b1101
			0o571
			0xcafe
			0xCAFE
			NaN
			Infinity

			null
			void 0
			undefined
		}

		add(...args) {
			if (args.length > 1) {
				return args.pop() + add(...args);
			} else {
				return args[0];
			}
		}

		get english_greeting() {
			return "hi";
		}

		subtract(...args) {
			switch (args.length) {
				case 0:
					return 0;
				case 1:
					return args[0];
				default:
					return args.shift - subtract(...args)
			}
		}

		pow(a, exponent = 1) {
			return [a ** exponent];
		}

		async ಠ_ಠ(){
			return async function* () {
				let hello = "hello";
				var world = 'world';
				const what = \`\${hello.toUpperCase()}
	\${world.toUpperCase()}?
	\`;
			throw new Error("Please don't call this function");
				// This may not work
				return yield await delete typeof void this in new class extends async function () {} {}
			}
		}
	}

		Thing.prototype.Ƞȡ_҇ = Thing.prototype.ಠ_ಠ;
	new Thing

	const identity = a => a

	const i = (a) => {return a}

	const fals = function (){return false}
	const tru = () => true
	} catch (e) {
	} finally {
}`,
	css: `@import 'file'; // using a relative path

@font-face {
	font-family: FontMcFontFace;
	src: url(fontmcfontface.woff);
}

@keyframes move {
	from { top: 0px }
	to { top: 10px }
}

:root {
	--main-background-color: papayawhip;
}

body {
	font-family: 'FontMcFontFace', sans-serif;
}

div[class*=demo-] {
	background: var(--main-background-color);
}

/* Lets be clear that this does nothing
all of this CSS does
nothing
*/

#text {
	@media print {
		font-size: 10px;
	}

	@media only screen and (max-width: 500px) {
		font-size: 14px;
		background: papayawhip !important;
	}
}`,
	json: `"object": {
	"string": "string",
	"array": [
		"name",
		"names"
	],
	"object" : {
		"nested": "<div>html</div>"
	}
	"numbers": 1
}
	`,
	yaml: `---
	my_string: &my_string
	my_embed: &my_embed
	 	nested: true
	otherProperty: *my_string
	acceptMerge:
	  <<: *my_embed
	some_string: |
	 	my string
	 	over two lines
	version: 2
	jobs:
	  test:
	    docker:
	      - image: circleci/node:10-browsers
	    steps:
	      - checkout
	      - run: npm config set prefix "$HOME/.local"
	      - run: npm i -g origami-build-tools@^7
	      - run: $HOME/.local/bin/obt install
	      - run: $HOME/.local/bin/obt demo --demo-filter pa11y --suppress-errors
	      - run: $HOME/.local/bin/obt verify
	      - run: $HOME/.local/bin/obt test
	      - run: git clean -fxd
	      - run: npx occ 0.0.0
	      - run: $HOME/.local/bin/obt install --ignore-bower
	      - run: $HOME/.local/bin/obt test --ignore-bower
	  publish_to_npm:
	    docker:
	      - image: circleci/node:10
	    steps:
	      - checkout
	      - run: npx occ \${CIRCLE_TAG##v}
	      - run: echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > $HOME/.npmrc
	      - run: npm publish --access public
	workflows:
	  version: 2
	  test:
	    jobs:
	      - test
	      - publish_to_npm:
	          filters:
	            tags:
	              only: /^v.*/
	            branches:
	              ignore: /.*/`,
	scss: `@import: 'file';
	$something: null !global;
	$url: 'www.url.com' !default;

	%truth {
		color: forestgreen !important;
	}

	@mixin awesomeStyles ($url) {
		background: url($url);
	}

	@function doSomething() {
		@warn 'Doing something!';
		@return lightness(rebeccapurple);
	}

	/* multiline comment begins here

	and ends here */

	.class[data*=data] {
		@include awesomeStyles($url);
		@if ($something == true) {
			@extend %truth;
		} @else {
			@error 'That\'s not true'; //debatable
		}

		&:before {
			margin: 20px;
		}

		#id {
			background: doSomething();
		}
	}`,
	diff: `<div class="o-example o-example--alert o-example--error" data-o-component="o-example">
	<div class="o-example__container">
		<div class="o-example__content">
-			<p class="o-example__highlight">Something went wrong!
+			<p class="o-example__content-main">
+				<span class="o-example__content-highlight">Something went wrong!</span>
-				<span class="o-example__detail">The quick brown fox did not jump over the lazy dogs.</span>
+				<span class="o-example__content-detail">The quick brown fox did not jump over the lazy dogs.</span>
			</p>
+			<p class="o-example__additional-info">Did you know that that sentence uses all of the letters in the alphabet at least once?</p>
-			<p class="o-example__content-additional">Did you know that that sentence uses all of the letters in the alphabet at least once?</p>

			<div class="o-example__actions">
-				<a href="#" class="o-example__action--primary">Button</a>
+				<a href="#" class="o-example__actions__primary">Button</a>
-				<a href="#" class="o-example__action--secondary">Text link</a>
+				<a href="#" class="o-example__actions__secondary">Text link</a>
			</div>
		</div>
	</div>
</div>`,
	bash: `echo $1
	string="I'm a fan of Origami."
	echo \${string:6:3}

	expr 3 + 12

	declare -i number
	number = (2 + 4) * 10

	cat file1 file2 > combined

	exec < file

	this && that

	foo | grep bar
	du -cks * | sort -rn | head

	echo *.txt
	#some comment`,
	inline: `<html>
<head>
	<!-- links and scripts -->
</head>
<body>
	<div class="some-class" data-attribute="value">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consectetur est in urna iaculis tempus.</p>
		<p>Nam faucibus feugiat lectus, <a href="#">sit amet blandit</a> purus bibendum et.</p>
		<button type="button" name="button">Button.</button>
		<span>Comment</span>

	</div>
</body>
</html></code>
</pre>`,
};
