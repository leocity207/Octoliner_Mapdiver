// line-station.js
export default class Line_Station extends HTMLElement {
  constructor() {
    super();
    this.shadow_root = this.attachShadow({ mode: 'open' });

    // charger CSS externe
    const style_link = document.createElement('link');
    style_link.setAttribute('rel', 'stylesheet');
    style_link.setAttribute('href', 'style/line-station.css');
    this.shadow_root.appendChild(style_link);

    // conteneur principal
    this.container = document.createElement('div');
    this.container.classList.add('station-row');
    this.shadow_root.appendChild(this.container);

    this._data = null;
  }

  /**  
   * @param {Object} data  { station_code, flag, … }  
   */
  static Create(data) {
    const el = document.createElement('line-station');
    el._data = data;
    el.Render();
    return el;
  }

  /** Reconstruit la ligne de station */
  Render() {
    if (!this._data) return;

    // reset
    this.container.innerHTML = '';

    // icône SVG : rectangle plein-hauteur + rond blanc centré
    const icon_wrap = document.createElement('div');
    icon_wrap.classList.add('station-icon-wrap');
    icon_wrap.innerHTML = `
      <svg class="station-icon-svg" viewBox="0 0 10 40" preserveAspectRatio="none">
        <rect width="10" height="40" />
        <circle cx="5" cy="20" r="4" />
      </svg>
    `;
    this.container.appendChild(icon_wrap);

    // nom de la station
    const station_name = document.createElement('span');
    station_name.classList.add('station-name');
    station_name.textContent = this._data.station_code;
    if (this._data.flag && this._data.flag.includes('warning')) {
      station_name.classList.add('warning');
    }
    this.container.appendChild(station_name);
  }
}

customElements.define('line-station', Line_Station);