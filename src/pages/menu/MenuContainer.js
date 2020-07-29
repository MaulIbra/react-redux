import React from 'react';
import {useEffect, useState} from 'react';
import {deleteMenu, getCountMenu, getMenu, postMenu, updateMenu} from "./MenuService";
import MenuList from "./MenuList";
import MenuForm from "./MenuForm";
import { Container,Pagination} from "react-bootstrap";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {connect} from "react-redux";
import Swal from "sweetalert2";
import {showAlert} from "../../component/AlertComponent";
import {withRouter} from "react-router-dom";
import {setListMenu} from "../../redux/actions/Menu";


const MenuContainer = (props) => {

    const [showDetail,setShowDetail] = useState(false)
    const [formType,setFormType] = useState("")
    const [token,setToken] = useState("")
    const [selectedData,setSelectedData] = useState({})
    const [searchData,setSearchData] = useState("")
    const [customPagination,setCustomPagination] = useState({
        totalData : 0,
        offset : 0,
        rowPerPage : 5,
        activePage : 0,
        firstPaging : 0,
        lastPaging : 0,
    })

    useEffect(()=>{
        loadData()
        countData()
    },[customPagination.offset,searchData])

    const loadData = ()=>{
        getMenu(customPagination.offset,customPagination.rowPerPage,searchData,sessionStorage.getItem('token')).then((result)=>{
            setToken(sessionStorage.getItem('token'))
            props.setListMenu(result.data)
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

    const countData = ()=>{
        getCountMenu(searchData,sessionStorage.getItem('token')).then((result)=>{
            setCustomPagination({
                ...customPagination,
                totalData: result.data,
                lastPaging: Math.floor(result.data/customPagination.rowPerPage)
            })
        }).catch((error)=>{
            console.log(error)
        })
    }

    const createData = (menu)=>{
        postMenu(menu,token).then((response)=>{
            if (response.status===201){
                showAlert('success','Successfull Insert Menu')
                setSelectedData({})
                setShowDetail(!showDetail)
                setCustomPagination({
                    ...customPagination,
                    totalData: customPagination.totalData + 1
                })
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
            }
            loadData()
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
                        setCustomPagination({
                            ...customPagination,
                            totalData: customPagination.totalData - 1
                        })
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
            offsetTemp = page - 1
        }else{
            if (page < customPagination.firstPaging){
                offsetTemp = customPagination.firstPaging
            }else if (page >= customPagination.lastPaging){
                offsetTemp = customPagination.lastPaging
            }else{
                offsetTemp = page;
            }
        }
        return offsetTemp
    }

    const pageClick = (page)=>{
        let offsetTemp = minMaxPaging(page);
        setCustomPagination({
            ...customPagination,
            offset: offsetTemp * customPagination.rowPerPage,
            activePage: Number(offsetTemp)
        })
    }

    let pagination= []
    let counter = customPagination.totalData/customPagination.rowPerPage
    if (counter === 0){
        pagination.push(<Pagination.Item active>{1}</Pagination.Item>)
    }else{
        for (let i=0;i<counter;i++){
            if (i === customPagination.activePage){
                pagination.push(<Pagination.Item active>{i+1}</Pagination.Item>)
            }else{
                pagination.push(<Pagination.Item onClick={()=>pageClick(i,true)}>{i+1}</Pagination.Item>)
            }
        }
    }

    return (
        <Container>
            {/*<div className="container-label border-bottom">*/}
            {/*    Menu*/}
            {/*</div>*/}
            <div className="table-bordered container-table mt-5">
                <MenuForm
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
                    <input className="table-bordered search-keyword" placeholder="Search..." type="text" value={searchData} onChange={e=>{setSearchData(e.target.value)}}/>
                </div>
                <div className="container-list">
                    <MenuList
                        edited={(value)=>showModals("Edit",value)}
                        deleted={(idMenu)=>deleteData(idMenu)}
                        showDetail = {(value)=>showModals("Detail",value)}
                    />
                </div>
                <div className="container-pagination">
                    <Pagination>
                        <Pagination.First onClick={()=>pageClick(customPagination.activePage-1)}/>
                        {pagination}
                        <Pagination.Last onClick={()=>pageClick(customPagination.activePage+1)}/>
                    </Pagination>
                </div>
            </div>
        </Container>
    );
};

const mapDispatchToProps = {
    setListMenu : setListMenu
}

export default connect(null,mapDispatchToProps)(withRouter(MenuContainer));