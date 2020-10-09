import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';

// import { Container } from './styles';

const UnAuth = () => {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop:30, justifyContent:'center', alignItems:'center' }}>
      
     
                    <Ionicons name="md-sad" size={80} color='#d5d5d5' />
                    <Text style={{fontSize:16,fontWeight:'400', marginHorizontal:20}}>We're Sorry you need to registered / Logged in
                      to see this section
                    </Text>

                    <View style={{marginTop:10}}>
                      
                    <Button
                        mode="contained"
                      
                       style={{padding:10}}
                        onPress={()=>navigation.navigate('SignInScreen')}
                      ><Text style={{fontSize:16,fontWeight:'600',fontStyle:'italic',color:'#f7f7f7'}}>Login / Register</Text></Button>
                      </View>
           
      
    </View>
  );
};

export default UnAuth;
