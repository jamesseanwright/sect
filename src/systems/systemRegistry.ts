import { Component } from '../components';
import System from './System';

export default class SystemRegistry extends Map<Component, System<Component>> {}
