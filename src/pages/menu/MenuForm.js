import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import InputComponent from "../../component/InputComponent";
import ButtonComponent from "../../component/ButtonComponent";
import {connect} from "react-redux";

const MenuForm = (props) => {

    const {formType,editedData,show,hide,category} = props
    const [userInput,setUserInput] = useState({
        category : "",
        menuName : "",
        stock : 0,
        price : 0
    })

    const validationForm = ()=>{
        return (userInput.category !== "" && userInput.menuName !== "" && userInput.stock > 0 && userInput.price > 0)
    }

    const handleChangeInput = (name,value) =>{
        setUserInput({
            ...userInput,
            [name] : value
        })
    }

    const reset = ()=>{
        setUserInput({
            ...userInput,
            category : "",
            menuName : "",
            stock : 0,
            price : 0
        })
    }

    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const handleSubmit = (formType,id)=>{
        let menu = {
            jenis: {
                categoryId : userInput.category
            },
            menuName: userInput.menuName,
            stock: Number(userInput.stock),
            price: Number(userInput.price),
            menuActive: 1
        }
        if (formType === "Create"){
            props.create(menu)
        }else{
            props.update(id,menu)
        }
        reset()
    }

    const prevEditedData = usePrevious({editedData});
    useEffect(() => {
        if(prevEditedData !== editedData && Object.keys(editedData).length!==0) {
            setUserInput({
                ...userInput,
                category : editedData.jenis.categoryId,
                menuName: editedData.menuName,
                stock: editedData.stock,
                price: editedData.price
            })
        }else {
            reset()
        }
    }, [editedData])


    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>{formType} Menu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="form">
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control disabled={formType === "Detail"}as="select" size="md" value={userInput.category} onChange={e => {handleChangeInput("category",e.target.value)}}>
                            <option>-- Select Category --</option>
                            {category.map((val)=>{
                                return (<option value={val.categoryId}>{val.categoryName}</option>)
                            })}
                        </Form.Control>
                    </Form.Group>


                    <InputComponent
                        inputType={"text"}
                        inputName={"setMenuName"}
                        inputLabel={"Name"}
                        value={userInput.menuName}
                        disable = {formType === "Detail"}
                        inputPlaceholder={"Enter Name"}
                        onChange={e => {handleChangeInput("menuName",e.target.value)}}
                    />
                    <InputComponent
                        inputType={"Number"}
                        inputName={"setStock"}
                        inputLabel={"Stock"}
                        value={userInput.stock}
                        disable = {formType === "Detail"}
                        inputPlaceholder={"Enter Stock"}
                        onChange={e => {handleChangeInput("stock",e.target.value)}}
                    />
                    <InputComponent
                        inputType={"Number"}
                        inputName={"setPrice"}
                        inputLabel={"Price"}
                        value={userInput.price}
                        disable = {formType === "Detail"}
                        inputPlaceholder={"Enter Price"}
                        onChange={e => {handleChangeInput("price",e.target.value)}}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {formType === "Detail" ? "" : <ButtonComponent btnLabel={formType} validation={validationForm()} click={()=>handleSubmit(formType,editedData.menuId)}/>}
                <Button variant="primary" onClick={hide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

const getCategory = (state)=>{
    return{
        category : state.categoryReducer.categoryTodo.category
    }
}

export default connect(getCategory,null)(MenuForm);