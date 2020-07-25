import axios from "axios";

const getCategory = async function(token) {
    let response = await axios.get(
        '/category',
        {
            headers: {
                'token' : token,
                'Content-Type': 'application/json'
            }
        }
    )
    return response.data
}

export {getCategory}