import $ from 'jquery';

export default () => {
  let js_selector = document.getElementsByClassName('js_selector');

  for (let i = 0; i < js_selector.length; i++) {
    let selector = js_selector[i];
    let items = selector.children;

    for (let j = 0; j < items.length; j++) {
      let item = items[j];
      item.addEventListener('click', () => {
        selectItem(item);
        selectContent(selector.id, item.dataset.selectorItemId);
      })
    }
  }
}

function selectItem(el) {
  let selector = el.parentNode;
  let items = selector.children;

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    $(item).removeClass('is-active');
  }

  $(el).addClass('is-active');
}

function selectContent(selectorId, itemId) {
  let contents = document.getElementsByClassName('js_selector-content');
  let selectedContent = null;

  for (let i = 0; i < contents.length; i++) {
    let content = contents[i];

    if (content.dataset.selectorContent == selectorId) {
      selectedContent = content;
    }
  }

  if (selectedContent == null) {
    return;
  }

  let items = selectedContent.children;

  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    if (item.id == itemId) {
      $(item).addClass('is-active');
    } else {
      $(item).removeClass('is-active');
    }
  }
}