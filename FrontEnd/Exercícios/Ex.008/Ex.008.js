//PREENCHIMENTO AUTOMÁTICO COM API
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
            alert("CEP não encontrado.");
        }
    })
    .catch(error=> console.error("Erro ao buscar o CEP: ", error));
    })
    // SALVAR NO LOCALSTORAGE AO ENVIAR O FORMULÁRIO
    document.querySelector("form").addEventListener("submit", function(event){
        event.preventDefault()

    const formData = {
        cep: document.getElementById("cep").value,
        logradouro: document.getElementById("logradouro").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        numero: document.getElementById("numero").value,
        email: document.getElementById("email").value,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
    alert("Cadastro salvo com sucesso!");
    });
    //CARREGAR DADOS AO INICIAR  A PÁGINA
    window.addEventListener("Load", ()=>{
        const dadosSalvos = localStorage.getItem("formData");
        if(dadosSalvos){
            const dados = JSON.parse(dadosSalvos);
            
            document.getElementById("cep").value = dados.cep || "";
            document.getElementById("logradouro").value = dados.logradouro || "";
            document.getElementById("bairro").value = dados.bairro || "";
            document.getElementById("cidade").value = dados.cidade || "";
            document.getElementById("estado").value = dados.estado || "";
            document.getElementById("numero").value = dados.numero || "";
            document.getElementById("email").value = dados.email || "";
        }
    })