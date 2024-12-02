/* eslint-disable react/react-in-jsx-scope */
import {Component} from 'react';
import * as Navigator from '../navigator';
import {BaseException} from './BaseException';
import {ProgressDialog} from '../res/widgets/ProgressDialog';
import {AppState} from 'react-native';
import {Logger} from './Logger';
import {Snackbar} from 'react-native-paper';
import {Utils} from './Utils';

enum ComponentState {
  INIT = 0,
  RENDERED = 1,
  DISPOSED = 2,
}

export abstract class BaseComponent extends Component<any, any> {
  componentState: ComponentState;
  navigation: Navigator.NavigationManager;
  appStateSubscription: any;

  constructor(props: any) {
    super(props);
    this.componentState = ComponentState.INIT;
    this.navigation = new Navigator.NavigationManager(this);
    this.state = {
      activityIndicator: false,
      dialogComponent: null,
      snackBarText: undefined,
    };
  }

  // react native method
  render() {
    return (
      <>
        {this.state.activityIndicator ? <ProgressDialog /> : null}
        {this.state.dialogComponent}
        {this.onCreateView()}
        {this.state.snackBarText && (
          <Snackbar
            action={{
              label: 'Dismiss',
              onPress: () => {
                this.setState({snackBarText: undefined});
              },
            }}
            visible={this.state.snackBarText !== undefined}
            onDismiss={() => {}}>
            {this.state.snackBarText}
          </Snackbar>
        )}
      </>
    );
  }
  componentDidMount(): void {
    Logger.debug(this, 'componentDidMount');
    this.componentState = ComponentState.RENDERED;
    this.onViewCreated();
    this.appStateSubscription = AppState.addEventListener(
      'change',
      (appState: any) => {
        if (appState === 'active') {
          this.onResume();
        } else if (appState === 'background') {
          this.onPause();
        }
      },
    );
  }
  componentWillUnmount(): void {
    Logger.debug(this, 'componentWillUnmount');
    this.appStateSubscription.remove();
    this.onDestroyView();
    this.componentState = ComponentState.DISPOSED;
  }
  // fragment views
  abstract onCreateView(): JSX.Element;
  onViewCreated() {
    Logger.debug(this, 'onViewCreated');
  }
  onResume() {
    Logger.debug(this, 'onResume');
  }
  onPause() {
    Logger.debug(this, 'onPause');
  }
  onDestroyView() {
    Logger.debug(this, 'onDestroyView');
  }
  // support method
  lifecycleScope<T>(
    task: () => Promise<T>,
    activityIndicator?: boolean,
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (this.componentState === ComponentState.INIT) {
        reject(new Error("Promise can't be executed before render."));
      }
      if (activityIndicator) {
        this.showActivityIndicator(true);
      }
      task()
        .then((result: any) => {
          if (this.componentState !== ComponentState.DISPOSED) {
            if (activityIndicator) {
              this.showActivityIndicator(false);
            }
            resolve(result);
          }
        })
        .catch((error: BaseException) => {
          console.error(error);
          if (this.componentState !== ComponentState.DISPOSED) {
            if (activityIndicator) {
              this.showActivityIndicator(false);
            }
            reject(error);
          }
        });
    });
  }
  // activity indicator
  showActivityIndicator(show: boolean) {
    this.setState({activityIndicator: show});
  }
  showDialog(component: JSX.Element) {
    this.setState({dialogComponent: component});
  }
  hideDialog() {
    this.setState({dialogComponent: null});
  }
  showSnackBar(text: string) {
    this.setState({snackBarText: text});
    this.lifecycleScope<void>(async () => {
      await Utils.delay(3000);
    }, false)
      .then((_: any) => {
        this.hideSnackBar();
      })
      .catch((_: BaseException) => {});
  }
  hideSnackBar() {
    this.setState({snackBarText: undefined});
  }
}
