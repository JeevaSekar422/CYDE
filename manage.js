function loadPlayers() {
    const game = document.getElementById("gameSelector").value;
    const data = JSON.parse(localStorage.getItem(game) || "[]");
    const tbody = document.querySelector("#manageTable tbody");
    tbody.innerHTML = "";

    data.forEach((player, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td><input value="${player.name}" onchange="editPlayer('${game}', ${index}, 'name', this.value)"></td>
      <td><input value="${player.id}" onchange="editPlayer('${game}', ${index}, 'id', this.value)"></td>
      <td><input value="${player.type}" onchange="editPlayer('${game}', ${index}, 'type', this.value)"></td>
      <td><button onclick="deletePlayer('${game}', ${index})">❌ Delete</button></td>
    `;
        tbody.appendChild(row);
    });
}

function editPlayer(game, index, field, newValue) {
    const data = JSON.parse(localStorage.getItem(game) || "[]");
    data[index][field] = newValue;
    localStorage.setItem(game, JSON.stringify(data));
}

function deletePlayer(game, index) {
    const data = JSON.parse(localStorage.getItem(game) || "[]");
    data.splice(index, 1);
    localStorage.setItem(game, JSON.stringify(data));
    loadPlayers();
}

window.onload = loadPlayers;
