export type SupportedTarget = HTMLElement;

class Mouse {
    private _buttons: Map<number, boolean>;
    private _target: SupportedTarget;
    private _x: number;
    private _y: number;

    constructor(clickTarget: SupportedTarget) {
        this._x = 0;
        this._y = 0;
        this._target = clickTarget;
        this._buttons = new Map();
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
        this._target.addEventListener('mousedown', ({ button }) => this.updateButton(button, true));
        this._target.addEventListener('mouseup', ({ button }) => this.updateButton(button, false));
        this._target.addEventListener('mousemove', ({ clientX, clientY }) => this.updateCoordinates(clientX, clientY));
    }

    private updateButton(button: number, isButtonPressed: boolean): void {
        this._buttons.set(button, isButtonPressed);
    }

    private updateCoordinates(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
}

export default Mouse;
