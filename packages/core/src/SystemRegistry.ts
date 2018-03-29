import Component from './component';
import System from './System';

export default class SystemRegistry extends Map<Component, System<Component>> {}
