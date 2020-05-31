import footballResults from '../football-results.json';

function Club(name, totalMatches,
  points, goalsScored, goalsConceded, wins, draws, losses, results) {

  this.name = name;
  this.totalMatches = totalMatches;
  this.points = points;
  this.goalsScored = goalsScored;
  this.goalsConceded = goalsConceded;
  this.wins = wins;
  this.losses = losses;
  this.draws = draws;
  this.results = results;
}

function calculateStandings(filteredFootballResults, selectedRound) {
  let arrayOfClubs = [];
  filteredFootballResults.map(round => {
    round.matches.map(match => {
      let homeClub = getClubResult(match, 0, round.round);
      let awayClub = getClubResult(match, 1, round.round);
      if (round.round !== 1) {
        let indexhomeClub = arrayOfClubs.findIndex((club => club.name === homeClub.name));
        let indexawayClub = arrayOfClubs.findIndex((club => club.name === awayClub.name));

        updateClubResult(arrayOfClubs[indexhomeClub], homeClub);
        updateClubResult(arrayOfClubs[indexawayClub], awayClub);

      } else {
        homeClub = getClubResult(match, 0, round.round)
        awayClub = getClubResult(match, 1, round.round)
        arrayOfClubs.push(homeClub);
        arrayOfClubs.push(awayClub);
      }
    })
  });

  arrayOfClubs.sort((a, b) => {
    let _a; let _b;
    if(a.points < b.points) {
      return 1;
    } else if( a.points === b.points) {
      if(a.goalsScored-a.goalsConceded < b.goalsScored-b.goalsConceded) {
        return 1;
      } else return -1;
    } else return -1;
  });

  return arrayOfClubs;
}

function getClubResult(match, index, round) {
  let name = Object.keys(match)[index];
  let points = getPoints(match, index, round);

  let _res = {
    round: points.round,
    result: points.result
  };

  let resArray = [_res];

  let club = new Club(name, round, points.points,
    points.goalsScored,
    points.goalsConceded,
    points.wins,
    points.draws,
    points.losses,
    resArray);
  return club;
}

function updateClubResult(clubForUpdate, _club) {
  let _res = {
    round: _club.results[0].round,
    result: _club.results[0].result
  };

  clubForUpdate.points = clubForUpdate.points + _club.points;
  clubForUpdate.wins = clubForUpdate.wins + _club.wins;
  clubForUpdate.losses = clubForUpdate.losses + _club.losses;
  clubForUpdate.draws = clubForUpdate.draws + _club.draws;
  clubForUpdate.goalsScored = clubForUpdate.goalsScored + _club.goalsScored;
  clubForUpdate.goalsConceded = clubForUpdate.goalsConceded + _club.goalsConceded;
  clubForUpdate.totalMatches = _club.totalMatches;
  clubForUpdate.results.push(_res);
}

function getPoints(match, index, round) {
  let homeValue = Object.values(match)[0];
  let awayValue = Object.values(match)[1];

  if (homeValue > awayValue) {
    if (index === 0) {
      return winnerResult(homeValue, awayValue, round);
    } else {
      return lossesResult(awayValue, homeValue, round);
    }
  } else if (homeValue < awayValue) {
    if (index === 0) {
      return lossesResult(homeValue, awayValue, round);
    } else {
      return winnerResult(awayValue, homeValue, round);
    }
  } else if (homeValue === awayValue) {
    return sameResult(homeValue, awayValue, round);
  }
}

function winnerResult(homeValue, awayValue, round) {
  return {
    points: 3,
    wins: 1,
    losses: 0,
    draws: 0,
    goalsScored: homeValue,
    goalsConceded: awayValue,
    round: round,
    result: "W"
  }
}

function lossesResult(homeValue, awayValue, round) {
  return {
    points: 0,
    wins: 0,
    losses: 1,
    draws: 0,
    goalsScored: homeValue,
    goalsConceded: awayValue,
    round: round,
    result: "L"
  }
}

function sameResult(homeValue, awayValue, round) {
  return {
    points: 1,
    wins: 0,
    losses: 0,
    draws: 1,
    goalsScored: homeValue,
    goalsConceded: awayValue,
    round: round,
    result: "D"
  }
}

export default calculateStandings;