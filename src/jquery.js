window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements;
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") {
      // 创建 div
      elements = [createElement(selectorOrArrayOrTemplate)];
    } else {
      // 查找 div
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }

  function createElement(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }
  // return{
  //   elements: elements,
  //   oldApi: selectorOrArrayOrTemplate.oldApi,
  // }
  const api = Object.create(jQuery.prototype);
  //const api = {__proto__:jQuery.prototype}
  api.elements = elements;
  api.oldApi = selectorOrArrayOrTemplate.oldApi;
  return api;
};

jQuery.prototype = {
  jquery: true,
  constructor: jQuery,
  get(index) {
    return this.elements[index];
  },
  append(children) {
    if (children instanceof Element) {
      this.get(0).appendChild(children);
    } else if (children instanceof HTMLCollection) {
      for (let i = 0; i < children.length; i++) {
        this.get(0).appendChild(children[i]);
      }
    } else if (children.jquery === true) {
      children.each((node) => this.get(0).appendChild(node));
    }
  },
  appendTo(node) {
    if (node instanceof Element) {
      this.each((el) => node.appendChild(el));
      // 遍历 elements，对每个 el 进行 node.appendChild 操作
    } else if (node.jquery === true) {
      this.each((el) => node.get(0).appendChild(el)); // 遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
    }
  },
  addClass(className) {
    for (i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add(className);
    }
    return this;
  },
  find(selector) {
    let array = [];
    for (i = 0; i < this.elements.length; i++) {
      const elements2 = Array.from(this.elements[i].querySelectorAll(selector));
      array = array.concat(elements2);
    }
    array.oldApi = this;
    return jQuery(array);
  },
  //find(selector){
  //let array = []
  //this.each(n=>{
  //    array.push(...n.querySelectorAll(selector))
  // })
  // return jQuery(array)
  //},
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i);
    }
    return this;
  },
  parent() {
    const array = [];
    this.each((node) => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode);
      }
    });
    return jQuery(array);
  },
  children() {
    const array = [];
    this.each((node) => {
      array.push(...node.children);
    });
    return jQuery(array);
  },
  print() {
    console.log(this.elements);
  },
  end() {
    return this.oldApi;
  },
  siblings() {
    let array = [];
    this.each((node) => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(...node.parentNode.children);
        array = Array.from(array).filter((n) => n !== node);
      }
    });
    return jQuery(array);
  },
};
