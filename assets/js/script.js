/* Seção Home (Texto rotativo) */

const words = ["Hello World!", "Olá, Mundo!", "Bem-vindo ao meu portfólio!", "Meu nome é Carlos Henrique Nunes👋"];
const typingElement = document.getElementById("typing-text");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    typingElement.textContent = displayedText;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, 120); // velocidade da digitação
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 50); // velocidade do apagamento
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
        wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000); // tempo de pausa
    }
}

type();


/* Seção Sobre (Import do Perfil do GitHub) */

const username = "CrMessiProgrammer";

fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(data => {
        document.getElementById("followers").textContent = data.followers;
        document.getElementById("repos").textContent = data.public_repos;
    })
    .catch(err => {
        document.getElementById("followers").textContent = "N/A";
        document.getElementById("repos").textContent = "N/A";
    });


/* Seção Projetos (Filtragem dos botões) */

const botoes = document.querySelectorAll(".filtros button");
const cards = document.querySelectorAll(".card");

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        document.querySelector(".filtros .ativo").classList.remove("ativo");
        botao.classList.add("ativo");

        const filtro = botao.getAttribute("data-filter");

        cards.forEach(card => {
            const categoria = card.getAttribute("data-categoria");

            if (filtro === "todos" || filtro === categoria) {
                card.classList.remove("oculto");
            } else {
                card.classList.add("oculto");
            }
        });
    });
});


/* Seção Eventos (Filtragem dos botões) */

function filtrarExperiencias(tipo) {
    const cards = document.querySelectorAll('.card-exp');
    const botoes = document.querySelectorAll('.filtros-exp button');

    botoes.forEach(btn => btn.classList.remove('ativo'));
    event.target.classList.add('ativo');

    cards.forEach(card => {
        if (tipo === 'todos' || card.dataset.tipo === tipo) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Centraliza os cards filtrados
    const container = document.querySelector('.cards-exp');
    container.style.justifyContent = 'center';
}


/* Seção Contato (Formulário) */

const formulario = document.querySelector("#formulario");
// Padrão de validação de e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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