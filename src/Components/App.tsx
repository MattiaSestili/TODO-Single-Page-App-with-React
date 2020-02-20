import * as React from "react";
import { TodoList } from "./TodoList";

export interface IAppProps {}

export default function App(props: IAppProps) {
  return <TodoList />;
}
