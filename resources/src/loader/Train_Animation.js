import Loader from './loader.js';
import Utils from '../utils/utils.js';

/**
 * A simple Train Animation that implement a Loader
 *
 * This class create a custome element named "train-animation"
 */
class Train_Animation extends Loader {


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
		this.attachShadow({ mode: "open" });
		Utils.Clone_Node_Into(this.shadowRoot, Train_Animation.template);
	}

	/**
	 * Create a Train animation Object ready to be added to the Dom or used inside an App
	 * @returns {Train_Animation} A ready to be used Train animation.
	 */
	static Create() {
		return document.createElement("train-animation");
	}
}

customElements.define("train-animation", Train_Animation);

export default Train_Animation