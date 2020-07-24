import axios from 'axios'

const getMenu = async function(offset,lengthRow,token) {
    let response = await axios.get(
        '/menu/'+offset+"/"+lengthRow,
        {
            headers: {
                'token' : token,
                'Content-Type': 'application/json'
            }
        }
    )
    return response.data
}

const getCountMenu = async function(token){
    let response = await axios.get(
        '/menu/count',
        {
            headers: {
                'token' : token,
                'Content-Type': 'application/json'
            }
        }

    )
    return response.data
}

const getMenuById = async function(menuId,token){
    let response = await axios.get(
        '/menu/'+menuId,
        {
            headers: {
                'token' : token,
                'Content-Type': 'application/json'
            }
        })
    return response.data
}

const postMenu = async function(menu,token){
    let response = await axios.post('/menu',
        menu,
        {
            headers: {
                'token' : token,
                'Content-Type': 'application/json'
            }
        })
    return response
}

const updateMenu = async function(menuId,menu,token){
    let response = await axios.put('/menu/'+menuId,
        menu,
        {
            headers: {
                'token' : token,
                'Content-Type': 'application/json'
            }
        })
    return response
}

const deleteMenu = async function(idMenu,token){
    let response = await axios.delete(
        '/menu/'+idMenu,
        {
            headers: {
                'token' : token,
                'Content-Type': 'application/json'
            }
        }
        )
    return response
}

export {getMenu,getCountMenu,getMenuById,postMenu,updateMenu,deleteMenu}