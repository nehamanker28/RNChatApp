import React ,{Component} from 'react';
import {Animated, FlatList,View,ScrollView,StatusBar,Modal,TouchableOpacity,StyleSheet,I18nManager} from 'react-native';
import {Scaffold} from '../res/widgets/Scaffold';
import {ImageButton} from '../res/widgets/ImageButton';
import {R} from '../constant';
import { BaseComponent } from '../commons/BaseComponent';
import {Center} from '../res/widgets/Center';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {TextView} from '../res/widgets/TextView';
import {Row} from '../res/widgets/Row';
import {Padding} from '../res/widgets/Padding';
//import RNFetchBlob from 'rn-fetch-blob';
import { GradiantContainerSolid } from '../res/widgets/GradiantContainerSolid';
import { Divider } from '../res/widgets/Divider';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import {GradiantButton} from '../res/widgets/GradiantButton';
import {Container} from '../res/widgets/Container';
import { History } from '../models/history';
import { Image, Text } from 'react-native-svg';
import { Swipeable ,RectButton} from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import { ImageView } from '../res/widgets/ImageView';


export class HistoryScreen extends BaseComponent {
  // audioRecorderPlayer = new AudioRecorderPlayer();
  // dirs = RNFetchBlob.fs.dirs;
  // path = Platform.select({
  //   ios: 'hello.m4a',
  //   android: `${this.dirs.CacheDir}/hello.mp3`,
  // });

