import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { FC, ReactElement } from 'react';

const styles = StyleSheet.create({
  tbody: {
    marginTop: 20,
    fontSize: 10,
    fontFamily: 'Lato Bold',
    fontWeight: 'bold',
    paddingTop: 4,
    textAlign: 'center',
    flex: 1,
    height: 20,
    color: '#4aa1f3'
  },
  total: { flex: 2, textAlign: 'left' }
});

const TableTotal: FC = (): ReactElement => {
  return (
    <>
      <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
        <View style={[styles.tbody, styles.total]}>
          <Text></Text>
        </View>
        <View style={styles.tbody}></View>
        <View style={styles.tbody}></View>
        <View style={styles.tbody}></View>
        <View style={styles.tbody}></View>
        <View style={styles.tbody}>
          <Text></Text>
        </View>
        <View style={styles.tbody}>
          <Text>Total</Text>
        </View>
        <View style={styles.tbody}>
          <Text></Text>
        </View>
      </View>
    </>
  );
};

export default TableTotal;
