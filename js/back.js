
document.getElementById('formulario').addEventListener('submit', cadastrarCliente); //anexando o evento ao botão submit.

function cadastrarCliente(e){

	var nomeCliente = document.getElementById('nomeCliente').value;
	var telefoneCliente = document.getElementById('telefoneCliente').value;
	var dataEntrada = new Date();

	if(!nomeCliente && !telefoneCliente){ //Criando alerta para que o obj contenha ao menos uma informação.

		alert("Preencha todos os campos!");
		return false;
	}

	var cliente = {
		nome: nomeCliente,
		telefone: telefoneCliente,
		mes: dataEntrada.getMonth() + 1,
		ano: dataEntrada.getFullYear()
	};

	if(localStorage.getItem('nota') === null){ //Armazenando o obj no localStorage.
		var clientes = [];
		clientes.push(cliente);
		localStorage.setItem('nota', JSON.stringify(clientes));
	} else {
		var clientes = JSON.parse(localStorage.getItem('nota'));
		clientes.push(cliente);
		localStorage.setItem('nota', JSON.stringify(clientes));
	}

	document.getElementById('formulario').reset(); //Limpando o formulário após o armazenamento das informações.

	mostraNota();

	e.preventDefault(); //impedindo o envio do formulário.
}

function removeCliente(telefone){
	var nota = JSON.parse(localStorage.getItem('nota')); // convertendo string para obj.
	console.log(nota);

	 for(var i = 0 ; i < nota.length; i++){
		if(nota[i].telefone == telefone){
			nota.splice(i, 1);
		}
	}

	localStorage.setItem('nota', JSON.stringify(nota));

	mostraNota();
}

function mostraNota(){
	var clientes = JSON.parse(localStorage.getItem('nota'));
	var notaResultado = document.getElementById('resultados');

	notaResultado.innerHTML = ''; //transformando o obj em string.

	for(var i = 0; i < clientes.length; i++){
		var nome = clientes[i].nome;
		var telefone = clientes[i].telefone;
		var mes = clientes[i].mes;
		var ano = clientes[i].ano;
		 notaResultado.innerHTML += '<tr><td>'+ nome + '</td>'+ //iniciando a tabela resultado.
		 							 	  '<td>'+ telefone + '</td>' +
		 							 	  '<td>'+ mes + '/' + ano + '</td>' +
		 							 	  '<td><button onclick="removeCliente(\''+ telefone +'\')" class="btn btn-danger">Remover</button></td>'+
		 							 '</tr>';
	}
}
