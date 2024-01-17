// import { useAppSelector } from "@/redux/hook";
import { useState } from "react";
import AddTodoModal from "./AddTodoModal";
import TodoCard, { TTodoCardProps } from "./TodoCard";
import TodoFilter from "./TodoFilter";
import { useGetTodosQuery } from "@/redux/api/api";

const TodoContainer = () => {
  const [priority, setPriority] = useState("");

  //! from local state
  // const { todos } = useAppSelector((state) => state.todos);

  // from server
  const { data: todos, isLoading, isError } = useGetTodosQuery(priority);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-5">
      <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px]">
        <div className="flex justify-between p-2 bg-white rounded-lg">
          <AddTodoModal />
          <div className="text-lg p-2 rounded-md font-semibold bg-gradient-to-r from-[#DC02C3] to-[#5C53FE] bg-clip-text text-transparent">
            You have <span className="font-bold">{todos?.data?.length}</span>{" "}
            {priority.toLowerCase()}{" "}
            <span>{todos?.data?.length > 1 ? "tasks" : "task"}</span> pending
          </div>
          <TodoFilter priority={setPriority} setPriority={setPriority} />
        </div>
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px]">
        <div className="bg-white p-5 w-full h-full rounded-lg space-y-3">
          {todos?.data?.length > 0 ? (
            todos?.data?.map((item: TTodoCardProps) => (
              <TodoCard key={item?._id} {...item} />
            ))
          ) : (
            <div className="bg-white p-5 text-2xl font-bold flex justify-center items-center rounded-md">
              <p>There is no task pending</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
