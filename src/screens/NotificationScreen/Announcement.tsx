import React, { Component } from 'react';
import { View, StatusBar, Text, ScrollView ,Switch,TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import { Scaffold } from '../../res/widgets/Scaffold';
import { ImageButton } from '../../res/widgets/ImageButton';
import { ImageView } from '../../res/widgets/ImageView';
import { BaseComponent } from '../../commons/BaseComponent';
import { GradiantContainerSolid } from '../../res/widgets/GradiantContainerSolid';
import { TextView } from '../../res/widgets/TextView';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { R } from '../../constant';
import { Divider } from '../../res/widgets/Divider';
import { Notification } from '../../models/notification';
import { Dictionary } from 'realm';
import {Container} from '../../res/widgets/Container';
import ContextMenu, {ContextMenuAction} from 'react-native-context-menu-view';

export class Announcement extends BaseComponent {

  state: {
    annoucement : Array<Notification>
   
  }
  constructor(props: any) {
    super(props);
    this.state = {
      
      annoucement : [new Notification({
        _id: '1',
        title: 'Annoucement1',
        date: '19 Dec 2023 - 09:41 AM',
        body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        notification_type: 'Announcment',
      }), new Notification({
        _id: '3',
        title: 'Annoucement2',
        date: '21 Dec 2023 - 09:41 AM',
        body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        notification_type: 'Announcment',
      }), new Notification({
        _id: '3',
        title: 'Annoucement3',
        date: '20 Dec 2023 - 09:41 AM',
        body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        notification_type: 'Announcment',
      })
      , new Notification({
        _id: '3',
        title: 'Annoucement3',
        date: '20 Dec 2023 - 09:41 AM',
        body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        notification_type: 'Alert',
      })]
      
    }
  } 
  // componentDidMount(): void {
  //   let dictionary = Object.fromEntries(this.state.annoucement.map(({date,...rest})=> ([date, rest]) ));
  //   console.log(dictionary)

  // }
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
                  data={this.state.annoucement.filter((item) => item.notification_type == 'Announcment')}
                  renderItem={({ item }) => 
                  <View style = {{
                    marginEnd :16,
                    marginStart:12,
                    paddingEnd:10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginEnd: 8,
                     // marginStart: 16,
                      marginBottom: 8,
                      marginTop: 16,
                    }}>
                    <Container height={45} width={45} marginStart={0}>
                      <ImageView src={R.drawable.ic_greyProfile} />
                    </Container>
                    <Container
                        marginStart={16}
                        marginEnd={20}
                        //backgroundColor={R.color.chatInputBackgroud}
                        >
                          <TextView
                            text={item.body}
                            textSize={14}
                            fontFamily={R.font.inter_medium}
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
                  </View>}
                  keyExtractor={item => item._id}
                />
                  </View>
  

                </>
                
            )}
            
          </SafeAreaInsetsContext.Consumer>
      
      
  
      )
    }
    
    onViewCreated(): void {}
 
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
    },
    header: {
      fontSize: 32,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
    },
  });