import React from 'react';
import {Button} from "react-bootstrap";


const ButtonComponent = (props)=>{
    const {btnLabel,validation,click} = props
    return (
        <Button variant="success" disabled={!validation} onClick={click}>{btnLabel}</Button>
    );
}

export default ButtonComponent;