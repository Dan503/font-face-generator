# font-face-generator

Writing custom `@font-face` code is a huge pain. It is extremely repetitive and requires a lot of typing for each font style and font weight you wish to add to your site.

There is the [Font-Squirrel generator](https://www.fontsquirrel.com/tools/webfont-generator) but it doesn't take font-weight and font-style into consideration when generating the `@font-face` code. It just generates each font as a separate font family. This means that when writing styles, you can't just write `font-weight: bold`, you have to write `font-family: "font-name-bold"`. If the font name is long then that's a lot of extra characters you will need to write over and over again. It's simply not letting you write your styles in the way they are meant to be written.

With that in mind, I created a generator powered by SCSS that handles all the repetitive `@font-face` code for you.

## Installation

```````
npm install font-face-generator --save
```````

Then add this line to your main SCSS file (the exact path will vary based on your folder structure).

```````scss
@import '../node_modules/font-face-generator/generator';
```````

## Usage

Just importing the file won't do anything on it's own, you will need to assign some custom settings. To assign settings, declare them before the `@import` statement.

### The `$fonts` setting

Let's start off with the `$fonts` variable, this is where the majority of the magic happens. The `$fonts` variable follows this basic format:

````````````scss
$fonts: (
    'Font family name' : (
        [weight 1] : 'font-file-name-1',
        [weight 2] : (
            [font-style 1] : 'font-file-name-2',
            [font-style 2] : 'font-file-name-3'
        )
    )
);

@import '../node_modules/font-face-generator/generator';
````````````

That might look a little confusing. Here is a proper example using Open Sans:

````````````scss
$fonts: (
    'Open Sans' : (
        300 : 'open-sans-light',
        400 : (
            normal : 'open-sans-normal',
            italic : 'open-sans-normal-italic'
        ),
        600 : 'open-sans-semibold',
        700 : 'open-sans-bold'
    )
);

@import '../node_modules/font-face-generator/generator';
````````````

That code will generate this css:

``````css
@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("/assets/fonts/Open-Sans/open-sans-light.woff") format("woff");
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("/assets/fonts/Open-Sans/open-sans-normal.woff") format("woff");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("/assets/fonts/Open-Sans/open-sans-normal-italic.woff") format("woff");
  font-weight: 400;
  font-style: italic;
}

@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("/assets/fonts/Open-Sans/open-sans-semibold.woff") format("woff");
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("/assets/fonts/Open-Sans/open-sans-bold.woff") format("woff");
  font-weight: 700;
  font-style: normal;
}
``````

[Read this](https://www.paulirish.com/2010/font-face-gotchas/#smiley) if you are confused by the smiley face.

The idea with the `$fonts` variable is that first you state what the font family name is. One thing to note about the font family name though is that any spaces in the name will get converted to dashes in the url (more about the url path in the next section).

Under the font family name is a sass map. The keys of the map are for the font-weights. The value associated with each font weight is either the file name for that font weight as a string or another Sass map.

If the value is a string, the `font-style` for that font weight will default to `normal`. If the value is a Sass map, it will read each key of the map as the font-style and each value in the map as the file name.

If you have multiple fonts you can do this:

````````````scss
$fonts: (
    'Font One' : (
        400 : 'font-one'
    ),
    'Font Two' : (
        400 : 'font-one'
    )
);

@import '../node_modules/font-face-generator/generator';
````````````

That code will generate this css:

```````````css
@font-face {
  font-family: "Font One";
  src: local("☺"), url("/assets/fonts/Font-One/font-one.woff") format("woff");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Font Two";
  src: local("☺"), url("/assets/fonts/Font-Two/font-one.woff") format("woff");
  font-weight: 400;
  font-style: normal;
}
```````````


### The `$fonts-path` setting

Everyones folder structure is different so you will probably want to use a different path in the url than the default one. That is what the `$fonts-path` setting is for.

````````````scss
$fonts: (
    'Open Sans' : (
        300 : 'open-sans-light'
    )
);

$fonts-path: '/path/to/fonts';

@import '../node_modules/font-face-generator/generator';
````````````

That will generate this css:

``````````css
@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("/path/to/fonts/Open-Sans/open-sans-light.woff") format("woff");
  font-weight: 300;
  font-style: normal;
}
``````````

### The `$font-file-types` setting

By editing the `$font-file-types` you can load up different file types than the default `woff` file type. Just note that **this setting affects all font families**. The `woff` file type has very strong browser support even being supported in some old IE's so you shouldn't need to load anything else. If you wish to load alternate font file types though, you can do something like this:

````````````scss
$fonts: (
    'Open Sans' : (
        300 : 'open-sans-light'
    )
);

$font-file-types: 'woff' 'woff2';

@import '../node_modules/font-face-generator/generator';
````````````

That will generate this css:

``````````css
@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("/assets/fonts/Open-Sans/open-sans-light.woff") format("woff"), url("/assets/fonts/Open-Sans/open-sans-light.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
}
``````````
