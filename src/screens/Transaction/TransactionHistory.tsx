import React, { Component } from 'react';
import { View, StatusBar, Text, ScrollView, FlatList } from 'react-native';
import { Scaffold } from '../../res/widgets/Scaffold';
import { ImageButton } from '../../res/widgets/ImageButton';
import { ImageView } from '../../res/widgets/ImageView';
import { BaseComponent } from '../../commons/BaseComponent';
import { GradiantContainerSolid } from '../../res/widgets/GradiantContainerSolid';
import { TextView } from '../../res/widgets/TextView';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { Divider } from '../../res/widgets/Divider';
import { R } from '../../constant';
import { Transaction } from '../../models/transaction';



export class TransactionHistory extends BaseComponent {
  state: {
    transHistory: Array<Transaction>;
  };
  constructor(props: any) {
    super(props);
    this.state = {
      transHistory: [
        new Transaction({
          _id: '1',
          summary: 'Freeiance Work',
          date: '19 Dec 2023 - 09:41 AM',
          amount: 748,
          transaction_type: 'free',
        }),
        new Transaction({
          _id: '3',
          summary: 'Freeiance Work',
          date: '19 Dec 2023 - 09:41 AM',
          amount: 748,
          transaction_type: 'free',
        }),
        new Transaction({
          _id: '3',
          summary: 'Freeiance Work',
          date: '20 Dec 2023 - 09:41 AM',
          amount: 748,
          transaction_type: 'free',
        }),
        new Transaction({
          _id: '3',
          summary: 'Freeiance Work',
          date: '20 Dec 2023 - 09:41 AM',
          amount: 748,
          transaction_type: 'free',
        }),
      ],
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
                    text={'Transaction History'}
                    textSize={28}
                    textColor={'white'}
                    textStyle={'bold'}
                  />
                  <Divider
                    height={36}
                    width={20}
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
                <FlatList
                  data={this.state.transHistory}
                  keyExtractor={item => item._id}
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        marginTop: 16,
                        flexDirection: 'row',
                        height: 32,
                        marginBottom: 16,
                      }}>
                      <View
                        style={{
                          marginEnd: 12,
                          alignContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}>
                        <ImageView
                          src={R.drawable.placeholder_avatar}
                          width={52}
                          height={52}
                        />
                      </View>

                      <View
                        style={{
                          flexGrow: 1,
                          alignContent: 'center',
                          alignSelf: 'center',
                        }}>
                        <TextView
                          text={item.summary}
                          textSize={14}
                          singleLine={true}
                          textStyle={'bold'}
                          fontFamily={R.font.inter_medium}
                          textColor={R.color.chat_left_text}
                          marginTop={-5}
                        />
                        <TextView
                          text={item.date}
                          textSize={10}
                          marginTop={5}
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
                        <Text
                          style={{
                            fontSize: 14,
                            color:
                              index % 2 == 0
                                ? R.color.chat_right_color
                                : R.color.otpInputBox,
                            fontFamily: R.font.inter_bold,
                          }}>
                          +${item.amount}
                        </Text>
                      </View>
                    </View>
                  )}></FlatList>
              </View>
            </>
          )}
        </SafeAreaInsetsContext.Consumer>
      </ScrollView>
    );
  }
  onViewCreated(): void {}
}
