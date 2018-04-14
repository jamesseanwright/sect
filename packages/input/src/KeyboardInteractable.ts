import { toTuple } from '@tecs/basics';
import { Component } from '@tecs/core';

const DEFAULT_KEYS = [
    'a',
    's',
    'ArrowUp',
    'ArrowRight',
    'ArrowDown',
    'ArrowLeft',
];

class KeyboardInteractable extends Component {
    private static processKeyName(keyName: string): string {
        return keyName.match(/^[A-Z]{1}$/) ? keyName.toLowerCase() : keyName;
    }

    private _keys: Map<string, boolean>;

    constructor(supportedKeys: string[] = DEFAULT_KEYS) {
        super();
        this._keys = new Map(supportedKeys.map(key => toTuple(key, false)));
        this.registerEvents();
    }

    public isPressed(keyName: string): boolean {
        const key = KeyboardInteractable.processKeyName(keyName);
        return this._keys.has(key) && this._keys.get(key);
    }

    private registerEvents(): void {
        window.addEventListener('keydown', ({ key }) => this.updateKey(key, true));
        window.addEventListener('keyup', ({ key }) => this.updateKey(key, false));
    }

    private updateKey(keyName: string, isKeyPressed: boolean): void {
        const key = KeyboardInteractable.processKeyName(keyName);

        if (!this._keys.has(key)) {
            return;
        }

        this._keys.set(key, isKeyPressed);
    }
}

export default KeyboardInteractable;
