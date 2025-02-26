import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { FC, Fragment, ReactElement } from 'react';

const styles = StyleSheet.create({
  tbody: { fontSize: 9, paddingTop: 4, textAlign: 'center', flex: 1, borderColor: 'whitesmoke', borderBottomWidth: 1 },
  tbody2: { flex: 2, textAlign: 'left' }
});

const TableBody: FC = (): ReactElement => {
  return (
    <div>
      <Fragment>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <View style={[styles.tbody, styles.tbody2]}></View>
          <View style={[styles.tbody]}>
            <Text></Text>
          </View>
          <View style={styles.tbody}>
            <Text></Text>
          </View>
          <View style={styles.tbody}>
            <Text></Text>
          </View>
          <View style={styles.tbody}>
            <Text></Text>
          </View>
          <View style={styles.tbody}>
            <Text></Text>
          </View>
          <View style={styles.tbody}>
            <Text> </Text>
          </View>
          <View style={styles.tbody}>
            <Text></Text>
          </View>
        </View>
      </Fragment>
    </div>
  );
};

export default TableBody;
