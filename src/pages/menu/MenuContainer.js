import React, {Component} from 'react';
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
import {setListMenu} from "../../actions/Menu";

class MenuContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetail : false,
            formType : "",
            token : "",
            totalData : 0,
            offset : 0,
            rowPerPage : 5,
            activePage : 0,
            firstPaging : 0,
            lastPaging : 0,
            editedData : {}
        };
    }

    componentDidMount() {
        this.countData()
        this.loadData()
    }

    loadData = ()=>{
        getMenu(this.state.offset,this.state.rowPerPage,sessionStorage.getItem('token')).then((result)=>{
            this.setState({
                ...this.state,
                isVisible : false,
                token : sessionStorage.getItem('token')
            })
            this.props.setListMenu(result.data)
        }).catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Session End!',
            }).then((result)=>{
                if (result.value) {
                    sessionStorage.clear()
                    this.props.history.push('/')
                }
            })
        })
    }

    countData = ()=>{
        getCountMenu(sessionStorage.getItem('token')).then((result)=>{
            this.setState({
                ...this.state,
                totalData : result.data,
                lastPaging : Math.floor(result.data/this.state.rowPerPage)
            })
        }).catch((error)=>{
            console.log(error)
        })
    }

    createData = (menu)=>{
        postMenu(menu,this.state.token).then((response)=>{
            if (response.status===201){
                showAlert('success','Successfull Insert Menu')
                this.setState({
                    ...this.state,
                    editedData : {},
                    showDetail : !this.state.showDetail,
                    totalData : this.state.totalData + 1
                })
                this.loadData()
            }
        }).catch((error)=>{
            showAlert('error','Error Insert data')
            this.setState({
                ...this.state,
                showDetail : !this.state.showDetail
            })
        })
    }

    updateData = (menuId,menu)=>{
        updateMenu(menuId,menu,this.state.token).then((response)=>{
            if (response.status === 200){
                showAlert('success','Successfull Update Menu')
                this.setState({
                    ...this.state,
                    editedData : {},
                    showDetail : !this.state.showDetail
                })
            }
            this.loadData()
        }).catch((error)=>{
            showAlert('error','Error Edited data')
            this.setState({
                ...this.state,
                showDetail : !this.state.showDetail
            })
        })
    }

    deleteData = (idMenu)=>{
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
                deleteMenu(idMenu,this.state.token).then((response)=>{
                    if (response.status === 200){
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        this.loadData()
                        this.setState({
                            ...this.state,
                            totalData : this.state.totalData - 1
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


    showModals = (formType,value)=>{
        if (formType === "Create"){
            value = {}
        }
        this.setState({
            ...this.state,
            showDetail : !this.state.showDetail,
            editedData : value,
            formType : formType
        })
    }

    hideDetail = ()=>{
        this.setState({
            ...this.state,
            editedData : {},
            showDetail : !this.state.showDetail
        })
    }

    minMaxPaging = (page)=>{
        let offsetTemp
        if (page.target !== undefined){
            offsetTemp = page.target.text - 1
        }else{
            if (page < this.state.firstPaging){
                offsetTemp = this.state.firstPaging
            }else if (page >= this.state.lastPaging){
                offsetTemp = this.state.lastPaging
            }else{
                offsetTemp = page;
            }
        }
        return offsetTemp
    }

    pageClick = (page)=>{
        let offsetTemp = this.minMaxPaging(page);
        this.setState({
            ...this.state,
            offset : offsetTemp * this.state.rowPerPage,
            activePage : Number(offsetTemp)
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.offset !== this.state.offset){
            this.loadData()
        }
    }


    render() {
        let pagination= []
        let counter = this.state.totalData/this.state.rowPerPage
        if (counter === 0){
            pagination.push(<Pagination.Item active>{1}</Pagination.Item>)
        }else{
            for (let i=0;i<counter;i++){
                if (i === this.state.activePage){
                    pagination.push(<Pagination.Item active>{i+1}</Pagination.Item>)
                }else{
                    pagination.push(<Pagination.Item onClick={this.pageClick}>{i+1}</Pagination.Item>)
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
                        formType={this.state.formType}
                        editedData={this.state.editedData}
                        create={(menu)=>this.createData(menu)}
                        update={(menuId,menu)=>this.updateData(menuId,menu)}
                        show={this.state.showDetail}
                        hide={this.hideDetail}
                    />
                    <div className="container-action">
                        <Button
                            variant="outline-primary"
                            onClick={()=>this.showModals("Create")}>
                            <FontAwesomeIcon icon={faPlusCircle} className="mr-2"/>Add Menu
                        </Button>
                    </div>
                    <div className="container-list">
                        <MenuList
                            edited={(value)=>this.showModals("Edit",value)}
                            delete={(idMenu)=>this.deleteData(idMenu)}
                            showDetail = {(value)=>{this.showModals("Detail",value)}}
                        />
                    </div>
                    <div className="container-pagination">
                        <Pagination>
                            <Pagination.First onClick={()=>this.pageClick(this.state.activePage-1)}/>
                            {pagination}
                            <Pagination.Last onClick={()=>this.pageClick(this.state.activePage+1)}/>
                        </Pagination>
                    </div>
                </div>
            </Container>
        );
    }
}


const mapDispatchToProps = {
    setListMenu : setListMenu
}

export default connect(null,mapDispatchToProps)(withRouter(MenuContainer));