import Component from './Component';
import { System } from './createSystem';

export default class SystemRegistry extends Map<Component, System<Component>> {}
