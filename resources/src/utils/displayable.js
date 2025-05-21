export default class Displayable extends HTMLElement {

	/**
	 * Show the object
	 */
	Show() {
		this.style.display = 'block';
	}

	/**
	 * Hide the object
	 */
	Hide() {
		this.style.display = 'none';
	}
}