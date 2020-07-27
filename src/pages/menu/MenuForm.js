import {useEffect, useRef, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import InputComponent from "../../component/InputComponent";
import ButtonComponent from "../../component/ButtonComponent";
import {connect} from "react-redux";
import React from 'react';

const MenuForm = (props) => {

    const {formType,editedData,show,hide,category} = props
    const [categories,setCategory] = useState("")
    const [menuName,setMenuName] = useState("")
    const [stock,setStock] = useState(0)
    const [price,setPrice] = useState(0)

    const validationForm = ()=>{
        return (categories !== "" && menuName !== "" && stock > 0 && price > 0)
    }

    const reset = ()=>{
        setCategory("")
        setMenuName("")
        setStock(0)
        setPrice(0)
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
                categoryId : categories
            },
            menuName: menuName,
            stock: Number(stock),
            price: Number(price),
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
            setCategory(editedData.jenis.categoryId)
            setMenuName(editedData.menuName)
            setStock(editedData.stock)
            setPrice(editedData.price)
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
                        <Form.Control disabled={formType === "Detail"}
                                      name="setCategory" as="select"
                                      size="md"
                                      value={categories}
                                      onChange={e => setCategory(e.target.value)}>
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
                        value={menuName}
                        disable = {formType === "Detail"}
                        inputPlaceholder={"Enter Name"}
                        onChange={e => setMenuName(e.target.value)}
                    />
                    <InputComponent
                        inputType={"Number"}
                        inputName={"setStock"}
                        inputLabel={"Stock"}
                        value={stock}
                        disable = {formType === "Detail"}
                        inputPlaceholder={"Enter Stock"}
                        onChange={e => setStock(e.target.value)}
                    />
                    <InputComponent
                        inputType={"Number"}
                        inputName={"setPrice"}
                        inputLabel={"Price"}
                        value={price}
                        disable = {formType === "Detail"}
                        inputPlaceholder={"Enter Price"}
                        onChange={e => setPrice(e.target.value)}
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

