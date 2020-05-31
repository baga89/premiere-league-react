import React from 'react';
import Table from '../Table/Table';
import logo from '../../logo.png';

interface Match {
  home: number;
  away: number;
}

function Rounds(props: {selectedRoundMatches: any, standingsData: any}) {
  return (
    props.selectedRoundMatches.map((roundMatches, index) =>
      <Round key={index} roundMatches={roundMatches.matches} roundNumber={roundMatches.round} standingsData={props.standingsData} />
    )
  )
}

export const Round = (props: {roundNumber: string, roundMatches: any[], standingsData: any[]}) => {
  return (
    <div className={props.roundNumber}>

      <header>
        <div className="logo-wrapper">
          <img src={logo} alt="Logo" />
        </div>
        <div className="select-round">
          Select round
        </div>
        <MatchesList matches={props.roundMatches} />
      </header>

      <main>
        <div className="topbar">
          <h1>Round {props.roundNumber}</h1>
          <span>Season 2016/2017</span>
        </div>
        <div className="container">
          <Table standingsData={props.standingsData} />
        </div>
      </main>
    </div>
  )
};

function MatchesList(props: {matches: Match[]}) {
  return (
    <ul className="matches-list">
      {props.matches.map((match: Match, index: number) => (
        <Match key={index} {...match} matchNumber={index + 1} />
      ))}
    </ul>
  )
}

function Match(props:any) {
  const match: Match = props;
  const homeTeam = (
    <div className={Object.values(match)[0] < Object.values(match)[1] ? 'text-muted' : 'normal'}>
      <span>{Object.keys(match)[0]}</span>
      <span>{Object.values(match)[0]}</span>
    </div>
  );

  const awayTeam = (
    <div className={Object.values(match)[0] > Object.values(match)[1] ? 'text-muted' : 'normal'}>
      <span>{Object.keys(match)[1]}</span>
      <span>{Object.values(match)[1]}</span>
    </div>
  )

  return (
    <li className={"match-item match-" + (props.matchNumber)}>
      {homeTeam}
      {awayTeam}
    </li>
  );
}

export default Rounds;