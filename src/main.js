import './style.css'

const fakeSubmitRequest = (payload) =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ ok: true, payload }), 900)
  })

const isValidContact = (value) => {
  const trimmed = value.trim()
  const phonePattern = /^\+?\d{7,15}$/
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return phonePattern.test(trimmed) || emailPattern.test(trimmed)
}

const setupHeroForm = () => {
  const form = document.querySelector('.hero_section__input')
  if (!form) return

  const input = form.querySelector('input')
  const button = form.querySelector('button')
  const errorField = form.querySelector('.hero_section__error')

  const setError = (message) => {
    errorField.textContent = message
    input.classList.add('input-error')
    input.setAttribute('aria-invalid', 'true')
  }

  const clearError = () => {
    errorField.textContent = ''
    input.classList.remove('input-error')
    input.removeAttribute('aria-invalid')
  }

  input.addEventListener('input', () => {
    if (input.value.trim()) {
      clearError()
    }
  })

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const value = input.value.trim()

    if (!value) {
      setError('Пожалуйста, заполните это поле.')
      input.focus()
      return
    }

    if (!isValidContact(value)) {
      setError('Введите корректный телефон или e-mail.')
      input.focus()
      return
    }

    clearError()
    button.disabled = true
    const originalLabel = button.textContent
    button.textContent = 'Отправка...'

    try {
      await fakeSubmitRequest({ contact: value })
      alert('Спасибо! Данные отправлены.')
      form.reset()
    } catch (error) {
      alert('Не удалось отправить данные. Попробуйте позже.')
    } finally {
      button.disabled = false
      button.textContent = originalLabel
      clearError()
    }
  })
}

window.addEventListener('DOMContentLoaded', () => {
  setupHeroForm()
})
