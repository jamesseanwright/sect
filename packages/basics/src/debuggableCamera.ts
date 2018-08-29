import { Game } from '@sectjs/core';
import Camera from './Camera';

const createDebuggableCamera = (camera: Camera): Camera =>
    new Proxy<Camera>(camera, {
        get(target, prop) {
            switch (prop) {
                case 'projectPoint':
                    return (x: number, y: number, offsetX = 0, offsetY = 0) => {
                        const result = target.projectPoint(x, y, offsetX, offsetY);
                        // tslint:disable-next-line:no-console
                        console.log('Request for point projection:', x, y, '=>', ...result);
                        return result;
                    };

                case 'project':
                    return (x: number, y: number, width: number, height: number, offsetX: number, offsetY: number) => {
                        const result = target.project(x, y, width, height, offsetX, offsetY);
                        // tslint:disable-next-line:no-console
                        console.log('Request for rect projection:', x, y, width, height, '=>', ...result);
                        return result;
                    };
                default:
                    return target[prop];
            }
        },
    });

export default createDebuggableCamera;