  state: {
    isModelVisible: boolean;
    isSearchBarVisible : boolean;
    history : Array<History>
    filteredHistory : Array<History>,
    isFocused: boolean, 
    search: '',
    key :number,
    // recordSecs: any;
    // recordTime: any;
    // currentPositionSec: any;
    // currentDurationSec: any;
    // playTime: any;
    // isRecording?: boolean;
    // isPlaying: boolean;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      ...super.state,
      ...{
        search: '',
        key: 0,
        isModelVisible: false,
        isSearchBarVisible : false,
        isFocused: false ,
        history : [new History({
          _id: '1',
          title: 'History1',
          date: '19 Dec 2023 - 09:41 AM',
          body: 'oneI weight 70 kg, I want a diet plan to I weight 70 kg, ',
          history_type: 'History1',
        }), new History({
          _id: '2',
          title: 'History2',
          date: '21 Dec 2023 - 09:41 AM',
          body: 'twoI weight 70 kg, I want a diet plan to...',
          history_type: 'History1',
        }), new History({
          _id: '3',
          title: 'History3',
          date: '20 Dec 2023 - 09:41 AM',
          body: 'twiI weight 70 kg, I want a diet plan to...',
          history_type: 'History1',
        })
        , new History({
          _id: '4',
          title: 'History4',
          date: '20 Dec 2023 - 09:41 AM',
          body: 'fourI weight 70 kg, I want a diet plan to...',
          history_type: 'History2',
        })],
        filteredHistory :[]
         //history :null,
        // recordSecs: '0',
        // recordTime: '0',
        // currentPositionSec: '0',
        // currentDurationSec: '0',
        // playTime: '0',
        // isRecording: false,
        // isPlaying: false,
      },
      
    };
   this.getInitialList()
  }



  onCreateView(): JSX.Element {
    
    return (
      
      // <Scaffold>
      //   <Center>
      //     <Row>
      //       <ImageButton
      //         onClick={() => {
      //           if (!this.state.isRecording) {
      //             this.startRecord();
      //           } else {
      //             Snackbar.show({
      //               text: 'Please stop recording first.',
      //               duration: Snackbar.LENGTH_SHORT,
      //             });
      //           }
      //         }}
      //         marginTop={16}
      //         src={R.drawable.ic_record}
      //         backgroundColor={'white'}
      //       />
      //       <ImageButton
      //         marginStart={16}
      //         onClick={() => {
      //           if (this.state.isRecording) {
      //             this.stopRecording();
      //           } else {
      //             Snackbar.show({
      //               text: 'Please start recording first.',
      //               duration: Snackbar.LENGTH_SHORT,
      //             });
      //           }
      //         }}
      //         marginTop={16}
      //         src={R.drawable.ic_history}
      //         backgroundColor={'white'}
      //       />
      //       <ImageButton
      //         marginStart={16}
      //         onClick={() => {
      //           if (!this.state.isPlaying) {
      //             this.play();
      //           } else {
      //             Snackbar.show({
      //               text: 'Already playing.',
      //               duration: Snackbar.LENGTH_SHORT,
      //             });
      //           }
      //         }}
      //         marginTop={16}
      //         src={R.drawable.ic_play}
      //         backgroundColor={'white'}
      //       />
      //       <ImageButton
      //         marginStart={16}
      //         onClick={() => {
      //           if (this.state.isPlaying) {
      //             this.stop();
      //           } else {
      //             Snackbar.show({
      //               text: 'Nothing is playing.',
      //               duration: Snackbar.LENGTH_SHORT,
      //             });
      //           }
      //         }}
      //         marginTop={16}
      //         src={R.drawable.ic_message}
      //         backgroundColor={'white'}
      //       />
      //     </Row>
      //     <Padding paddingTop={32}>
      //       <Row>
      //         <TextView text="recordSecs: " textStyle={'bold'} />
      //         <TextView text={this.state.recordSecs} />
      //       </Row>
      //     </Padding>
      //     <Padding paddingTop={8}>
      //       <Row>
      //         <TextView text="recordTime: " textStyle={'bold'} />
      //         <TextView text={this.state.recordTime} />
      //       </Row>
      //     </Padding>
      //     <Padding paddingTop={8}>
      //       <Row>
      //         <TextView text="currentPositionSec: " textStyle={'bold'} />
      //         <TextView text={this.state.currentPositionSec} />
      //       </Row>
      //     </Padding>
      //     <Padding paddingTop={8}>
      //       <Row>
      //         <TextView text="currentDurationSec: " textStyle={'bold'} />
      //         <TextView text={this.state.currentDurationSec} />
      //       </Row>
      //     </Padding>
      //     <Padding paddingTop={8}>
      //       <Row>
      //         <TextView text="playTime: " textStyle={'bold'} />
      //         <TextView text={this.state.playTime} />
      //       </Row>
      //     </Padding>
      //   </Center>
      // </Scaffold>
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
                  text={'History'}
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
                  flex: 1,
               
                  backgroundColor: 'white',
                  marginTop: -16,
                  paddingTop: 24,
                  paddingEnd: 28,
                  paddingStart: 28,
                  marginBottom: insets?.bottom,
                  borderTopEndRadius: 24,
                  borderTopStartRadius: 24,
                  //height :100,
                }}>
                <View style = {{
                  //flex:0.8,
               
                  //backgroundColor: 'blue',
                }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                       // backgroundColor:'blue',
                        alignItems:'center',
                     // justifyContent: 'flex-end',
                      marginEnd: 10,
                      marginBottom: 10,
                      // marginLeft:80,

                    }}>
                        { this.state.isSearchBarVisible ? 
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignContent: 'center',
                            backgroundColor: (this.state.isFocused) ? 'rgba(255, 116, 151, 0.26)': R.color.chat_left_color,
                            borderRadius: 10,
                            borderColor : (this.state.isFocused) ? 'rgba(122, 71, 255, 1)': R.color.chat_left_color,
                            height: 60,
                            borderWidth:1,
                        }}>
                            <View
                                style={{
                                  flex: 0.1,
                                    justifyContent: 'space-around',
                                 
                                }}>
                                <ImageButton
                                    backgroundColor={R.color.transparent}
                                   // borderColor={R.color.chat_left_color}
                                    elevation={0}
                                    src={R.drawable.ic_search_black}
                                    size={20}
                                    height={14}
                                    width={14}
                                    borderRadius={64}
                                    
                                />
                            </View>
                            <View style={{
                                flex: 0.8,
                                justifyContent: 'center',
                            }}>
                                <TextInput
                                    onFocus={this.onFocusChange}
                                    style={styles.textInputStyle}
                                    autoCapitalize= {'none'}
                                    onChangeText={(text) => this.updateSearch(text)}
                                    value={this.state.search}
                                    underlineColorAndroid="transparent"
                                    // placeholder="Search"
                                    // placeholderTextColor={'black'}
                                   
                                />
                            </View>
                        </View> 
      
                        : 
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignContent: 'center',
                            backgroundColor: R.color.transparent,
                            borderRadius: 5,
                            height: 60,
                            
                        }}></View>
                        
                        }
                  {this.state.history ?   <ImageButton
                      backgroundColor={'white'}
                      elevation={0}
                      src={R.drawable.ic_search_black}
                      marginStart={10}
                      size={14}
                      height={20}
                      width={20}
                      onClick={() => {
                        this.setState({isSearchBarVisible: !this.state.isSearchBarVisible});
                        if(this.state.isSearchBarVisible){
                          this.getInitialList()
                          this.state.search = ''
                        }
                      }}

                    /> :null
  }
                  {this.state.history ?   <ImageButton
                      backgroundColor={'white'}
                      elevation={0}
                      src={R.drawable.ic_delete_black}
                      size={14}
                      height={20}
                      width={20}
                      marginStart={5}
                      onClick={() => {
                        this.setState({isModelVisible: true});
                      }}
                    /> : null }
                    
               
                    </View>
                  {this.state.filteredHistory ?  <View >
                  <FlatList
                    style={{ flexDirection: 'column', paddingTop: 0 ,borderRadius:10}}
                    scrollEnabled
                    keyExtractor={item => item._id}
                   
                    //ListHeaderComponent={this.renderHeader}
                    //data={this.state.filteredHistory && this.state.filteredHistory.length > 0 ? this.state.filteredHistory : this.state.history}
                    //extraData={this.state.history}
                    data = {this.state.filteredHistory}
                    ListEmptyComponent={this.renderHeader}
                    renderItem={({ item }) =>
                      <View style = {{
                      borderRadius:5,
                      backgroundColor:R.color.light_grey,
                      marginVertical:10,
                      justifyContent:'center'}}>
                       <Swipeable
                         key={item._id}
                        renderRightActions = {this.renderRightActions}
                         onSwipeableWillOpen = {() => {
                          this.setState({key: item._id});
                        }}
                        >
                          <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop:20,
                            marginBottom:10,
                            marginStart:20,
                    
                          }}>
                            <TextView
                              text={item.body}
                              textSize={17}
                              singleLine={true}
                            />
                            <View
                              style={{
                                justifyContent: 'flex-end',
                                marginEnd: 10,
                               //marginTop: 10,

                              }}>
                              <ImageButton
                                backgroundColor={'white'}
                                elevation={0}
                                src={R.drawable.ic_next}
                                size={14}
                                height={14}
                                width={14}

                              />
                            </View>
                          </View>
                          <TextView
                            text={item.date}
                            textSize={10}
                            singleLine={true}
                            marginBottom={10}
                            textColor={R.color.text_grey}
                            marginStart={20}
                          />
                      </Swipeable>
                      </View>
                      }
                  /> 
                  </View>  
                  :
                  <View style = {{
                    flex:1,
                    height: '100%',
                   // backgroundColor:'blue',
                    justifyContent:'center',
                    alignContent:'center',
                    //width:'50%'
                  }}>
                     <ImageView
                      //backgroundColor={'white'}
                      //elevation={0}
                      src={R.drawable.ic_historyFileEmpty}
                      //size={200}
                      height={200}
                      width={200}
                      marginStart={70}
                      
                      
                    />
                  
                    <Center>
                  <TextView
                    text="Empty"
                    textSize={25}
                    singleLine={true}
                    fontFamily={R.font.inter_semi_bold}
                    marginTop={20}
                   
                  />
                 </Center>
               <Center>
                 <TextView
                    text="You have no History"
                    textSize={20}
                   // marginStart={-10}
                    singleLine={true}
                    marginTop={30}
                    fontFamily={R.font.inter_light}
                    //textColor={R.color.settingLogoutText}
                  />
                </Center>
                
                    
                  </View>
                  }
                </View>
              </View>
            <Modal
            visible={this.state.isModelVisible}
            animationType="slide"
            transparent>
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
                  height: '35%',
                }}>
                <View
                  style={{
                    alignContent: 'center',
                    alignSelf: 'center',
                    //backgroundColor: 'white',
                    marginBottom: 20,
                    
                  }}>
                  <TextView
                    text="Clear All History"
                    textSize={25}
                    singleLine={true}
                    fontFamily={R.font.inter_semi_bold}
                    //textColor={R.color.settingLogoutText}
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
                    marginTop: 20,
                    alignContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <TextView
                    text="Are you sure you want to clear all
                    history?"
                    textSize={20}
                    fontFamily={R.font.inter_semi_bold}
                    gravity={'center'}
                    singleLine = {false}
                    //textStyle={'bold'}
                    textColor={'black'}
                  />
                </View>

                <View
                  style={{
                    // flex : 1,
                    flexDirection: 'row',
                   
                    justifyContent: 'space-evenly',
                  }}>
                  <GradiantButton
                    text="Cancel"
                    marginTop={32}
                    paddingStart={8}
                    marginBottom={16}
                    paddingEnd={8}
                    textColor={'#7A47FF'}
                    colors={[
                      'rgba(122, 71, 255, 0.3)',
                      'rgba(255, 116, 151, 0.3)',
                    ]}
                    
                    onClick={() => {
                      this.setState({isModelVisible: false});
                    }}
                  />
                  <GradiantButton
                    text=" Yes Clear All History"
                    marginTop={32}
                    paddingStart={8}
                    marginBottom={16}
                    paddingEnd={8}
                    colors={[
                      'rgba(122, 71, 255, 0.8)',
                      'rgba(255, 116, 151, 0.8)',
                    ]}
                    onClick={() => {
                      this.setState({isModelVisible: false});
                      this.setState({filteredHistory : null})
                      //this.do_account_logout_and_go_to_splash();
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
          
            
          </>
        )}
      </SafeAreaInsetsContext.Consumer>
    </ScrollView>
    );
  }
  onViewCreated(): void {}

  EmptyListMessage = () => {
    return (
      <View style = {{backgroundColor :'blue'}}>
      <Text fontSize={30}>
        No Data Found
      </Text>
      </View>
    );
  };
   leftAction = () => {
    <View >
        <Text>Completed</Text>

    </View>

}
deleteItemById = (id:any) => {
  const filteredData = this.state.filteredHistory.filter(item => item._id !== id);
  this.setState({ filteredHistory : filteredData });
  
}

 renderRightAction = (text: any, color: any, x: any, progress: any) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x, 0],
  });

  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
      <TouchableOpacity
        style={[styles.rightAction]}
        onPress={() => {
          this.deleteItemById(this.state.key);
        }}
          >
            <ImageButton
                      elevation={0}
                      src={R.drawable.ic_delete_black}
                      size={14}
                      height={20}
                      width={20}
                      marginStart={5}
                      
                    />
       
      </TouchableOpacity>
    </Animated.View>
  );
};

 renderRightActions = (progress:any) => (
  <View style={{ width: 60, flexDirection: I18nManager.isRTL? 'row-reverse' : 'row' }}>
    {this.renderRightAction('Delete', R.color.colorAccent, 60, progress)}
   
  </View>
);
getInitialList = () =>{
  this.state.filteredHistory = this.state.history
}
onFocusChange = () => {
  this.setState({ isFocused: true });
}
updateSearch = (search: any) => {
  console.log(search)
  
  const updatedData = this.state.history.filter((item) => {
    //console.log(item.body)
      const item_data = `${item.body.toUpperCase()})`;
      const text_data = search.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    if(updatedData.length == 0){
      
      if(search != ''){
        this.setState({filteredHistory: []});
      }
      else{
      console.log("NO DATA")
      this.setState({filteredHistory: this.state.history });
      }
    }
    else{
      this.setState({filteredHistory: updatedData, searchValue: search });
    }
   // console.log(updatedData)
   
    //console.log(this.state.history)
    this.setState({ search });

  
};
renderHeader = () => {
  return (
    <View
      style={{
        //flex: 1,
        height: '100%',
        // backgroundColor:'blue',
        justifyContent: 'center',
        alignContent: 'center',
        //width:'50%'
      }}>
    <Center>
      <ImageView
        src={R.drawable.ic_notFound}
        //size={200}
        height={281}
        width={342}
        marginTop={30}
       // marginStart={70}
      />
      </Center>
      <Center>
        <TextView
          text="Not Found"
          textSize={25}
          singleLine={true}
          fontFamily={R.font.inter_semi_bold}
          marginTop={20}
        />
      </Center>
      <Center>
        <TextView
          text="We’re sorry. the keyword you were looking for"
          textSize={16}
          //singleLine={true}
          fontFamily={R.font.inter_light}
          marginTop={20}
        />
         <TextView
          text="could not be found. Please search with"
          textSize={16}
          //singleLine={true}
          fontFamily={R.font.inter_light}
         
        />
          <TextView
          text="another keywords."
          textSize={16}
          //singleLine={true}
          fontFamily={R.font.inter_light}
        />
      </Center>
    </View>
  );
};
// startRecord() {
  //   this.lifecycleScope<void>(async () => {
  //     // let hasPermissions = await this.hasPermissions();
  //     // if (!hasPermissions) {
  //     //   throw new BaseException(
  //     //     'Please allow storage and audio permission from settings.',
  //     //   );
  //     // }
  //     await this.onStartRecord();
  //   })
  //     .then((_: void) => {})
  //     .catch((_: Error) => {
  //       Snackbar.show({
  //         text: _.message,
  //         duration: Snackbar.LENGTH_SHORT,
  //       });
  //     });
  // }

  // stopRecording() {
  //   this.lifecycleScope<void>(async () => {
  //     await this.onStopRecord();
  //   }, true)
  //     .then((_: void) => {})
  //     .catch((_: Error) => {});
  // }

  // play() {
  //   this.lifecycleScope<void>(async () => {
  //     await this.onStartPlay();
  //   })
  //     .then((_: void) => {})
  //     .catch((_: Error) => {});
  // }

  // stop() {
  //   this.lifecycleScope<void>(async () => {
  //     await this.onStopPlay();
  //   }, true)
  //     .then((_: void) => {})
  //     .catch((_: Error) => {});
  // }

  // onStartRecord = async () => {
  //   const result = await this.audioRecorderPlayer.startRecorder(this.path);
  //   this.setState({isRecording: true});
  //   this.audioRecorderPlayer.addRecordBackListener(e => {
  //     this.setState({
  //       recordSecs: e.currentPosition,
  //       recordTime: this.audioRecorderPlayer.mmssss(
  //         Math.floor(e.currentPosition),
  //       ),
  //     });
  //     return;
  //   });
  //   console.log(result);
  // };

  // onStopRecord = async () => {
  //   const result = await this.audioRecorderPlayer.stopRecorder();
  //   this.audioRecorderPlayer.removeRecordBackListener();
  //   this.setState({
  //     isRecording: false,
  //     recordSecs: 0,
  //   });
  //   console.log(result);
  // };

  // onStartPlay = async () => {
  //   console.log('onStartPlay');

  //   const msg = await this.audioRecorderPlayer.startPlayer(this.path);
  //   console.log(msg);
  //   this.setState({isPlaying: true});
  //   this.audioRecorderPlayer.addPlayBackListener(e => {
  //     this.setState({
  //       currentPositionSec: e.currentPosition,
  //       currentDurationSec: e.duration,
  //       playTime: this.audioRecorderPlayer.mmssss(
  //         Math.floor(e.currentPosition),
  //       ),
  //       duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
  //       isPlaying: e.currentPosition !== e.duration,
  //     });
  //     return;
  //   });
  // };

  // onPausePlay = async () => {
  //   await this.audioRecorderPlayer.pausePlayer();
  // };

  // onStopPlay = async () => {
  //   console.log('onStopPlay');
  //   this.audioRecorderPlayer.stopPlayer();
  //   this.setState({isPlaying: false});
  //   this.audioRecorderPlayer.removePlayBackListener();
  // };

  // async hasPermissions(): Promise<boolean> {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       );
  //       console.debug('granted', granted);
  //       // const grants = await PermissionsAndroid.requestMultiple([
  //       //   PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //       //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       //   PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       // ]);

  //       // if (
  //       //   grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
  //       //     PermissionsAndroid.RESULTS.GRANTED &&
  //       //   grants['android.permission.READ_EXTERNAL_STORAGE'] ===
  //       //     PermissionsAndroid.RESULTS.GRANTED &&
  //       //   grants['android.permission.RECORD_AUDIO'] ===
  //       //     PermissionsAndroid.RESULTS.GRANTED
  //       // ) {
  //       //   console.log('Permissions granted');
  //       //   return true;
  //       // } else {
  //       //   console.log('All required permissions not granted');
  //       // }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //     return true;
  //   } else {
  //     return true;
  //   }
  // }
}
const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    //padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width:60,
    borderRadius:10,
    backgroundColor:R.color.colorAccent,
    
  },
  textInputStyle: {
    height: 40,
    color : 'black',
    backgroundColor :R.color.transparent,
  },

  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },


});
