import React, {Component} from 'react';
import {Text} from 'react-native';
import {Scaffold} from '../res/widgets/Scaffold';

// protocol Home {
//   func can() -> Bool
// }

// class Chat : Home {
//   func can() -> Bool {
//     return true
//   }
// }

export class PaymentReviewScreen extends Component {
  render() {
    return (
      <Scaffold>
        <Text>Payment Review Screen Screen...</Text>
      </Scaffold>
    );
  }
}
