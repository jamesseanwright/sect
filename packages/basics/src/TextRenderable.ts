import { Component } from '@sectjs/core';
import Positionable from './Positionable';
import { CanvasStyle } from './types';

class TextRenderable extends Component {
    private _text: string;
    private _font: string;
    private _fill: CanvasStyle;
    private _stroke: CanvasStyle;
    private _positionable: Positionable;

    constructor(text: string, font: string, positionable: Positionable, fill: CanvasStyle, stroke?: CanvasStyle) {
        super();
        this._text = text;
        this._font = font;
        this._fill = fill;
        this._stroke = stroke;
        this._positionable = positionable;
    }

    public get text(): string {
        return this._text;
    }

    public get font(): string {
        return this._font;
    }

    public get fill(): CanvasStyle {
        return this._fill;
    }

    public get stroke(): CanvasStyle {
        return this._stroke;
    }

    public get positionable(): Positionable {
        return this._positionable;
    }
}

export default TextRenderable;
