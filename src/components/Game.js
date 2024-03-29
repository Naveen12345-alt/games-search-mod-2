import React, {useReducer} from 'react'
import {Link, useLocation} from 'react-router-dom'
//Styling and Animation
import styled from 'styled-components'
import {loadDetail} from '../actions/detailAction'
// import { useDispatch } from 'react-redux';
// import { loadDetail } from '../actions/detailAction';
import {popup} from '../animations'
import GameDetail from '../components/GameDetail'
import detailReducer, {initialState} from '../reducers/detailReducer'
//Redux
import {smallImage} from '../util'

const Game = ({name, released, image, id}) => {
  const location = useLocation()
  const pathId = location.pathname.split('/')[2]

  const stringPathId = id.toString()
  const [instate, dispatch] = useReducer(detailReducer, initialState)

  const loadDetailHandler = e => {
    document.body.style.overflow = 'hidden'
    loadDetail(e, dispatch)
  }
  return (
    <React.Fragment>
      {instate.game.id && pathId === instate.game.id.toString() ? (
        <GameDetail pathId={pathId} instate={instate} />
      ) : (
        ''
      )}
      <StyledGame
        variants={popup}
        initial="hidden"
        animate="show"
        layoutId={stringPathId}
        onClick={() => loadDetailHandler(id)}
      >
        <Link to={`/game/${id}`}>
          <h3>{name}</h3>
          <p>{released}</p>
          <img src={smallImage(image, 640)} alt={name} />
        </Link>
      </StyledGame>
    </React.Fragment>
  )
}

const StyledGame = styled.div`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  z-index: 1;
  cursor: pointer;
  overflow: hidden;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
`

export default Game
