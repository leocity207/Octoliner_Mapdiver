/**
 * Toggleable allows cycling between multiple named states.
 */
export default class Toggleable {

	/**
	 * the list of all possible states. the list is ordered.
	 */
	states;

	/**
	 * the current index ammong the states
	 */
	current_index;

	/**
	 * @param {Array<string>} states - List of allowed states. Note : they should be ordered in the transition order
	 * @param {string} initial_state - Initial state name.
	 */
	Toggleable_Init(states, initial_state){
		this.states = states;
		this.current_index = 0;
		this.setAttribute("current-state", this.current_index);
		this.setAttribute("states", this.Serialize(this.states));
		if (initial_state !== null) {
			const idx = states.indexOf(initial_state);
			if (idx !== -1) 
				this.current_index = idx;
			else
				throw Error("Desired state is not in the state list");
		}
		else
			this.current_index = 0;
	}

	Toggleable_connectedCallback() {
		const current_index = parseInt(this.getAttribute('current-state'));
 		if (current_index != undefined) this.current_index = current_index;
		const states = this.Deserialize(this.getAttribute("states"));
		if (states != undefined) this.states = states;
	}

	/**
	 * Go to the next state in cycle.
	 * @returns {string}
	 */
	Next_State() {
		this.current_index = (this.current_index + 1) % this.states.length;
		return this.Get_State();
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
		if (idx !== -1) 
			this.current_index = idx;
		else
			throw Error("Desired state is not in the state list");
	}

	/**
	 * Serializes a list of objects into a JSON string for use in an attribute.
	 *
	 * @param {Array<Object>} objList - The list of objects to serialize.
	 * @returns {string} - Serialized JSON string.
	 */
	Serialize(objList) {
		try {
			return JSON.stringify(objList);
		} catch (e) {
			console.error("Serialization failed:", e);
			return "";
		}
	}

	/**
	 * Deserializes a JSON string from an attribute back into a list of objects.
	 *
	 * @param {string} str - The JSON string to deserialize.
	 * @returns {Array<Object>} - The deserialized object list or an empty array.
	*/
	Deserialize(str) {
		try {
			const parsed = JSON.parse(str);
			return Array.isArray(parsed) ? parsed : [];
		} catch (e) {
			console.error("Deserialization failed:", e);
			return [];
		}
	}
}