import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Splash from '../page/splash';
import Login from '../page/login';
import Email from '../page/email';
import Kode from '../page/code';
import Photo from '../page/photo';
import Sukses from '../page/sukses';
import Gaji from '../page/gaji';
import Ijin from '../page/ijin';
import Sakit from '../page/sakit';
import Cuti from '../page/cuti';
import Profile from '../page/profile';
import Home from '../page/bottomNavigation/home';
import CutiIjinSakit from '../page/bottomNavigation/cuciijinsakit';
import About from '../page/bottomNavigation/about';
import ScanYamiku from '../page/scanYamiku';
import DaftarYamiku from '../page/daftarYamiku';
import MenuYamiku from '../page/menuYamiku';
import WebViewcs from '../page/webview';
import Forgotx from '../page/forgot';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import GantiPassword from '../page/gantiPassword';
import PdfViewer from '../page/pdf';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    paddingVertical: 5,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 2,
    borderTopColor: '#f1f1f1',
    paddingHorizontal: (15 / 320) * Dimensions.get('window').width,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: isFocused => ({
    color: isFocused ? '#66bb6a' : '#222',
    fontSize: (10 / 320) * Dimensions.get('window').width,
  }),
});

const MyTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.parent}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const nameicon = labelx => {
          return labelx === 'Home'
            ? 'md-home-outline'
            : labelx === 'Info'
            ? 'information-circle-outline'
            : labelx === 'Form'
            ? 'create-outline'
            : 'alert';
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.item}>
            <Icon
              name={nameicon(label)}
              size={(23 / 320) * Dimensions.get('window').width}
              color={isFocused ? '#66bb6a' : '#222'}
            />
            <Text style={styles.label(isFocused)}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Form"
        component={CutiIjinSakit}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Info"
        component={About}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Email"
          component={Email}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Kode"
          component={Kode}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Photo"
          component={Photo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Sukses"
          component={Sukses}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Gaji"
          component={Gaji}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Ijin"
          component={Ijin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Sakit"
          component={Sakit}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cuti"
          component={Cuti}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Hometabs"
          component={HomeTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScanYamiku"
          component={ScanYamiku}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DaftarYamiku"
          component={DaftarYamiku}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MenuYamiku"
          component={MenuYamiku}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Forgot"
          component={Forgotx}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WebView"
          component={WebViewcs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GantiPassword"
          component={GantiPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PdfViewer"
          component={PdfViewer}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
