import {Table} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash,faEdit,faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import formatMoney from "accounting-js/lib/formatMoney";
import formatNumber from "accounting-js/lib/formatNumber";
import React from 'react';

const MenuList = (props) => {

    const {menu,deleted,edited,showDetail} = props

    const listMenu = menu.map((value)=> {
        return(
            <tr className="d-flex">
                <td className="col-5 border-top-0 border-right">{value.menuName}</td>
                <td className="col-2 border-top-0 border-left-0 border-right">{formatMoney(value.price,{ symbol: "Rp.",  format: "%s %v" })}</td>
                <td className="col-2 border-top-0 border-left-0 border-right">{formatNumber(value.stock)}</td>
                <td className="col-3 border-top-0 border-left-0 border-right">
                    <Button className="bg-success m-1 border-0" onClick={()=>edited(value)}><FontAwesomeIcon icon={faEdit} /></Button>
                    <Button className="bg-danger m-1 border-0" onClick={()=>deleted(value.menuId)}><FontAwesomeIcon icon={faTrash} /></Button>
                    <Button className="bg-primary m-1 border-0" onClick={()=>showDetail(value)}><FontAwesomeIcon icon={faInfoCircle} /></Button>
                </td>
            </tr>
        )
    })

    return (
        <Table striped hover size="sm">
            <thead>
            <tr className="d-flex">
                <th className="col-5 border-bottom-0 border-right">Menu</th>
                <th className="col-2 border-bottom-0 border-left-0 border-right">Price</th>
                <th className="col-2 border-bottom-0 border-left-0 border-right">Stock</th>
                <th className="col-3 border-bottom-0
                     border-left-0 border-right">Action</th>
            </tr>
            </thead>
            <tbody>
            {listMenu}
            </tbody>
        </Table>
    );
};

export default MenuList;
