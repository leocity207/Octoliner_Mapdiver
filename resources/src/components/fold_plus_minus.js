import Toggleable from "./Toggleable.js";
import { MixHTMLElementWith } from "./MixHTMLElementWith.js";

/**
 * Plus_Minus cycles between "plus" and "minus" states visually.
 */
export default class Fold_Plus_Minus extends MixHTMLElementWith(Observable, Toggleable) {

	static template = (() => {
		const template = document.createElement('template');

		// add stylesheet
		const style = document.createElement("link");
		style.rel = "stylesheet";
		style.href = "style/fold-plus-minus.css";
		this.shadowRoot.appendChild(style);

		const wrapper = document.createElement("div");
		wrapper.classList.add("symbol");

		const horizontal = document.createElement("div");
		horizontal.classList.add("horizontal");

		const vertical = document.createElement("div");
		vertical.classList.add("vertical");

		wrapper.appendChild(horizontal);
		wrapper.appendChild(vertical);
		template.appendChild(wrapper);
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
		while (this.shadowRoot.firstChild)
			this.shadowRoot.removeChild(this.shadowRoot.firstChild);
		// Clone and append the template content
		this.shadowRoot.appendChild(document.importNode(Switch_Event.template_base.content,true));
		this.Check_Symbole();
	}
}

customElements.define("plus-minus", Fold_Plus_Minus);