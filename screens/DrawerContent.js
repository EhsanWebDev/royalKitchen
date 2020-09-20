import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import { AuthContext } from "../components/context";
import { SIGNOUT } from "../src/store/actions/auth";
import { connect } from "react-redux";

function DrawerContent(props) {
  const paperTheme = useTheme();
  const { colors } = useTheme();
  const theme = useTheme();
  useEffect(() => {
    console.log(props.user);
  }, []);
  const { signOut, toggleTheme } = React.useContext(AuthContext);
  const { user, dispatch } = props;
  const SignOut = async () => {
    // signOut();
    await dispatch(SIGNOUT());
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.dark ? "#000" : "#333" }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: "https://api.adorable.io/avatars/50/abott@adorable.png",
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title
                  style={[
                    styles.title,
                    // {color: paperTheme.dark ? '#fff' : '#000'},
                  ]}
                >
                  {user && user.fname}
                </Title>
                <Caption
                  style={[
                    styles.caption,
                    // {color: paperTheme.dark ? '#fff' : '#000'},
                  ]}
                >
                  {user && user.email}
                </Caption>
              </View>
            </View>

            {/* <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph
                  style={[
                    styles.paragraph,
                    styles.caption,
                    {color: paperTheme.dark ? '#fff' : '#000'},
                  ]}>
                  80
                </Paragraph>
                <Caption
                  style={[
                    styles.caption,
                    {color: paperTheme.dark ? '#fff' : '#000'},
                  ]}>
                  Following
                </Caption>
              </View>
              <View style={styles.section}>
                <Paragraph
                  style={[
                    styles.paragraph,
                    styles.caption,
                    {color: paperTheme.dark ? '#fff' : '#000'},
                  ]}>
                  100
                </Paragraph>
                <Caption
                  style={[
                    styles.caption,
                    {color: paperTheme.dark ? '#fff' : '#000'},
                  ]}>
                  Followers
                </Caption>
              </View>
            </View> */}
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="grid" color={color} size={size} />
              )}
              label="Categories"
              onPress={() => {
                props.navigation.navigate("Categories");
              }}
            />
            {/* <DrawerItem
              icon={({color, size}) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label="Bookmarks"
              onPress={() => {
                props.navigation.navigate('BookmarkScreen');
              }}
            /> */}
            {/* <DrawerItem
              icon={({color, size}) => (
                <Icon name="cog" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('SettingScreen');
              }}
            /> */}
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate("SupportScreen");
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => SignOut()}
        />
      </Drawer.Section>
    </View>
  );
}
const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
