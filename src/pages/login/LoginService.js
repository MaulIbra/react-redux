import axios from 'axios'

export const login = async function(user){
    const response = await axios.post('/user/login',user)
    return response
}