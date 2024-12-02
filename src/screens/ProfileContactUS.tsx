import React, { Component } from 'react';
import { View, StatusBar, Text, ScrollView ,Switch,TouchableOpacity, FlatList} from 'react-native';
import { BaseComponent } from '../commons/BaseComponent';
import { GradiantContainerSolid } from '../res/widgets/GradiantContainerSolid';
import { TextView } from '../res/widgets/TextView';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { R } from '../constant';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Snackbar from 'react-native-snackbar';

const Tab = createMaterialTopTabNavigator();

export class ProfileContactUS extends BaseComponent {
  state: {
    contactUS: Array<string>;
  };
  constructor(props: any) {
    super(props);
    this.state = {
      contactUS : ['Contact us','WhatsApp','Instagram','Facebook','Twitter','Website'],
    }
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
                  paddingTop: 44,
                  paddingEnd: 28,
                  paddingStart: 28,
                  borderTopEndRadius: 16,
                  borderTopStartRadius: 16,
                }}>
                  <FlatList
                  data={this.state.contactUS}
                 
                  renderItem={({item, index}) => (

              <TouchableOpacity
                  activeOpacity={0.5}
                    onPress={() => {
                    Snackbar.show({
                      text: 'This options is disabled.',
                      duration: Snackbar.LENGTH_SHORT,
                    });
                  }}
                  >
                  <View
                    style={{
                      marginTop: 8,
                     // flex: 1,
                      justifyContent :'center',
                      height: 60,
                        borderRadius: 12,
                        //alignItems: 'center',
                        borderColor : R.color.grey,
                        borderWidth : 1,
                        backgroundColor : 'white',
                        margin : 10,
                        paddingLeft : 60,
                        paddingRight :30 ,
                      
                    }}>
                 
                      <TextView
                        text={item}
                        textSize={20}
                        singleLine={true}
                        textColor= 'black'
                        fontFamily= {R.font.inter_regular}
                      />
                    </View>
              
               
                </TouchableOpacity> )}></FlatList>
               </View>
              </>
          )}

        </SafeAreaInsetsContext.Consumer>
    )
  }
  
  onViewCreated(): void {}

}
