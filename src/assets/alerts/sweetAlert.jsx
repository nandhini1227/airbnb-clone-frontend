import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export function showNotification(status, message) {
  try {
    Swal.fire({
      title: status,
      text: message,
      icon: status,
      position: 'top-end',
      toast: true,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  } catch (error) {
    console.error('Error occurred while displaying notification:', error);
  }
}
