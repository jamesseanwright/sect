import { toTuple } from '@tecs/basics';
import { Component } from '@tecs/core';

const SUPPORTED_BUTTONS = [0, 1, 2];

class MouseInteractable extends Component {
    private _buttons: Map<number, boolean>;
    // private _clickTarget: EventTarget; TODO: relative click coords
    private _x: number;
    private _y: number;

    constructor() {
        super();
        this._buttons = new Map(SUPPORTED_BUTTONS.map(button => toTuple(button, false)));
        this.registerEvents();
    }

    public isPressed(button: number): boolean {
        return this._buttons.has(button) && this._buttons.get(button);
    }

    public get x() {
        return this._x;
    }

    public get y() {
        return this._y;
    }

    private registerEvents(): void {
        window.addEventListener('mousedown', ({ button }) => this.updateButton(button, true));
        window.addEventListener('mouseup', ({ button }) => this.updateButton(button, true));
        window.addEventListener('mousemove', ({ clientX, clientY }) => this.updateCoordinates(clientX, clientY));
    }

    private updateButton(button: number, isButtonPressed: boolean): void {
        this._buttons.set(button, isButtonPressed);
    }

    private updateCoordinates(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
}

export default MouseInteractable;
