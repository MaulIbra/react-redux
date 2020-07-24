import React, {Component} from 'react';
import {Form} from "react-bootstrap";

class InputComponent extends Component {

    render() {
        const {inputType,inputName,inputLabel,disable,inputPlaceholder,onChange,isValidEmail,currentState,value} = this.props
        let errorForm
        if (inputType==="email"){
            errorForm = isValidEmail===true || currentState==="" ? "":<small id="passwordHelp" className="text-danger pl-2 pt-1">Email is not valid</small>
        }
        return (
            <Form.Group>
                <Form.Label>{inputLabel}</Form.Label>
                <Form.Control
                    name={inputName}
                    type={inputType}
                    placeholder={inputPlaceholder}
                    onChange={onChange}
                    value={value}
                    disabled={disable}
                />
                {errorForm}
            </Form.Group>
        );
    }
}

export default InputComponent;