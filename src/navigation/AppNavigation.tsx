import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../screens/AccountScreen/RegisterScreen";
import LoginScreen from "../screens/AccountScreen/LoginScreen";
import SplashScreen from "../screens/SplashScreen/splash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabNavigation from "./TabNavigation";
import MyProfile from "../screens/Profile/MyProfile";
import EditProfile from "../screens/Profile/EditProfile";
import StartQuizScreen from "../screens/StartQuizScreen";
import QuestionsScreen from "../screens/QuestionsScreen";
import ResultQuizScreen from "../screens/ResultQuizScreen";
import TechnologyCardScreen from "../screens/TechnologyCardScreen";
import QuizOverview from "../screens/QuizOverview";
import TermsConditionScreen from "../screens/TermsCondition";
import AboutUsScreen from "../screens/AboutUsScreen";
import ForgotPassword from "../screens/AccountScreen/ForgotPassword";
import VerificationScreen from "../screens/AccountScreen/VerificationScreen";
import ResetPassword from "../screens/AccountScreen/ResetPassword";
import MindblowingScreen, {
  SplashKnowledgeScreen,
} from "../screens/MindblowingScreen";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import HelpCenterScreen, {
  Notification,
  Settings,
} from "../screens/Profile/HelpCenterScreen";
import StaticQuizOverview from "../screens/SplashScreen/staticQuizOverview";
import RatingScreen from "../screens/Profile/AchievementsScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import { useTheme } from "../theme/ThemeContext";


const Stack = createStackNavigator();

const AppNavigator = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem("userToken");
      if (storedToken) {
      }
    };

    checkToken();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.backgroundColor,
        },
        headerTintColor: theme.textColor,
      }}
    >
      {token ? (
        <>
          <Stack.Screen
            name="MindblowingScreen"
            component={MindblowingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SplashKnowledgeScreen"
            component={SplashKnowledgeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen
            name="MyTabs"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="MyProfile" component={MyProfile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="RatingScreen" component={RatingScreen} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen
            name="StartQuizScreen"
            component={StartQuizScreen}
            options={{ headerShown: false }}
          />
      {/* <Stack.Screen name="Signature" component={SignatureComponent} /> */}

          <Stack.Screen
            name="QuestionsScreen"
            component={QuestionsScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="ResultQuizScreen"
            component={ResultQuizScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TechnologyCardScreen"
            component={TechnologyCardScreen}
          />
          <Stack.Screen
            name="StaticQuizOverview"
            component={StaticQuizOverview}
          />
          <Stack.Screen name="QuizOverview" component={QuizOverview} />
          <Stack.Screen
            name="TermsConditionScreen"
            component={TermsConditionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PrivacyPolicyScreen"
            component={PrivacyPolicyScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="AboutUsScreen"
            component={AboutUsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HelpCenterScreen"
            component={HelpCenterScreen}
            options={{ headerShown: true }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
