//? Libraries
import React from 'react'
import { Routes, Route, useLocation } from 'react-router'
//? Components
import { AppHeader } from './cmps/app/app-header'
import { UserDetails } from './pages/user/user-details'
import { BoardIndex } from './pages/board/board-index'
import { TaskDetails } from './cmps/board/group/task/task-details'
import { Home } from './pages/home'

//? Routes
import routes from './routes'

export function RootCmp() {
  const location = useLocation()
  const background = location.state && location.state.background
  return (
    <div className="main-layout app">
      <AppHeader />
      <main>
        <Routes location={background || location}>
          <Route element={<Home />} path="/" />
          <Route element={<BoardIndex />} path="/board/:boardId">
            <Route
              element={<TaskDetails />}
              path="/board/:boardId/group/:groupId/task/:taskId"
            />
          </Route>
          <Route element={<UserDetails />} path="/user" />
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={true}
              element={route.component}
              path={route.path}
            />
          ))}
        </Routes>
        {background && (
          <Routes>
            <Route
              path="/board/:boardId/group/:groupId/task/:taskId"
              element={<TaskDetails />}
            />
          </Routes>
        )}
      </main>
    </div>
  )
}
