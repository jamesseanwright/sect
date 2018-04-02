export type ImageDefinition = [string, string];

export default class ImageLoader {
    private static loadImages(definitions: ImageDefinition[]): Promise<Map<string, HTMLImageElement>> {
        return Promise.all(definitions.map(([_, source]) => ImageLoader.loadImage(source)))
            .then(images => new Map(
                images.map((image, i) => [definitions[i][0], image] as [string, HTMLImageElement]),
            ));
    }

    private static loadImage(source: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image = new Image();

            image.onload = () => resolve(image);
            image.onerror = event => reject(new Error(event.message));
            image.src = source;
        });
    }

    private images: Map<string, HTMLImageElement>;

    constructor(definitions: ImageDefinition[]) {
        this.init(definitions);
    }

    public getImage(name: string): HTMLImageElement {
        // TODO: error handling
        return this.images.get(name);
    }

    private async init(definitions: ImageDefinition[]): Promise<void> {
        this.images = await ImageLoader.loadImages(definitions);
    }
}
