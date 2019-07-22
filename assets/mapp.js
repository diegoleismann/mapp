
var debug = 1
var html5_content = ['a', 'abbr', 'address', 'area', 'article',
  'aside', 'audio', 'b', 'blockquote', 'body', 'br',
  'button', 'canvas', 'caption', 'cite', 'code',
  'col', 'colgroup', 'data', 'datalist', 'dd',
  'del', 'details', 'dialog', 'div', 'dl', 'dt',
  'em', 'embed', 'fieldset', 'figcaption', 'figure',
  'footer', 'form', 'h1','h2','h3', 'h4','h5','h6',
  'header', 'hr', 'i', 'iframe', 'img', 'input',
  'ins', 'kbd', 'label', 'legend', 'li', 'main',
  'map', 'mark', 'nav', 'object', 'ol', 'optgroup',
  'option', 'output', 'p', 'param', 'picture',
  'pre', 'q', 's', 'samp', 'section', 'select',
  'small', 'source', 'span', 'strong', 'sub',
  'summary', 'sup', 'svg', 'table', 'tbody',
  'td', 'template', 'textarea', 'tfoot', 'th', 'thead',
  'time', 'tr', 'track', 'u', 'ul', 'var', 'video'
];
var html5_head=[ 'base', 'head', 'style', 'script',
  'link', 'meta', 'title'
];
var html5_not_handle=[ 'html', 'bdi', 'bdo',
  'dfn', 'meter', 'noscript', 'progress', 'rt',
  'rp', 'ruby', 'wbr'
]


function get(query){
  if(query.id && typeof query.id == 'string'){
    return document.getElementById(query.id);
  }
  if(query.class && typeof query.class == 'string'){
    return document.getElementsByClassName(query.class);
  }
  if(query.tag && typeof query.tag == 'string'){
    return document.getElementsByTagName(query.tag);
  }
  if(query.tags && typeof query.tags == 'array'&& query.tags.length > 0){
    var elements = []
    var tags = query.tags;
    for(t in tags){
      var tag_name = tags[t];
      var listByTag = document.getElementsByTagName(tag_name);
      var list_selected = []
      for(l in listByTag){
        var item = listByTag[l];
        if(item.tagName){
          list_selected.push(item);
        }
      }
      if(list_selected.length > 0){
        for(s in list_selected){
          elements.push(list_selected[s]);
        }
      }
    }
    return elements;
  }
  if(query.attr && typeof query.attr == 'string'){
    var elements = []
    for(t in html5_content){
      var tag_name = html5_content[t];
      var listByTag = document.getElementsByTagName(tag_name)
      var list_selected = []
      for(l in listByTag){
        var item = listByTag[l];
        if(item.tagName && item.hasAttribute(query.attr)){
          list_selected.push(item);
        }
      }
      if(list_selected.length > 0){
        for(s in list_selected){
          elements.push(list_selected[s]);
        }
      }
    }
    return elements;
  }
}


//[task] Implementar junto ao set
function attr(element, attr_name, set){
  var elem = element.getAttribute(attr_name);

  if(element.tagName && set){
    if(typeof attr_name == 'string' && typeof set == 'string'){
      element.setAttribute(attr_name, set);
      return element.getAttribute(attr_name);
    }
    if(typeof attr_name == 'string' && set === false){
      element.removeAttribute(attr_name);
      return null;
    }

  }else{
    if(element.tagName){
      return elem;
    }
  }
}

function render(element, html){
  if(html.tagName){
    html = html.innerHTML;
  }

  if(element.length > 0){
    for(i=0; i<element.length; i++){
      item = element[i];
      item.innerHTML = html
    }
  }
  if(element.tagName){
    element.innerHTML = html
  }

}
var registerTimeout = []
function wait(time, callback, it){
  var it  = it || registerTimeout.length
  clearTimeout(registerTimeout[it]);
  registerTimeout[it] = setTimeout(callback, time);
  return it;
}
var CustomEvents = []
function event(event_name){
  if(CustomEvents[event_name]){
    return CustomEvents[event_name];
  }else{
    var custom_event = new Event(event_name)
    CustomEvents[event_name] = custom_event;
    return custom_event;
  };
  console.log(CustomEvents);
}

function is_event(event_name){
  var custom = CustomEvents[event_name]
  if(custom){
    console.log(custom)
  }else{
    return null
  }
}

function run(element, event){
  if(element.length>0){
    console.error('Do not run event in list target')
  }else{
    element.dispatchEvent(event)
  }
}

function listen(type, element, callback){
  if(element.length > 0){
    for(i=0; i<element.length; i++){
      item = element[i];
      item.addEventListener(type, function(event){
        callback(event.target, event);
      }, false);
    }
  }
  if(element.tagName){
    element.addEventListener(type, callback, false);
  }

}

function html(el){
  if(el.tagName){
    return el.innerHTML;
  }else{
    return "<!-- Element não é válido -->"
  }
}

function formatDate(format){
  var d = new Date();
  var formated = format;
  formated = formated.replace('DD', ( d.getDate() > 10 ? d.getDate() : '0' + d.getDate() ), formated )
  formated = formated.replace('D',  d.getDate(), formated );
  formated = formated.replace('MM', ( (d.getMonth()+1) > 10 ? d.getMonth()+1 : '0'+(d.getMonth()+1) ), formated )
  formated = formated.replace('M',  d.getMonth()+1 , formated );
  formated = formated.replace('YYYY', d.getFullYear(), formated);
  return formated
}


function Mapp(obj){
  if(obj.actions){
    var list_data_action = get({'attr','data-action'})
    console.log(list_data_action);
    var Actions = obj.actions;
    for(i in Actions){
      console.log(i);
      var action_name = i;
      var action = Actions[i];
      for(l in list_data_action){
        var elem = list_data_action[l]
        var data_action = elem.getAttribute('data-action');
        if(data_action == action_name){
          for(type in action){
            var callback = action[type];
            if(typeof callback == 'function'){
              console.log(type+' é um tipo de funcao')
              listen(type, elem, callback);
            }else{
              console.log(type+' não é um tipo de funcao')
            }

          }
        }
      }
    }
  }

}
