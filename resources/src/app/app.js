import Loader from '../loader/loader.js';
import Page from '../page/page.js'; 
import Displayable from '../utils/displayable.js';
import Utils from '../utils/utils.js';


/**
 * App object that represent a working app
 * 
 * App are made of two thing A main page node object and a loader animation displayed
 * 
 * App register a "Loading" and "Done" event to display loading element
 * 
 * Every element inside the App is inside a ShadowDom
 * 
 * App define a custom element named "app-app"
*/
class App extends Displayable
{
	/**
	 * The loader node that can be display when the page is loading
	 */
	loader = undefined;

	/**
	 * The main page to display inside the app
	 */
	main_page = undefined;

	/**
	 * icon of the app to display inside the App container
	 */
	icon = undefined;

	/////////
	/// CTOR
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	/**
	 * create an App object and initialize it
	 * @param {Loader} loader 
	 * @param {Page} main_page 
	 * @param {Icon} icon 
	 * @returns {App} a new instance App (it should be added to the dom via an App_Container object)
	 */
	static Create(loader, main_page, icon) {
		let elt = document.createElement("app-app");
		elt.loader = loader;
		elt.main_page = main_page;
		elt.icon = icon;
		return elt;
	}

	/**
	 * Called when node is connected to the dom
	 */
	connectedCallback() {
		this.Render();
	}

	/**
	 * Show the page and Hide the loader
	 */
	Loaded() {
		this.main_page.Show();
		this.loader.Hide();
	}

	/**
	 * Hide the page and show the loader
	 */
	Loading() {
		this.main_page.Hide();
		this.loader.Show();
	}

	/**
	 * get the Page of the App
	 * @return {Page} the page of the App
	 */
	get Page() 
	{
		return this.main_page;
	}

	Render() {
		Utils.Empty_Node(this.shadowRoot);

		Utils.Add_Stylesheet(this.shadowRoot,"style/app.css")
		this.shadowRoot.appendChild(this.loader);
		this.shadowRoot.appendChild(this.main_page);
	}
}

customElements.define("app-app", App);

export default App;
