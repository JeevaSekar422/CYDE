// badminton-tournament.js

document.addEventListener("DOMContentLoaded", () => {
    renderTeams();
    renderPointTable();
    renderMatchList();
    renderPointTableAdmin();
    renderFixturesAdmin();
    renderFixtures();
});

function openTeamModal() {
    document.getElementById("teamModal").style.display = "block";
}

function closeTeamModal() {
    document.getElementById("teamModal").style.display = "none";
}

function deleteTeam(teamName) {
    if (!confirm(`Are you sure you want to delete team '${teamName}'?`)) return;

    let teams = JSON.parse(localStorage.getItem("badminton-teams") || "[]");
    let points = JSON.parse(localStorage.getItem("badminton-points") || "[]");
    let matches = JSON.parse(localStorage.getItem("badminton-matches") || "[]");

    teams = teams.filter(t => t.teamName !== teamName);
    points = points.filter(p => p.team !== teamName);
    matches = matches.filter(m => m.team1 !== teamName && m.team2 !== teamName);

    localStorage.setItem("badminton-teams", JSON.stringify(teams));
    localStorage.setItem("badminton-points", JSON.stringify(points));
    localStorage.setItem("badminton-matches", JSON.stringify(matches));

    renderTeams();
    renderPointTable();
    renderPointTableAdmin();
    renderMatchList();
    renderFixturesAdmin();
    populateTeamDropdowns?.(); 
}


function submitTeam() {
    const teamName = document.getElementById("modalTeamName").value.trim();
    const player1 = document.getElementById("player1").value.trim();
    const player2 = document.getElementById("player2").value.trim();

    if (!teamName || !player1 || !player2) {
        alert("Please fill in all fields.");
        return;
    }

    const teams = JSON.parse(localStorage.getItem("badminton-teams") || "[]");
    if (teams.some(team => team.teamName === teamName)) {
        alert("Team name already exists.");
        return;
    }

    teams.push({ teamName, players: [player1, player2] });
    localStorage.setItem("badminton-teams", JSON.stringify(teams));

    // Also add to point table
    const points = JSON.parse(localStorage.getItem("badminton-points") || "[]");
    points.push({ team: teamName, played: 0, wins: 0, losses: 0, points: 0 });
    localStorage.setItem("badminton-points", JSON.stringify(points));

    document.getElementById("modalTeamName").value = "";
    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";
    closeTeamModal();
    renderTeams();
    renderPointTable();
    renderPointTableAdmin();
    populateTeamDropdowns?.(); 
}

