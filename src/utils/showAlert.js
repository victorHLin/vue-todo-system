import swal from 'sweetalert'

const showAlert = (title, text, icon, button) => {
  return swal({
    title,
    text,
    icon,
    button
  })
}

export default showAlert
