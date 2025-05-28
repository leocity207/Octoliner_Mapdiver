import Toggleable from "./Toggleable.js";
import { MixHTMLElementWith } from "./MixHTMLElementWith.js";
import Utils from "/src/utils/utils.js" 

/**
 * Plus_Minus cycles between "plus" and "minus" states visually.
 */
export default class Fold_Plus_Minus extends MixHTMLElementWith(Observable, Toggleable) {

	static template = (() => {
		const template = document.createElement('template');

		const input = document.createElement('input');
		input.type = 'checkbox';
		input.id = 'toggle';
		input.hidden = true;

		const wrapper = document.createElement("div");
		wrapper.classList.add("symbol");

		const horizontal = document.createElement("div");
		horizontal.classList.add("horizontal");

		const vertical = document.createElement("div");
		vertical.classList.add("vertical");

		wrapper.appendChild(horizontal);
		wrapper.appendChild(vertical);
		template.content.append(wrapper,input);
		return template;
	})();

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	static Create(name) {
		const elt = document.createElement("plus-minus");
		elt.Observable_Init(name);
		elt.Toggleable_Init([false,true],false);
		return elt;
	}

	/**
	 * Called when node is connected to the dom
	 */
	connectedCallback() {
		this.Render();
		this.addEventListener("click", () => {
			this.Next_State();
			this.Emit(this.Get_State());
			this.Check_Symbole();
		});
	}

	Check_Symbole() {
		const symbole = this.shadowRoot.querySelector("div");
		if (symbole) {
			if(symbole.classList.contains("minus")) {
				symbole.classList.remove("minus");
				symbole.classList.add("plus");
			}
			else {
				symbole.classList.remove("plus");
				symbole.classList.add("minus");
			}
		}
	}

	/**
	 * Called when node disapear from the dom
	 */
	disconnectedCallback() {
		this.removeEventListener("click");
	}

	Render() {
		// Clear existing content
		while (this.shadowRoot.firstChild)
			this.shadowRoot.removeChild(this.shadowRoot.firstChild);
		// Clone and append the template content
		Utils.Add_Stylesheet(this.shadowRoot, "style/fold-plus-minus.css");
		this.shadowRoot.appendChild(document.importNode(Fold_Plus_Minus.template.content,true));
	}
}

customElements.define("plus-minus", Fold_Plus_Minus);