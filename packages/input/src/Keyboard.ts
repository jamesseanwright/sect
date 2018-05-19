// tslint:disable:max-classes-per-file

import { Component } from '@sectjs/core';
import Input from './Input';

export class Keyboard extends Input<string> {
    private static processKeyName(keyName: string): string {
        return keyName.match(/^[A-Z]{1}$/) ? keyName.toLowerCase() : keyName;
    }

    constructor() {
        super();
        this.registerEvents();
    }

    public isPressed(keyName: string): boolean {
        const key = Keyboard.processKeyName(keyName);
        return this._pressBindings.has(key) && this._pressBindings.get(key);
    }

    private registerEvents(): void {
        window.addEventListener('keydown', ({ key }) => this.updateKey(key, true));
        window.addEventListener('keyup', ({ key }) => this.updateKey(key, false));
    }

    private updateKey(keyName: string, isKeyPressed: boolean): void {
        const key = Keyboard.processKeyName(keyName);
        this._pressBindings.set(key, isKeyPressed);
    }
}

export default Keyboard;
