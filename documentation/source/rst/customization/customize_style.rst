.. _customizing_styles:

Styles
======

The `style/` directory contains the following CSS files for font customization:

- **map-font.css**: Defines the font styling for the map interface.
- **text-font.css**: Controls the fonts used for textual content.
- Other files referenced from these.

Modify these files to change typography and improve branding consistency.

generaly it is expected that this look like

.. code-block:: css

	@font-face {
		font-family: "Avenir";
		src: url('/resources-config/style/Inter.otf');
	}

	div, input{
		font-family: 'Avenir';
		font-weight: 300;
		letter-spacing: -0.5px;
	}

	strong {
		font-family: 'Avenir';
		font-weight: 400;
		letter-spacing: -0.5px;
	}