 
import axios from "axios";
 
 const initialState = null;
 const API_URL = "http://127.0.0.1:5013/api";
 const saveUser = (state = initialState, action) => {
    switch(action.type) {
        case "SAVE_USER": return saveUserPost(action.payload);
        default : return state;
    }
 }

 const saveUserPost = (data) => {
    console.log( "dd",data);
    let res = null;
    axios.post(`${API_URL}/users/register`,data)
    .then(res => {
        console.log(res);
        res = res;
    })
    .catch(err => {
        console.log(err);       
        res = err;
    });
    return res;
 }

 export default saveUser;