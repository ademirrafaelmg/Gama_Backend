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

  
  let clientes = localStorage.getItem('Clientes');
  if(!(clientes && Object.keys(clientes).length === 0 && clientes.constructor === Object) && clientes != null){
    result =  JSON.parse(clientes);
    for (var product of result){
      var newRow = tableRef.insertRow(tableRef.rows.length);
      let delete_form = `<form action="#content-table" onsubmit="apagaCliente(${product.id})"><button type="submit">Apagar</button></form>`
      newRow.innerHTML = `<td>${product.id}</td><td>${product.nome_cliente}</td><td>${product.cpf}</td><td>${product.data_nascimento}</td><td>${product.email}</td><td>${product.telefone}</td><td>${delete_form}</td>`;
    }
    
  }
});


function apagaCliente(idCliente){
  if(confirm(`Você tem certeza que deseja apagar o cliente ${idCliente}?`)){
    let tableRef = document.getElementById('table-rows');
    let clientes = localStorage.getItem('Clientes');
    clientes = JSON.parse(clientes);
    clientes = clientes.filter(function(el) { return el.id != idCliente; });
    let convertData = JSON.stringify(clientes);
    localStorage.setItem('Clientes', convertData);
    window.location.reload(false); 
  }
}

const form = document.getElementById('product-form')

form.addEventListener('submit', (e) => {
  e.preventDefault();
   
  let nome_cliente_ = document.getElementById('nome_cliente').value;
  if((nome_cliente_ === '' || nome_cliente_.match(/^ *$/) !== null)){
    mensagem.innerHTML = `<p>Por favor preencha o campo <b>Nome do Cliente</b>.</p>`;
    return false;
  }
  let cpf_ = document.getElementById('cpf').value;
  if((cpf_ === '' || cpf_.match(/^ *$/) !== null)){
    mensagem.innerHTML = `<p>Por favor preencha o campo <b>CPF</b>.</p>`;
    return false;
  }
  let data_nascimento_ = document.getElementById('data_nascimento').value;
  if( isNaN(Date.parse(data_nascimento_))  ){
    mensagem.innerHTML = `<p>Por favor preencha o campo <b>Data de Nascimento</b> com uma data válida.</p>`;
    return false;
  }
  let email_ = document.getElementById('email').value;
  if( !validateEmail(email_)  ){
    mensagem.innerHTML = `<p>Por favor preencha o campo <b>Email</b> com um email válidotelefone.</p>`;
    return false;
  }
  let telefone_ = document.getElementById('telefone').value;
  if((telefone_ === '' || telefone_.match(/^ *$/) !== null)){
    mensagem.innerHTML = `<p>Por favor preencha o campo <b>Telefone</b>.</p>`;
    return false;
  }
  
  
  let content = document.getElementById('content')

  let carregando = `<p>Carregando...</p></br><img src="assets/loader.gif" alt="Hiring Coders Logo">`
  
  let pronto = `<div id="mensagem" class="verde"><p>Cadastro de cliente realizado com sucesso!</p></div>`

  content.innerHTML = carregando
  let clientes = localStorage.getItem('Clientes');
  if(clientes == null){
    localStorage.setItem('Clientes', {})
    clientes = {};
  }

  var result = [];
  if(!(clientes && Object.keys(clientes).length === 0 && clientes.constructor === Object)){
    result =  JSON.parse(clientes)
  }

  let idP = result.length > 0 ? result[result.length -1].id + 1 : 0;
  let data = {
      id: idP,
      nome_cliente:nome_cliente_,
      cpf:cpf_,
      data_nascimento:data_nascimento_,
      email:email_,
      telefone:telefone_
  }
  result.push(data);
  let convertData = JSON.stringify(result);
 
  
  
  localStorage.setItem('Clientes', convertData)
  


  setTimeout(() => {
    content.innerHTML = pronto
    var tableRef = document.getElementById('content-table').getElementsByTagName('tbody')[0];
    var newRow = tableRef.insertRow(tableRef.rows.length);
    let delete_form = `<form action="#content-table" onsubmit="apagaCliente(${idP})"><button type="submit">Apagar</button></form>`
    newRow.innerHTML = `<td>${idP}</td><td>${nome_cliente_}</td><td>${cpf_}</td><td>${data_nascimento_}</td><td>${email_}</td><td>${telefone_}</td><td>${delete_form}</td>`;
  
    form.reset();
  }, 1000)

});

