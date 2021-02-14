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
@import '../node_modules/font-face-generator/mixin';
```````

<details>
  <summary>Deprecated 1.0 syntax</summary>

This is version 1.0.x syntax, I recommend using the mixin syntax from now on.

```````scss
@import '../node_modules/font-face-generator/generator';
```````

(Version 1.1.x is backwards compatible with version 1.0.x)
</details>


## Usage

Just importing the file won't do anything on it's own, you will need to assign some custom settings.

### The `$fonts` setting

The `$fonts` setting is where the majority of the magic happens. The `$fonts` setting follows this basic format:

````````````scss
@import '../node_modules/font-face-generator/mixin';

@include font-face((
  'Font family name' : (
    [weight 1] : 'font-file-name-1',
    [weight 2] : (
      [font-style 1] : 'font-file-name-2',
      [font-style 2] : 'font-file-name-3'
    )
  )
));
````````````

<details>
  <summary>Deprecated 1.0 syntax</summary>

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

</details>

That might look a little confusing. Here is a proper example using Open Sans:

````````````scss
@import '../node_modules/font-face-generator/mixin';

@include font-face((
  'Open Sans' : (
    300 : 'open-sans-light',
    400 : (
      normal : 'open-sans-normal',
      italic : 'open-sans-normal-italic'
    ),
    600 : 'open-sans-semibold',
    700 : 'open-sans-bold'
  )
));
````````````

<details>
  <summary>Deprecated 1.0 syntax</summary>

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

</details>

That code will generate this css:

``````css
@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("../fonts/Open-Sans/open-sans-light.woff") format("woff");
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("../fonts/Open-Sans/open-sans-normal.woff") format("woff");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("../fonts/Open-Sans/open-sans-normal-italic.woff") format("woff");
  font-weight: 400;
  font-style: italic;
}
@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("../fonts/Open-Sans/open-sans-semibold.woff") format("woff");
  font-weight: 600;
  font-style: normal;
}
@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("../fonts/Open-Sans/open-sans-bold.woff") format("woff");
  font-weight: 700;
  font-style: normal;
}
``````

[Read this](https://www.paulirish.com/2010/font-face-gotchas/#smiley) if you are confused by the smiley face.

With the `$fonts` setting, first you state what the font family name is. One thing to note about the font family name though is that **any spaces in the font name will get converted to dashes in the url** (more about the url path in the next section).

Under the font family name is a sass map. The keys of the map are for the font-weights. The value associated with each font weight is either the file name for that font weight as a string or another Sass map.

If the value is a string, the `font-style` for that font weight will default to `normal`. If the value is a Sass map, it will read each key of the map as the font-style and each value in the map as the file name.

If you have multiple fonts you can do this:

````````````scss
@import '../node_modules/font-face-generator/mixin';

@include font-face((
  'Font One' : (
    400 : 'font-one'
  ),
  'Font Two' : (
    400 : 'font-two'
  )
));
````````````

<details>
  <summary>Deprecated 1.0 syntax</summary>

````````````scss
$fonts: (
  'Font One' : (
    400 : 'font-one'
  ),
  'Font Two' : (
    400 : 'font-two'
  )
);

@import '../node_modules/font-face-generator/generator';
````````````

</details>

That code will generate this css:

```````````css
@font-face {
  font-family: "Font One";
  src: local("☺"), url("../fonts/Font-One/font-one.woff") format("woff");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "Font Two";
  src: local("☺"), url("../fonts/Font-Two/font-two.woff") format("woff");
  font-weight: 400;
  font-style: normal;
}
```````````

### The `$font-file-types` / `$types` setting

By editing the `$font-file-types` setting, you can load up different file types than the default `woff` file type. The `woff` file type has very strong browser support even being supported in IE 9. It is a much heavier font file type than the more modern `woff2` file format though so you will probably want to have both `woff` and `woff2` versions of your font. Here is how to make modern browsers load `woff2` and old browsers load `woff`:

````````````scss
@import '../node_modules/font-face-generator/mixin';

@include font-face(
  $fonts: (
    'Open Sans' : (
      300 : 'open-sans-light'
    )
  ),
  $types: 'woff2' 'woff'
);
````````````

<details>
  <summary>Deprecated 1.0 syntax</summary>

````````````scss
$fonts: (
  'Open Sans' : (
    300 : 'open-sans-light'
  )
);

$font-file-types: 'woff2' 'woff';

@import '../node_modules/font-face-generator/generator';
````````````
</details>

That will generate this css:

``````````css
@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("../fonts/Open-Sans/open-sans-light.woff2") format("woff2"), url("../fonts/Open-Sans/open-sans-light.woff") format("woff");
  font-weight: 300;
  font-style: normal;
}
``````````

However, what if you don't have the woff2 files for one of your fonts? This is where the mixin has an advantage over the old 1.0 syntax. Instead of making the browser go looking for files that don't exist, you can do this:

````````````scss
@import '../node_modules/font-face-generator/mixin';

// Globally set the generator to use ('woff2' 'woff') by default
$font-file-types: 'woff2' 'woff';

@include font-face(
  $fonts: (
    'Open Sans' : (
      300 : 'open-sans-light'
    )
  )
);

@include font-face(
  $fonts: (
    'Another Font' : (
      400 : 'other-normal'
    )
  ),
  // overide the default file types setting
  $types: 'woff'
);
````````````

To generate this css:

`````css
@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("../fonts/Open-Sans/open-sans-light.woff2") format("woff2"), url("../fonts/Open-Sans/open-sans-light.woff") format("woff");
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: "Another Font";
  src: local("☺"), url("../fonts/Another-Font/other-normal.woff") format("woff");
  font-weight: 400;
  font-style: normal;
}
`````

### The `$fonts-path` / `$path` setting

The default setting for this is `../fonts`. This is to make it compatible with as many folder structures as possible. As long as you have a folder structure that is something like the following then you won't need to change the `$fonts-path` / `$path` setting.

> Default expected folder structure:
>
> - _[folder holding front end assets]_
>   - `fonts`
>     - _[font name folder]_
>       - _[font files]_
>   - _[css folder]_
>     - _[css file]_

If the default `$fonts-path` setting doesn't work with your folder structure, then you can alter the `$fonts-path` setting to use a different path.

````````````scss
@import '../node_modules/font-face-generator/mixin';

@include font-face(
  $fonts: (
    'Open Sans' : (
      300 : 'open-sans-light'
    )
  ),
  $path: '/path/to/fonts',
);
````````````


<details>
  <summary>Deprecated 1.0 syntax</summary>

````````````scss
$fonts: (
  'Open Sans' : (
    300 : 'open-sans-light'
  )
);

$fonts-path: '/path/to/fonts';

@import '../node_modules/font-face-generator/generator';
````````````

</details>

That will generate this css:

``````````css
@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("/path/to/fonts/Open-Sans/open-sans-light.woff") format("woff");
  font-weight: 300;
  font-style: normal;
}
``````````

Like the `$font-file-types` setting, this can be defined globally to avoid having to state the `$path` setting multiple times when using the mixin multiple times.

````````````scss
@import '../node_modules/font-face-generator/mixin';

// Set a global default path
$fonts-path: '/path/to/fonts';

@include font-face(
  $fonts: (
    'Open Sans' : (
      300 : 'open-sans-light'
    )
  )
);

@include font-face(
  $fonts: (
    'Another Font' : (
      400 : 'other-normal'
    )
  ),
  //override the default path
  $path: '/different/path/to/fonts'
);
````````````

Produces this css:

``````````css
@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("/path/to/fonts/Open-Sans/open-sans-light.woff") format("woff"), url("/path/to/fonts/Open-Sans/open-sans-light.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: "Another Font";
  src: local("☺"), url("/different/path/to/fonts/Another-Font/other-normal.woff") format("woff");
  font-weight: 400;
  font-style: normal;
}
``````````

### Custom @font-face properties

Custom properties is a unique advantage that the mixin format has over the old 1.0 syntax. If there is a particular css `@font-face` property that this mixin doesn't add automatically, you can easily add it yourself by adding it to the `@content` section of the mixin.

So for example, let's say that you are working on a multilingual site and you want to take advantage of the `unicode-range` feature in `@font-face`. The font-face-generator mixin doesn't support `unicode-range` out of the box. You can support `unicode-range` by doing this:

````````````scss
@import '../node_modules/font-face-generator/mixin';

@include font-face((
  'Open Sans' : (
    300 : 'open-sans-light',
    400 : (
      normal : 'open-sans-normal',
      italic : 'open-sans-normal-italic'
    ),
    600 : 'open-sans-semibold',
    700 : 'open-sans-bold'
  )
)){
  unicode-range: U+0025-00FF;
};
````````````

That will produce this css:

``````css
@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("../fonts/Open-Sans/open-sans-light.woff") format("woff");
  font-weight: 300;
  font-style: normal;
  unicode-range: U+0025-00FF;
}
@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("../fonts/Open-Sans/open-sans-normal.woff") format("woff");
  font-weight: 400;
  font-style: normal;
  unicode-range: U+0025-00FF;
}
@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("../fonts/Open-Sans/open-sans-normal-italic.woff") format("woff");
  font-weight: 400;
  font-style: italic;
  unicode-range: U+0025-00FF;
}
@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("../fonts/Open-Sans/open-sans-semibold.woff") format("woff");
  font-weight: 600;
  font-style: normal;
  unicode-range: U+0025-00FF;
}
@font-face {
  font-family: "Open Sans";
  src: local("☺"), url("../fonts/Open-Sans/open-sans-bold.woff") format("woff");
  font-weight: 700;
  font-style: normal;
  unicode-range: U+0025-00FF;
}
``````

## Contributing

Please make PRs against `develop` branch rather than `master` branch.

### Writing tests

Please make tests for your changes. Avoid modifying existing tests, it is better to make new ones (though this isn't always practical for `generator.test.scss`).

Write tests for your changes in `tests/mixin/mixin.test.scss` and `tests/generator/generator.test.scss`.

`npm i` to install packages, `npx gulp` to generate the CSS from the test scss files.

Use git to compare the old CSS output with the new CSS output. If git identifies any changes, check that those changes are expected.
