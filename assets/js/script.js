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

document.addEventListener('DOMContentLoaded', () => {
    const projectsRoot = document.getElementById('projects');
    if (!projectsRoot) return;

    const filterButtons = projectsRoot.querySelectorAll('.filtros button');
    const projectCards = projectsRoot.querySelectorAll('.card');

    // hide/show com animação (fade -> display none)
    function hideCard(card) {
        if (card.classList.contains('removed')) return;
        card.classList.add('fading');
        const onEnd = (e) => {
          if (e.propertyName === 'opacity') {
            card.classList.add('removed');
            card.removeEventListener('transitionend', onEnd);
          }
        };
        card.addEventListener('transitionend', onEnd);
    }

    function showCard(card) {
        if (card.classList.contains('removed')) {
          card.classList.remove('removed');
          // força reflow para garantir transição
          void card.offsetWidth;
        }
        card.classList.remove('fading');
    }

    // filtros (aceita data-filter ou data-filtro)
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const current = projectsRoot.querySelector('.filtros .ativo');
          if (current) current.classList.remove('ativo');
          btn.classList.add('ativo');

          const filter = btn.dataset.filter ?? btn.dataset.filtro ?? 'todos';
          projectCards.forEach(card => {
            const cat = card.dataset.categoria;
            if (filter === 'todos' || filter === cat) showCard(card);
            else hideCard(card);
          });
        });
    });

    // Modal
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalLink = document.getElementById('modalLink');
    const closeModalBtn = document.getElementById('closeModal');

    function openModal(title, desc, link) {
        modalTitle.textContent = title || 'Projeto';
        modalDesc.textContent = desc || '';
        modalLink.href = link || '#';
        modal.classList.remove('oculto');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.add('oculto');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // abrir modal ao clicar no card ou no botão "saiba-mais"
    projectCards.forEach(card => {
        // clicar no card inteiro
        card.addEventListener('click', (e) => {
          const title = card.dataset.title;
          const desc = card.dataset.desc;
          const link = card.dataset.link;
          openModal(title, desc, link);
        });

        // teclado (Enter / Space)
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
          }
        });

        // clicar no botão "saiba mais" (delegado)
        const cta = card.querySelector('.saiba-mais');
        if (cta) {
          cta.addEventListener('click', (ev) => {
            ev.stopPropagation(); // evita re-click duplo
            const title = card.dataset.title;
            const desc = card.dataset.desc;
            const link = card.dataset.link;
            openModal(title, desc, link);
          });
        }
    });

    // fechar
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.classList.contains('oculto')) closeModal(); });
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