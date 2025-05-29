import { Subject } from "/src/../libraries/RxJS_wrapper.js";
import MixHTMLElementWith from "/src/utils/MixHTMLElement.js";
import Observable  from "/src/utils/mixHTMLElement.js";
import Utils from "/src/utils/utils.js";
import Hamburger from "/src/components/hamburger.js"
import Search_Bar from "/src/components/search_bar.js"

/**
 * The **Sticky Header** is a user interface element that remains fixed at the top of the page, ensuring important navigation components are always accessible, even as the user scrolls.
 * 
 * Structure
 * ---------
 * 
 * The Sticky Header consists of three key components:
 *
 * - **Left Section:** A **hamburger menu** that triggers a click event when selected.
 * - **Center Section:** A **search bar** that accepts a list of searchable elements and emits an event when an item is selected.
 * - **Right Section:** A **logo** that can be displayed for branding purposes.
 * 
 *	<header class="sticky-header">
 *		<Hamburger>
 *		<Search_Bar>
 *		<img>
 *	</header>
 *
 */
export default class Sticky_Header extends MixHTMLElementWith(Observable) {

	static template = (() => {
		const template = document.createElement('template');

		const header = Utils.Create_Element_With_Class('header','sticky-header');

		const hamburger = Hamburger.Create("left-panel-hamburger");

		const search_bar = Search_Bar.Create("main-search-bar");
		const logo = document.createElement("img");
		logo.setAttribute("src", "resources-config/image/logo.svg");

		header.append(hamburger, search_bar, logo);
		template.content.append(header);
		return template;
	})();

	/**
	 * Factory cronstructor of Sticky_Header
	 * @returns Sticky_Header instance
	 */
	static Create() {
		return document.createElement("sticky-header");
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		Utils.Add_Stylesheet(this.shadowRoot, "style/sticky-header.css");
		Utils.Clone_Node_Into(this.shadowRoot, Sticky_Header.template);
	}

	/**
	 * Initializes autocomplete functionality with a list of suggestions.
	 * @param {Array<string>} match_list - List of suggestions.
	 */
	Set_Autocomplete_List(match_list) {
		Utils.Get_Subnode(this.shadowRoot,"search-bar").Set_Autocomplete_List(match_list);
		return Search_Bar.Get_Observable("main-search-bar");
	}
}

// Define the custom element
customElements.define("sticky-header", Sticky_Header);