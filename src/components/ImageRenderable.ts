import ImageRenderSystem from '../systems/ImageRenderSystem';
import { Component } from './Component';

export class ImageRenderable extends Component {
    public image: HTMLImageElement; // TODO: encapsulate!!!

    constructor(image: HTMLImageElement) {
        super();
        this.image = image;
    }
}
