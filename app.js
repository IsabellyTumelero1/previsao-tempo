// Função para carregar a previsão da cidade informada
async function fetchTempo(city) {
    try {
        const response = await fetch(`https://gotempo.herokuapp.com/tempo/${city}`);
        const tempoData = await response.json();

        // Atualiza o nome da cidade no título
        document.getElementById("cidade-nome").innerHTML = `<i class="bi bi-geo-alt"></i> ${capitalize(city.replace("+", " "))}`;

        // Exibindo os dados da cidade pesquisada
        document.getElementById("temperatura").textContent = tempoData.temperatura;
        document.getElementById("vento").textContent = `Vento: ${tempoData.vento}`;
        document.getElementById("descricao").textContent = tempoData.descricao;
        fnMudarIcones(tempoData.descricao);

        // Atualizando a previsão do tempo para os próximos dias
        updateprevisao(tempoData.previsao);
    } catch (error) {
        console.error("Erro ao buscar os dados do clima", error);
    }
}

// Função para capitalizar o nome da cidade mantendo as letras acentuadas corretas
function capitalize(str) {
    return str
        .split(" ")
        .map(word => {
            if (word.length > 1) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            } else {
                return word.toUpperCase();
            }
        })
        .join(" ");
}

function fnMudarIcones(descricao) {
    const iconElement = document.getElementById("icone");
    if (descricao === "Partly cloudy") {
        iconElement.className = "bi bi-cloud-sun";
    } else if (descricao === "Sunny") {
        iconElement.className = "bi bi-sun";
    } else if (descricao === "Light rain") {
        iconElement.className = "bi bi-cloud-rain";
    } else {
        iconElement.className = "bi bi-cloud";
    }
}

// Função para atualizar a previsão para os próximos dias
function updateprevisao(previsaoData) {
    const previsaoContainer = document.getElementById("previsao");
    previsaoContainer.innerHTML = ""; // Limpa a previsão anterior
    previsaoData.forEach((day, index) => {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.innerHTML = `<strong>Dia ${index + 1} <br> </strong> ${day.temperatura}<br> ${day.vento} <i class="bi bi-vento"></i>`;
        previsaoContainer.appendChild(dayElement);
    });
}

// Função para pesquisar a cidade
function pesquisarCidade() {
    const cidade = document.getElementById("cidade").value.trim().toLowerCase();
    if (cidade) {
        // Limpa os dados antigos da previsão
        document.getElementById("previsao").innerHTML = "";

        // Carregar previsão da cidade digitada (substitui espaços por "+")
        fetchTempo(cidade.replace(" ", "+"));
    } else {
        alert("Por favor, insira o nome de uma cidade.");
    }
}


fetchTempo("americana");
