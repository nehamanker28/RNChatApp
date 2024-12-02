/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {TextView} from '../widgets/TextView';
import Collapsible from 'react-native-collapsible';
import {ImageView} from '../widgets/ImageView';
import {R} from '../../constant';
import {Divider} from '../widgets/Divider';

interface Props {
  title: string;
  body: string;
  expanded: boolean;
  onClick: any;
  marginEnd?: number;
}

const defaultProps = {
  marginEnd: 24,
};

export function ExapandView(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  const activeBorderColor = '#7A47FF';
  const inActiveBorderColor = '#E7E7E7';
  const contentTextColor = '#949494';
  const expandImage = attrs.expanded
    ? R.drawable.ic_expand_open
    : R.drawable.ic_expand_close;
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          attrs.onClick();
        }}>
        <View
          style={{
            padding: 12,
            borderWidth: 0.8,
            marginEnd: attrs.marginEnd,
            borderColor: attrs.expanded
              ? activeBorderColor
              : inActiveBorderColor,
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{alignItems: 'center'}}>
              <TextView text={attrs.title} textSize={16} />
            </View>
            <View style={{alignItems: 'center'}}>
              <ImageView src={expandImage} height={10} width={10} />
            </View>
          </View>
          <Divider
            backgroundColor={'white'}
            visibility={attrs.expanded}
            height={8}
          />
          <Collapsible collapsed={!attrs.expanded}>
            <View>
              <TextView
                text={attrs.body}
                textSize={12}
                textColor={contentTextColor}
              />
            </View>
          </Collapsible>
        </View>
      </TouchableOpacity>
    </>
  );
}
