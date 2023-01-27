//? Icon
import { AiOutlineEye } from 'react-icons/ai'
import { BsCheck2Square } from 'react-icons/bs'
import { GrTextAlignFull } from 'react-icons/gr'
import { FaRegComment } from 'react-icons/fa'
//? Services
import { taskService } from '../../../../../services/board/task.service'

export function SetInfos({ task }) {
  //   console.log('Taskousssyyyy', task)

  function SetFollow() {
    if (!task.priority || task.priority !== 'high')
      return <article className="task-preview-infos-no-follow"></article>
    return (
      <article
        className="task-preview-infos-follow"
        title="You are receiving notifications for updates on this card"
      >
        <AiOutlineEye />
      </article>
    )
  }

  function SetTodos() {
    if (!task.checklists || !task.checklists.length)
      return <article className="task-preview-infos-no-todo"></article>
    return (
      <article className="task-preview-infos-todo" title="Element of checklist">
        <BsCheck2Square />
        <span>
          {taskService.countIsDone(task)}/{taskService.countTodos(task)}
        </span>
      </article>
    )
  }

  function SetDescription() {
    if (!task.description)
      return <article className="task-preview-infos-no-description"></article>
    return (
      <article
        className="task-preview-infos-description"
        title="This card contain a description."
      >
        {task.description && <GrTextAlignFull />}
      </article>
    )
  }

  function SetComments() {
    if (!task.comments || !task.comments.length)
      return <article className="task-preview-infos-no-comment"></article>
    return (
      <article className="task-preview-infos-comment" title="Comments">
        <FaRegComment />
        <span>{task.comments.length}</span>
      </article>
    )
  }

  return (
    <article className="task-preview-infos">
      <SetFollow />
      <SetTodos />
      {task?.description && <SetDescription />}
      <SetComments />
    </article>
  )
}
