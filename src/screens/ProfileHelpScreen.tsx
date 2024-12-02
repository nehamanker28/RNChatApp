import React, { Component } from 'react';
import { View, StatusBar, Text, ScrollView ,Switch,TouchableOpacity, Dimensions} from 'react-native';
import { Scaffold } from '../res/widgets/Scaffold';
import { ImageButton } from '../res/widgets/ImageButton';
import { ImageView } from '../res/widgets/ImageView';
import { BaseComponent } from '../commons/BaseComponent';
import { GradiantContainerSolid } from '../res/widgets/GradiantContainerSolid';
import { TextView } from '../res/widgets/TextView';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { Divider } from '../res/widgets/Divider';
import { R } from '../constant';
import {GradiantButton} from '../res/widgets/GradiantButton';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {ProfileFAQScreen} from '../screens/ProfileFAQScreen';
import {ProfileContactUS} from '../screens/ProfileContactUS';
import { Indicator } from '../res/widgets/topBarIndicator';

const Tab = createMaterialTopTabNavigator();
const totalWidth = Dimensions.get("screen").width;


export class ProfileHelpScreen extends BaseComponent {
  onCreateView(): JSX.Element {
    return (

        <SafeAreaInsetsContext.Consumer>
          {insets => (
            <>
              <StatusBar barStyle={'light-content'} />
              <GradiantContainerSolid borderRadius={0} zIndex={-1}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    width: '100%',
                    paddingStart: 32,
                    paddingEnd: 32,
                    marginTop: insets!.top + 32,
                    paddingBottom: 48,
                  }}>
                  <ImageButton
                    src={R.drawable.ic_back_arrow_blue}
                    size={16}
                    height={32}
                    width={32}
                    borderRadius={64}
                    elevation={0}
                    backgroundColor={'white'}
                    onClick={() => {
                      this.navigation.pop();
                    }}
                  />
                  <TextView
                    text={'Help Center'}
                    textSize={28}
                    textColor={'white'}
                    textStyle={'bold'}
                  />
                  <Divider
                    height={36}
                    width={36}
                    backgroundColor={R.color.transparent}
                  />
                </View>
              </GradiantContainerSolid>
              <View
                style={{
                 // flex: 1,
                  backgroundColor: 'white',
                  marginTop: -16,
                  paddingTop: 24,
                  paddingEnd: 28,
                  paddingStart: 28,
                  borderTopEndRadius: 16,
                  borderTopStartRadius: 16,
                }}></View>

              <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarLabelStyle: { fontSize: 20,textTransform:'none' },
                tabBarIndicator: ({ }) => {
                  if (route.name === 'FAQ') {
                    return (
                      <Indicator
                      marginLeft ={0}></Indicator>
                    );
                  } else if (route.name === 'Contact us') {
                    return (
                      <Indicator
                      marginLeft ={totalWidth/2}></Indicator>
                    );
                  }
                },
              })}
            
              
            >
              <Tab.Screen name="FAQ" component={ProfileFAQScreen} />
              <Tab.Screen name="Contact us" component={ ProfileContactUS } />
            </Tab.Navigator>
              </>
              
          )}
          
        </SafeAreaInsetsContext.Consumer>
    
    

    )
  }
  
  onViewCreated(): void {}

}
