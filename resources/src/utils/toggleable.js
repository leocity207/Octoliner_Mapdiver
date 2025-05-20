/**
 * Toggleable allows cycling between multiple named states.
 */
export default class Toggleable {

	/**
	 * the list of all possible states. the list is ordered.
	 */
	m_states;

	/**
	 * the current index ammong the states
	 */
	m_current_index;

	/**
	 * @param {Array<string>} states - List of allowed states. Note : they should be ordered in the transition order
	 * @param {string} initial_state - Initial state name.
	 */
	Toggleable_Init(states, initial_state){
		this.m_states = states;
		this.m_current_index = 0;
		if (initial_state !== null) {
			const idx = states.indexOf(initial_state);
			if (idx !== -1) 
				this.m_current_index = idx;
			else
				throw Error("Desired state is not in the state list");
		}
		else
			this.m_current_index = 0;
	}

	/**
	 * Go to the next state in cycle.
	 * @returns {string}
	 */
	Next_State() {
		this.m_current_index = (this.m_current_index + 1) % this.m_states.length;
		return this.Get_State();
	}

	/**
	 * Get the current state.
	 * @returns {string}
	 */s
	Get_State() {
		return this.m_states[this.m_current_index];
	}

	/**
	 * Set a specific state.
	 * @param {string} state
	 */
	Set_State(state) {
		const idx = this.m_states.indexOf(state);
		if (idx !== -1) 
			this.m_current_index = idx;
		else
			throw Error("Desired state is not in the state list");
	}
}