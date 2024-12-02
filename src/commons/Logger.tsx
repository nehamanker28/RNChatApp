import {BaseComponent} from './BaseComponent';

export class Logger {
  static debug(component: BaseComponent, message: string) {
    console.debug(component.constructor.name, ':', message);
  }

  static info(component: BaseComponent, message: string) {
    console.info(component.constructor.name, ':', message);
  }

  static error(component: BaseComponent, message: string) {
    console.error(component.constructor.name, ':', message);
  }

  static warn(component: BaseComponent, message: string) {
    console.warn(component.constructor.name, ':', message);
  }
}
