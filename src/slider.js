let currentSlide = 0
let interval

const slider = document.getElementById('slider')
const sliderImages = slider.querySelectorAll('img')
const sliderNodes = document.getElementById('slider-nodes')
const topBar = document.getElementById('slider-top-bar')
const bottomBar = document.getElementById('slider-bottom-bar')

const createInterval = () => {
  resetBarsAnimation()

  interval = setInterval(() => {
    currentSlide++

    if (currentSlide > (sliderImages.length - 1)) {
      currentSlide = 0
    }

    resetBarsAnimation()

    const percentage = currentSlide * -100
    slider.style.transform = `translateX(${percentage}%)`
    sliderNodes.querySelectorAll('button').forEach(button => button.classList.add('bg-opacity-50'))
    sliderNodes.querySelector(`[data-slide="${currentSlide}"]`).classList.remove('bg-opacity-50')
  }, 10000)
}

const startBarsAnimation = () => {
  topBar.style.transition = 'width 10s ease-in'
  bottomBar.style.transition = 'width 10s ease-in'
  topBar.style.width = '0'
  bottomBar.style.width = '0'
}

const resetBarsAnimation = () => {
  topBar.style.transition = 'none'
  bottomBar.style.transition = 'none'
  topBar.style.width = '100%'
  bottomBar.style.width = '100%'

  void topBar.offsetWidth;
  void bottomBar.offsetWidth;

  setTimeout(() => {
    startBarsAnimation()
  }, 50)
}

const handleChangeSlide = (e) => {
  const slideNode = parseInt(e.currentTarget.dataset.slide)

  if (slideNode === currentSlide) {
    return
  }

  currentSlide = slideNode
  const percentage = currentSlide * -100
  slider.style.transform = `translateX(${percentage}%)`

  sliderNodes.querySelectorAll('button').forEach(button => button.classList.add('bg-opacity-50'))
  e.currentTarget.classList.remove('bg-opacity-50')
  
  clearInterval(interval)
  createInterval()
}

const generateNodeButtons = () => {
  const imageQuantity = sliderImages.length

  for (let i = 0; i < imageQuantity; i++) {
    const button = document.createElement('button')
    button.classList.add('bg-orange-2-rocamix', 'p-1', 'rounded-full')
    button.dataset.slide = i

    if (i > 0) {
      button.classList.add('bg-opacity-50')
    }

    button.addEventListener('click', handleChangeSlide)
    sliderNodes.appendChild(button)
  }
}

const mountSlider = () => {
  createInterval()
  generateNodeButtons()
}

document.addEventListener('DOMContentLoaded', mountSlider)