function renderTeamsFromUpdate() {
    //const teams = JSON.parse(localStorage.getItem("badminton-teams") || "[]");
    //const list = document.getElementById("teamList");
    //if (list) {
    //    list.innerHTML = "";
    //    teams.forEach(t => {
    //        const li = document.createElement("li");
    //        li.textContent = `${t.teamName} - ${t.players.join(" & ")}`;
    //        list.appendChild(li);
    //    });
    //}

    const teams = JSON.parse(localStorage.getItem("badminton-teams") || "[]");
    const list = document.getElementById("teamList");
    if (list) {
        list.innerHTML = "";
        teams.forEach(t => {
            const li = document.createElement("li");
            li.textContent = `${t.teamName} - ${t.players.join(" & ")}`;
            list.appendChild(li);
        });
    }

    const points = JSON.parse(localStorage.getItem("badminton-points") || "[]");
    const tableBody = document.getElementById("pointTableBody");
    if (tableBody) {
        tableBody.innerHTML = "";
        points.forEach(team => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${team.name}</td>
                <td>${team.matches}</td>
                <td>${team.wins}</td>
                <td>${team.losses}</td>
                <td>${team.points}</td>
            `;
            tableBody.appendChild(tr);
        });
    }
}
function renderTeams() {
    const teams = JSON.parse(localStorage.getItem("badminton-teams") || "[]");
    const list = document.getElementById("teamList");
    if (list) {
        list.innerHTML = "";
        teams.forEach(t => {
            const li = document.createElement("li");
            li.textContent = `${t.teamName} - ${t.players.join(" & ")}`;
            list.appendChild(li);
        });
    }
}

//function renderTeams() {
//    const teams = JSON.parse(localStorage.getItem("badminton-points") || "[]");
//    const tableBody = document.getElementById("pointTableBody");
//    tableBody.innerHTML = "";

//    teams.forEach(team => {
//        const tr = document.createElement("tr");
//        tr.innerHTML = `
//      <td>${team.name}</td>
//      <td>${team.matches}</td>
//      <td>${team.wins}</td>
//      <td>${team.losses}</td>
//      <td>${team.points}</td>
//      <td><button onclick="deleteTeam('${team.name}')">Delete</button></td>
//    `;
//        tableBody.appendChild(tr);
//    });
//}

function renderPointTable() {
    const table = document.getElementById("pointTableBody");
    const points = JSON.parse(localStorage.getItem("badminton-points") || "[]");
    if (table) {
        table.innerHTML = "";
        points.forEach(p => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${p.team}</td><td>${p.played}</td><td>${p.wins}</td><td>${p.losses}</td><td>${p.points}</td>`;
            table.appendChild(row);
        });
    }
}

function renderMatchList() {
    const list = document.getElementById("matchList");
    const matches = JSON.parse(localStorage.getItem("badminton-matches") || "[]");
    if (list) {
        list.innerHTML = "";
        matches.forEach(m => {
            const li = document.createElement("li");
            li.textContent = `${m.team1} vs ${m.team2} on ${m.date} at ${m.time} (${m.venue})`;
            list.appendChild(li);
        });
    }
}

function renderPointTableAdmin() {
    const table = document.getElementById("pointTableBody");
    const points = JSON.parse(localStorage.getItem("badminton-points") || "[]");
    if (table) {
        table.innerHTML = "";
        points.forEach(p => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${p.team}</td><td>${p.played}</td><td>${p.wins}</td><td>${p.losses}</td><td>${p.points}</td>`;
            table.appendChild(row);
        });
    }
    populateTeamDropdowns?.(); 
}

//function updatePoints() {
//    const team = document.getElementById("teamSelect").value;
//    const played = parseInt(document.getElementById("matchesPlayed").value) || 0;
//    const wins = parseInt(document.getElementById("wins").value) || 0;
//    const losses = parseInt(document.getElementById("losses").value) || 0;
//    const points = wins * 2; // example point logic

//    const data = JSON.parse(localStorage.getItem("badminton-points") || "[]");
//    const index = data.findIndex(p => p.team === team);
//    if (index !== -1) {
//        data[index] = { team, played, wins, losses, points };
//        localStorage.setItem("badminton-points", JSON.stringify(data));
//        renderPointTable();
//        renderPointTableAdmin();
//    }
//}

//function updatePoints() {
//    const teamName = document.getElementById("teamSelect").value;
//    const matches = parseInt(document.getElementById("matchesPlayed").value) || 0;
//    const wins = parseInt(document.getElementById("wins").value) || 0;
//    const losses = parseInt(document.getElementById("losses").value) || 0;
//    const points = wins * 2;

//    let pointsData = JSON.parse(localStorage.getItem("badminton-points") || "[]");
//    const existingIndex = pointsData.findIndex(p => p.name === teamName);

//    if (existingIndex !== -1) {
//        pointsData[existingIndex] = { name: teamName, matches, wins, losses, points };
//    } else {
//        pointsData.push({ name: teamName, matches, wins, losses, points });
//    }

//    localStorage.setItem("badminton-points", JSON.stringify(pointsData));
//    renderTeams();
//}

function updatePoints() {
    const teamName = document.getElementById("teamSelect").value;
    const matches = parseInt(document.getElementById("matchesPlayed").value) || 0;
    const wins = parseInt(document.getElementById("wins").value) || 0;
    console.log(matches);
    //console.log(wins);
    //console.log(teamName);
    //console.log(losses);
    const losses = parseInt(document.getElementById("losses").value) || 0;
    const points = wins * 2;

    if (!teamName) {
        alert("Please select a team.");
        return;
    }

    let pointsData = JSON.parse(localStorage.getItem("badminton-points") || "[]");
    //console.log(pointsData.length);

    let existingIndex = -1;
    for (let i = 0; i < pointsData.length; i++)
    {
        //console.log(pointsData[i].team);
        if (pointsData[i].team === teamName)
        {      
            existingIndex = i;
            break;
        }
    }
    console.log(existingIndex);

    if (existingIndex > -1) {
        console.log(`Updating points for team: ${teamName}`);
        pointsData[existingIndex] = { team:teamName, played:matches, wins:wins, losses:losses, points:points };
    } else {
        console.log(`creating new team`);
        //pointsData.push({ name: teamName, matches, wins, losses, points });
    }

    localStorage.setItem("badminton-points", JSON.stringify(pointsData));
    renderTeams();
}


function addFixture() {
    const team1 = document.getElementById("team1").value;
    const team2 = document.getElementById("team2").value;
    const date = document.getElementById("matchDate").value;
    const time = document.getElementById("matchTime").value;
    const venue = document.getElementById("venue").value;

    if (!team1 || !team2 || !date || !time || !venue || team1 === team2) {
        alert("Please enter valid fixture details.");
        return;
    }

    const matches = JSON.parse(localStorage.getItem("badminton-matches") || "[]");
    matches.push({ team1, team2, date, time, venue });
    localStorage.setItem("badminton-matches", JSON.stringify(matches));
    renderMatchList();
    renderFixturesAdmin();
}

function renderFixturesAdmin() {
    const table = document.getElementById("fixturesTableBody");
    const matches = JSON.parse(localStorage.getItem("badminton-matches") || "[]");
    if (table) {
        table.innerHTML = "";
        matches.forEach(m => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${m.team1} vs ${m.team2}</td><td>${m.date}</td><td>${m.time}</td><td>${m.venue}</td>`;
            table.appendChild(row);
        });
    }
}

function populateTeamDropdowns() {
    const teams = JSON.parse(localStorage.getItem("badminton-teams") || "[]");
    const selectIds = ["teamSelect", "team1", "team2"];
    selectIds.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.innerHTML = "";
            teams.forEach(t => {
                const option = document.createElement("option");
                option.value = t.teamName;
                option.textContent = t.teamName;
                select.appendChild(option);
            });
        }
    });
}

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


document.getElementById("manageBadmintonTournament").onclick = function (e) {
    e.preventDefault();
    promptCredentials(() => window.location.href = "manage_badminton_tournament.html");
};

function deleteFixture(index) {
    let fixtures = JSON.parse(localStorage.getItem("badminton-fixtures") || "[]");
    fixtures.splice(index, 1);
    localStorage.setItem("badminton-fixtures", JSON.stringify(fixtures));
    renderFixtures();
}

function showClearAllFixturesPopup() {
    document.getElementById('clearFixturesPopup').style.display = 'block';
}

function closeClearAllFixturesPopup() {
    document.getElementById('clearFixturesPopup').style.display = 'none';
    document.getElementById('adminFixturesUser').value = "";
    document.getElementById('adminFixturesPass').value = "";
}

function confirmClearFixtures() {
    const user = document.getElementById('adminFixturesUser').value.trim();
    const pass = document.getElementById('adminFixturesPass').value.trim();

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        localStorage.removeItem("badminton-fixtures");
        renderFixtures();
        alert("All fixtures cleared.");
        closeClearAllFixturesPopup();
    } else {
        alert("Invalid credentials!");
    }
}

function renderFixtures() {
    const fixtures = JSON.parse(localStorage.getItem("badminton-fixtures") || "[]");
    const tableBody = document.getElementById("fixturesTableBody");
    tableBody.innerHTML = "";

    fixtures.forEach((fixture, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${fixture.team1} vs ${fixture.team2}</td>
      <td>${fixture.date}</td>
      <td>${fixture.time}</td>
      <td>${fixture.venue}</td>
      <td><button onclick="deleteFixture(${index})">Delete</button></td>
    `;
        tableBody.appendChild(tr);
    });
}

function deleteFixture(index) {
    let fixtures = JSON.parse(localStorage.getItem("badminton-fixtures") || "[]");
    fixtures.splice(index, 1);
    localStorage.setItem("badminton-fixtures", JSON.stringify(fixtures));
    renderFixtures();
}

function clearAllFixtures() {
    if (confirm("Are you sure you want to delete all fixtures?")) {
        localStorage.removeItem("badminton-fixtures");
        renderFixtures();
        alert("All fixtures cleared.");
    }
}

//function populateTeamDropdowns() {
//    const teams = JSON.parse(localStorage.getItem("badminton-teams") || "[]");
//    const selects = [document.getElementById("teamSelect"), document.getElementById("team1"), document.getElementById("team2")];
//    selects.forEach(select => {
//        if (select) {
//            select.innerHTML = "";
//            teams.forEach(team => {
//                const option = document.createElement("option");
//                option.value = team.name;
//                option.textContent = team.name;
//                select.appendChild(option);
//            });
//        }
//    });
//}

