import Loader from './loader.js';
import Utils from '../utils/utils.js';

/**
 * A simple Train Animation that implement a Loader
 * 
 * This class create a custome element named "train-animation"
 */
export default class Train_Animation extends Loader {


	/**
	 * Base template for panel and main app
	 */
	static template = (() => {
		const template = document.createElement('template');

		let iframe = document.createElement("iframe");
		iframe.src = 'resources-config/image/train-animation.svg';
		iframe.width = '100%';
		iframe.height = '100%';

		template.content.appendChild(iframe);
		return template;
	})();

	constructor() {
		super();
		let shadow = this.attachShadow({ mode: "open" });
	}

	/**
	 * Create a Train animation Object ready to be added to the Dom or used inside an App
	 * @returns {Train_Animation} A ready to be used Train animation.
	 */
	static Create() {
		return  document.createElement("train-animation");
	}

	/**
	 * Called when node is connected to the dom
	 */
	connectedCallback() {
		this.Render();
	}

	/**
	 * Render the Train Animation
	 */
	Render() {
		Utils.Empty_Node(this.shadowRoot);
		this.shadowRoot.appendChild(document.importNode(Train_Animation.template.content, true));
	}
}

customElements.define("train-animation", Train_Animation);
