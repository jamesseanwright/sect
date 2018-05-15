import { Component } from '@tecs/core';
import RectPositionable from './RectPositionable';

export type RectStyle = string | CanvasGradient | CanvasPattern;

class RectRenderable extends Component {
    private _fill: RectStyle;
    private _stroke: RectStyle;
    private _positionable: RectPositionable;

    constructor(positionable: RectPositionable, fill: RectStyle, stroke?: RectStyle) {
        super();
        this._fill = fill;
        this._stroke = stroke;
        this._positionable = positionable;
    }

    public get fill(): RectStyle {
        return this._fill;
    }

    public get stroke(): RectStyle {
        return this._stroke;
    }

    public get positionable(): RectPositionable {
        return this._positionable;
    }
}

export default RectRenderable;
