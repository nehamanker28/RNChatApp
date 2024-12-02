import React from 'react';
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  TextInput,
  FlatList,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import {ImageButton} from '../res/widgets/ImageButton';
import {BaseComponent} from '../commons/BaseComponent';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {R} from '../constant';
import {Row} from '../res/widgets/Row';
import {Container} from '../res/widgets/Container';
import LinearGradient from 'react-native-linear-gradient';
import {Faq} from '../models/faq';
import {GradiantContainer} from '../res/widgets/GradiantContainer';
import {GradiantButton} from '../res/widgets/GradiantButton';
import {TextView} from '../res/widgets/TextView';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export class ProfileFAQScreen extends BaseComponent {
  state: {
    search: string;
    open: boolean;
    dataTopbar: Array<any>;
    faqData: Array<Faq>;
    fileredfaqData: Array<Faq>;
    filteredData: Array<any>;
    isFocused: boolean;
  };
  constructor(props: any) {
    super(props);
    this.state = {
      ...super.state,

      ...{
        search: '',
        open: false,
        faqData: [
          new Faq({
            _id: '1',
            title: 'What is ChattyAI?',
            description:
              'Lorem ipsum dolor sit amet, consectetur adip,Lorem ipsum dolor sit amet, consectetur adip,Lorem ipsum dolor sit amet, consectetur adip',
            category: 'General',
          }),
          new Faq({
            _id: '2',
            title: 'what is AI',
            description: 'Lorem ipsum dolor sit amet, consectetur adip',
            category: 'Account',
          }),
          new Faq({
            _id: '3',
            title: 'what is digital marketing',
            description: 'Lorem ipsum dolor sit amet, consectetur adip',
            category: 'Account',
          }),
        ],
        dataTopbar: [{}],
        fileredfaqData: [],
        filteredData: [],
        isFocused: false,
      },
    };
    this.getCategory(this.state.faqData);
    this.mapFaqArray();
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
                paddingTop: 24,
                paddingEnd: 28,
                paddingStart: 28,
                borderTopEndRadius: 16,
                borderTopStartRadius: 16,
              }}>
              {/* Top Bar */}
              <View>
                <FlatList
                  horizontal
                  scrollEnabled
                  data={this.state.dataTopbar}
                  renderItem={({item, index}) => (
                    <View>
                      <GradiantContainer
                        marginStart={5}
                        marginEnd={5}
                        marginBottom={16}
                        radius={8}>
                        <GradiantButton
                          paddingStart={5}
                          paddingEnd={5}
                          //borderRadius={4}
                          colors={
                            item.isSelected
                              ? ['#7A47FF', '#FF7497']
                              : ['#FFFFFF', '#FFFFFF']
                          }
                          textColor={
                            item.isSelected ? 'white' : R.color.colorAccent
                          }
                          textStyle={'bold'}
                          text={item.title}
                          onClick={() => {
                            this.onPressTopbar(index);
                          }}></GradiantButton>
                      </GradiantContainer>
                    </View>
                  )}
                  style={{flexDirection: 'row', paddingTop: 5}}
                  extraData={this.state.dataTopbar}
                />
              </View>
              {/* Search Bar */}
              <View
                style={{
                  //flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  backgroundColor: this.state.isFocused
                    ? 'rgba(255, 116, 151, 0.26)'
                    : R.color.chat_left_color,
                  borderColor: this.state.isFocused
                    ? '#7A47FF'
                    : R.color.chat_left_color,
                  borderRadius: 12,
                  height: 60,
                  borderWidth: 1,
                }}>
                <View
                  style={{
                    flex: 0.1,
                    justifyContent: 'space-around',
                  }}>
                  <ImageButton
                    backgroundColor={R.color.transparent}
                    elevation={0}
                    src={R.drawable.ic_search}
                    size={14}
                    height={14}
                    width={14}
                    borderRadius={64}
                  />
                </View>
                <View
                  style={{
                    flex: 0.8,
                    justifyContent: 'center',
                  }}>
                  <TextInput
                    onFocus={this.onFocusChange}
                    style={styles.textInputStyle}
                    onChangeText={text => this.updateSearch(text)}
                    value={this.state.search}
                    underlineColorAndroid="transparent"
                    placeholder="Search"
                    placeholderTextColor={'grey'}
                  />
                </View>
              </View>
              {/* List */}
              <View>
                <FlatList
                  style={{flexDirection: 'column', paddingTop: 20}}
                  scrollEnabled
                  //   data={
                  //     this.state.filteredData &&
                  //     this.state.filteredData.length > 0
                  //       ? this.state.filteredData
                  //       : this.state.fileredfaqData
                  //   }
                  data={this.state.fileredfaqData}
                  renderItem={({item, index}) => (
                    <View>
                      <TouchableOpacity
                        style={[
                          styles.item,
                          !item.isCollapsed && {
                            height: 76,
                            justifyContent: 'center',
                          },
                        ]}
                        onPress={() => {
                          this.onPress(index);
                        }}
                        activeOpacity={1}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <TextView
                            text={item.title}
                            textSize={20}
                            textColor={'black'}
                            fontFamily={R.font.inter_regular}
                          />

                          <View
                            style={{
                              justifyContent: 'flex-end',
                              marginEnd: 10,
                            }}>
                            <ImageButton
                              backgroundColor={'white'}
                              elevation={0}
                              src={R.drawable.ic_like}
                              size={14}
                              height={14}
                              width={14}
                            />
                          </View>
                        </View>
                        <View></View>
                        {item.isCollapsed && (
                          <View>
                            <Container marginTop={10}>
                              <Row>
                                <View
                                  style={{
                                    backgroundColor: R.color.grey,
                                    height: 1,
                                    flexGrow: 1,
                                    marginTop: 4,
                                    bottom: 4,
                                  }}
                                />
                              </Row>
                            </Container>
                            <TextView
                              text={item.description}
                              textSize={14}
                              textColor={'#9E9E9E'}
                              fontFamily={R.font.inter_regular}
                              marginTop={5}
                            />
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            </View>
          </>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }

  onViewCreated(): void {}

  getCategory = (faqData: Array<Faq>) => {
    const uniqueData = [...new Map(faqData.map(v => [v.category, v])).values()];
    this.state.dataTopbar = uniqueData.map(item => item.category);
    this.state.dataTopbar = this.state.dataTopbar.map(title => ({
      title,
      isSelected: false,
    }));
    // set 1st category selected
    let newArray = [...this.state.dataTopbar];
    newArray[0].isSelected = 'true';
    this.setState({dataTopbar: newArray});

    // console.log(this.state.dataTopbar);
  };

  mapFaqArray() {
    this.state.faqData = this.state.faqData.map(item => ({
      ...item,
      isCollapsed: false,
    }));
    this.filteredFaqData();
  }
  filteredFaqData() {
    var data = this.state.dataTopbar
      .filter(item => item.isSelected)
      .map(item => item.title);
    this.state.fileredfaqData = this.state.faqData.filter(
      item => item.category == data[0],
    );
  }
  onPress = (index: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.updateData(index);
    console.log(this.state.faqData[index]);
  };
  onFocusChange = () => {
    this.setState({isFocused: true});
  };

  onPressTopbar = (index: any) => {
    this.state.dataTopbar = this.state.dataTopbar.map(item => ({
      ...item,
      isSelected: false,
    }));
    let newArray = [...this.state.dataTopbar];
    newArray[index].isSelected = !newArray[index].isSelected;
    this.setState({dataTopbar: newArray});
    console.log(this.state.dataTopbar);

    //FAQ data category wise
    this.filteredFaqData();
  };

  updateData(index: any) {
    this.state.fileredfaqData = this.state.fileredfaqData.map(item => ({
      ...item,
      isCollapsed: false,
    }));
    let newArray = [...this.state.fileredfaqData];
    newArray[index].isCollapsed = !newArray[index].isCollapsed;
    this.setState({fileredfaqData: newArray});
  }
  updateSearch = (search: any) => {
    console.log(search);
    this.state.filteredData = this.state.fileredfaqData;
    const updatedData = this.state.fileredfaqData.filter(item => {
      const item_data = `${item.title.toUpperCase()})`;
      const text_data = search.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    if (updatedData.length == 0) {
      if (search != '') {
        console.log('NO DATA1234');
        this.setState({fileredfaqData: []});
      } else {
        console.log('NO DATA');
        this.filteredFaqData();
      }
    } else {
      this.setState({fileredfaqData: updatedData, searchValue: search});
    }

    //this.setState({fileredfaqData: updatedData, searchValue: search});
    this.setState({search});
  };
}

const styles = StyleSheet.create({
  textInputStyle: {
    height: 40,
    borderColor: R.color.chat_left_color,
    borderRadius: 10,
    fontSize: 20,
    padding: 5,
    color: 'black',
    //fontStyle: 'norrmal',
  },
  item: {
    width: '100%',
    borderWidth: 1,
    borderColor: R.color.grey,
    overflow: 'hidden',
    paddingStart: 20,
    paddingBottom: 20,
    marginBottom: 16,
    paddingEnd: 5,
    paddingTop: 10,
    borderRadius: 12,
    justifyContent: 'flex-start',
  },
});
