//? Libraries
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
//? Services
import {
  showSuccessMsg,
  showErrorMsg,
} from '../../services/connection/event-bus.service'
import { boardService } from '../../services/board/board.service.local.js'
//? Store
import {
  loadGroups,
  addGroup,
  loadBoard,
  loadBoards,
} from '../../store/actions/board.actions.js'
// import { loadGroups, addGroup, updateGroup, removeGroup } from '../../store/actions/board.actions.js'
//? Cmps
import { BoardDetails } from '../../cmps/board/board-details.jsx'
import { Loader } from '../../cmps/helpers/loader'
import { store } from '../../store/store'

export function BoardIndex() {
  // const [board, setBoard] = useState({})
  const board = useSelector((storeState) => storeState.boardModule.board)

  const { boardId } = useParams()
  console.log('New Boarddd', board)
  useEffect(() => {
    onLoadBoard()
    return () => {
      store.dispatch({ type: 'CLEAN_STORE' })
    }
  }, [])

  async function onLoadBoard() {
    try {
      await loadBoards()
      await loadBoard(boardId)
      // const board = await boardService.get(boardId)
      // setBoard(board)
      showSuccessMsg('Groups loaded')
    } catch (err) {
      showErrorMsg('Cannot load boards')
    }
  }

  if (!board) return <Loader />
  return (
    <section
      className="group-index-section" style={board?.style?.backgroundImg && { background: `url(${board.style.backgroundImg}) center center / cover` } || board?.style?.bgColor && { background: board.style.bgColor }}>
      {/* {!board ? <Loader /> : <BoardDetails board={board} />} */}
      <BoardDetails board={board} />
    </section>
  )
}
