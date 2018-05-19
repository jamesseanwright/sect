import { Component } from '@sectjs/core';
import { Positionable, RectPositionable } from '@sectjs/basics';
import ImageRenderSystem from './ImageRenderSystem';

export default class ImageRenderable extends Component {
    private _imageName: string;
    private _positionable: RectPositionable;

    constructor(positionable: RectPositionable, imageName: string) {
        super();
        this._imageName = imageName;
        this._positionable = positionable;
    }

    get imageName() {
        return this._imageName;
    }

    get positionable() {
        return this._positionable;
    }
}
