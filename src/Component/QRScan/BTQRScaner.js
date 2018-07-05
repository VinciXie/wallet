import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import QRscanner from './QRScanner'
import {Actions} from 'react-native-router-flux'
import {Toast} from 'antd-mobile'

export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <QRscanner onRead={this.onRead} finderY={-20}/>
      </View>
    );
  }
  onRead = (res) => {
    Toast.success("扫码成功")
    Actions.pop({refresh:{"scanResult":res.data}})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});