/* optional numbers represent rotation of sprite
 * in 90-degree clockwise increments */

export type Road = 'R' | 'R(1)';
export type RoadCorner = 'C' | 'C(1)' | 'C(2)' | 'C(3)';
export type RoadThreeWay = 'T' | 'T(1)' | 'T(2)' | 'T(3)';
export type Crossroad = 'X';
export type Grass = 'G';
export type Exchange = 'E';
export type Tile = Road | RoadCorner | RoadThreeWay | Crossroad | Grass | Exchange;

const map: Tile[][] = [
    Array(31).fill('G'),
    Array(31).fill('G'),
    ['G', 'G', 'E',    ...Array(12).fill('G'), 'E',    ...Array(12).fill('G'), 'E',    'G', 'G'],
    ['G', 'G', 'C',    ...Array(12).fill('R'), 'T',    ...Array(12).fill('R'), 'C(1)', 'G', 'G'],
    ['G', 'G', 'R(1)', ...Array(12).fill('G'), 'R(1)', ...Array(12).fill('G'), 'R',    'G', 'G'],
    ['G', 'G', 'R(1)', ...Array(12).fill('G'), 'R(1)', ...Array(12).fill('G'), 'R',    'G', 'G'],
    ['G', 'G', 'R(1)', ...Array(12).fill('G'), 'R(1)', ...Array(12).fill('G'), 'R',    'G', 'G'],
    ['G', 'G', 'R(1)', ...Array(12).fill('G'), 'R(1)', ...Array(12).fill('G'), 'R',    'G', 'G'],
    ['G', 'G', 'R(1)', ...Array(12).fill('G'), 'R(1)', ...Array(12).fill('G'), 'R',    'G', 'G'],
    ['G', 'G', 'R(1)', ...Array(12).fill('G'), 'R(1)', ...Array(12).fill('G'), 'R',    'G', 'G'],
    ['G', 'E', 'T(3)', ...Array(12).fill('R'), 'X',    ...Array(12).fill('R'), 'T(1)', 'E', 'G'],
    ['G', 'G', 'R(1)', ...Array(12).fill('G'), 'R(1)', ...Array(12).fill('G'), 'R',    'G', 'G'],
    ['G', 'G', 'R(1)', ...Array(12).fill('G'), 'R(1)', ...Array(12).fill('G'), 'R',    'G', 'G'],
    ['G', 'G', 'R(1)', ...Array(12).fill('G'), 'R(1)', ...Array(12).fill('G'), 'R',    'G', 'G'],
    ['G', 'G', 'R(1)', ...Array(12).fill('G'), 'R(1)', ...Array(12).fill('G'), 'R',    'G', 'G'],
    ['G', 'G', 'R(1)', ...Array(12).fill('G'), 'R(1)', ...Array(12).fill('G'), 'R',    'G', 'G'],
    ['G', 'G', 'R(1)', ...Array(12).fill('G'), 'R(1)', ...Array(12).fill('G'), 'R',    'G', 'G'],
    ['G', 'G', 'C(3)', ...Array(12).fill('R'), 'T(2)', ...Array(12).fill('R'), 'C(2)', 'G', 'G'],
    ['G', 'G', 'E',    ...Array(12).fill('G'), 'E',    ...Array(12).fill('G'), 'E',    'G', 'G'],
    Array(31).fill('G'),
    Array(31).fill('G'),
];

export default map;
