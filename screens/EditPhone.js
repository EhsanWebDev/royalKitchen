import Axios from 'axios';
import React ,{useState, useEffect} from 'react';
import { View } from 'react-native';
import { Button, Headline, TextInput, useTheme } from 'react-native-paper';
import { connect } from 'react-redux';

// import { Container } from './styles';

const EditPhone = ({navigation, route, dispatch, user}) => {
    const theme = useTheme();
    const { colors } = useTheme();
    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (route.params) {
                  setNumber(route.params.phone)
            }
     
    }, [])

    const handleEdit = async () => {
        if (number.length === 0) {
            alert('Please enter your mobile number')
            return
        } else {
            // alert(user.name)
            setLoading(true)
            const res = await Axios.post('https://gradhatcreators.com/api/user/profile_update',{
                         "uid": user && user.id,
                        "fname": user && user.fname,
                        "phone": number
            })
            
            if (!res.data.status) {
                
                alert(res.data.message)
                 setLoading(false)
                return
            } else {
                setLoading(false)
                dispatch({ type: "RETRIEVE_TOKEN", user: res.data.source });
                navigation.goBack()
                // console.log(res.data)
            }
        }
    }

    return <View style={{ flex: 1, backgroundColor: '#fff', marginTop: -90 }}>
        <View style={{flex:1,marginTop:100, marginHorizontal:20 ,  justifyContent:'center'}}>
       
         <TextInput
            mode="outlined"
            placeholder="Mobile Number"
            keyboardType="number-pad"
            value={number}
            // multiline
            // numberOfLines={4}
            theme={{ colors: { text: colors.dark, placeholder: colors.dark } }}
            style={{ backgroundColor: "#fff", fontSize: 18 }}
            onChangeText={(val) => setNumber(val)}
            />
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
export default connect(mapStateToProps, mapDispatchToProps)( EditPhone);