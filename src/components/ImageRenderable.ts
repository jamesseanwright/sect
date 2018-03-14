import ImageRenderSystem from '../systems/ImageRenderSystem';
import { Component } from './Component';
import { Positionable } from './Positionable';

export class ImageRenderable extends Component {
    public image: HTMLImageElement; // TODO: encapsulate!!!
    public positionable: Positionable;

    constructor(positionable: Positionable, image: HTMLImageElement) {
        super();
        this.positionable = positionable;
        this.image = image;
    }
}
