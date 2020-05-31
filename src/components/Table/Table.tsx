import React, { useState } from 'react'
import './Table.css'

export interface ClubInfo {
  name: string;
  wins: number;
  draws: number;
  losses: number;
  goalsScored: number;
  goalsConceded: number;
  totalMatches: number;
  results: any[];
  points: number;
}

function Table(props: {standingsData: ClubInfo[]}) {
  return (
    <div className="table-responsive">
      <table className="table">
        <TableHeader />
        <TableBody standingsData={props.standingsData} />
      </table>
    </div>
  )
}

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>#</th>
        <th title="Team">Team</th>
        <th title="Matches played">MP</th>
        <th title="Wins">W</th>
        <th title="Draws">D</th>
        <th title="Losses">L</th>
        <th title="Goals scored" className="hide-md">GS</th>
        <th title="Goals conceded" className="hide-md">GC</th>
        <th title="Goals difference" className="hide-md">GD</th>
        <th title="Last five games" className="hide-md text-center">Last five</th>
        <th title="Points" className="text-center">Points</th>
      </tr>
    </thead>
  )
}

function TableBody(props: {standingsData: ClubInfo[]}) {
  const rows = props.standingsData.map((row, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{row.name}</td>
      <td>{row.totalMatches}</td>
      <td>{row.wins}</td>
      <td>{row.draws}</td>
      <td>{row.losses}</td>
      <td className="hide-md">{row.goalsScored}</td>
      <td className="hide-md">{row.goalsConceded}</td>
      <td className="hide-md">{row.goalsScored - row.goalsConceded}</td>
      <td className="hide-md text-center">
        {row.results.slice(Math.max(row.results.length - 5, 0)).map(lastFive => (
          <span className={lastFive.result === 'W' ? 'circle green' : lastFive.result === 'L' ? 'circle red': 'circle gray'}>{lastFive.result}</span>
        ))}
      </td>
      <td className="text-center">{row.points}</td>
    </tr>
  ))
  return <tbody>{rows}</tbody>
}

export default Table;