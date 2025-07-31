//1. Ouvir o evento de quando o usuário sair do campo de CEP
document.getElementById("cep").addEventListener("blur", (evento)=> {
    const elemento = evento.target;
    const cepinformado = elemento.value;
//2. Validar CEP
    if(!(cepinformado.length === 8))
        return;
    //3. Fazer busca no ViaCEP
    //3.1 Promessa de que o Fetch vai buscar esse recurso
    fetch(`https://viacep.com.br/ws/${cepinformado}/json/`)
    .then(response => response.json())
    .then(data => {
        //3.2 Processamento da página
        if(!data.erro){
            document.getElementById("logradouro").value = data.logradouro;
            document.getElementById("bairro").value = data.bairro;
            document.getElementById("cidade").value = data.localidade;
            document.getElementById("estado").value = data.uf;
        }else{
            alert("CEP não encontrado.")
        }
    })
    .catch(error=> console.error("Erro ao buscar o CEP: ", error));
    })

