document.getElementById("queryForm").addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevent form submission reload
  
  // Get form values
  const songtitle = document.getElementById("songtitle").value;
  const character = document.getElementById("character").value;
  const episode = document.getElementById("episode").value;
  const dropdown1 = document.getElementById("dropdown1").value;
  const dropdown2 = document.getElementById("dropdown2").value;

  //construct query parameters
  let s = `where `;
  if (songtitle != ""){
    s = s+`(Poll_Songs.Title = '` + songtitle + `') and`
  }
  if (character != ""){
    s = s+`(Character = '` + character + `') and`
  }
  if (episode != ""){
    s = s+`(Songs.Episode = '` + episode + `') and`
  }
  if (dropdown1 != "Any season"){
    s = s+`(Season = '` + dropdown1 + `') and`
  }
  if (dropdown2 != "Any tournament"){
    s = s+`(Tournament = '` + dropdown2 + `') and`
  }
  //ensure somethign was queried
  if (s === `where `){
    alert("Please input a parameter")
  }

  // Construct query parameters
  const queryParams = new URLSearchParams({
    query: s
  });

  try {
    // Make the API request to your Flask backend
    const response = await fetch(`https://ponysongbracket.pythonanywhere.com/query?${queryParams}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    // Display the table and populate it with data
    const resultTable = document.getElementById("resultTable");
    const tableBody = resultTable.querySelector("tbody");
    tableBody.innerHTML = ""; // Clear previous results

    data.forEach(row => {
      const tr = document.createElement("tr");
      for (const key in row) {
        const td = document.createElement("td");
        td.textContent = row[key];
        tr.appendChild(td);
      }
      tableBody.appendChild(tr);
    });

    resultTable.style.display = "table"; // Show the table
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while querying the database.");
  }
});