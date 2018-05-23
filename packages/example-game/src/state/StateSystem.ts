import { System } from '@sectjs/core';
import StateQueryable from './StateQueryable';

class StateSystem extends System<StateQueryable> {
    protected next(component: StateQueryable, timestamp: number): void {
        throw new Error('Method not implemented.');
    }
}

export default StateSystem;
