import { createSystem } from '@sectjs/core';
import ScoreTracking from './ScoreTracking';

const createScoreTrackingSystem = () => (
    createSystem<ScoreTracking>('scoreRenderer', (timestamp, component) => {
        // TODO: performance considerations
        component.textRenderable.text = component.score;
    })
);

export default createScoreTrackingSystem;
