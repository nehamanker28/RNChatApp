/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Scaffold} from '../res/widgets/Scaffold';
import {Container} from '../res/widgets/Container';
import {R} from '../constant';
import {TextView} from '../res/widgets/TextView';
import {Padding} from '../res/widgets/Padding';
import {GradiantContainerSolid} from '../res/widgets/GradiantContainerSolid';
import {Center} from '../res/widgets/Center';
import {Row} from '../res/widgets/Row';
import {Platform, ScrollView, View} from 'react-native';
import {EditText} from '../res/widgets/EditText';
import {ImageButton} from '../res/widgets/ImageButton';
import {BaseComponent} from '../commons/BaseComponent';
import Snackbar from 'react-native-snackbar';
import {Api} from '../commons/Api';
import {BaseException} from '../commons/BaseException';
import {Prefs} from '../commons/Prefs';
import {Utils} from '../commons/Utils';
import {Linking} from 'react-native';
import {Profile} from '../models/profile';
import {Repository} from '../commons/Repository';
import {Message} from '../models/message';
import {Thread} from '../models/thread';
import {ExapandViewGroup, ExpandItem} from '../res/components/ExapandViewGroup';
import {CustomizedSendButton} from '../res/components/CustomizedSendButton';

export class HomeScreen extends BaseComponent {
  faqItems: Array<ExpandItem>;

