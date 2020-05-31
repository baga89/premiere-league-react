import React from 'react';
import './SelectRound.css'

function SelectRound(props: {footballResults: any, selectedRound: number, onChange: any}) {
  return (
    <form>
      <label>
        <select value={props.selectedRound} onChange={props.onChange}>
          {props.footballResults.map((selectedRound,index) => {
            return <option key={index} value={selectedRound.round}>Round {selectedRound.round}</option>
          })}
        </select>
      </label>
    </form>
  )
}

export default SelectRound;