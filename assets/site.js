
/*
listen('click', list('input-data'), function(){
  render(list('input-data'), formatDate('DD/MM/YYYY'));
});
listen('render', list('input-data'), function(){
  console.log('listen render')
});

event('render');
listen('click', list('router-link'), function(elem, event){

  Dock.renderView(attr(elem,'data-link'));
  //var link = attr(elem, 'data-link');
})


Dock = new ViewRouter(id('view-dock'));
//Dock.setResponse('posts', {url:'/posts.json'})

Dock.setResponse('list_posts',{url:'/posts.json'})
function HomeRender(app){
  console.log("carregou view");
  app.response('list_posts',{pagina:1}, function(response){
    console.log(response);
    app.render();
    app.store('json', JSON.stringify(response))
    app.action('div', 'save', 'click', function(e){
      alert('action its ok')
    })
  })

  /*var query = {pagina: 1} //set filter response
  app.response('posts', query, function(err, data){
    console.log('end request');
    app.setStore(data);
    app.render();
  })*/
/*
}

Dock.setView('home',{
  template: id('view-home'),
  render: HomeRender
})
Dock.renderView('home');

//events


console.log(tags('a', {attr:'class'}))*/


var Actions = {
  "alert":{click:function(){
    render(view('list'));
  }}
}

createView('home', {
  dock:'content',
  template:'home',
  data:{
    titulo:'meu título',
    data_cadastro:'24/10/2018'
  },
  actions:Actions
})

createView('list', {
  dock:'content',
  template:'home',
  data:{
    titulo:'list',
    data_cadastro:'24/10/2018'
  },
  actions:{
    "alert":{click:function(){
      render(view('home'));
      console.log('home')
    }}
  }
})




render(view('home'))
info(get({id:'dock-menu'}),{'attr':'class'})
