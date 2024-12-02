import React, {useState} from 'react';
import {R} from '../../constant';
import DatePicker from 'react-native-date-picker';
import {EditText} from './EditText';
import moment from 'moment';

interface Props {
  onConfirm?: any;
  date?: Date;
}

const defaultProps = {};

export function DateView(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  const [date, setDate] = useState(attrs.date);
  const [open, setOpen] = useState(false);
  return (
    <>
      <EditText
        enabled={false}
        text={date !== undefined ? moment(date).format('MMM DD, YYYY') : ''}
        hint={'May 25, 1993'}
        borderRadius={0}
        stroke={2}
        textSize={16}
        borderTopColor={'white'}
        borderEndColor={'white'}
        borderStartColor={'white'}
        borderBottomColor={R.color.grey_light}
        drawableRight={R.drawable.ic_calendar}
        drawableRightSize={16}
        drawableRightClick={() => {
          setOpen(true);
        }}
        paddingStart={0}
        paddingEnd={0}
      />
      <DatePicker
        modal
        open={open}
        mode="date"
        date={date !== undefined ? date : new Date()}
        title={null}
        onConfirm={selectData => {
          setOpen(false);
          setDate(selectData);
          if (attrs.onConfirm !== undefined) {
            attrs.onConfirm(selectData);
          }
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
