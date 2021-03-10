# Standardising live blog teasers labels (and hierarchy).

## motivation

> Since live blog is now powered by Spark, editorial have the capabilities and desire to run more than one live blog at once. This results in multiple teasers within the hompage hero slice and top stories linking to individual live blogs.


## explanation

> When the teaser is defined as a live blog, the live label is generated and generically placed in an obscure position, which has the following design impact for editorial users as well as readers:
> - The hireachy of information becomes unclear, as the teaser with the red solid background dominates the visual hierachy. eg. when a new live blog is created and placed in the leading hero position, it feels less important than big red block in the top stories strip.
> - The positioning of the actual 'live' label itself is stacked obscurely ontop of the topic tag
> - The hompage BETA is testing using a similar solution, where live labels are displayed as tags in the meta-data area of the teaser
> (see screenshots in supporting examples) 

## work required
> - Create a new pattern with the live label housed in a red background (to give it a meta data tag like feel)
> - If the teaser postion selected utilises an image; place the tag in the top left corner of the image
> - If the teaser postion selected does not utilise an image; place the tag along side the topic tag, with adequate spacing
> 
> Here are examples of the proposed design:
<img width="1440" alt="Live tag - p1" src="https://user-images.githubusercontent.com/62945037/110628471-f2991f00-819a-11eb-88be-51c6cfcd01dc.png">

<img width="1440" alt="Live tag - p2" src="https://user-images.githubusercontent.com/62945037/110628481-f6c53c80-819a-11eb-8a7c-c1f97fc9221d.png">


## alternatives

> An alternative would be to just remove the ostentatious red background on the live teaser that appears in the top stories strip
> - This is a weak solution though, as it won't fix that conflict with the topic tag.

## supporting examples

> This is an example of what happened when editorial ran multiple live blogs
![image (3)](https://user-images.githubusercontent.com/62945037/110627597-16a83080-819a-11eb-87ff-3b296fa22715.png)

> This is what is being tested on the homepage BETA
![Live tag example 2 -L](https://user-images.githubusercontent.com/62945037/110628288-bfef2680-819a-11eb-9ffb-092ba1d2c170.png)


## notes

> 
