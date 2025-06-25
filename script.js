//function register(event, game) {
//    event.preventDefault();
//    const name = document.getElementById('name').value;
//    const id = document.getElementById('employeeId').value;
//    const type = document.getElementById('type').value;

//    const data = JSON.parse(localStorage.getItem(game) || "[]");
//    data.push({ name, id, type });
//    localStorage.setItem(game, JSON.stringify(data));

//    document.getElementById('name').value = "";
//    document.getElementById('employeeId').value = "";
//    document.getElementById('type').value = "";

//    loadData(game);
//}

//function loadData(game) {
//    const data = JSON.parse(localStorage.getItem(game) || "[]");
//    const tableBody = document.querySelector('#playerTable tbody');
//    if (!tableBody) return;

//    tableBody.innerHTML = "";
//    data.forEach(entry => {
//        const row = document.createElement('tr');
//        row.innerHTML = `<td>${entry.name}</td><td>${entry.id}</td><td>${entry.type}</td>`;
//        tableBody.appendChild(row);
//    });
//}

//function downloadCSV(game) {
//    const data = JSON.parse(localStorage.getItem(game) || "[]");
//    if (data.length === 0) {
//        alert("No data to export.");
//        return;
//    }

//    let csv = "Name,Employee ID,Game Type\n";
//    data.forEach(entry => {
//        csv += `${entry.name},${entry.id},${entry.type}\n`;
//    });

//    const blob = new Blob([csv], { type: 'text/csv' });
//    const url = URL.createObjectURL(blob);
//    const a = document.createElement('a');
//    a.href = url;
//    a.download = `${game}.csv`;
//    a.click();
//    URL.revokeObjectURL(url);
//}

//document.addEventListener('DOMContentLoaded', () => {
//    const path = window.location.pathname;
//    if (path.includes('cricket')) loadData('cricket');
//    if (path.includes('badminton')) loadData('badminton');
//    if (path.includes('football')) loadData('football');
//    if (path.includes('volleyball')) loadData('volleyball');
//});

//function openModal() {
//    document.getElementById("modal").style.display = "block";
//}
//function closeModal() {
//    document.getElementById("modal").style.display = "none";
//}

//// Close modal when clicking outside
//window.onclick = function (event) {
//    const modal = document.getElementById("modal");
//    if (event.target === modal) {
//        modal.style.display = "none";
//    }
//};

//function showAddGameForm() {
//    document.getElementById('addGameForm').style.display = 'block';
//}
//function showJoinGameForm() {
//    const all = ['cricket', 'football', 'badminton', 'volleyball'];
//    const names = new Set();
//    all.forEach(game => {
//        const data = JSON.parse(localStorage.getItem(game) || '[]');
//        data.forEach(p => names.add(p.Name));
//    });
//    const datalist = document.getElementById('players');
//    datalist.innerHTML = '';
//    names.forEach(name => {
//        const opt = document.createElement('option');
//        opt.value = name;
//        datalist.appendChild(opt);
//    });
//    document.getElementById('joinGameForm').style.display = 'block';
//}

//function addGame(game) {
//    const u = document.getElementById('adminUser').value;
//    const p = document.getElementById('adminPass').value;
//    if (u !== 'admin' || p !== '1234') return alert("Access denied");

//    const today = new Date().toLocaleDateString();
//    const games = JSON.parse(localStorage.getItem(`${game}-today`) || '[]');
//    games.push({ date: today });
//    localStorage.setItem(`${game}-today`, JSON.stringify(games));
//    alert("Game added!");
//    loadTodayGames(game);
//}

//function joinGame(game) {
//    const name = document.getElementById('playerName').value;
//    let list = JSON.parse(localStorage.getItem(`${game}-players-today`) || '[]');
//    if (!list.includes(name)) list.push(name);
//    localStorage.setItem(`${game}-players-today`, JSON.stringify(list));
//    alert(`${name} joined today's game!`);
//}

//function loadTodayGames(game) {
//    const list = JSON.parse(localStorage.getItem(`${game}-today`) || '[]');
//    const ul = document.getElementById('gameList');
//    ul.innerHTML = '';
//    list.forEach(g => {
//        const li = document.createElement('li');
//        li.textContent = `Game on ${g.date}`;
//        ul.appendChild(li);
//    });
//}

//function showTeamForm() {
//    document.getElementById('teamForm').style.display = 'block';
//}

//function createTeam() {
//    const name = document.getElementById('teamName').value;
//    const pass = document.getElementById('teamPass').value;
//    let teams = JSON.parse(localStorage.getItem('tournament-teams') || '[]');

//    const existing = teams.find(t => t.name === name);
//    if (existing) {
//        if (existing.pass !== pass) return alert("Incorrect password");
//        alert("Editing team...");
//        // Show edit options
//    } else {
//        teams.push({ name, pass });
//        localStorage.setItem('tournament-teams', JSON.stringify(teams));
//        alert("Team created");
//    }
//    loadTeams();
//}

