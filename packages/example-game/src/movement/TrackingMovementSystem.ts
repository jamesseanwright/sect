import { System } from '@tecs/core';
import TrackingMoveable from './TrackingMoveable';

class TrackingMovementSystem extends System<TrackingMoveable> {
    protected next(component: TrackingMoveable, timestamp: number): void {
        if (component.positionable.y > component.targetPositionable.y) {
            component.positionable.y -= component.moveable.ySpeed;
        } else if (component.positionable.y < component.targetPositionable.y) {
            component.positionable.y += component.moveable.ySpeed;
        }
    }
}

export default TrackingMovementSystem;
