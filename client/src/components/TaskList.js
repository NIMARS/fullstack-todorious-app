// TaskList.js
import React from "react";
import Task from "../components/Task";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


const TaskList = ({ tasks, onToggle, onDelete, onEdit, onEditPriority, onDragEnd }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="tasks">
      {(provided) => (
        <ul {...provided.droppableProps} ref={provided.innerRef}>
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
              {(provided) => (
                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <Task
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onEditPriority={onEditPriority}
                  />
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  </DragDropContext>
);


export default TaskList;
