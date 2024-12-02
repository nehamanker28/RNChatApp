/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  StatusBar,
  Switch,
  TouchableOpacity,
  View,
  Modal,
  Text,
} from 'react-native';
import {R} from '../constant';
import {Divider} from '../res/widgets/Divider';
import {ImageButton} from '../res/widgets/ImageButton';
import {ImageView} from '../res/widgets/ImageView';
import {BaseComponent} from '../commons/BaseComponent';
import {GradiantContainerSolid} from '../res/widgets/GradiantContainerSolid';
import {TextView} from '../res/widgets/TextView';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {Column} from '../res/widgets/Column';
import LinearGradient from 'react-native-linear-gradient';
import {Profile} from '../models/profile';
import {Row} from '../res/widgets/Row';
import {Container} from '../res/widgets/Container';
import Snackbar from 'react-native-snackbar';
import {Api} from '../commons/Api';
import {BaseException} from '../commons/BaseException';
import {Prefs} from '../commons/Prefs';
import {GradiantButton} from '../res/widgets/GradiantButton';
import {Repository} from '../commons/Repository';
export class ProfileViewScreen extends BaseComponent {
  state: {
    dark_mode: boolean;
    isModelVisible: boolean;
    profile: Profile;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      ...super.state,
      dark_mode: false,
      isModelVisible: false,
      profile: this.navigation.arguments.profile,
    };
  }

  onCreateView(): JSX.Element {
    return (
      <ScrollView bounces={false}>
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
                    text={'Profile'}
                    textSize={32}
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
                  flex: 1,
                  backgroundColor: 'white',
                  marginTop: -16,
                  paddingTop: 24,
                  paddingEnd: 28,
                  paddingStart: 28,
                  borderTopEndRadius: 16,
                  borderTopStartRadius: 16,
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignContent: 'center',
                    height: 100,
                  }}>
                  <View
                    style={{
                      flex: 0.2,
                      justifyContent: 'center',
                    }}>
                    <ImageView
                      src={
                        this.state.profile.avatar !== undefined
                          ? this.state.profile.avatar
                          : R.drawable.placeholder_avatar
                      }
                      height={52}
                      width={52}
                      borderRadius={64}
                      resizeMode={'cover'}
                    />
                  </View>
                  <View
                    style={{
                      flex: 0.7,
                      paddingStart: 8,
                      paddingEnd: 8,
                      justifyContent: 'center',
                    }}>
                    <Column>
                      <TextView
                        text={this.state.profile.getDisplayName()}
                        textColor={'black'}
                        textSize={20}
                        textStyle={'bold'}
                      />
                      <TextView
                        text={this.state.profile.email}
                        textSize={12}
                        fontFamily={R.font.inter_extra_light}
                        textColor={'grey'}
                      />
                    </Column>
                  </View>
                  <View
                    style={{
                      flex: 0.1,
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                    }}>
                    <ImageView
                      src={R.drawable.ic_next}
                      marginEnd={4}
                      height={12}
                      width={12}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  borderRadius: 8,
                  paddingEnd: 28,
                  paddingStart: 28,
                  marginTop: 16,
                }}>
                <LinearGradient
                  colors={['#7A47FF', '#A555DE', '#DB68B3', '#FF7497']}
                  style={{
                    borderRadius: 8,
                  }}
                  start={{y: 0.0, x: 0.0}}
                  end={{y: 1.0, x: 1.0}}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignContent: 'center',
                      marginStart: 16,
                      marginEnd: 16,
                      marginTop: 16,
                      marginBottom: 16,
                    }}>
                    <View
                      style={{
                        flex: 0.2,
                        justifyContent: 'center',
                      }}>
                      <ImageButton
                        backgroundColor={'white'}
                        elevation={0}
                        src={R.drawable.ic_star}
                        size={32}
                        height={56}
                        width={56}
                        borderRadius={64}
                      />
                    </View>
                    <View
                      style={{
                        flex: 0.7,
                        marginStart: 16,
                        justifyContent: 'center',
                      }}>
                      <Column>
                        <TextView
                          text="Upgrade to PRO!"
                          textColor={'white'}
                          textSize={16}
                          textStyle={'bold'}
                        />
                        <TextView
                          text="Enjoy all benefits without restrictions"
                          textSize={10}
                          marginTop={4}
                          textColor={'white'}
                        />
                      </Column>
                    </View>
                    <View
                      style={{
                        flex: 0.1,
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                      }}>
                      <ImageView
                        src={R.drawable.ic_next_white}
                        height={14}
                        width={14}
                      />
                    </View>
                  </View>
                </LinearGradient>

                <Container marginTop={16}>
                  <Row>
                    <TextView
                      text="General"
                      textSize={12}
                      textStyle={'bold'}
                      textColor={R.color.settingSectionText}
                    />
                    <View
                      style={{
                        backgroundColor: R.color.grey,
                        height: 1,
                        flexGrow: 1,
                        marginStart: 4,
                        alignSelf: 'flex-end',
                        bottom: 4,
                      }}
                    />
                  </Row>
                </Container>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    this.navigation.push(R.id.profile_edit_screen, {
                      profile: this.state.profile,
                      callback: (profile: Profile) => {
                        this.setState({profile: profile});
                      },
                    });
                  }}>
                  <View
                    style={{
                      marginTop: 16,
                      flexDirection: 'row',
                      height: 32,
                    }}>
                    <View
                      style={{
                        marginEnd: 12,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <ImageView
                        src={R.drawable.ic_menu_profile}
                        width={16}
                        height={16}
                      />
                    </View>

                    <View
                      style={{
                        flexGrow: 1,
                        alignContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <TextView
                        text="Personal Info"
                        textSize={16}
                        singleLine={true}
                        textColor={R.color.settingMenuText}
                      />
                    </View>
                    <View
                      style={{
                        marginStart: 8,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <ImageView
                        src={R.drawable.ic_next}
                        width={12}
                        height={12}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    this.navigation.push(R.id.transaction_history_screen, {
                      profile: this.state.profile,
                    });
                  }}>
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      height: 32,
                    }}>
                    <View
                      style={{
                        marginEnd: 12,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <ImageView
                        src={R.drawable.ic_menu_profile}
                        width={16}
                        height={16}
                      />
                    </View>

                    <View
                      style={{
                        flexGrow: 1,
                        alignContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <TextView
                        text="My Transaction"
                        textSize={16}
                        singleLine={true}
                        textColor={R.color.settingMenuText}
                      />
                    </View>
                    <View
                      style={{
                        marginStart: 8,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <ImageView
                        src={R.drawable.ic_next}
                        width={12}
                        height={12}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    this.navigation.push(R.id.subscription_screen, {
                      //profile: this.profile,
                    });
                  }}>
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      height: 32,
                    }}>
                    <View
                      style={{
                        marginEnd: 12,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <ImageView
                        src={R.drawable.ic_menu_profile}
                        width={16}
                        height={16}
                      />
                    </View>

                    <View
                      style={{
                        flexGrow: 1,
                        alignContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <TextView
                        text="My Subscription"
                        textSize={16}
                        singleLine={true}
                        textColor={R.color.settingMenuText}
                      />
                    </View>
                    <View
                      style={{
                        marginStart: 8,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <ImageView
                        src={R.drawable.ic_next}
                        width={12}
                        height={12}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    this.navigation.push(R.id.profile_security_screen, {
                      profile: this.state.profile,
                    });
                  }}>
                  <View
                    style={{
                      marginTop: 12,
                      flexDirection: 'row',
                      height: 32,
                    }}>
                    <View
                      style={{
                        marginEnd: 12,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <ImageView
                        src={R.drawable.ic_menu_security}
                        width={16}
                        height={16}
                      />
                    </View>

                    <View
                      style={{
                        flexGrow: 1,
                        alignContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <TextView
                        text="Security"
                        textSize={16}
                        singleLine={true}
                        textColor={R.color.settingMenuText}
                      />
                    </View>
                    <View
                      style={{
                        marginStart: 8,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <ImageView
                        src={R.drawable.ic_next}
                        width={12}
                        height={12}
                      />
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    Snackbar.show({
                      text: 'This options is disabled.',
                      duration: Snackbar.LENGTH_SHORT,
                    });
                    console.debug('Lang');
                  }}>
                  <View
                    style={{
                      marginTop: 12,
                      flexDirection: 'row',
                      height: 32,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        marginEnd: 12,
                        alignContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <ImageView
                        src={R.drawable.ic_menu_language}
                        width={16}
                        height={16}
                      />
                    </View>

                    <View
                      style={{
                        flexGrow: 1,
                        alignContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <TextView
                        text="Language"
                        textSize={16}
                        singleLine={true}
                        textColor={R.color.settingMenuText}
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
                      <TextView
                        text="English (US)"
                        textSize={14}
                        singleLine={true}
                        marginEnd={16}
                        textColor={R.color.settingMenuText}
                      />
                      <ImageView
                        src={R.drawable.ic_next}
                        width={12}
                        height={12}
                      />
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
                  <View
                    style={{
                      marginTop: 12,
                      flexDirection: 'row',
                      height: 32,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        marginEnd: 12,
                        alignContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <ImageView
                        src={R.drawable.ic_menu_theme}
                        width={16}
                        height={16}
                      />
                    </View>

                    <View
                      style={{
                        flexGrow: 1,
                        alignSelf: 'center',
                        alignContent: 'center',
                      }}>
                      <TextView
                        text="Dark Mode"
                        textSize={16}
                        singleLine={true}
                        textColor={R.color.settingMenuText}
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
                          true: R.color.grey,
                        }}
                        thumbColor={R.color.colorAccent}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value: boolean) => {
                          this.setState({dark_mode: value});
                        }}
                        style={{marginEnd: 12}}
                        value={this.state.dark_mode}
                      />
                      <ImageView
                        src={R.drawable.ic_next}
                        width={12}
                        height={12}
                      />
                    </View>
                  </View>
                </TouchableOpacity>

                <Container marginTop={16}>
                  <Row>
                    <TextView
                      text="About"
                      textSize={12}
                      textStyle={'bold'}
                      textColor={R.color.settingSectionText}
                    />
                    <View
                      style={{
                        backgroundColor: R.color.grey,
                        height: 1,
                        flexGrow: 1,
                        marginStart: 4,
                        alignSelf: 'flex-end',
                        bottom: 4,
                      }}
                    />
                  </Row>
                </Container>

                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    this.navigation.push(R.id.profile_help_screen, {});
                  }}>
                  <View
                    style={{
                      marginTop: 12,
                      flexDirection: 'row',
                      height: 32,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        marginEnd: 12,
                        alignContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <ImageView
                        src={R.drawable.ic_menu_help}
                        width={16}
                        height={16}
                      />
                    </View>

                    <View
                      style={{
                        flexGrow: 1,
                        alignSelf: 'center',
                        alignContent: 'center',
                      }}>
                      <TextView
                        text="Help Center"
                        textSize={16}
                        singleLine={true}
                        textColor={R.color.settingMenuText}
                      />
                    </View>
                    <View
                      style={{
                        marginStart: 8,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <ImageView
                        src={R.drawable.ic_next}
                        width={12}
                        height={12}
                      />
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    this.navigation.push(R.id.profile_privacy_screen, {
                      profile: this.state.profile,
                    });
                  }}>
                  <View
                    style={{
                      marginTop: 12,
                      flexDirection: 'row',
                      height: 32,
                    }}>
                    <View
                      style={{
                        marginEnd: 12,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <ImageView
                        src={R.drawable.ic_menu_privacy}
                        width={16}
                        height={16}
                      />
                    </View>

                    <View
                      style={{
                        flexGrow: 1,
                        alignContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <TextView
                        text="Privacy Policy"
                        textSize={16}
                        singleLine={true}
                        textColor={R.color.settingMenuText}
                      />
                    </View>
                    <View
                      style={{
                        marginStart: 8,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <ImageView
                        src={R.drawable.ic_next}
                        width={12}
                        height={12}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  // onPress={() => {
                  //   this.do_account_logout_and_go_to_splash();
                  // }}

                  onPress={() => {
                    this.setState({isModelVisible: true});
                  }}>
                  <View
                    style={{
                      marginTop: 12,
                      flexDirection: 'row',
                      height: 32,
                    }}>
                    <View
                      style={{
                        marginEnd: 12,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <ImageView
                        src={R.drawable.ic_menu_logout}
                        width={16}
                        height={16}
                      />
                    </View>

                    <View
                      style={{
                        flexGrow: 1,
                        alignContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <TextView
                        text="Logout"
                        textSize={16}
                        singleLine={true}
                        textStyle={'bold'}
                        textColor={R.color.settingLogoutText}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}
        </SafeAreaInsetsContext.Consumer>
        <View>
        <Modal
            visible={this.state.isModelVisible}
            animationType="slide"
            transparent
            >
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}>
              <View
                style={{
                  //flex: 1,
                  backgroundColor: 'white',
                  marginTop: 'auto',
                  paddingTop: 24,
                  paddingEnd: 28,
                  paddingStart: 28,
                  borderTopEndRadius: 25,
                  borderTopStartRadius: 25,
                  height: '30%',
                }}>
                <View
                  style={{
                    alignContent: 'center',
                    alignSelf: 'center',
                    //backgroundColor: 'white',
                    marginBottom: 10,
                  }}>
                  <TextView
                    text="Logout"
                    textSize={30}
                    singleLine={true}
                    textStyle={'bold'}
                    textColor={R.color.settingLogoutText}
                  />
                </View>
                <View>
                  <Container marginTop={10}>
                    <Row>
                      <View
                        style={{
                          backgroundColor: R.color.grey,
                          height: 1,
                          flexGrow: 1,
                          marginStart: 4,
                          bottom: 4,
                        }}
                      />
                    </Row>
                  </Container>
                </View>
                <View
                  style={{
                    //flexGrow: 1,
                    marginTop: 10,
                    alignContent: 'center',
                    alignSelf: 'center',
                    //backgroundColor: 'white',
                    justifyContent:'center',
                    marginBottom: 10,
                  }}>
                  <TextView
                    text="Are you sure you want to log out?"
                    textSize={18}
                    singleLine={true}
                    //textStyle={'bold'}
                    textColor={'black'}
                    fontFamily={R.font.inter_regular}
                  />
                </View>

                <View
                  style={{
                    // flex : 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                   //backgroundColor:'grey'

                  }}>
                  <GradiantButton
                    text="Cancel"
                    marginTop={32}
                    //marginStart ={30}
                    paddingStart={20}
                    marginBottom={16}
                    paddingEnd={20}
                    textColor={'#7A47FF'}
                    paddingTop= {10}
                    paddingBottom= {10}
                    colors={[
                      'rgba(122, 71, 255, 0.3)',
                      'rgba(255, 116, 151, 0.3)',
                    ]}
                    onClick={() => {
                      this.setState({isModelVisible: false});
                    }}
                  />
                  <GradiantButton
                    text=" Yes Logout"
                    marginTop={32}
                    paddingStart={10}
                    marginBottom={16}
                    paddingEnd={10}
                    marginStart ={20}
                    paddingTop= {10}
                    paddingBottom= {10}
                    
                    colors={[
                      'rgba(122, 71, 255, 0.8)',
                      'rgba(255, 116, 151, 0.8)',
                    ]}
                    onClick={() => {
                      this.setState({isModelVisible: false});
                      this.do_account_logout_and_go_to_splash();
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    );
  }
  onViewCreated(): void {}

  do_account_logout_and_go_to_splash() {
    this.lifecycleScope<void>(async () => {
      let repository = global.repository as Repository;
      await Prefs.clear();
      repository.deleteAll();
      return await  Api.account_logout();
    })
      .then((_ : any) => {
        this.navigation.pop();
        this.navigation.replace(R.id.login_screen, {});
      })
      .catch((error: BaseException) => {
        Snackbar.show({
                  text: error.message,
                  duration: Snackbar.LENGTH_LONG,
                });
              });

    }

}
