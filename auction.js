// auction.js
const teams = [
    // Add your list of teams here
    { id: 1, name: 'Hawks' },
    { id: 2, name: 'Falcons' },
    { id: 3, name: 'Tigers' },
    { id: 4, name: 'Lions' },
    { id: 5, name: 'Wolverines' },
    { id: 6, name: 'Bears' },
    { id: 7, name: 'Eagles' },
    { id: 8, name: 'Panthers' },
    { id: 9, name: 'Sharks' },
    { id: 10, name: 'Wolves' }
  ];


  let currentTeamIndex = 0;
  let timeLeft = 20;
  let highestBid = 0;
  let highestBidder = '';
  
  const teamList = document.getElementById('teamList');
  const currentTeam = document.getElementById('currentTeam');
  const bidInput = document.getElementById('bidInput');
  const submitBid = document.getElementById('submitBid');
  const timer = document.getElementById('timer');
  const highestBidDisplay = document.getElementById('highestBid');
  const bidHistory = document.getElementById('bidHistory');
  
  teamList.innerHTML = teams.map((team) => `<div>${team.name}</div>`).join('');
  
  function updateCurrentTeam() {
    currentTeam.innerHTML = `Current Team: ${teams[currentTeamIndex].name}`;
  }
  
  function updateTimer() {
    timer.innerHTML = timeLeft;
  }

  function updateHighestBid() {
    highestBidDisplay.innerHTML = `Highest Bid: ${highestBid} by ${highestBidder}`;
  }
  
  function updateBidHistory() {
    bidHistory.innerHTML = teams
      .filter((team) => team.winner)
      .map((team) => `<div>${team.name} - ${team.price} by ${team.winner}</div>`)
      .join('');
  }

  function resetTimer() {
    timeLeft = 20;
  }
  
  function nextTeam() {
    currentTeamIndex++;
    if (currentTeamIndex >= teams.length) {
      clearInterval(timerInterval);
      currentTeam.innerHTML = 'Auction finished!';
    } else {
        updateCurrentTeam();
        // setTimeout(() => {
        //   updateCurrentTeam();
        //   resetTimer();
        // }, 30000); // 30-second delay between each team's bid
      }
  }
  
  function handleBid() {
    const bid = parseInt(bidInput.value);
    if (bid > highestBid) {
      highestBid = bid;
      highestBidder = 'User'; // Replace with actual user information
      updateHighestBid();
      resetTimer();
    }
    bidInput.value = '';
  }
  
  submitBid.addEventListener('click', handleBid);
  
  updateCurrentTeam();
  updateTimer();
  updateHighestBid();
  updateBidHistory(); 


  const timerInterval = setInterval(() => {
    timeLeft--;
  
    if (timeLeft < 0) {
      teams[currentTeamIndex].winner = highestBidder;
      teams[currentTeamIndex].price = highestBid;
      updateBidHistory(); // Update bid history when the team's bid time ends
      nextTeam();
      highestBid = 0;
      highestBidder = '';
      updateHighestBid();
      resetTimer();
    }
    updateTimer();
  }, 1000);
  