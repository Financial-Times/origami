o-share
=======

Social media sharing buttons.

MUST

- Provide the ability to share the current page (ie. location.href).
- Provide the ability to share a given URL (ie. adjacent to a headline + standfirst on a section or index).
- Use a standard set of social media icons (via o-icons).
- Provide a copyable representation of a link 
- Provide a means to copy that link to a clipboard - @dansearle-ft says, 'Does this mean doing the actual copying to the clipboard for you, or just pre-selecting the link in an input? The latter seems to be beyond what the FastFT page does at the moment.'

```html
<ul data-o-component="o-share" data-o-version="0.1.0" class="o-share">
    <li>
        <a class="o-share__action" href="https://twitter.com/intent/tweet?text={{headline}}&url={{url}}">
            Share this on Twitter
        </a>
    </li>
    ... 
</ul>
```

<img src="images/share-buttons.png"/>

<img src="images/share-tweet.png"/>

<img src="images/share-counts.png"/>

TBD

- Share counts.
- Someone mentioned that some products (Ie, ft.com) do the bit.ly API request
  on the client. I'd be dubious about implementing that.
