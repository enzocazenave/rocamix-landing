const sendMail = async(e) => {
  e.preventDefault()
  const name = document.getElementById('input-name').value
  const email = document.getElementById('input-email').value
  const message = document.getElementById('input-message').value

  const pError = document.getElementById('contact-form-error')

  if (name.length <= 2) {
    pError.textContent = 'El nombre debe tener al menos 3 caracteres'
    return
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    pError.textContent = 'El correo electrónico es inválido'
    return
  }

  if (message.length <= 2) {
    pError.textContent = 'El mensaje debe tener al menos 2 caracteres'
    return
  }

  try {
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.resend.com/emails', {
      headers: {
        Authorization: 'Bearer re_jdu1bos4_Bk2pzj5r7HA429W2jeKkERZh',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        from: `${name} <${email}>`,
        to: ["corporate@ufodevelopment.com"],
        subject: 'Consulta',
        text: message,
        headers: {
          'X-Entity-Ref-ID': '123'
        },
      })
    })

    if (response.status !== 200) {
      pError.textContent = 'Ocurrió un error al enviar tu mensaje, mejor contáctanos por otra vía.'
    } else {
      pError.classList.replace('text-red-500', 'text-green-500')
      pError.textContent = 'Mensaje enviado con éxito.'
    }
  } catch(error) {
    console.error(error)
    pError.textContent = 'Ocurrió un error al enviar tu mensaje, mejor contáctanos por otra vía.'
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('sendMail')
  button.addEventListener('click', sendMail)
})