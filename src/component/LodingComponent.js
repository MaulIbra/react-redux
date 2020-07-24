import Swal from "sweetalert2";

export const  LoadingComponent = ()=>{
    Swal.fire({
        title: 'Loading!',
        timerProgressBar: true,
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })
}

