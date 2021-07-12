# New Component: Tag Input
## What

Tag Input is a working title, but lots of people have a similar interface for selecting multiple things, whether they're tags or topics or something else. It's really difficult to describe this component in words, but you'll know what I mean when you see it:

<img width="442" alt="Example of component from the Graphics Hub" src="https://user-images.githubusercontent.com/10405691/64521164-6846d500-d2ef-11e9-9e18-ba3d7cd12485.png">

The whole component is styled to look a bit like a text input or textarea. There's an _actual_ text input at the end (often an [autocomplete](https://github.com/Financial-Times/origami/issues/5)) which is styled to look like part of the background. When the `return` key is pressed after entering text, or an autocomplete option is selected, then a new visual representation of the text or item is added in front of the text input. Each item also has a button which removes it from the list.

## Why

These are used a lot around the FT, there's a definite user need. Often these are custom-built or use a third-party, the experience is inconsistent across FT products and we have no idea if they're accessible or resilient.

I think this is separate from an [autocomplete](https://github.com/Financial-Times/origami/issues/5), because an autocomplete can exist without this tag adding behaviour. By building a separate component we don't enforce tags being autocompleted, but you could add autocomplete functionality to the input if you need it.

## Supporting Examples

These are mostly taken from the separate autocomplete proposal.

### Graphics hub

I think we shouldn't implement the "suggestions" area below, but we _should_ offer a JavaScript API which would allow people to implement this. (e.g. `tagInput.add('thing')`)

<img width="442" alt="Screenshot 2019-05-31 at 11 47 35" src="https://user-images.githubusercontent.com/10405691/64521164-6846d500-d2ef-11e9-9e18-ba3d7cd12485.png">

###  BizOps

<img width="630" alt="Screenshot 2019-05-31 at 11 58 27" src="https://user-images.githubusercontent.com/10405691/64521158-641ab780-d2ef-11e9-8328-7433d140f0f7.png">

### Enterprise tools

We might need the character splitting to be configurable. For emails it makes sense for space to create a new tag, but not necessarily for other things. E.g. topics might be allowed to contain spaces.

<img width="621" alt="Screenshot 2019-05-31 at 11 45 32" src="https://user-images.githubusercontent.com/10405691/64521201-7eed2c00-d2ef-11e9-980b-3c321a11c0f7.png">

### Fotoware

Originally mentioned by @adgad in the autocomplete proposal:
> We have a use case for something similar in Spark. When search Fotoware for images, our users want to easily search for multiple combined search terms (like "Donald Trump" "Boris Johnson"), without having to use quotes or fancy syntax. In Fotoware, this is done by adding search terms as tag-like things by pressing enter. We've replicated something like that in Spark. In our case, it's not from a known set of terms, so there's no autocomplete required.

<img width="477" alt="Screenshot 2020-02-07 at 14 20 11" src="https://user-images.githubusercontent.com/1978880/74038818-accabf80-49b8-11ea-9840-71d959d1bacd.png">


### TagMe

This doesn't behave in exactly the same way, but it almost certainly should for consistency. The concept is the same: type in a box, select an option, little tag gets created.

<img width="446" alt="Screenshot 2019-05-31 at 12 07 42" src="https://user-images.githubusercontent.com/10405691/64521145-5c5b1300-d2ef-11e9-9431-a5be48f46a7d.png">

### Lodestar

This feels different, I don't think this component should cater for selecting items in dropdowns and creating filters. Maybe the little lozenge/tag thing is another separate component though?

![image](https://user-images.githubusercontent.com/10405691/64521218-8a405780-d2ef-11e9-8627-19ee1b605069.png)


