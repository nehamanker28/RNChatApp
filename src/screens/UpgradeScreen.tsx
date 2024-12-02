/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {Scaffold} from '../res/widgets/Scaffold';
import {GradiantButton} from '../res/widgets/GradiantButton';
import {useLifecycleScope} from '../commons/Scope';
import {Utils} from '../commons/Utils';
import {Message} from '../models/message';
import {FlatList} from 'react-native';
import {TextView} from '../res/widgets/TextView';

interface Props {
  navigation: any;
  route: any;
}

const defaultProps = {};

export function UpgradeScreen(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  let navigation = props.navigation;
  let params = props.route.params;
  let realm = useRealm();
  let data = useQuery(Message);
  const flatList = useRef(null);
  let dataFetch = useLifecycleScope<number>();
  useEffect(() => {
    dataFetch(async () => {
      await Utils.delay(3000);
      return 56;
    })
      .then((result: number) => {
        console.info(result);
      })
      .catch((e: Error) => {
        console.info(e);
      });
  }, [dataFetch]);

  return (
    <Scaffold>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        ref={flatList}
        bounces={false}
        inverted={false}
        data={data.sorted('message_id')}
        keyExtractor={item => item.message_id}
        renderItem={({item}) => <TextView text={item.message_text} />}
      />
      <GradiantButton
        text="Add"
        onClick={() => {
          realm.write(() => {
            //
          });
        }}
        marginBottom={16}
        marginEnd={16}
        marginStart={16}
      />
      <GradiantButton
        text="Back"
        onClick={() => {
          navigation.goBack();
        }}
        marginBottom={16}
        marginEnd={16}
        marginStart={16}
      />

      <GradiantButton
        text="Scroll"
        onClick={() => {
          flatList.current?.scrollToEnd();
        }}
        marginBottom={16}
        marginEnd={16}
        marginStart={16}
      />
    </Scaffold>
  );
}
