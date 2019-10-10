class Weather extends HTMLElement {
  constructor() {
    super(); // Constructor del padre
    // eslint-disable-next-line no-underscore-dangle
    this._shadow = this.attachShadow({ mode: 'open' });
    this.temp = '0ºC';
    this.place = undefined;
  }

  get shadow() {
    // eslint-disable-next-line no-underscore-dangle
    return this._shadow;
  }

  set shadow(val) {
    // eslint-disable-next-line no-underscore-dangle
    this._shadow = val;
  }

  static get observedAttributes() {
    return ['temp', 'place'];
  }

  /**
     * attributeChangedCallback
     *
     * Se ejecuta cuando el valor de cualquier atributo declarado dentro del arreglo de los
     * observedAttributes cambia.
     *
     * @param {string} name nombre del atributo que cambia
     * @param {mixed} oldVal valor anterior del atributo
     * @param {mixed} newValue nuevo valor del atributo
     */
  attributeChangedCallback(name, oldVal, newValue) {
    this[`update${name.charAt(0).toUpperCase() + name.slice(1)}`](newValue);
  }

  updateTemp(val) {
    this.shadow.querySelector('#temp').innerHTML = `${val}ºC`;
  }

  updatePlace(val) {
    this.shadow.querySelector('#place').innerHTML = val;
  }

  connectedCallback() {
    let template;

    fetch('/components/Weather/template.html', {
      method: 'GET',
    }).then((response) => {
      response.text().then((data) => {
        template = data;
        this.shadow.innerHTML = template;
      });
    });
  }
}
window.customElements.define('app-weather', Weather);
