import React from 'react';
import './App.css';
import footballResults from './football-results.json';
import Rounds from './components/Rounds/Rounds';
import SelectRound from './components/SelectRound/SelectRound';
import calculateStandings from './helpers/standingsData'

export interface Props {}

type Round = typeof footballResults;

interface State {
  footballResults: Round;
  selectedRound: number;
}


class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      footballResults: [...footballResults],
      selectedRound: footballResults.length,
    }
  }

  handleSelect = (event) => {
    this.setState({ selectedRound: event.target.value });
  }

  render() {

    const selectedRoundMatches = this.state.footballResults.filter(round => round.round == this.state.selectedRound);
    const filteredFootballResults = this.state.footballResults.filter(round => round.round <= this.state.selectedRound);
    const standingsData = calculateStandings(filteredFootballResults, this.state.selectedRound);

    return (
      <div>
        <SelectRound selectedRound={this.state.selectedRound} onChange={this.handleSelect} footballResults={footballResults} />
        <Rounds selectedRoundMatches={selectedRoundMatches} standingsData={standingsData} />
      </div>
    )
  }
}

export default App;
