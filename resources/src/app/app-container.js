import App from './app.js';
import Utils from '../utils/utils.js';


/**
 * App_container are element that display *Apps*.
 * When more than one *App* is added to the container  it create a left bare side to switch between app.
 * When multiple *App* are being used it is recommended to set the Icon inside the *App* in order to display it inside the left bare side.
 * Every element contained inside the container is inside a ShadowDom
 * This class create a custome element named "app-container"
 *
 * Structure
 * ---------
 * .. code-block:: html
 *
 * 	<div class='app-window'>
 * 		Main app window
 * 	</div>
 * 	<div class='panel'>
 *  	List of app you can switch on
 * 	</div>
 */
class App_Container extends HTMLElement
{
	/**
	 * The list of app inside the container
	 */
	app_list = [];

	/**
	 * The current `App` being displayed
	 */
	current_app = undefined;

	/**
	 * the panel node displaying selectable app
	 */
	panel = undefined;

	/**
	 * the main canva for the `App`
	 */
	app_window = undefined;

	/**
	 * Base template for panel and main app
	 */
	static template_base = (() => {
		const template = document.createElement('template');

		let app_window = Utils.Create_Element_With_Class('div', 'app-window');
		let panel = Utils.Create_Element_With_Class('div', 'panel');
		panel.style.display = 'none';

		template.content.append(app_window, panel);
		return template;
	})();

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		Utils.Add_Stylesheet(this.shadowRoot, "style/app-container.css");
		Utils.Clone_Node_Into(this.shadowRoot,App_Container.template_base);
	}

	/**
	* create an App_Container object and initialize it ready to be added to the DOM
	*
	* @return a new instance App_Container ready to be added to the DOM
	*/
	static Create() {
		return document.createElement("app-container");
	}

	/**
	 * Called when node is connected to the dom
	 */
	connectedCallback() {
		this.Render();
	}

	/**
	* add a new app to the container
	* @param {App} new_app the App that should  be added to the container
	*/
	Add_App(new_app) {
		if(!new_app instanceof App)
			throw Error("new_app parameter should be an App object");
		this.app_list.push(new_app);
		this.Render();
	}

	/**
	 * Initialize the DOM of the App_Container element
	 *
	 * When the number of App in the container is superior to 1, it display a left bar to switch between App.
	 *
	 * Call this method should be done after the DOM is ready or when the list of App changed.
	 */
	Render() {
		this.panel = Utils.Get_Subnode(this.shadowRoot, '.panel');
		this.app_window = Utils.Get_Subnode(this.shadowRoot, '.app-window');

		if(this.app_list.length > 1)
			this.panel.style.display = 'block';
		for(let app of this.app_list)
			this.app_window.appendChild(app);
	}
}

customElements.define("app-container", App_Container);

export default App_Container;