  state: {
    query_text: string;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      query_text: '',
    };
    // remove it and make dynamic
    this.faqItems = [
      {
        title: 'Who is Kim Kardashian?',
        body: 'Kimberly Noel Kardashian is an American media personality, socialite, businesswoman, model, and actress.',
      },
      {
        title: 'Elizabeth Taylor’s Biggest Fan',
        body: 'Kim spent $65,000 on jewelry at Taylor’s estate sale and nearly bought her house, as well. Kris Jenner even has a huge portrait of the icon in her kitchen and Kim herself channeled the late movie icon in a photoshoot.',
      },
      {
        title: 'Kim has a Passion for Bees',
        body: 'Unlike regular folks, this popular celeb doesn’t fear bees and would even hold and play with them when she was younger. Plus, she’s never been stung. If she didn’t make it as a reality star, imagine her as a beekeeper.',
      },
      {
        title: 'She has Been Married 3 Times',
        body: 'If you thought Kim K’s infamously short marriage to Kris Humphries and her famous marriage to Kanye West is all there was in the ring department, you’re mistaken. She’s actually been married three times! Kim’s first marriage was to a music producer, Damon Thomas, when she was 19.',
      },
    ];
  }

  onCreateView() {
    return (
      <Scaffold
        statusBarColor={R.color.grey}
        statusBarAppearance={
          Platform.OS === 'ios' ? 'dark-content' : 'light-content'
        }>
        <ScrollView
          bounces={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}>
          <Container
            backgroundColor={R.color.grey}
            height={80}
            paddingStart={16}
            paddingEnd={16}
            paddingTop={8}
            paddingBottom={8}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Row>
                <ImageButton
                  src={R.drawable.ic_profile}
                  size={20}
                  height={36}
                  width={36}
                  elevation={0}
                  backgroundColor={'white'}
                  onClick={() => {
                    this.open_profile();
                  }}
                />
                <ImageButton
                  src={R.drawable.ic_message}
                  marginStart={12}
                  size={20}
                  height={36}
                  width={36}
                  elevation={0}
                  backgroundColor={'white'}
                  onClick={() => {
                    this.openChat();
                  }}
                />
              </Row>

              <Row>
                <ImageButton
                  src={R.drawable.ic_history}
                  size={20}
                  height={36}
                  width={36}
                  marginEnd={12}
                  elevation={0}
                  backgroundColor={'white'}
                  onClick={() => {
                    this.navigation.push(R.id.history_screen, {});
                  }}
                />
                <ImageButton
                  src={R.drawable.ic_notification}
                  size={20}
                  height={36}
                  width={36}
                  elevation={0}
                  backgroundColor={'white'}
                  onClick={() => {
                    this.navigation.push(R.id.notification_screen, {});
                  }}
                />
              </Row>
            </View>
          </Container>

          <Center>
            <Container
              height={90}
              marginTop={-44}
              width={90}
              stack={true}
              borderBottomEndRadius={120}
              borderBottomStartRadius={120}
              borderTopEndRadius={120}
              borderTopStartRadius={120}
              children={undefined}></Container>
          </Center>

          <GradiantContainerSolid borderRadius={0} zIndex={-1}>
            <Padding
              paddingTop={32}
              paddingBottom={72}
              paddingStart={16}
              paddingEnd={16}>
              <Center>
                <TextView
                  text={R.string.homeTitle}
                  textStyle={'bold'}
                  textSize={22}
                  marginTop={64}
                  textColor={'white'}
                />
                <Row>
                  <EditText
                    paddingTop={12}
                    paddingBottom={12}
                    marginTop={12}
                    stroke={0}
                    backgroundColor={'white'}
                    width={'72%'}
                    height={42}
                    borderRadius={4}
                    text={this.state.query_text}
                    onTextChanged={(value: string) =>
                      this.setState({query_text: value})
                    }
                    hint={R.string.homeAskHint}
                    elevation={0}
                  />
                  {/* <ImageButton
                    src={R.drawable.ic_send}
                    marginStart={10}
                    elevation={1}
                    height={42}
                    width={42}
                    marginTop={12}
                    onClick={() => {
                      let queryText = this.state.query_text.trim();
                      if (Utils.isNotNullOrEmpty(queryText)) {
                        this.setState({query_text: ''});
                        this.openChat(queryText);
                      } else {
                        Snackbar.show({
                          text: 'Please start by typing something.',
                          duration: Snackbar.LENGTH_SHORT,
                        });
                      }
                    }}
                  /> */}
                  <CustomizedSendButton
                    marginTop={12}
                    src={R.drawable.ic_send}
                    elevation={1}
                    textBtnPressed={() => {
                      let queryText = this.state.query_text.trim();
                      if (Utils.isNotNullOrEmpty(queryText)) {
                        this.setState({query_text: ''});
                        this.openChat(queryText);
                      } else {
                        Snackbar.show({
                          text: 'Please start by typing something.',
                          duration: Snackbar.LENGTH_SHORT,
                        });
                      }
                    }}
                    audioBtnPressed={() => {
                      this.setState({query_text: ''});
                      this.openChat('audio : hello');
                    }}
                    videoBtnPressed={() => {
                      this.setState({query_text: ''});
                      this.openChat('video : hello');
                    }}
                  />
                </Row>
              </Center>
            </Padding>
          </GradiantContainerSolid>

          <Container
            marginTop={-24}
            borderTopStartRadius={32}
            borderTopEndRadius={32}>
            <Padding
              paddingStart={32}
              paddingEnd={32}
              paddingTop={32}
              paddingBottom={32}>
              <TextView text="Related Links" textSize={18} textStyle={'bold'} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: 16,
                }}>
                <ImageButton
                  src={R.drawable.ic_instagram}
                  size={26}
                  height={56}
                  width={56}
                  elevation={0}
                  borderColor={R.color.grey}
                  borderWidth={1}
                  backgroundColor={'white'}
                  onClick={() => {
                    let url = R.string.instagramUrl;
                    Linking.canOpenURL(url).then(supported => {
                      if (supported) {
                        Linking.openURL(url);
                      }
                    });
                  }}
                />
                <ImageButton
                  src={R.drawable.ic_facebook}
                  size={26}
                  height={56}
                  width={56}
                  elevation={0}
                  borderColor={R.color.grey}
                  borderWidth={1}
                  backgroundColor={'white'}
                  onClick={() => {
                    let url = R.string.facebookUrl;
                    Linking.canOpenURL(url).then(supported => {
                      if (supported) {
                        Linking.openURL(url);
                      }
                    });
                  }}
                />
                <ImageButton
                  src={R.drawable.ic_google}
                  size={26}
                  height={56}
                  width={56}
                  elevation={0}
                  borderColor={R.color.grey}
                  borderWidth={1}
                  backgroundColor={'white'}
                  onClick={() => {
                    let url = R.string.googleUrl;
                    Linking.canOpenURL(url).then(supported => {
                      if (supported) {
                        Linking.openURL(url);
                      }
                    });
                  }}
                />
                <ImageButton
                  src={R.drawable.ic_twitter}
                  size={26}
                  height={56}
                  width={56}
                  elevation={0}
                  borderColor={R.color.grey}
                  borderWidth={1}
                  backgroundColor={'white'}
                  onClick={() => {
                    let url = R.string.twitterUrl;
                    Linking.canOpenURL(url).then(supported => {
                      if (supported) {
                        Linking.openURL(url);
                      }
                    });
                  }}
                />
              </View>
              <TextView
                text="FAQ"
                textSize={18}
                textStyle={'bold'}
                marginTop={72}
                marginBottom={12}
              />
              <ExapandViewGroup items={this.faqItems} marginEnd={10} />
            </Padding>
          </Container>
        </ScrollView>
      </Scaffold>
    );
  }
  onViewCreated(): void {}

  onDestroyView(): void {}

  openChat(query: string | null = null) {
    this.lifecycleScope<any>(async () => {
      let repository = global.repository as Repository;
      let profile: Profile = await Prefs.getProfile();
      let thread: Thread | null = await Prefs.getDefaultThread();
      if (thread === null) {
        thread = await Api.read_default_thread();
        console.log(thread);
        await Prefs.setDefaultThread(thread);
      }
      if (query !== null) {
        repository.postMessage(
          this,
          thread,
          Message.newInstance({sender: profile._id, text: query}),
        );
      }
      // fetch message if no cached messages found
      const count = repository.realm.objects(Message).length;
      if (count === 0) {
        await repository.fetchMessages(thread, 25);
      }
      // temp for cleanup upload progress
      await repository.cleanAttachmentStatus();
      return {thread: thread, profile: profile};
    }, true)
      .then((value: any) => {
        // go to chat screen
        this.navigation.push(R.id.chat_screen, {
          query: query,
          thread: value.thread,
          profile: value.profile,
        });
      })
      .catch((error: BaseException) => {
        Snackbar.show({
          text: error.message,
          duration: Snackbar.LENGTH_LONG,
        });
      });
  }

  open_profile() {
    this.lifecycleScope<Profile>(async () => {
      return await Prefs.getProfile();
    })
      .then((profile: Profile) => {
        this.navigation.push(R.id.profile_view_screen, {profile: profile});
      })
      .catch((_: BaseException) => {
        // error unlikely
      });
  }
  open_notification() {
    this.lifecycleScope<Profile>(async () => {
      return await Prefs.getProfile();
    })
      .then((profile: Profile) => {
        this.navigation.push(R.id.notification_screen, {profile: profile});
      })
      .catch((_: BaseException) => {
        // error unlikely
      });
  }
}
