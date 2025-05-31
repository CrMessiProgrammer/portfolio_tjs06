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
                <p style="text-align: left;">Olá, sou o Carlos Henrique Nunes, formado em Engenharia de Computação e atualmente focado na especialização no Desenvolvimento de Software.<br>

                Minha paixão por tecnologia começou cedo, vendo meu pai consertar computadores. Esse interesse me levou ao CEAP, onde fiz meus primeiros cursos e me formei em Redes de Computadores, conquistando o certificado CISCO — um marco na minha trajetória.<br>

                Na faculdade, descobri minha vocação: criar soluções com impacto social, unindo Java, Android, Arduino, Firebase e MySQL para promover acessibilidade.<br>

                Na minha primeira experiência profissional como Jovem Aprendiz na Orion Integração, atuei com Suporte e Infraestrutura e aprimorei minha comunicação e gestão de tempo.<br>

                Tenho investido continuamente em capacitações, eventos e cursos. Recentemente, me formei no Bootcamp da Generation em Desenvolvimento Fullstack - JavaScript, com foco em tecnologias como TypeScript, Node.js, NestJS, ReactJS, SQL (MySQL, PostgreSQL).<br>

                Busco criar soluções que gerem impacto real na vida das pessoas. Neste portfólio, compartilho meus projetos e experiências. Fique à vontade para entrar em contato — será um prazer trocar ideias! Obrigado!😊</p>

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

function filterProjects(categoria) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const tipo = card.getAttribute('data-categoria');
        if (categoria === 'todos' || tipo === categoria) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
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