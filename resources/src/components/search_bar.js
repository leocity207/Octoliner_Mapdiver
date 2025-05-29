import Observable from "/src/utils/Observable.js";
import MixHTMLElementWith from "/src/utils/MixHTMLElement.js";
import Utils from "/src/utils/utils.js"

/**
 * Search bar can be used to display research help 
 * 
 * Structure
 * ---------
 *	<input class='search-bar'>
 *	<div class="autocomplete-items">
 *		<div>
 *			<strong>
 *				* for the text that math
 *			</strong> 
 *				* leftover of the text
 *			<input type="hidden" value="">
 *		</div>
 *	</div>
 */
export default class Search_Bar extends MixHTMLElementWith(Observable) {

	/**
	 * Base template for the round cross wich contain the circle and the cross
	 */
	static template = (() => {
		const template = document.createElement('template');

		const search_bar =Utils.Create_Element_With_Class('input','search-bar');
		search_bar.setAttribute("placeholder", "Recherche par ligne/gare");

		template.content.append(search_bar);
		return template;
	})();

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		Utils.Add_Stylesheet(this.shadowRoot, "style/search-bar.css");
		Utils.Clone_Node_Into(this.shadowRoot, Search_Bar.template);
	}

	/**
	 * Factory cronstructor of Round_Cross
	 * @param {Symbol} name 
	 * @returns Round_Cross
	 */
	static Create(name) {
		let object = document.createElement("search-bar");
		object.Observable_Init(name);
		return object;
	}

	/**
	 * Called when node is connected to the DOM
	 */
	connectedCallback() {
		this.Observable_connectedCallback();
		this.addEventListener("click", () => {
			Utils.Get_Subnode(this.shadowRoot,".search-bar").classList.toggle("active");
		});
	}

	/**
	 * Called when node disapear from the dom
	 */
	disconnectedCallback() {
		this.removeEventListener("click", () => {
			Utils.Get_Subnode(this.shadowRoot,".search-bar").classList.toggle("active");
		});
	}

	/**
	 * Initializes autocomplete functionality with a list of suggestions.
	 * @param {Array<string>} match_list - List of suggestions.
	 */
	Set_Autocomplete_List(match_list) {
		this._autocomplete_match_list = match_list;
		this._autocomplete_container = null;
		this._current_focus = -1;

		const search_input = Utils.Get_Subnode(this.shadowRoot, "input");

		search_input.addEventListener("input", () => this._onInput(search_input));
		search_input.addEventListener("keydown", (e) => this._onKeyDown(e, search_input));
		document.addEventListener("click", (e) => this._onDocumentClick(e, search_input));
	}

	/**
	 * Handles input changes and shows matching suggestions.
	 * @param {HTMLInputElement} search_input
	*/
	_onInput(search_input) {
		const val = search_input.value;
		this._closeAutocompleteList();

		if (!val) return;

		this._current_focus = -1;
		this._autocomplete_container = document.createElement("div");
		this._autocomplete_container.setAttribute("class", "autocomplete-items");
		search_input.insertAdjacentElement("afterend", this._autocomplete_container);

		for (const match of this._autocomplete_match_list
			.filter(m => m.toUpperCase().startsWith(val.toUpperCase()))
			.slice(0, 5)) {
			if (match.toUpperCase().startsWith(val.toUpperCase())) {
				this._autocomplete_container.appendChild(
					this._createSuggestionElement(match, val, search_input)
				);
			}
		}
	}

	/**
	 * Creates a suggestion DOM element.
	 * @param {string} match - The suggestion value.
	 * @param {string} val - Current input value.
	 * @param {HTMLInputElement} search_input - The search input element.
	 * @returns {HTMLElement}
    */
	_createSuggestionElement(match, val, search_input) {
		const suggestion = document.createElement("div");

		const strong = document.createElement("strong");
		strong.textContent = match.substr(0, val.length);
		suggestion.appendChild(strong);

		suggestion.appendChild(document.createTextNode(match.substr(val.length)));

		const hiddenInput = document.createElement("input");
		hiddenInput.type = "hidden";
		hiddenInput.value = match;
		suggestion.appendChild(hiddenInput);

		suggestion.addEventListener("click", () => {
			search_input.value = "";
			this._closeAutocompleteList();
			this.Emit(hiddenInput.value);
		});

		return suggestion;
	}

	/**
	 * Highlights the focused autocomplete item.
	 *
	 * @param {HTMLCollectionOf<Element>} items
	 * @private
	 */
	_highlightItem(items) {
		Array.from(items).forEach(node => node.classList.remove("autocomplete-active"));
		if (this._current_focus >= 0 && this._current_focus < items.length) {
			items[this._current_focus].classList.add("autocomplete-active");
		}
	}

	/**
	 * Handles key navigation (arrow and enter) on the input.
     * @param {KeyboardEvent} e
     * @param {HTMLInputElement} input
    */
	_onKeyDown(e, input) {
		if (!this._autocomplete_container) return;

		const items = this._autocomplete_container.getElementsByTagName("div");
		if (!items.length) return;

		switch (e.key) {
			case "ArrowDown":
				this._current_focus = (this._current_focus + 1) % items.length;
				this._highlightItem(items);
				break;

			case "ArrowUp":
				this._current_focus = (this._current_focus - 1 + items.length) % items.length;
				this._highlightItem(items);
				break;

			case "Enter":
				e.preventDefault();
				if (this._current_focus >= 0 && this._current_focus < items.length) {
					items[this._current_focus].click();
				}
				break;

			default:
				break;
		}
	}

	/**
    * Closes the autocomplete suggestion list.
    */
	_closeAutocompleteList() {
		if (this._autocomplete_container) {
			this._autocomplete_container.remove();
			this._autocomplete_container = null;
		}
	}

	/**
    * Handles clicks outside of the shadow DOM to close autocomplete.
    * @param {MouseEvent} e
    * @param {HTMLElement} input
    */
	_onDocumentClick(e, input) {
		if (!this.contains(e.target) && !this.shadowRoot.contains(e.target)) {
			this._closeAutocompleteList();
		}
	}
}

customElements.define("search-bar", Search_Bar);