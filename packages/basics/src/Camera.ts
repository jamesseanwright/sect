
interface Camera {
    projectPoint(x: number, y: number, offsetX?: number, offsetY?: number): [number, number];

    project(
        x: number,
        y: number,
        width: number,
        height: number,
        offsetX?: number,
        offsetY?: number,
    ): [number, number, number, number];

    getZoom(): number;
}

export default Camera;
