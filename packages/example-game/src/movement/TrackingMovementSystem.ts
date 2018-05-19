import { System } from '@sectjs/core';
import TrackingMoveable from './TrackingMoveable';

class TrackingMovementSystem extends System<TrackingMoveable> {
    protected next(component: TrackingMoveable, timestamp: number): void {
        const centreY = component.positionable.y + component.positionable.height / 2;
        const targetCentreY = component.targetPositionable.y + component.targetPositionable.height / 2;

        if (centreY > targetCentreY) {
            component.positionable.y -= component.moveable.ySpeed;
        } else if (centreY < targetCentreY) {
            component.positionable.y += component.moveable.ySpeed;
        }
    }
}

export default TrackingMovementSystem;
