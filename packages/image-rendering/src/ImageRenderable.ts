import { Component } from '@tecs/core';
import { Positionable } from '@tecs/basics';
import ImageRenderSystem from './ImageRenderSystem';

export default class ImageRenderable extends Component {
    private _imageName: string;
    private _positionable: Positionable;

    constructor(positionable: Positionable, imageName: string) {
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
