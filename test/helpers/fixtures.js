export default {
	json: `
	<div data-o-component="o-syntax-highlight">
		<pre>
			<code class='syntax-json'>
				"object": {
					"array": [
						"string": ""
					]
				}
			</code>
		</pre>
	</div>
	`,
	tokenisedJSON: `
	<pre>
		<code class="syntax-json">
			<span class="token property">"object"</span>
			<span class="token operator">:</span>
			<span class="token punctuation">{</span>
			<span class="token property">"array"</span>
			<span class="token operator">:</span>
			<span class="token punctuation">[</span>
			<span class="token property">"string"</span>
			<span class="token operator">:</span>
			<span class="token string">""</span>
			<span class="token punctuation">]</span>
			<span class="token punctuation">}</span>
		</code>
	</pre>
	`,
	classlessJSON: `
	<div data-o-component="o-syntax-highlight">
		<pre>
			<code>
				"object": {
					"array": [
						"string": ""
					]
				}
			</code>
		</pre>
	</div>
	`,
	unsemanticJSON: `
	<div data-o-component="o-syntax-highlight">
		<pre>
			"object": {
				"array": [
					"string": ""
				]
			}
		</pre>
	</div>
	`
};
