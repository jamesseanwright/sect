import { Component } from '@sectjs/core';
import Positionable from './Positionable';
import { CanvasStyle } from './types';

class TextRenderable extends Component {
    private _text: string;
    private _fontFamily: string;
    private _fontSize: number;
    private _fill: CanvasStyle;
    private _stroke: CanvasStyle;
    private _positionable: Positionable;

    constructor(
        text: string,
        fontFamily: string,
        fontSize: number,
        positionable: Positionable,
        fill: CanvasStyle,
        stroke?: CanvasStyle,
    ) {
        super();
        this._text = text;
        this._fontFamily = fontFamily;
        this._fontSize = fontSize;
        this._fill = fill;
        this._stroke = stroke;
        this._positionable = positionable;
    }

    public get text(): string {
        return this._text;
    }

    public set text(value: string) {
        this._text = value;
    }

    public get fontFamily(): string {
        return this._fontFamily;
    }

    public get fontSize(): number {
        return this._fontSize;
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
