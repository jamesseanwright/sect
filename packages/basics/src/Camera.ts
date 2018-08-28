
interface Camera {
    projectPoint(x: number, y: number): [number, number];
    project(x: number, y: number, width: number, height: number): [number, number, number, number];
    getZoom(): number;
}

export default Camera;
