import React, { Component } from 'react';
import { View, StatusBar, Text, ScrollView ,Switch,TouchableOpacity, FlatList,} from 'react-native';
import { ImageButton } from '../../res/widgets/ImageButton';
import { BaseComponent } from '../../commons/BaseComponent';
import { GradiantContainerSolid } from '../../res/widgets/GradiantContainerSolid';
import { TextView } from '../../res/widgets/TextView';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { Divider } from '../../res/widgets/Divider';
import { R } from '../../constant';
import { Row } from '../../res/widgets/Row';
import { Center } from '../../res/widgets/Center';
import { GradiantButton } from '../../res/widgets/GradiantButton';
import { Padding } from '../../res/widgets/Padding';


export class Subscription extends BaseComponent {
  state: {
    data: Array<string>;
    SelectedCard: any;
    isSelected: boolean;
  };
  constructor(props: any) {
    super(props);
    this.state = {
      ...super.state,
      ...{
        SelectedCard: null,
        isSelected: false,
        data: [
          'Only available when demonad is low',
          'Only available when demonad is low',
          'Only available when demonad is low',
        ],
      },
    };
  }
  onCreateView(): JSX.Element {
    return (
      <ScrollView>
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
                  text={'My Subscription'}
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
            {/* top view */}
            <View
              style={{
                flex: 0.5,
                marginTop: -16,
                //backgroundColor: 'rgba(18, 3, 57, 0.5)',
                borderTopEndRadius: 90,
                borderTopStartRadius: 90,
              }}>
              <GradiantContainerSolid
                zIndex={-1}
                colors={['#120339', '#D9D9D9']}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 20,

                    width: '100%',
                    borderTopEndRadius: 20,
                    borderTopStartRadius: 20,
                  }}>
                  <TextView
                    text="Active Plan"
                    fontFamily={R.font.inter_bold}
                    textColor={'white'}
                    textSize={28}></TextView>
                  <View
                    style={{
                      backgroundColor: 'rgba(255, 116, 151, 1)',
                      padding: 10,
                      borderRadius: 10,
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    <TextView
                      text="Free"
                      textColor={'white'}
                      fontFamily={R.font.inter_bold}
                      textSize={14}></TextView>
                  </View>
                </View>
                {/* CHECKLIST */}
                <View
                  style={{
                    marginStart: 20,
                    marginTop: 10,
                    marginBottom: 10,
                    height: 100,
                    width: '80%',
                  }}>
                  <FlatList
                    data={this.state.data}
                    // contentContainerStyle={{marginTop: 20}}
                    ItemSeparatorComponent={() => <View style={{height: 15}} />}
                    renderItem={({item}) => (
                      <Row>
                        <ImageButton
                          src={R.drawable.ic_checkbox}
                          size={20}
                          height={15}
                          width={15}
                          elevation={0}
                          onClick={() => {
                            //this.open_profile();
                          }}
                        />
                        <TextView
                          marginStart={20}
                          text={item}
                          textColor={'white'}
                          fontFamily={R.font.inter_regular}
                          textSize={14}></TextView>
                      </Row>
                    )}></FlatList>
                </View>
                <View
                  style={{
                    backgroundColor: R.color.colorAccent,
                    padding: 10,
                    borderRadius: 10,
                    marginTop: 0,
                    marginBottom: 20,
                    width: '45%',
                    marginStart: -120,
                  }}>
                  <TextView
                    text="Expiry date: 22 March"
                    textColor={'white'}
                    fontFamily={R.font.inter_bold}
                    textSize={14}></TextView>
                </View>
              </GradiantContainerSolid>
            </View>

            {/* Bottom View */}
            <View
              style={{
                flex: 0.8,
                marginTop: 20,
                backgroundColor: 'white',
                paddingStart: 10,
                paddingEnd: 10,
              }}>
              {/* Cards */}
              <View
                style={{flex:1,flexDirection: 'row', justifyContent: 'space-between'}}>
                {/* 1 month */}
                <this.SubscriptionCard
                  title={'1'}
                  onPress={this.handleSelected}
                  value={this.state.SelectedCard}
                  price={10}
                />
                {/* 3 mmonths */}
                <this.SubscriptionCard
                  title={'3'}
                  onPress={this.handleSelected}
                  value={this.state.SelectedCard}
                  price={30}
                />
                {/* 6 mmonths */}
                <this.SubscriptionCard
                  title={'6'}
                  onPress={this.handleSelected}
                  value={this.state.SelectedCard}
                  price={60}
                />
              </View>

              {/* list */}
              {!this.state.isSelected ? (
                <Center>
                  <TextView
                    text="Select Your Plan and Enjoy
              Unlimated service"
                    gravity={'center'}
                    marginTop={40}
                    textSize={21}
                    fontFamily={R.font.inter_bold}></TextView>
                </Center>
              ) : (
                <View style={{marginStart: 20}}>
                  <TextView
                    text="Go pro & enjoy all benefits"
                    gravity={'center'}
                    marginTop={40}
                    textSize={21}
                    fontFamily={R.font.inter_bold}></TextView>
                  <FlatList
                    data={this.state.data}
                    contentContainerStyle={{marginTop: 20}}
                    ItemSeparatorComponent={() => <View style={{height: 15}} />}
                    renderItem={({item}) => (
                      <Row>
                        <ImageButton
                          src={R.drawable.ic_checkbox}
                          size={20}
                          height={15}
                          width={15}
                          elevation={0}
                          onClick={() => {
                            //this.open_profile();
                          }}
                        />
                        <TextView
                          marginStart={20}
                          text={item}
                          textColor={'black'}
                          fontFamily={R.font.inter_regular}
                          textSize={14}></TextView>
                      </Row>
                    )}></FlatList>
                </View>
              )}
              <TouchableOpacity
                style={{
                  marginTop: this.state.isSelected ? 30 : 80,
                  marginBottom: 30,
                  marginStart:10,
                  marginEnd :10,
                  
                }}>
                <GradiantButton
                                colors={this.state.isSelected
                                    ? ['#7A47FF', '#FF7497']
                                    : ['#E0E0E0', '#E0E0E0']}
                                text="Subscribe Now"
                                textColor={this.state.isSelected ? 'white' : '#B7ADAD'}
                                fontSize={18}
                                textStyle={'bold'}
                                marginBottom={0}
                                height ={40}
                                onClick={undefined}></GradiantButton>
              </TouchableOpacity>
            </View>
          </>
        )}
      </SafeAreaInsetsContext.Consumer>
      </ScrollView>
    );
  }

  onViewCreated(): void {}

  handleSelected = (value: any) => {
    console.log(value);
    this.setState({SelectedCard: value});
    this.setState({isSelected: true});
  };
  SubscriptionCard({title, onPress, value, price}) {
    return (
      <TouchableOpacity
        style={{
        
          borderRadius: 10,
          marginStart: 10,
        
          height: 120,
          // width: 119,
          borderWidth: 2,
          borderColor:
            value === title ? R.color.colorAccent : R.color.grey_light,
        }}
        activeOpacity = {0.9}
        onPress={() => onPress(title)}>
        <GradiantContainerSolid
          colors={['#FF8733', '#FBB731']}
          marginBottom={3}>
          <View style={{height: 90,width:110,justifyContent: 'center',paddingStart:10}}>
            <TextView
              text={title + ' ' + 'Month Subscription'}
              textColor={'white'}
              gravity={'center'}
              fontFamily={R.font.inter_medium}
              textSize={14}></TextView>
          </View>
        </GradiantContainerSolid>
        <Center>
          <TextView
            text={'$' + ' ' + price}
            textColor={'black'}
            fontFamily={R.font.inter_bold}
            textSize={14}></TextView>
        </Center>
      </TouchableOpacity>
    );
  }
}

