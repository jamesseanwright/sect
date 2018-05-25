import { createSystem } from '@sectjs/core';
import TrackingMoveable from './TrackingMoveable';

const createTrackingMovementSystem = () => (
    createSystem<TrackingMoveable>('trackingMover', (timestamp, component) => {
        const centreY = component.positionable.y + component.positionable.height / 2;
        const targetCentreY = component.targetPositionable.y + component.targetPositionable.height / 2;

        if (centreY > targetCentreY) {
            component.positionable.y -= component.moveable.ySpeed;
        } else if (centreY < targetCentreY) {
            component.positionable.y += component.moveable.ySpeed;
        }
    })
);

export default createTrackingMovementSystem;
