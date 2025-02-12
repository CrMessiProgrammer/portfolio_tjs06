const sobre = document.querySelector("#about");
const formulario = document.querySelector("#formulario");
// Padrão de validação de e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

async function getApiGithub() {
    try {

        // 'fetch' faz as requisições HTTP
        // Mandará uma requisição para esse endereço (github)
        const dadosPerfil = await fetch(`https://api.github.com/users/CrMessiProgrammer`);

        // Convertendo para 'json'
        const perfil = await dadosPerfil.json();

        let conteudo = `
        
            <!-- Imagem da Seção Sobre -->
            <img src="${perfil.avatar_url}" alt="Foto do Perfil do Github - ${perfil.name}">

            <!-- Texto da Seção Sobre -->
            <article id="about_texto">
                <h2>Sobre mim</h2>
                <p>Olá, meu nome é Carlos Henrique Nunes, sou formado em Engenharia de Computação e estou me especializando em Desenvolvimento de Software.

                    Meu interesse pela tecnologia começou cedo e, ao longo dessa minha trajetória, fiz cursos técnicos, conquistei certificações (sendo uma delas da CISCO) e desenvolvi projetos em Java voltados para impacto social.
                    
                    Já atuei em Suporte e Infraestrutura, onde aprimorei soft skills essenciais.
                    
                    Atualmente, participo do Bootcamp da Generation, focado em Desenvolvimento Full Stack JavaScript. Convido você a conhecer meus projetos no GitHub através do link abaixo. Obrigado!😊</p>

                <!-- Detalhes do Github -->
                <div id="about_github" class="flex sobre_github">
                    <a href="${perfil.html_url}" target="_blank" class="botao">
                        Github
                    </a>
                    <p>${perfil.followers} Seguidores</p>
                    <p>${perfil.public_repos} Repositórios</p>
                </div>

            </article>
        `;

            sobre.innerHTML += conteudo;
        
    } catch (error) {
        console.log(error);
    }    
}

formulario.addEventListener("submit", function(event){
    //Impede que o formulário seja automaticamente enviado (fará primeiro as validações)
    event.preventDefault();
    
    const campoNome = document.querySelector("#nome");
    const txtNome = document.querySelector("#txtNome");

    if (campoNome.value.length < 3) {
        txtNome.innerHTML = "O Nome deve ter no mínimo 3 caracteres."
        // Deixa o cursor no bloco que precisa ser modificado
        campoNome.focus();
        return; // Sai da função        
    } else {
        txtNome.innerHTML = "";
    }

    const campoEmail = document.querySelector("#email");
    const txtEmail = document.querySelector("#txtEmail");

    // 'match' faz igual o tinder, e verifica se o e-mail corresponde 
    if (!campoEmail.value.match(emailRegex)) {
        txtEmail.innerHTML = "Digite um e-mail válido."
        // Deixa o cursor no bloco que precisa ser modificado
        campoEmail.focus();
        return; // Sai da função     
    } else {
        txtEmail.innerHTML = "";
    }

    const campoAssunto = document.querySelector("#assunto");
    const txtAssunto = document.querySelector("#txtAssunto");

    if (campoAssunto.value.length < 5) {
        txtAssunto.innerHTML = "O Assunto deve ter no mínimo 5 caracteres."
        // Deixa o cursor no bloco que precisa ser modificado
        campoAssunto.focus();
        return; // Sai da função        
    } else {
        txtAssunto.innerHTML = "";
    }

    formulario.submit();
})

getApiGithub();