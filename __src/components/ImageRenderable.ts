import ImageRenderSystem from '../systems/ImageRenderSystem';
import Component from './Component';
import Positionable from './Positionable';

export default class ImageRenderable extends Component {
    private _image: HTMLImageElement;
    private _positionable: Positionable;

    constructor(positionable: Positionable, image: HTMLImageElement) {
        super();
        this._image = image;
        this._positionable = positionable;
    }

    get image() {
        return this._image;
    }

    get positionable() {
        return this._positionable;
    }
}
