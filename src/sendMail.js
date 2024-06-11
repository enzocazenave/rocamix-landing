const sendMail = async(e) => {
  e.preventDefault()
  const nameInput = document.getElementById('input-name')
  const emailInput = document.getElementById('input-email')
  const messageInput = document.getElementById('input-message')
  const name = nameInput.value
  const email = emailInput.value
  const message = messageInput.value

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
    const response = await fetch('https://api.resend.com/emails', {
      headers: {
        Authorization: 'Bearer re_Z9bH1UVx_5ZK2yPmEitCUXQ2S9bPcsmgu',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        from: `${name} <onboarding@resend.dev>`,
        to: ['hormigones@rocamix.com.ar'],
        subject: `Consulta - ${email}`,
        html: `
          <p><b>Nombre:</b> ${name}</p>
          <p><b>Correo electrónico:</b> ${email}</p>
          <p>${message}</p>
        `,
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
      nameInput.value = ''
      emailInput.value = ''
      messageInput.value = ''
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