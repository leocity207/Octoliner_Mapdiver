/**
 * Displayable are Element that can be hidden and shown
 * It work by using the css property `display`
 */
class Displayable extends HTMLElement {

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

export default Displayable;