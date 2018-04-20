import swal from 'sweetalert2'

export class Swal {
    public static successAdd () {
        swal({
            title: 'با موفقیت ثبت شد.',
            text: '',
            type: 'success',
            confirmButtonColor: '#04383c',
        });
    }
    public static warningAdd () {
        swal({
            title: 'عملیات انجام نشد!',
            text: 'دوباره تلاش کنید.',
            type: 'error',
            confirmButtonColor: '#1EE8A8',
        });
    }
    public static successEdit () {
        swal({
            title: 'با موفقیت ویرایش شد.',
            text: '',
            type: 'success',
            confirmButtonColor: '#04383c',
        });
    }
    public static warningEdit () {
        swal({
            title: 'عملیات انجام نشد!',
            text: 'دوباره تلاش کنید.',
            type: 'error',
            confirmButtonColor: '#1EE8A8',
        });
    }
}
