o-share
=======

Social media sharing buttons.

MUST

- Provide the ability to share the current page (ie. location.href).
- Provide the ability to share a given URL (ie. adjacent to a headline + standfirst on a section or index).
- Use a standard set of social media icons (via o-icons).

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

<img src="images/share-counts"/>

TBD

- Share counts.
