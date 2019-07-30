# Mapp JS

O Mapp js é um framework javascript que busca trazer de uma forma simples de desenvolver aplicativos e sites HTML.

## Documentação

### Função get(query)

Essa função serve para obter uma lista de elementos de acordo com uma pesquisa do objeto query

#### Objeto query

O objeto query serve para delimitar um grupo de elementos no HTML.

Propriedades:

 __id:__ String - retorna elemento por identificador (Atributo id). exemplo:
 ```javascript
 get({'id':'app'})  
 ```
 retorna elemento HTML
 ```HTML
 <div id="app">
 ```  
 __class:__ String - retorna array de elementos por classe (Atributo Class) definida na string. exemplo:  
 ```javascript
get({'class':'btn'})
 ```
 retorna array com elementos HTML:
 ```javascript
[
    '<div class="btn btn1">',
    '<div class="btn btn2">'
]
 ```   
 __tag:__  String - retorna array de elementos com a tag definida na string.
 ```javascript
 get({'tag':'div'})
 ```  
 retorna array de elementos com tag:
 ```javascript
 [
     '<div id="app">',
     '<div class="btn btn2">'
 ]
 ```  
 __tags:__ Array - retorna array de elementos por tags definidas no array.  
 ```javascript
 get({'tags':['a','button']})
 ```
 Retorna todos os elementos que encontrar com alguma das tags do array.
 ```javascript
 [
     '<a href="#home">',
     '<button id="enviar">'
     '<a href="#site" class="menu">'
 ]
 ```

 __attr:__ String - retorna array de elementos que contem atributo definido na string. Verifica apenas nas tags do HTML5 Content.
 ```javascript
 get({'attr':'class'})
 ```
 Retorna todos os elementos que contem o atributo.
 ```javascript
 [
     '<a href="#home" class="home">',
     '<button id="enviar" class="btn">'
     '<a href="#site" class="menu">'
 ]
 ```   


### Tags HTML5 content

Foi definida uma listagem de tags padrão caso não seja definido uma tag no objeto query. Segue abaixo a lista de Tags mais comuns do HTML5.
```javascript
  'a', 'abbr', 'address', 'area', 'article',
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
```