//function loadTeams() {
//    const list = JSON.parse(localStorage.getItem('tournament-teams') || '[]');
//    const ul = document.getElementById('teamList');
//    ul.innerHTML = '';
//    list.forEach(t => {
//        const li = document.createElement('li');
//        li.textContent = `Team: ${t.name}`;
//        ul.appendChild(li);
//    });
//}

//document.addEventListener('DOMContentLoaded', loadTeams);

// ------------------ Registration ------------------
//function register(event, game) {
//    event.preventDefault();
//    const name = document.getElementById('name').value;
//    const id = document.getElementById('employeeId').value;
//    const type = document.getElementById('type').value;

//    const data = JSON.parse(localStorage.getItem(game) || "[]");
//    if (data.some(p => p.name === name && p.id === id)) {
//        alert("Player already registered.");
//        return;
//    }
//    data.push({ name, id, type });
//    localStorage.setItem(game, JSON.stringify(data));

//    document.getElementById('name').value = "";
//    document.getElementById('employeeId').value = "";
//    document.getElementById('type').value = "";

//    loadData(game);
//}

//function register(event, game) {
//    event.preventDefault();

//    const name = document.getElementById('name').value.trim();
//    const id = document.getElementById('employeeId').value.trim();
//    const type = document.getElementById('type').value.trim();

//    if (!name || !id || !type) {
//        alert("Please fill in all fields.");
//        return;
//    }

//    const storageKey = `${game}-players`;
//    const data = JSON.parse(localStorage.getItem(storageKey) || "[]");

//    if (data.some(p => p.name === name && p.id === id)) {
//        alert("Player already registered.");
//        return;
//    }

//    data.push({ name, id, type });
//    localStorage.setItem(storageKey, JSON.stringify(data));

//    // Export to CSV named like cricket.csv or football.csv
//    exportToCSV(`${game}.csv`, data);

//    // Reset form
//    document.getElementById('name').value = "";
//    document.getElementById('employeeId').value = "";
//    document.getElementById('type').value = "";

//    loadData(game);
//}


function loadData(game) {
    const data = JSON.parse(localStorage.getItem(game) || "[]");
    const tableBody = document.querySelector('#playerTable tbody');
    if (!tableBody) return;

    tableBody.innerHTML = "";
    data.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${entry.name}</td><td>${entry.id}</td><td>${entry.type}</td>`;
        tableBody.appendChild(row);
    });
}

function downloadCSV(game) {
    const data = JSON.parse(localStorage.getItem(game) || "[]");
    if (data.length === 0) {
        alert("No data to export.");
        return;
    }

    let csv = "Name,Employee ID,Game Type\n";
    data.forEach(entry => {
        csv += `${entry.name},${entry.id},${entry.type}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${game}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

// ------------------ Page Initialization ------------------
//document.addEventListener('DOMContentLoaded', () => {
//    const path = window.location.pathname;
//    if (path.includes('cricket')) loadData('cricket');
//    if (path.includes('badminton')) loadData('badminton');
//    if (path.includes('football')) loadData('football');
//    if (path.includes('volleyball')) loadData('volleyball');
//    if (path.includes('tournament')) loadTeams();
//});

// ------------------ Modal ------------------
function openModal() {
    document.getElementById("modal").style.display = "block";
}
function closeModal() {
    document.getElementById("modal").style.display = "none";
}
window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// ------------------ Today's Game ------------------
function showAddGameForm() {
    document.getElementById('addGameForm').style.display = 'block';
}
function showJoinGameForm() {
    const all = ['cricket', 'football', 'badminton', 'volleyball'];
    const names = new Set();
    all.forEach(game => {
        const data = JSON.parse(localStorage.getItem(game) || '[]');
        data.forEach(p => names.add(p.name));
    });
    const datalist = document.getElementById('players');
    datalist.innerHTML = '';
    names.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        datalist.appendChild(opt);
    });
    document.getElementById('joinGameForm').style.display = 'block';
}

//function addGame(game) {
//    const u = document.getElementById('adminUser').value.trim();
//    const p = document.getElementById('adminPass').value.trim();

//    const admins = JSON.parse(localStorage.getItem("game-admins") || "[]");
//    const isValid = admins.some(admin => admin.username === u && admin.password === p);

//    if (!isValid) {
//        alert("Access denied: Invalid username or password.");
//        return;
//    }

//    const today = new Date().toLocaleDateString();
//    const games = JSON.parse(localStorage.getItem(`${game}-today`) || '[]');
//    if (games.some(g => g.date === today)) {
//        alert("Game for today is already added.");
//        return;
//    }
//    games.push({ date: today, addedBy: u });
//    localStorage.setItem(`${game}-today`, JSON.stringify(games));
//    alert(`Game added by ${u}!`);
//    loadTodayGames(game);
//}

