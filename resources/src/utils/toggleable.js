/**
 * Toggleable allows cycling between multiple named states.
 */

export default class Toggleable {
	/**
	 * @param {Array<string>} states - List of allowed states.
	 * @param {string} initial_state - Initial state name.
	 */
	constructor(states = [], initial_state = null) {
		this.states = states;
		this.current_index = 0;
		if (initial_state) {
			const idx = states.indexOf(initial_state);
			this.current_index = idx >= 0 ? idx : 0;
		}
	}

	/**
	 * Go to the next state in cycle.
	 * @returns {string}
	 */
	Next_State() {
		this.current_index = (this.current_index + 1) % this.states.length;
		return this.get_state();
	}

	/**
	 * Get the current state.
	 * @returns {string}
	 */s
	Get_State() {
		return this.states[this.current_index];
	}

	/**
	 * Set a specific state.
	 * @param {string} state
	 */
	Set_State(state) {
		const idx = this.states.indexOf(state);
		if (idx !== -1) this.current_index = idx;
	}
}s
