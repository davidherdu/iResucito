// @flow
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigatorOptions from './StackNavigatorOptions';
import MenuNavigator from './MenuNavigator';
import SongChooserNavigator from './SongChooserNavigator';
import AboutDialog from '../screens/AboutDialog';
import SongChooseLocaleDialog from '../screens/SongChooseLocaleDialog';
import ContactChooserDialog from '../screens/ContactChooserDialog';
import ContactImportDialog from '../screens/ContactImportDialog';
import ListNameDialog from '../screens/ListNameDialog';
import SongChangeNameDialog from '../screens/SongChangeNameDialog';
import SongEditorDialog from '../screens/SongEditorDialog';
import SongPreviewScreenDialog from '../screens/SongPreviewScreenDialog';
import SongPreviewPdfDialog from '../screens/SongPreviewPdfDialog';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="none"
      screenOptions={StackNavigatorOptions()}>
      <Stack.Screen name="Menu" component={MenuNavigator} />
      <Stack.Screen name="About" component={AboutDialog} />
      <Stack.Screen name="SongChooser" component={SongChooserNavigator} />
      <Stack.Screen
        name="SongChooseLocale"
        component={SongChooseLocaleDialog}
      />
      <Stack.Screen name="ContactChooser" component={ContactChooserDialog} />
      <Stack.Screen name="ContactImport" component={ContactImportDialog} />
      <Stack.Screen name="ListName" component={ListNameDialog} />
      <Stack.Screen name="SongChangeName" component={SongChangeNameDialog} />
      <Stack.Screen name="SongEditor" component={SongEditorDialog} />
      <Stack.Screen
        name="SongPreviewScreen"
        component={SongPreviewScreenDialog}
      />
      <Stack.Screen name="SongPreviewPdf" component={SongPreviewPdfDialog} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
