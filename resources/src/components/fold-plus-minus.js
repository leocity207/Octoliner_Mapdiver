import Toggleable from "./Toggleable.js";
import { MixHTMLElementWith } from "./MixHTMLElementWith.js";
import Utils from "/src/utils/utils.js" 

/**
 * Plus_Minus cycles between "plus" and "minus" states visually.
 * Structure
 * ---------
 *	<input>
 *	<div class='symbol'> 
 *		<div class='horizontal'>
 *		<div class='vertical'>
 *	</div>
 */
export default class Fold_Plus_Minus extends MixHTMLElementWith(Observable, Toggleable) {

	/**
	 * Base template strucutre
	 */
	static template = (() => {
		const template = document.createElement('template');

		const input = Utils. document.createElement('input');
		input.type = 'checkbox';
		input.id = 'toggle';
		input.hidden = true;

		const wrapper = Utils.Create_Element_With_Class('div','symbol');
		const horizontal = Utils.Create_Element_With_Class('div','horizontal');
		const vertical = Utils.Create_Element_With_Class('div','vertical');

		wrapper.append(horizontal, vertical);
		template.content.append(wrapper,input);
		return template;
	})();

	constructor() {
		super();
		this.attachShadow({ mode: "open" });

		Utils.Add_Stylesheet(this.shadowRoot, "style/fold-plus-minus.css");
		Utils.Clone_Node_Into(this.shadowRoot, Fold_Plus_Minus.template_container);	
	}

	/**
	 * Factory to create the Node
	 * @param {String} name name of the folder
	 * @returns instance of Fold_Plus_Minus
	 */
	static Create(name) {
		let object = document.createElement("plus-minus");
		object.Observable_Init(name);
		object.Toggleable_Init([false,true],false);
		return object;
	}

	/**
	 * Called when node is connected to the dom
	 */
	connectedCallback() {
		this.addEventListener("click", () => {
			this.Next_State();
			this.Emit(this.Get_State());
			this.Check_Symbole();
		});
	}

	/**
	 * Called when node disapear from the dom
	 */
	disconnectedCallback() {
		this.removeEventListener("click");
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
}

customElements.define("plus-minus", Fold_Plus_Minus);