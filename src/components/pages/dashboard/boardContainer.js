import React from "react";
import BoardCard from "./boardCard";
import { Draggable } from "react-beautiful-dnd";

const BoardContainer = ({ label, tasks }) => {
  return (
    <div className="rounded-lg p-4 flex flex-col bg-primary/10 border border-primary/20 min-w-[270px] transition-all duration-300 ease-in-out min-h-screen">
      <h1 className="lexend-deca-font text-lightBlack w-full mb-2">{label}</h1>

      <div className="flex flex-col gap-2 overflow-visible">
        {tasks.length === 0 ? (
          <div className="text-gray text-sm">No tasks available</div>
        ) : (
          tasks.map((task, index) => (
            <Draggable key={task._id} draggableId={task._id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <BoardCard task={task} />
                </div>
              )}
            </Draggable>
          ))
        )}
      </div>
    </div>
  );
};

export default BoardContainer;
