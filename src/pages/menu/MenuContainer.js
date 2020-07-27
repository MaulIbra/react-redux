import {useEffect, useState} from 'react';
import {deleteMenu, getCountMenu, getMenu, postMenu, updateMenu} from "./MenuService";
import MenuList from "./MenuList";
import MenuForm from "./MenuForm";
import { Container,Pagination} from "react-bootstrap";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import {showAlert} from "../../component/AlertComponent";
import {withRouter} from "react-router-dom";
import React from 'react';
import {getCategory} from "../category/CategoryService";

const MenuContainer = (props) => {

    const [listMenu,setListMenu] = useState([])
    const [category,setCategory] = useState([])
    const [showDetail,setShowDetail] = useState(false)
    const [formType,setFormType] = useState("")
    const [token,setToken] = useState("")
    const [totalData,setTotalData] = useState(0)
    const [offset,setOffset] = useState(0)
    const [rowPerPage,setRowPerPage] = useState(5)
    const [activePage,setActivePage] = useState(0)
    const [firstPaging,setFirstPaging] = useState(0)
    const [lastPaging,setLastPaging] = useState(0)
    const [selectedData,setSelectedData] = useState({})

    useEffect(()=>{
        loadCategory()
        countData()
        loadData()
    },[offset])

    const loadData = ()=>{
        getMenu(offset,rowPerPage,sessionStorage.getItem('token')).then((result)=>{
            setToken(sessionStorage.getItem('token'))
            setListMenu(result.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const countData = ()=>{
        getCountMenu(sessionStorage.getItem('token')).then((result)=>{
            setTotalData(result.data)
            setLastPaging(Math.floor(result.data/rowPerPage))
        }).catch((error)=>{
            console.log(error)
        })
    }

    const loadCategory = ()=>{
        getCategory(sessionStorage.getItem('token')).then((result)=>{
            setCategory(result.data)
        }).catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Session End!',
            }).then((result)=>{
                if (result.value) {
                    sessionStorage.clear()
                    props.history.push('/')
                }
            })
        })
    }

    const createData = (menu)=>{
        postMenu(menu,token).then((response)=>{
            if (response.status===201){
                showAlert('success','Successfull Insert Menu')
                setSelectedData({})
                setShowDetail(!showDetail)
                setTotalData(totalData+1)
                loadData()
            }
        }).catch((error)=>{
            showAlert('error','Error Insert data')
            setShowDetail(!showDetail)
        })
    }

    const updateData = (menuId,menu)=>{
        updateMenu(menuId,menu,token).then((response)=>{
            if (response.status === 200){
                showAlert('success','Successfull Update Menu')
                setSelectedData({})
                setShowDetail(!showDetail)
                loadData()
            }
        }).catch((error)=>{
            showAlert('error','Error Edited data')
            setShowDetail(!showDetail)
        })
    }

    const deleteData = (idMenu)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                deleteMenu(idMenu,token).then((response)=>{
                    if (response.status === 200){
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        loadData()
                        setTotalData(totalData - 1)
                    }
                }).catch((error)=>{
                    Swal.fire(
                        'Error!',
                        'Error Deleted File',
                        'error'
                    )
                })
            }
        })
    }


    const showModals = (formType,value)=>{
        if (formType === "Create"){
            value = {}
        }
        setShowDetail(!showDetail)
        setSelectedData(value)
        setFormType(formType)
    }

    const hideDetail = ()=>{
        setSelectedData({})
        setShowDetail(!showDetail)
    }

    const minMaxPaging = (page,type)=>{
        let offsetTemp
        if (type){
            offsetTemp = page - 1;
        }else{
            if (page < firstPaging){
                offsetTemp = firstPaging
            }else if (page >= lastPaging){
                offsetTemp = lastPaging
            }else{
                offsetTemp = page;
            }
        }
        return offsetTemp
    }

    const pageClick = (page)=>{
        let offsetTemp = minMaxPaging(page);
        setOffset(offsetTemp * rowPerPage)
        setActivePage(Number(offsetTemp))
    }


    let pagination= []
    let counter = totalData/rowPerPage
    if (counter === 0){
        pagination.push(<Pagination.Item active>{1}</Pagination.Item>)
    }else{
        for (let i=0;i<counter;i++){
            if (i === activePage){
                pagination.push(<Pagination.Item active>{i+1}</Pagination.Item>)
            }else{
                pagination.push(<Pagination.Item onClick={()=>pageClick(i,true)}>{i+1}</Pagination.Item>)
            }
        }
    }


    return (
        <Container>
            <div className="container-label border-bottom mt-3">
                List Menu
            </div>
            <div className="table-bordered container-table">
                <MenuForm
                    category = {category}
                    formType={formType}
                    editedData={selectedData}
                    create={(menu)=>createData(menu)}
                    update={(menuId,menu)=>updateData(menuId,menu)}
                    show={showDetail}
                    hide={()=>hideDetail()}
                />
                <div className="container-action">
                    <Button
                        variant="outline-primary"
                        onClick={()=>showModals("Create")}>
                        <FontAwesomeIcon icon={faPlusCircle} className="mr-2"/>Add Menu
                    </Button>
                </div>
                <div className="container-list">
                    <MenuList
                        menu = {listMenu}
                        edited={(value)=>showModals("Edit",value)}
                        deleted={(idMenu)=>deleteData(idMenu)}
                        showDetail = {(value)=>showModals("Detail",value)}
                    />
                </div>
                <div className="container-pagination">
                    <Pagination>
                        <Pagination.First onClick={()=>pageClick(activePage-1)}/>
                        {pagination}
                        <Pagination.Last onClick={()=>pageClick(activePage+1)}/>
                    </Pagination>
                </div>
            </div>
        </Container>
    );
};


export default withRouter(MenuContainer);