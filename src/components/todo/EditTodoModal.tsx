import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FaEdit } from "react-icons/fa";
import { useGetSingleTodoQuery, useUpdateTodoMutation } from "@/redux/api/api";
import Swal from "sweetalert2";

const EditTodoModal = ({ taskId }: { taskId: string }) => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const { data: todo } = useGetSingleTodoQuery(taskId);
  const [updateTodo] = useUpdateTodoMutation();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const options = {
      id: taskId,
      data: {
        title: todo?.task || task,
        description: todo?.description || description,
        priority: todo?.priority || priority,
        isCompleted: todo?.isCompleted,
      },
    };
    updateTodo(options);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Task updated successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#5C53FE]">
          <FaEdit className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Edit your tasks that you want to finish.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task" className="text-right">
                Task
              </Label>
              <Input
                onBlur={(e) => setTask(e.target.value)}
                id="task"
                className="col-span-3"
                defaultValue={todo?.title}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                onBlur={(e) => setDescription(e.target.value)}
                id="description"
                className="col-span-3"
                defaultValue={todo?.description}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Priority</Label>
              <Select
                defaultValue={todo?.priority}
                onValueChange={(value) => setPriority(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoModal;
