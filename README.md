# Dna Recipe

## Requirements
Silverstripe 4. See 3.0 branch for silverstripe 3 support.

## Getting started
_NOTE: assumes you have node setup and gulp installed. If not, you should go do those things first_

Clone this repo

Using terminal:

	cd your-project
	composer update
	cd themes/default
	npm install
	gulp

Composer dependencies are intentionally not tied to versions, but you should update these to use specific releases before the site you are working on goes live

## Theme
The default theme uses:
* Sass: http://sass-lang.com/
* Gulp: http://gulpjs.com/
* Postcss + autoprefixer: This means we don't need to worry about browser prefixes in our own css. Autoprefixer will add these for us. http://postcss.org/
* Rucksack: "PostCSS CSS super powers library":  http://simplaio.github.io/rucksack/ This lets us do things like clear: fix;
* The PureCSS micro framework: http://purecss.io/ This is included via npm and a gulp task. If your project requires a more fully featured framework, just remove the references to pure.

Basic templates are provided, based on CWP templates using pure as a framework. Delete what you don't need.

## Styleguide

Once you have your silverstripe project setup, the styleguide should be available at:
	http://yourprojectdomain/sg/

Docs for the styleguide are available here: https://github.com/benmanu/silverstripe-styleguide

When you create a new component, please document it in the scss file, as we have in the examples.

## Custom breakpoints

It is recommended you work with the default grid where possible, but sometimes the 3, 5 and 24 grid may not be enough. Adding extra breakpoints and altering the grid units can be managed from the [breakpoints file](themes/default/build/sass/utilities/_var-breakpoints.scss). Please be cautious changing these in non-new projects, as some components are likely to have been built with the breakpoints and grid units as they are.

## Working with svgs

This recipe provides 2 ways of working with svgs:
* inline in the html (via [silverstripe-svg](https://github.com/stevie-mayhew/silverstripe-svg))
* inline in the css (via [postcss-inline-svg](https://github.com/TrySound/postcss-inline-svg))

Both of these allow for a limited amount of attribute changes in context (fill, stroke, etc).
We use gulp-svgmin to optimize all svgs stored in the images/svg directory

## Frontend coding guidelines
Our guidelines are available in the [theme directory](themes/default/README.md)
