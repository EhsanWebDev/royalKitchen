import Axios from 'axios';
import React ,{useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { Button, Headline, TextInput, useTheme } from 'react-native-paper';

import { connect } from 'react-redux';

// import { Container } from './styles';

const EditEmail = ({navigation, route, dispatch, user}) => {
    const theme = useTheme();
    const { colors } = useTheme();
     const [emailData, setEmailData] = useState({
    email: "",
    errorEmail: false,
    errorMobile: false,
    check_textInputChangeEmail: false,
  });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (route.params) {
            setEmailData({
                      ...emailData , email: route.params.phone
                  })
            }
     
    }, [])
 const textInputChangeEmail = (val) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(val).toLowerCase())) {
      setEmailData({
        ...emailData,
        email: val,
        errorEmail: false,
        check_textInputChangeEmail: true,
      });
    } else {
      setEmailData({
          ...emailData,
          email:val,
        errorEmail: "Please enter a valid email-address",
        check_textInputChangeEmail: false,
      });
    }
  };
    const handleEdit = async () => {
        if (emailData.errorEmail) {
            alert(emailData.errorEmail)
            return
        } else {
            // alert(user.name)
            setLoading(true)
            const res = await Axios.post('https://gradhatcreators.com/api/user/profile_update',{
                         "uid": user && user.id,
                        "fname": user && user.fname,
                        "email": emailData.email
            })
            
            if (!res.data.status) {
                
                alert(res.data.message)
                 setLoading(false)
                return
            } else {
               
                const u_data = await Axios.post('http://gradhatcreators.com/api/user/get_user', {
                    uid: user.id
                })
                dispatch({ type: "RETRIEVE_TOKEN", user: u_data.data.source });
                 setLoading(false)
                navigation.goBack()
                // console.log(res.data)
            }
        }
    }

    return <View style={{ flex: 1, backgroundColor: '#fff', marginTop: -90 }}>
        <View style={{flex:1,marginTop:100, marginHorizontal:20 ,  justifyContent:'center'}}>
       
         <TextInput
            mode="outlined"
            placeholder="Email address"
            keyboardType="email-address"
            value={emailData.email}
            // multiline
            // numberOfLines={4}
            theme={{ colors: { text: colors.dark, placeholder: colors.dark } }}
            style={{ backgroundColor: "#fff", fontSize: 18 }}
            onChangeText={(val) => textInputChangeEmail(val)}
            />
             {emailData.errorEmail && (
            <Text style={{ color: "#c0392b" }}>{emailData.errorEmail}</Text>
          )}
            <Button loading={loading} mode="contained" style={{marginVertical:20}} onPress={handleEdit} >Edit</Button>
        </View>
        
    </View>;
}
const mapStateToProps = ({ auth}) => ({
  user: auth.user,
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)( EditEmail);