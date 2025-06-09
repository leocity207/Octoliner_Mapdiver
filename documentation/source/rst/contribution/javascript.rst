Javascript codding Guidlines
============================

Exception
---------
	Exception should always send and Error object

Naming
------

variable should be named using `snake_case`
function and class should be named using `Snake_Case`


comments
--------

comment should be done the same way as jsdoc

	.. code-block:: javascript

		/**
		 * Base documentation
		 * @param {Type} param documentation
		 * @return return documentation
		 */
		...

Indentation
-----------

	Base indentation should be made with tabulation
	stylistic indentation should use space

Node class
----------
class that extend a HtmlElement should follow some rules
everything that can be reused should be place inside template

	.. code-block:: javascript

		static s_template = (() => {
			const template = document.createElement('template');
			...
			template.content.append(...);
			return template;
		})();
		...

All those class should have a factory to create them and initialize attributes

	.. code-block:: javascript

		static Create(arg) {
			const object = document.createElement('line-schedule');
			object.m_arg = arg;
			return object;
		}
		...

a render function should exist to render the whole object unless optimisation is really necessary

	.. code-block:: javascript

		Render() {
			// Clear existing content
			while (this.shadowRoot.firstChild)
				this.shadowRoot.removeChild(this.shadowRoot.firstChild);

			// Clone and append the template content
			this.shadowRoot.appendChild(document.importNode(My_Class.template.content,true));
		}
		...

connectedCallback and disconnectedCallback should be use to render the node (other function may render the node when the internal state change)

	.. code-block:: javascript

		connectedCallback() {
			this.Render();
		}

	...

Class organisation
------------------

classes should be ordered as follow:
	* attributes
	* static attributes
	* constructor
	* static factory
	* members
	* static members
