import React, {Component} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import InputComponent from "../../component/InputComponent";
import ButtonComponent from "../../component/ButtonComponent";
import {connect} from "react-redux";

class MenuForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category : "",
            menuName : "",
            stock : 0,
            price : 0,
        }
    }

    handleChangeInput = (event) =>{
        const name = event.target.name
        this.setState({...this.state, [name] : event.target.value})
    }

    validationForm = ()=>{
        return this.state.category !== "" && this.state.menuName !== "" && this.state.stock > 0 && this.state.price > 0
    }

    reset = () => {
        this.setState({
            ...this.state,
            category : "",
            menuName : "",
            stock : "",
            price : "",
        })
    }

    handleCreateMenu = ()=>{
        let menu = {
            jenis: {
                categoryId : this.state.category
            },
            menuName: this.state.menuName,
            stock: Number(this.state.stock),
            price: Number(this.state.price),
            menuActive: 1
        }
        this.props.create(menu)
        this.reset()
    }

    handleUpdateMenu = (menuId)=>{
        let menu = {
            jenis: {
                categoryId : this.state.category
            },
            menuName: this.state.menuName,
            stock: Number(this.state.stock),
            price: Number(this.state.price),
            menuActive: 1
        }
        this.props.update(menuId,menu)
        this.reset()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevProps.editedData !== this.props.editedData) && Object.keys(this.props.editedData).length!==0){
            this.setState({
                ...this.state,
                category : this.props.editedData.jenis.categoryId,
                menuName : this.props.editedData.menuName,
                stock : this.props.editedData.stock,
                price : this.props.editedData.price,
            })
        }else if ((Object.keys(prevProps.editedData).length !== 0) && Object.keys(this.props.editedData).length===0){
            document.getElementById("form").reset();
            this.reset()
        }
    }

    render() {
        const {formType,editedData,show,hide,category} = this.props
        let methodClick,disable
        if (formType === "Edit"){
            disable = false
            methodClick = ()=>this.handleUpdateMenu(editedData.menuId)
        }else if (formType === "Create"){
            disable = false
            methodClick = ()=>this.handleCreateMenu()
        }else{
            disable = true
        }
        return (
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>{formType} Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="form">
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control name="category" as="select" size="md" value={this.state.category} onChange={this.handleChangeInput}>
                                <option>-- Select Category --</option>
                                {category.map((val)=>{
                                    return (<option value={val.categoryId}>{val.categoryName}</option>)
                                })}
                            </Form.Control>
                        </Form.Group>


                        <InputComponent
                            inputType={"text"}
                            inputName={"menuName"}
                            inputLabel={"Name"}
                            value={this.state.menuName}
                            disable = {disable}
                            inputPlaceholder={"Enter Name"}
                            onChange={this.handleChangeInput}
                        />
                        <InputComponent
                            inputType={"Number"}
                            inputName={"stock"}
                            inputLabel={"Stock"}
                            value={this.state.stock}
                            disable = {disable}
                            inputPlaceholder={"Enter Stock"}
                            onChange={this.handleChangeInput}
                        />
                        <InputComponent
                            inputType={"Number"}
                            inputName={"price"}
                            inputLabel={"Price"}
                            value={this.state.price}
                            disable = {disable}
                            inputPlaceholder={"Enter Price"}
                            onChange={this.handleChangeInput}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {formType === "Detail" ? "" : <ButtonComponent btnLabel={formType} validation={this.validationForm()} click={methodClick}/>}
                    <Button variant="primary" onClick={hide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const getCategory = (state)=>{
    return{
        category : state.categoryReducer.categoryTodo.category
    }
}

export default connect(getCategory,null)(MenuForm);