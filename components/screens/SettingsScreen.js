import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
  List,
  ListItem,
  Left,
  Body,
  Text,
  Icon,
  Right,
  Picker,
  Item
} from 'native-base';
import Switch from '../widgets/switch';
import { saveSetting, showAbout } from '../actions';
import I18n from '../../i18n';
import langs from 'langs';
import AppNavigatorConfig from '../AppNavigatorConfig';
import { initializeLocale } from '../actions';

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var localeItems = this.props.locales.map(l => {
      return <Item key={l.value} label={l.label} value={l.value} />;
    });
    return (
      <View>
        <List>
          <ListItem>
            <Body>
              <Text>{I18n.t('settings_title.locale')}</Text>
              <Text note>{I18n.t('settings_note.locale')}</Text>
              <Picker
                headerBackButtonText={I18n.t('ui.back')}
                iosHeader={I18n.t('settings_title.locale')}
                mode="dropdown"
                textStyle={{
                  padding: 0,
                  margin: 0
                }}
                headerStyle={{
                  backgroundColor:
                    AppNavigatorConfig.navigationOptions.headerStyle
                      .backgroundColor
                }}
                headerBackButtonTextStyle={{
                  color:
                    AppNavigatorConfig.navigationOptions.headerTitleStyle.color
                }}
                headerTitleStyle={{
                  color:
                    AppNavigatorConfig.navigationOptions.headerTitleStyle.color
                }}
                selectedValue={this.props.locale}
                onValueChange={val => {
                  this.props.updateSetting('locale', val);
                  this.forceUpdate();
                }}>
                {localeItems}
              </Picker>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text>{I18n.t('settings_title.keep awake')}</Text>
              <Text note>{I18n.t('settings_note.keep awake')}</Text>
            </Body>
            <Right>
              <Switch
                value={this.props.keepAwake}
                onValueChange={checked =>
                  this.props.updateSetting('keepAwake', checked)
                }
              />
            </Right>
          </ListItem>
          <ListItem icon button onPress={() => this.props.showAbout()}>
            <Left>
              <Icon name="checkmark" />
            </Left>
            <Body>
              <Text>{I18n.t('settings_title.about')}</Text>
            </Body>
          </ListItem>
        </List>
      </View>
    );
  }
}
const mapStateToProps = state => {
  var set = state.ui.get('settings');
  var locales = [{ label: I18n.t('ui.default'), value: 'default' }];
  for (var code in I18n.translations) {
    var l = langs.where('1', code);
    locales.push({ label: l.local, value: code });
  }
  return {
    locale: set.get('locale'),
    keepAwake: set.get('keepAwake'),
    locales: locales,
    aboutVisible: state.ui.get('about_visible')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSetting: (key, value) => {
      dispatch(saveSetting(key, value));
      if (key == 'locale') {
        dispatch(initializeLocale());
      }
    },
    showAbout: () => {
      dispatch(showAbout());
    }
  };
};

SettingsScreen.navigationOptions = () => ({
  title: I18n.t('screen_title.settings'),
  tabBarIcon: ({ focused, tintColor }) => {
    return (
      <Icon
        name="settings"
        active={focused}
        style={{ marginTop: 6, color: tintColor }}
      />
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
