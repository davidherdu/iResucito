// @flow
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Text, ListItem, Body, Right, Icon } from 'native-base';
import { withNavigationFocus } from 'react-navigation';
import { FlatList, Keyboard } from 'react-native';
import SearchBarView from './SearchBarView';
import Highlighter from 'react-native-highlight-words';
import commonTheme from '../native-base-theme/variables/platform';
import textTheme from '../native-base-theme/components/Text';
import { DataContext } from '../DataContext';
import I18n from '../translations';

var textStyles = textTheme(commonTheme);
var noteStyles = textStyles['.note'];
delete textStyles['.note'];

const titleLocaleKey = 'search_title.unassigned';

const UnassignedList = (props: any) => {
  const data = useContext(DataContext);
  const listRef = useRef();
  const { navigation, isFocused } = props;
  const { songs, localeSongs } = data.songsMeta;
  const { keys, getLocaleReal } = data.settings;

  const [search, setSearch] = useState([]);
  const [textFilter, setTextFilter] = useState('');

  useEffect(() => {
    navigation.setParams({ title: I18n.t(titleLocaleKey) });
  }, [I18n.locale]);

  useEffect(() => {
    if (keys) {
      const locale = getLocaleReal(keys.locale);
      var result = localeSongs.filter(locSong => {
        var found = songs.find(s => s.files[locale] === locSong.nombre);
        return !found;
      });
      if (textFilter) {
        result = result.filter(locSong => {
          return (
            locSong.titulo.toLowerCase().includes(textFilter.toLowerCase()) ||
            locSong.fuente.toLowerCase().includes(textFilter.toLowerCase())
          );
        });
      }
      setSearch(result);
      if (result.length > 0 && isFocused) {
        setTimeout(() => {
          if (listRef.current)
            listRef.current.scrollToIndex({
              index: 0,
              animated: true,
              viewOffset: 0,
              viewPosition: 1
            });
        }, 50);
      }
    }
  }, [keys, textFilter, isFocused]);

  return (
    <SearchBarView value={textFilter} setValue={setTextFilter}>
      {search.length == 0 && (
        <Text note style={{ textAlign: 'center', paddingTop: 20 }}>
          {I18n.t('ui.no songs found')}
        </Text>
      )}
      <FlatList
        ref={listRef}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        keyboardShouldPersistTaps="always"
        data={search}
        keyExtractor={item => item.nombre}
        renderItem={({ item }) => {
          return (
            <ListItem>
              <Body>
                <Highlighter
                  style={textStyles}
                  highlightStyle={{
                    backgroundColor: 'yellow'
                  }}
                  searchWords={[textFilter]}
                  textToHighlight={item.titulo}
                />
                <Highlighter
                  style={noteStyles}
                  highlightStyle={{
                    backgroundColor: 'yellow'
                  }}
                  searchWords={[textFilter]}
                  textToHighlight={item.fuente}
                />
              </Body>
              <Right>
                <Icon
                  name="link"
                  style={{
                    fontSize: 32,
                    color: commonTheme.brandPrimary
                  }}
                  onPress={() =>
                    navigation.navigate('SalmoChooseLocale', { target: item })
                  }
                />
              </Right>
            </ListItem>
          );
        }}
      />
    </SearchBarView>
  );
};

UnassignedList.navigationOptions = () => {
  return { title: I18n.t(titleLocaleKey) };
};

export default withNavigationFocus(UnassignedList);