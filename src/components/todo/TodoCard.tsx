// import { useAppDispatch } from "@/redux/hook";
import { Button } from "../ui/button";
// import { removeTodo, toggleComplete } from "@/redux/features/todoSlice";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "@/redux/api/api";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import EditTodoModal from "./EditTodoModal";

export type TTodoCardProps = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  isCompleted?: boolean;
};

const TodoCard = ({
  title,
  description,
  _id,
  priority,
  isCompleted,
}: TTodoCardProps) => {
  // const dispatch = useAppDispatch();

  const [updateTodo, { data, isLoading, isError, isSuccess }] =
    useUpdateTodoMutation();

  const [deleteTodo] = useDeleteTodoMutation();

  const toggleState = () => {
    const options = {
      id: _id,
      data: {
        title,
        description,
        priority,
        isCompleted: !isCompleted,
      },
    };
    updateTodo(options);
    // dispatch(toggleComplete(id));
  };

  const handleDeleteTodo = (taskId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTodo(taskId);
        Swal.fire({
          title: "Deleted!",
          text: "Todo has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="bg-white rounded-md flex justify-between items-center p-3 border">
      <input
        defaultChecked={isCompleted}
        onChange={toggleState}
        type="checkbox"
        name="complete"
        id="complete"
      />
      <p className="font-semibold flex-1 ml-2">{title}</p>
      <div className="flex-1">
        {isCompleted ? (
          <p className="text-green-500">Done</p>
        ) : (
          <p className="text-red-500">Pending</p>
        )}
      </div>
      <div className="flex-1 flex items-center gap-2">
        <div
          className={`size-2 rounded-full ${
            priority === "high"
              ? "bg-red-500"
              : priority === "medium"
              ? "bg-yellow-500"
              : "bg-green-400"
          }`}
        ></div>{" "}
        <p>{priority}</p>
      </div>
      <p className="flex-[2]">{description}</p>
      <div className="space-x-5">
        <Button onClick={() => handleDeleteTodo(_id)} className="bg-red-500">
          <FaTrashAlt className="size-5" />
        </Button>
        <EditTodoModal taskId={_id} />
      </div>
    </div>
  );
};

export default TodoCard;
