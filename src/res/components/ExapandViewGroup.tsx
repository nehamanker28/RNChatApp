/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ExapandView} from './ExapandView';
import {Divider} from '../widgets/Divider';
import {View} from 'react-native';

export interface ExpandItem {
  title: string;
  body: string;
}

interface Props {
  items: Array<ExpandItem>;
  marginEnd?: number;
}

const defaultProps = {};

export function ExapandViewGroup(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const items = [];
  for (let i = 0; i < attrs.items.length; i++) {
    const item = attrs.items[i];
    const isExpanded = expandedIndex === i;
    items.push(
      <ExapandView
        title={item.title}
        body={item.body}
        expanded={isExpanded}
        onClick={() => {
          setExpandedIndex(isExpanded ? -1 : i);
        }}
      />,
      <Divider backgroundColor={'white'} height={12} />,
    );
  }
  return (
    <>
      <View style={{marginEnd: attrs.marginEnd}}>{items}</View>
    </>
  );
}
