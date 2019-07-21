
function ViewRouter(dock){
  this.dock = dock;
  this.data = {};
  this.VIEWS = [];
  this.RESPONSES = [];
  this.view = '';
  this.render = function(){
    var view_template = this.view.template;
    render(this.dock,view_template);
  }

  this.getView = function(view_name){
    var Views = this.VIEWS;
    var view_selected = null;
    for(v in Views){
      var item = Views[v];
      if(item.view_name == view_name){
        view_selected = item;
      }
    }
    return view_selected
  }
  this.setView = function(view_name, config){
    //valida se controller é uma function e se config.template é um element válido
    if( typeof config.render == 'function' && config.template.tagName){
      var view = config;
      view.view_name = view_name;
      this.VIEWS.push(view);
    }else{
      console.error('view '+view_name+" é inválida")
    }
  }
  this.renderView = function(view_name){
    var view = this.getView(view_name);
    if(view){
    this.view = view;
    var RenderFunction = view.render;
    RenderFunction(this);
  }else{
    console.error('view '+view_name+' não foi definida')
  }
  }

  this.setResponse = function(name, config){
    if(!config){
      config = {}
    }
    if(!config.method){
      config.method = 'GET';


    }
    if(!config.url){
      config.url = '/';


    }
    if(!config.headers){
      config.headers = {"content-type":null};
    }


    var response = config;
    response.response_name = name;
    this.RESPONSES.push(response);
  }
  this.getResponse = function(name){
    var List = this.RESPONSES;
    var item_selected = null;
    for(l in List){
      var item = List[l];
      if(item.response_name == name){
        item_selected = item;
      }
    }
    return item_selected
  }
  this.response = function(name, query, callback){
    var res = this.getResponse(name);
    console.log(res.method.toUpperCase());
    ajax({
      method: res.method,
      url: query.url||res.url,
      headers: res.headers,
      data: query
    }).then(function(response){

      callback(response)
    });
  }
  this.replaceTemplateData = function(render_elem, render_data){
    console.log('Task: Trocar dados do render_elem pelos dados render_data');
    var elem = render_elem;
    return html(elem);
  }

  this.store = function(key, html){
    var store = tags('span', {attr:'data-store'});
    for(s in store){
      var item = store[s]
      var store_key = item.getAttribute('data-store');
      if(store_key == key){
        item.innerHTML = html;
      }
    }
  }

  this.action = function(tag, key, type, event){
    var store = tags(tag, {attr:'data-action'});
    for(s in store){
      var item = store[s]
      var store_key = item.getAttribute('data-action');
      if(store_key == key){
        listen(type, item, event);
      }
    }
  }

}
