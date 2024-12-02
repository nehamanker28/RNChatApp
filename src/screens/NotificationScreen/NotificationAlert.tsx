import React, {Component} from 'react';
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Scaffold} from '../../res/widgets/Scaffold';
import {ImageButton} from '../../res/widgets/ImageButton';
import {ImageView} from '../../res/widgets/ImageView';
import {BaseComponent} from '../../commons/BaseComponent';
import {GradiantContainerSolid} from '../../res/widgets/GradiantContainerSolid';
import {TextView} from '../../res/widgets/TextView';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {R} from '../../constant';
import {Divider} from '../../res/widgets/Divider';
import {Container} from '../../res/widgets/Container';
import {Notification} from '../../models/notification';
import {RealmContext} from '../../../App';

const {useQuery} = RealmContext;
export class NotificationAlert extends BaseComponent {
  state: {
    annoucement: Array<Notification>;
  };
  constructor(props: any) {
    super(props);
    this.state = {
      annoucement: [
        new Notification({
          _id: '1',
          title: 'Annoucement1',
          date: '19 Dec 2023 - 09:41 AM',
          body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          notification_type: 'Announcment',
        }),
        new Notification({
          _id: '3',
          title: 'Annoucement2',
          date: '21 Dec 2023 - 09:41 AM',
          body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          notification_type: 'Announcment',
        }),
        new Notification({
          _id: '3',
          title: 'Annoucement3',
          date: '20 Dec 2023 - 09:41 AM',
          body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          notification_type: 'Announcment',
        }),
        new Notification({
          _id: '3',
          title: 'Annoucement3',
          date: '20 Dec 2023 - 09:41 AM',
          body: 'printing and typesetting industry.',
          notification_type: 'Alert',
        }),
      ],
    };
  }
  onCreateView(): JSX.Element {
    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <>
            <StatusBar barStyle={'light-content'} />
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                marginTop: -16,
                paddingTop: 24,
                paddingEnd: 28,
                paddingStart: 28,
                borderTopEndRadius: 16,
                borderTopStartRadius: 16,
              }}>
              <FlatList
                data={this.state.annoucement.filter(
                  item => item.notification_type == 'Alert',
                )}
                renderItem={({item}) => (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginEnd: 8,
                        // marginStart: 16,
                        marginBottom: 8,
                        marginTop: 16,
                      }}>
                      <Container height={42} width={42} marginStart={0}>
                        <ImageView src={R.drawable.ic_greyProfile} />
                      </Container>
                      <Container marginStart={10} marginEnd={10}>
                        <TextView
                          text={item.body}
                          textSize={14}
                          fontFamily={R.font.inter_medium}
                          textStyle={'normal'}
                          textColor={R.color.chat_left_text}
                        />
                        <TextView
                          marginTop={8}
                          text={item.date}
                          textSize={10}
                          textColor={'grey'}
                        />
                      </Container>
                    </View>
                  </View>
                )}
                keyExtractor={item => item._id}
              />
            </View>
          </>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }

  onViewCreated(): void {}
}
// export function NotificationScreen(props: any): JSX.Element {
//   let data = useQuery(Notification);
//   return <NotificationAlert {...props} data={data} />;
// }
