function hideIcon(self) {
  self.style.backgroundImage = 'none';
}
function showIcon(self) {
  if(self.value=="")
    self.removeAttribute("style");
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


window.addEventListener('load', (e) => {
  var tableRef = document.getElementById('content-table').getElementsByTagName('tbody')[0];

  
  let produtos = localStorage.getItem('Produtos');
  if(!(produtos && Object.keys(produtos).length === 0 && produtos.constructor === Object) && produtos != null){
    result =  JSON.parse(produtos);
    for (let product of result){
      let newRow = tableRef.insertRow(tableRef.rows.length);
      let delete_form = `<form action="#content-table" onsubmit="apagaProduto(${product.id})"><button type="submit">Apagar</button></form>`
      newRow.innerHTML = `<td>${product.id}</td><td>${product.nome_produto}</td><td>${product.categoria}</td><td>${product.quantidade}</td><td>${product.valor}</td><td>${product.imagem}</td><td>${delete_form}</td>`;
    }
    
  }
});

function apagaProduto(idProduto){
  if(confirm(`Você tem certeza que deseja apagar o produto ${idProduto}?`)){
    let tableRef = document.getElementById('table-rows');
    let produtos = localStorage.getItem('Produtos');
    produtos = JSON.parse(produtos);
    produtos = produtos.filter(function(el) { return el.id != idProduto; });
    let convertData = JSON.stringify(produtos);
    localStorage.setItem('Produtos', convertData);
    window.location.reload(false); 
  }
}



const form = document.getElementById('product-form')

form.addEventListener('submit', (e) => {
  e.preventDefault();
   
  let nome_produto_ = document.getElementById('nome_produto').value;
  if((nome_produto_ === '' || nome_produto_.match(/^ *$/) !== null)){
    mensagem.innerHTML = `<p>Por favor preencha o campo <b>Nome</b>.</p>`;
    return false;
  }
  let categoria_ = document.getElementById('categoria').value;
  if((categoria_ === '' || categoria_.match(/^ *$/) !== null)){
    mensagem.innerHTML = `<p>Por favor preencha o campo <b>Categoria</b>.</p>`;
    return false;
  }
  let quantidade_ = document.getElementById('quantidade').value;
  if(! Number.isInteger(parseInt(quantidade_))  ){
    mensagem.innerHTML = `<p>Por favor preencha o campo <b>Quantidade</b> com um número inteiro.</p>`;
    return false;
  }
  let valor_ = document.getElementById('valor').value;
  if(isNaN(parseInt(valor_))  ){
    mensagem.innerHTML = `<p>Por favor preencha o campo <b>Valor Unitário</b> com um número.</p>`;
    return false;
  }
  let imagem_ = document.getElementById('imagem').value;
  if((imagem_ === '' || imagem_.match(/^ *$/) !== null)){
    mensagem.innerHTML = `<p>Por favor preencha o campo <b>Imagem</b>.</p>`;
    return false;
  }
  
  
  let content = document.getElementById('content')

  let carregando = `<p>Carregando...</p></br><img src="assets/loader.gif" alt="Hiring Coders Logo">`
  
  let pronto = `<div id="mensagem" class="verde"><p>Cadastro de produto realizado com sucesso!</p></div>`

  content.innerHTML = carregando
  let produtos = localStorage.getItem('Produtos');
  if(produtos == null){
    localStorage.setItem('Produtos', {})
    produtos = {};
  }

  var result = [];
  if(!(produtos && Object.keys(produtos).length === 0 && produtos.constructor === Object)){
    result =  JSON.parse(produtos)
  }

  let idP = result.length > 0 ? result[result.length -1].id + 1 : 0;
  let data = {
      id: idP,
      nome_produto:nome_produto_,
      categoria:categoria_,
      quantidade:quantidade_,
      valor:valor_,
      imagem:imagem_
  }
  result.push(data);
  let convertData = JSON.stringify(result);
 
  
  
  localStorage.setItem('Produtos', convertData)
  


  setTimeout(() => {
    content.innerHTML = pronto
    var tableRef = document.getElementById('content-table').getElementsByTagName('tbody')[0];
    var newRow = tableRef.insertRow(tableRef.rows.length);
    let delete_form = `<form action="#content-table" onsubmit="apagaProduto(${idP})"><button type="submit">Apagar</button></form>`
    newRow.innerHTML = `<td>${idP}</td><td>${nome_produto_}</td><td>${categoria_}</td><td>${quantidade_}</td><td>${valor_}</td><td>${imagem_}</td><td>${delete_form}</td>`;
  
    form.reset();
  }, 1000)

});

