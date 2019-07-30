
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





/*//[task] Implementar junto ao set
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
}*/

function attr(attr, template_name){
  var listTemplates = get({'attr':attr});
  var selected = [];
  var l =0;
  for(l in listTemplates){
    var element = listTemplates[l];
    var element_attr = element.getAttribute(attr);
    if(element_attr==template_name){
      selected.push(element);
    }
  }
  return (selected[0]) ? selected[0] : null ;
}



function actions(obj){
  var list_data_action = get({'attr':'data-action'})
  var Actions = obj;
  for(i in Actions){
    var action_name = i;
    var action = Actions[i];
    for(l in list_data_action){
      var elem = list_data_action[l]
      var data_action = elem.getAttribute('data-action');
      if(data_action == action_name){
        for(type in action){
          var callback = action[type];
          if(typeof callback == 'function'){

            listen(type, elem, callback);
          }else{
            console.log(type+' não é um tipo de funcao')
          }

        }
      }
    }
  }
}

function render(obj){
  var render_data = {};
  var render_dock = null;
  var render_template = null;
  if(!obj.dock){
    console.error('Defina dock no render');
    return false;
  }else{
    render_dock = attr('data-dock', obj.dock);
  }
  if(!obj.template){
    console.error('Defina template no render');
    return false;
  }else{
    render_template = attr('data-template',obj.template);
  }

  if(obj.data){
    render_data = obj.data
  }else{
    console.error('Data não foi definida');
  }

  if(!render_dock || !render_dock.tagName){
    console.error('Dock não encontrado no HTML');
    return false;
  }

  if(!render_template || !render_template.tagName){
    console.error('Template não encontrado no HTML');
    return false;
  }

  if(render_template && render_dock){
    //loading
    render_dock.innerHTML ='carregando...'
    //set data
    for(r in render_data){
      var item = render_data[r];
      var item_name = r;
      var prop = attr('data-prop', item_name);
      if(prop && prop.tagName){
        prop.innerHTML = item;
      }

    }
    //set template
    var rendered_template = render_template.innerHTML;
    //clear data
    for(r in render_data){
      var item = render_data[r];
      var item_name = r;
      var prop = attr('data-prop', item_name);
      if(prop && prop.tagName){
        prop.innerHTML = '';
      }

    }
    //set dock
    render_dock.innerHTML = rendered_template;
    if(obj.actions){actions(obj.actions)}
  }

/*  if(element.length > 0){
    for(i=0; i<element.length; i++){
      item = element[i];
      item.innerHTML = html
    }
  }
  if(element.tagName){
    element.innerHTML = html
  }*/

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

function info(element,obj){
  if(element.tagName){
    if(obj.id){
      return (element.id) ? element.id : null
    }
    if(obj.class){
      var element_class = element.getAttribute('class');
      return element_class.split(' ');
    }
    if(obj.attr){
      var attr = element.getAttribute(obj.attr)
      console.log(attr);
      return attr ? attr : ''
    }
  }else{
    console.error('Target não é um elemento válido')
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
var VIEWS = []
function createView(view_name,obj){
  obj.view_name = view_name;
  VIEWS[view_name] = obj;
}
function view(view_name){
  return (VIEWS[view_name]) ? VIEWS[view_name] : {};
}

function Mapp(obj){
  obj.render.actions = obj.actions;
  if(obj.render){render(obj.render)}
  //if(obj.actions){actions(obj.actions)}

}
