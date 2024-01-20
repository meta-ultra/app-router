# template Example

This example will demonstrates how to use template.

It's not an easy job to tell the layout and template apart, both of them are able to get rid of code duplication. However, the main difference between them is about state.

- Layout aims at state sharing, while template is for separated state.
- Only the page is suppose to have template. (If apply template to layout, the state of template will be sharing amongst all sub routes)
