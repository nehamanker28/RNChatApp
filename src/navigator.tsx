import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {Component} from 'react';

export const navigationRef = createNavigationContainerRef();

export class NavigationManager {
  arguments: any;

  constructor(component: Component) {
    this.arguments = component.props.route.params;
  }

  replace(name: string, params?: any) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.replace(name, params));
    }
  }
  push(name: string, params?: any) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.push(name, params));
    }
  }

  pop(count: number = 1) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.pop(count));
    }
  }

  popToTop() {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.popToTop);
    }
  }
}
