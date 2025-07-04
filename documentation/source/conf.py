# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'Octoliner-Mapdiver'
copyright = '2025, Léo Cluzel'
author = 'Léo Cluzel'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = ['sphinx_js',"sphinx.ext.graphviz"]

templates_path = ['_templates']
exclude_patterns = []



# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'sphinx_rtd_theme'
html_static_path = []

# js-doc variable
js_source_path = [
	'../../resources/src/app',
	'../../resources/src/loader',
	'../../resources/src/map',
	'../../resources/src/page',
	'../../resources/src/utils',
	'../../resources/resources-config/',
	'../../resources/src/components',
	'../../resources/src/right-panel',]
root_for_relative_js_paths = './'