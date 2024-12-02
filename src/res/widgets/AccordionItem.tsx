import React, {PropsWithChildren, useState} from 'react';
import {Text} from 'react-native-svg';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

type AccordionItemPros = PropsWithChildren<{
  title: string;
}>;

export function AccordionItem({
  children,
  title,
}: AccordionItemPros): JSX.Element {
  const [expanded, setExpanded] = useState(false);

  function toggleItem() {
    setExpanded(!expanded);
  }

  const body = <View style={styles.accordBody}>{children}</View>;

  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
        <Text>{title}</Text>
        {/* <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#bbb"
        /> */}
      </TouchableOpacity>
      {expanded && body}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accordContainer: {
    paddingBottom: 4,
  },
  accordHeader: {
    padding: 12,
    backgroundColor: '#666',
    color: '#eee',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accordTitle: {
    fontSize: 20,
  },
  accordBody: {
    padding: 12,
  },
  textSmall: {
    fontSize: 16,
  },
  seperator: {
    height: 12,
  },
});
