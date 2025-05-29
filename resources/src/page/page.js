import Displayable from "/src/utils/displayable.js";
import Utils from "/src/utils/utils.js";

/**
 * Page are displayable element generaly found inside an App, they are gracefull container
 * 
 *  this class create a custome element named "app-page"
 */
export default class Page extends Displayable
{
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		Utils.Add_Stylesheet(this.shadowRoot, 'style/app.css')
	}

	/**
	 * Create a Page object and initialize it.
	 * 
	 * @returns {Page} an Page Object
	 */
	static Create() {
		return document.createElement("app-page");
	}
}

customElements.define("app-page", Page);
