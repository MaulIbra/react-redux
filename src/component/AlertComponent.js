import Swal from "sweetalert2";

export const  showAlert = (icon,title)=>{
    Swal.fire({
        position: 'center',
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 1500
    })
}

