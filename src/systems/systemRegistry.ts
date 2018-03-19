import { Component } from '../components';
import System from './System';

export class SystemRegistry extends Map<Component, System<Component>> {

}

export default new SystemRegistry(); // TODO: only export class and share reference via Game?
