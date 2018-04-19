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
            image.onerror = ({ message }) => reject(new Error(message));
            image.src = source;
        });
    }

    private images: Map<string, HTMLImageElement>;

    public getImage(name: string): HTMLImageElement {
        if (!this.images.has(name)) {
            throw new Error(`Image ${name} not found in ImageLoader`);
        }

        return this.images.get(name);
    }

    public async init(definitions: ImageDefinition[]): Promise<void> {
        this.images = await ImageLoader.loadImages(definitions);
    }
}
