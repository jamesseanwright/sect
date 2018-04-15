// tslint:disable:max-classes-per-file

import { toTuple } from '@tecs/basics';
import { Component } from '@tecs/core';

export class Keyboard {
    private static processKeyName(keyName: string): string {
        return keyName.match(/^[A-Z]{1}$/) ? keyName.toLowerCase() : keyName;
    }

    private _keys: Map<string, boolean>;

    constructor() {
        this._keys = new Map();
        this.registerEvents();
    }

    public isPressed(keyName: string): boolean {
        const key = Keyboard.processKeyName(keyName);
        return this._keys.has(key) && this._keys.get(key);
    }

    private registerEvents(): void {
        window.addEventListener('keydown', ({ key }) => this.updateKey(key, true));
        window.addEventListener('keyup', ({ key }) => this.updateKey(key, false));
    }

    private updateKey(keyName: string, isKeyPressed: boolean): void {
        const key = Keyboard.processKeyName(keyName);
        this._keys.set(key, isKeyPressed);
    }
}

export default Keyboard;
