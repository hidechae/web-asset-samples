import $ from 'jquery';

export default () => {
  let sliders = document.getElementsByClassName('js_slider')

  for (let i = 0; i < sliders.length; i++) {
    setStyle(sliders[i])
    setEvent(sliders[i])
    apply(sliders[i])
  }
}

function setStyle(slider) {
  let items = slider.getElementsByClassName('js_slider__content')
  let itemWidth = items[0].clientWidth
  let itemCount = items.length

  slider.getElementsByClassName('js_slider__container')[0].style.width =
    itemWidth * itemCount + 'px'
}

function setEvent(slider) {
  let prevButtons = slider.getElementsByClassName('js_slider__prev')
  for (let i = 0; i < prevButtons.length; i++) {
    // イベントの重複登録対策で、replaceする
    let button = prevButtons[i]
    let clone = button.cloneNode(true)
    clone.addEventListener('click', prev(slider))
    button.parentNode.replaceChild(clone, button)
  }

  let nextButtons = slider.getElementsByClassName('js_slider__next')
  for (let i = 0; i < nextButtons.length; i++) {
    let button = nextButtons[i]
    let clone = button.cloneNode(true)
    clone.addEventListener('click', next(slider))
    button.parentNode.replaceChild(clone, button)
  }

  let pages = slider.getElementsByClassName('js_slider__pages')
  if (pages.length > 0) {
    for (let i = 0; i < pages.length; i++) {
      let pageItems = pages[i].getElementsByTagName('li')
      for (let j = 0; j < pageItems.length; j++) {
        pageItems[j].addEventListener('click', moveTo(slider, j))
      }
    }
  }
}

function apply(slider) {
  let items = slider.getElementsByClassName('js_slider__content')
  let activeId = 0

  for (let i = 0; i < items.length; i++) {
    if (items[i].className.match(/is-active/)) {
      activeId = i
    }
  }

  let frameWidth = slider.getElementsByClassName('js_slider__frame')[0].clientWidth
  let itemWidth = items[0].clientWidth

  // containerの位置を調整
  let position = (frameWidth / 2) - (itemWidth / 2) - (itemWidth * activeId)
  slider.getElementsByClassName('js_slider__container')[0].style.marginLeft = position + 'px'
}

function prev(slider) {
  return () => {
    let items = slider.getElementsByClassName('js_slider__content')

    for (let i = 0; i < items.length; i++) {
      if (items[i].className.match(/is-active/)) {
        if (i == 0) {
          // nothing to do
        } else {
          moveTo(slider, i-1)()
          break
        }
      }
    }
  }
}

function next(slider) {
  return () => {
    let items = slider.getElementsByClassName('js_slider__content')

    for (let i = 0; i < items.length; i++) {
      if (items[i].className.match(/is-active/)) {
        if (i == items.length - 1) {
          // nothing to do
        } else {
          moveTo(slider, i+1)()
          break
        }
      }
    }
  }
}

function moveTo(slider, index) {
  return () => {
    // set style to pages
    let pages = slider.getElementsByClassName('js_slider__pages')

    for (let i = 0; i < pages.length; i++) {
      let items = pages[i].getElementsByTagName('li')

      for (let j = 0; j < items.length; j++) {
        if (items[j].className.match(/is-active/)) {
          $(items[j]).removeClass('is-active')
        }
      }
      $(items[index]).addClass('is-active')
    }

    // move
    let items = slider.getElementsByClassName('js_slider__content')

    for (let i = 0; i < items.length; i++) {
      if (items[i].className.match(/is-active/)) {
        $(items[i]).removeClass('is-active')
      }
    }

    $(items[index]).addClass('is-active')
    apply(slider)
  }
}
