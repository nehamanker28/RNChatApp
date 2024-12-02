import React, { Component } from 'react';
import { View, StatusBar, Text, ScrollView ,Switch,TouchableOpacity} from 'react-native';
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
import LinearGradient from 'react-native-linear-gradient';
import {Profile} from '../models/profile';

export class ProfileSecurityScreen extends BaseComponent {
  profile: Profile;
  state: {
    Remember_me: boolean;
    Biometric_ID:boolean;
    Face_ID:boolean;
    SMS_Auth :boolean;
    Google_Auth :boolean ;
  };
  constructor(props: any) {
    super(props);
    this.profile = this.navigation.arguments.profile;
    this.state = {
      ...super.state,
      ...{Remember_me: false},
      ...{Biometric_ID: false},
      ...{Face_ID: false},
      ...{SMS_Auth: false},
      ...{Google_Auth: false},
    };
  }
  onCreateView(): JSX.Element {
    return (
      <View>
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
                    text={'Security'}
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
                  borderRadius: 8,
                  // paddingEnd: 28,
                  // paddingStart: 28,
                  // marginTop: 16,
                  //flex: 1,
                  backgroundColor: 'white',
                  marginTop: -16,
                  paddingTop: 24,
                  paddingEnd: 28,
                  paddingStart: 28,
                  borderTopEndRadius: 16,
                  borderTopStartRadius: 16,
                }}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
                  <View
                    style={{
                      marginTop: 30,
                      flexDirection: 'row',
                      height: 32,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        flexGrow: 1,
                        alignSelf: 'center',
                        alignContent: 'center',
                      }}>
                      <TextView
                        text="Remember me"
                        textSize={16}
                        singleLine={true}
                        textColor={R.color.chat_left_text}
                      />
                    </View>
                    <View
                      style={{
                        marginStart: 8,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        flexDirection: 'row',
                      }}>
                      <Switch
                        trackColor={{
                          false: R.color.grey,
                          true: R.color.switch_purple,
                        }}
                        thumbColor={R.color.colorPrimary}
                        ios_backgroundColor={R.color.grey}
                        onValueChange={(value: boolean) => {
                          this.setState({Remember_me: value});
                        }}
                        //style={{marginEnd: 8}}
                        value={this.state.Remember_me}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: 'row',
                      height: 32,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        flexGrow: 1,
                        alignSelf: 'center',
                        alignContent: 'center',
                      }}>
                      <TextView
                        text="Biometric ID"
                        textSize={16}
                        singleLine={true}
                        textColor={R.color.chat_left_text}
                      />
                    </View>
                    <View
                      style={{
                        marginStart: 8,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        flexDirection: 'row',
                      }}>
                      <Switch
                        trackColor={{
                          false: R.color.grey,
                          true: R.color.switch_purple,
                        }}
                        thumbColor={R.color.colorPrimary}
                        ios_backgroundColor={R.color.grey}
                        onValueChange={(value: boolean) => {
                          this.setState({Biometric_ID: value});
                        }}
                        //style={{marginEnd: 8}}
                        value={this.state.Biometric_ID}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: 'row',
                      height: 32,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        flexGrow: 1,
                        alignSelf: 'center',
                        alignContent: 'center',
                      }}>
                      <TextView
                        text="Face ID"
                        textSize={16}
                        singleLine={true}
                        textColor={R.color.chat_left_text}
                      />
                    </View>
                    <View
                      style={{
                        marginStart: 8,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        flexDirection: 'row',
                      }}>
                      <Switch
                        trackColor={{
                          false: R.color.grey,
                          true: R.color.switch_purple,
                        }}
                        thumbColor={R.color.colorPrimary}
                        ios_backgroundColor={R.color.grey}
                        onValueChange={(value: boolean) => {
                          this.setState({Face_ID: value});
                        }}
                        //style={{marginEnd: 8}}
                        value={this.state.Face_ID}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: 'row',
                      height: 32,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        flexGrow: 1,
                        alignSelf: 'center',
                        alignContent: 'center',
                      }}>
                      <TextView
                        text="SMS Authenticator"
                        textSize={16}
                        singleLine={true}
                        textColor={R.color.chat_left_text}
                      />
                    </View>
                    <View
                      style={{
                        marginStart: 8,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        flexDirection: 'row',
                      }}>
                      <Switch
                        trackColor={{
                          false: R.color.grey,
                          true: R.color.switch_purple,
                        }}
                        thumbColor={R.color.colorPrimary}
                        ios_backgroundColor={R.color.grey}
                        onValueChange={(value: boolean) => {
                          this.setState({SMS_Auth: value});
                        }}
                        // style={{marginEnd: 8}}
                        value={this.state.SMS_Auth}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: 'row',
                      height: 32,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        flexGrow: 1,
                        alignSelf: 'center',
                        alignContent: 'center',
                      }}>
                      <TextView
                        text="Google Authenticator"
                        textSize={16}
                        singleLine={true}
                        textColor={R.color.chat_left_text}
                      />
                    </View>
                    <View
                      style={{
                        marginStart: 8,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        flexDirection: 'row',
                      }}>
                      <Switch
                        trackColor={{
                          false: R.color.grey,
                          true: R.color.switch_purple,
                        }}
                        thumbColor={R.color.colorPrimary}
                        ios_backgroundColor={R.color.grey}
                        onValueChange={(value: boolean) => {
                          this.setState({Google_Auth: value});
                        }}
                        //style={{marginEnd: 0}}
                        value={this.state.Google_Auth}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: 'row',
                      height: 32,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        flexGrow: 1,
                        alignSelf: 'center',
                        alignContent: 'center',
                      }}>
                      <TextView
                        text="Device Management"
                        textSize={16}
                        singleLine={true}
                        textColor={R.color.chat_left_text}
                      />
                    </View>
                    <View
                      style={{
                        marginStart: 5,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        flexDirection: 'row',
                      }}>
                      <ImageView
                        src={R.drawable.ic_next}
                        width={12}
                        height={12}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
              style = {{
                borderRadius: 12,
                marginStart: 34,
                marginEnd: 34,
                marginTop: 90,
              }}
                onPress={() => {
                  this.navigation.push(R.id.profile_change_password_screen, {
                    profile: this.profile,
                  });
                }}>
                <LinearGradient
                  colors={['#7A47FF', '#A555DE', '#DB68B3', '#FF7497']}
                  style={{
                     borderRadius: 8,
                    // marginStart: 34,
                    // marginEnd: 34,
                    // marginTop: 90,
                  }}
                  start={{y: 0.0, x: 0.0}}
                  end={{y: 1.0, x: 1.0}}>
                  <View
                    style={{
                      //flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignContent: 'center',
                      marginStart: 34,
                      marginEnd: 34,
                      marginTop: 16,
                      marginBottom: 16,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                      }}>
                      <TextView
                        text="Change Password"
                        textColor={'white'}
                        textSize={18}
                        textStyle={'normal'}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

            </>
          )}
        </SafeAreaInsetsContext.Consumer>
      </View>
    );
  }
  
  onViewCreated(): void {
  
  }

}
