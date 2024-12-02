/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, StatusBar, View,TouchableOpacity} from 'react-native';
import {BaseComponent} from '../commons/BaseComponent';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {R} from '../constant';
import {Divider} from '../res/widgets/Divider';
import {GradiantContainerSolid} from '../res/widgets/GradiantContainerSolid';
import {ImageButton} from '../res/widgets/ImageButton';
import {TextView} from '../res/widgets/TextView';
import Snackbar from 'react-native-snackbar';
import {Center} from '../res/widgets/Center';
import {EditText} from '../res/widgets/EditText';
import {Profile} from '../models/profile';
import {Padding} from '../res/widgets/Padding';
import LinearGradient from 'react-native-linear-gradient';
import {Api} from '../commons/Api';
import {BaseException} from '../commons/BaseException';
import {Utils} from '../commons/Utils';


export class ProfileChangePassword extends BaseComponent {
profile: Profile;
  state: {
    password : '',
    new_password  : '',
    confirm_password : '',
    password_error :'',
    newPassword_error :'',
    confirm_password_error:'',
  };

  constructor(props: any) {
    super(props);
    this.profile = this.navigation.arguments.profile;
    
    this.state = {
      ...super.state,
      ...{
        password :'',
        new_password  :'',
        confirm_password : '',
        password_error :'',
        newPassword_error :'',
        confirm_password_error:'',
      },
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
                    text={'Security'}
                    textSize={24}
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
              <View style = {{
                //marginTop : 50,
                padding:20,
                backgroundColor: 'white',
                  marginTop: -16,
                  paddingTop: 24,
                  paddingEnd: 28,
                  paddingStart: 28,
                  borderTopEndRadius: 16,
                  borderTopStartRadius: 16,
              }}>


            <Padding
              paddingTop={30}
              paddingStart={16}
              paddingEnd={16}
              paddingBottom={20}>
              <Center>
                <TextView
                  text={R.string.changePasswordTitle}
                  textColor={'black'}
                  textSize={20}
                  textStyle={'bold'}
                />
              </Center>
              <TextView
                text={'Old Password'}
                marginTop={32}
                marginStart={0}
                textSize={16}

              />
              <EditText
                hint={'Enter Old Password'}
                marginTop={8}
                inputType="textPassword"
                borderColor={R.color.grey}
                error= {this.state.password_error}
                height={43}
                onTextChanged={(value: string) => {
                  this.setState({password: value});
                }}
              />

              <TextView
                text={'New Password'}
                marginTop={24}
                marginStart={0}
                textSize={16}
              />
              <EditText
                hint={'Enter New Password'}
                marginTop={8}
                error= {this.state.newPassword_error}
                inputType="textPassword"
                borderColor={R.color.grey}
                height={43}
                onTextChanged={(value: string) => {
                  this.setState({new_password: value});
                }}
              />
              <TextView
                text={'Confirm Password'}
                marginTop={24}
                marginStart={0}
                textSize={16}
              />
              <EditText
                hint={'Enter Confirm Password'}
                marginTop={8}
                borderColor={R.color.grey}
                height={43}
                inputType="textPassword"
                error= {this.state.confirm_password_error}
                onTextChanged={(value: string) => {
                  this.setState({confirm_password: value});
                }}
              />
                 <TouchableOpacity  onPress={() => {
                   if (this.is_form_valid()) {
                    this.call_change_password_and_go_to_post_redirect(
                      this.state.password,
                      this.state.new_password
                      )}


                    
                    // this.navigation.push(R.id.profile_succeed_change_password, {
                    //   profile: this.profile,
                    // });
                  }}>
                <LinearGradient
                  colors={['#7A47FF', '#A555DE', '#DB68B3', '#FF7497']}
                  style={{
                    borderRadius: 8,
                    marginStart: 0,
                    //marginEnd: 34,
                    marginTop: 46,
                      
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
            </Padding>


        </View>
            </>
          )}
        </SafeAreaInsetsContext.Consumer>
      </ScrollView>
    );
  }

  onViewCreated(): void {}

  is_form_valid(): boolean {
    this.setState({password_error :'',newPassword_error :'',});
    if (!Utils.isPasswordCriteriaValid(this.state.password)) {
      this.setState({password_error: 'Please enter valid password'});
    } else if (!Utils.isPasswordCriteriaValid(this.state.new_password)) {
      this.setState({newPassword_error: 'Please enter valid password'});
    } 
    else if (this.state.new_password != this.state.confirm_password)
    {
      this.setState({confirm_password_error: 'Please enter valid password'});
    }
    else if(this.state.password == this.state.new_password){
      Snackbar.show({
        text: "Password already used.",
        duration: Snackbar.LENGTH_LONG,
      });
      
    }
    else {
      return true;
    }
    return false;
  }


  call_change_password_and_go_to_post_redirect(
    currentpassword: string,
    newpassword: string,
   
  ) {
    this.lifecycleScope<void>(async () => {
      await Api.change_password(currentpassword, newpassword);
    }, true)
      .then((_: any) => {
        // go to redirect screen
        this.navigation.replace(R.id.profile_succeed_change_password, {
         
        });
      })
      .catch((error: BaseException) => {
        Snackbar.show({
          text: error.message,
          duration: Snackbar.LENGTH_LONG,
        });

      });
  }
}
