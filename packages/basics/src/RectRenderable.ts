import { Component } from '@tecs/core';
import RectPositionable from './RectPositionable';
import { CanvasStyle } from './types';

class RectRenderable extends Component {
    private _fill: CanvasStyle;
    private _stroke: CanvasStyle;
    private _positionable: RectPositionable;

    constructor(positionable: RectPositionable, fill: CanvasStyle, stroke?: CanvasStyle) {
        super();
        this._fill = fill;
        this._stroke = stroke;
        this._positionable = positionable;
    }

    public get fill(): CanvasStyle {
        return this._fill;
    }

    public get stroke(): CanvasStyle {
        return this._stroke;
    }

    public get positionable(): RectPositionable {
        return this._positionable;
    }
}

export default RectRenderable;
