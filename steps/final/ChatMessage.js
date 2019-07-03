class ChatMessage extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        const template = `
            <style>
                :host {
                    font-family: sans-serif;
                    color: var(--color, #FFF);
                    font-size: 14px;
                    font-weight: 100;
                }
                .message {
                    border-radius: 3px;
                    background-color: var(--background-color, #2D2C2C);
                    padding: 10px 20px;
                    width: fit-content;
                    max-width: 658px;
                }

                .timestamp {
                    font-size: 12px;
                    padding-bottom: 5px;
                    font-weight: 100;
                }

                .timestamp__name {
                    color: #c8c6c4;
                    margin-right: 5px;
                }

                .timestamp__time {
                    color: #8a8886;
                }

                ::slotted(img) {
                    width: 100%;
                    height: 100%;
                }
            </style>

            <div class="message">
                <div class="timestamp">
                    <span class="timestamp__name"></span>
                    <span class="timestamp__time"></span>
                </div>
                <slot></slot>
            </div>
        `;

        this._shadowRoot.innerHTML = template;

        this._nameEl = this._shadowRoot.querySelector('.timestamp__name')
        this._timeEl= this._shadowRoot.querySelector('.timestamp__time')
    }

    connectedCallback() {
        if (!this.hasAttribute('name')) {
            this.setAttribute('name', '');
        }

        if (!this.hasAttribute('time-sent')) {
            const d = new Date();
            const timeStr = d.getHours() + ":" + d.getMinutes();
            this.setAttribute('time-sent', timeStr);
        }
    }

    static get observedAttributes() {
        return ['name', 'time-sent']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'name':
                this._name = newValue;
                break;
            case 'time-sent':
                this._timeSent = newValue;
                break;
            default:
                break;
        }

        this._render();
    }

    _render() {
        if (this._nameEl) {
            this._nameEl.textContent = this._name;
        }

        if (this._timeEl) {
            this._timeEl.textContent = this._timeSent;
        }
    }
}

customElements.define('chat-message', ChatMessage);