function addGame(game) {
    const u = document.getElementById('adminUser').value.trim();
    const p = document.getElementById('adminPass').value.trim();
    const date = document.getElementById('gameDate').value;
    const time = document.getElementById('gameTime').value;
    const venue = document.getElementById('gameVenue').value;

    const admins = JSON.parse(localStorage.getItem("game-admins") || "[]");
    const isValid = admins.some(admin => admin.username === u && admin.password === p);

    if (!isValid) {
        alert("Access denied: Invalid username or password.");
        return;
    }

    if (!date || !time || !venue) {
        alert("Please fill in all fields (date, time, venue).");
        return;
    }

    const timeRange = time;
    const fullGameName = `${game} (${date} - ${timeRange})`;

    let games = JSON.parse(localStorage.getItem(`${game}-today`) || '[]');
    if (games.some(g => g.name === fullGameName)) {
        alert("This game already exists.");
        return;
    }

    games.push({ name: fullGameName, date, time, venue, addedBy: u });
    localStorage.setItem(`${game}-today`, JSON.stringify(games));
    localStorage.setItem(`${fullGameName}-players`, JSON.stringify([])); // prepare player list for CSV

    // Optionally trigger download of empty CSV
    exportToCSV(`${fullGameName}.csv`, []);

    alert(`Game "${fullGameName}" added by ${u}!`);
    loadEditableGames(game);
}

function joinGame(game) {
    const name = document.getElementById('playerName').value;
    let list = JSON.parse(localStorage.getItem(`${game}-players-today`) || '[]');
    if (!list.includes(name)) list.push(name);
    localStorage.setItem(`${game}-players-today`, JSON.stringify(list));
    alert(`${name} joined today's game!`);
}

function loadTodayGames(game) {
    const list = JSON.parse(localStorage.getItem(`${game}-today`) || '[]');
    const ul = document.getElementById('gameList');
    ul.innerHTML = '';
    list.forEach(g => {
        const li = document.createElement('li');
        li.textContent = `Game on ${g.date} (added by ${g.addedBy || 'admin'})`;
        ul.appendChild(li);
    });
}

// ------------------ Tournament Teams ------------------
function showTeamForm() {
    document.getElementById('teamForm').style.display = 'block';
}

function createTeam() {
    const name = document.getElementById('teamName').value;
    const pass = document.getElementById('teamPass').value;
    let teams = JSON.parse(localStorage.getItem('tournament-teams') || '[]');

    const existing = teams.find(t => t.name === name);
    if (existing) {
        if (existing.pass !== pass) return alert("Incorrect password");
        alert("Editing team...");
    } else {
        teams.push({ name, pass });
        localStorage.setItem('tournament-teams', JSON.stringify(teams));
        alert("Team created");
    }
    loadTeams();
}

function loadTeams() {
    const list = JSON.parse(localStorage.getItem('tournament-teams') || '[]');
    const ul = document.getElementById('teamList');
    ul.innerHTML = '';
    list.forEach(t => {
        const li = document.createElement('li');
        li.textContent = `Team: ${t.name}`;
        ul.appendChild(li);
    });
}

const users = [
    { username: "admin", password: "1234" },
    { username: "captain1", password: "teamone" },
    { username: "coach", password: "coachpass" }
];
localStorage.setItem("game-admins", JSON.stringify(users));

const MASTER_PASSWORD = "4321"; // You can customize this

function promptForPassword(redirectUrl) {
    const entered = prompt("Enter Master Password:");
    if (entered === MASTER_PASSWORD) {
        window.location.href = redirectUrl;
    } else if (entered !== null) {
        alert("Incorrect Password.");
    }
}


document.getElementById("manageAdminsLink").onclick = function (e) {
    e.preventDefault();
    promptForPassword("Manage-Credentials.html");
};

function promptCredentials(callback) {
    const u = prompt("Enter admin username:");
    const p = prompt("Enter admin password:");
    if (u && p) {
        const admins = JSON.parse(localStorage.getItem("game-admins") || "[]");
        const isValid = admins.some(admin => admin.username === u && admin.password === p);
        if (isValid) {
            callback(); // Execute the redirect callback
        } else {
            alert("Access denied: Invalid username or password.");
        }
    } else {
        alert("Cancelled.");
    }
}

document.getElementById("manageTeamsLink").onclick = function (e) {
    e.preventDefault();
    promptCredentials(() => window.location.href = "manage.html");
};

document.getElementById("manageBadmintonTournament").onclick = function (e) {
    e.preventDefault();
    promptCredentials(() => window.location.href = "manage_badminton_tournament.html");
};




