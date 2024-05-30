const slider = document.getElementById('slider')
const sliderImages = slider.querySelectorAll('img')
let currentSlide = 1

setInterval(() => {
  const percentage = currentSlide * -100
  slider.style.transform = `translateX(${percentage}%)`
  
  currentSlide++

  if (currentSlide > (sliderImages.length - 1)) {
    currentSlide = 0
  }
}, 10000)