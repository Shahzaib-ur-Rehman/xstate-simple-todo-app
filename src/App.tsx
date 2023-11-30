import "./App.css";
import { useMachine } from "@xstate/react";
import { todosMachine } from "./machines/todosMachine";

const todos = new Set<string>(['todo']);
function App() {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        return Array.from(todos);
      },
      saveTodo: async (context, event) => {
        todos.add(context.createNewTodoFormInput);
      },
      deleteTodo:async (context,event) =>{
        todos.delete(event.todo)
      }
    },
  });
  return (
    <div className="App">
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
      <div>
        {
          state.matches("Todos Loaded") &&
          state.context.todos.map((todo)=>(
            <div key={todo} style={{
              display:"flex",
              alignItems:"center"
            }}>
              <p>{todo}</p>
              <button onClick={()=>{
                send({
                  type:"Delete",
                  todo:todo
                })
              }}>Delete</button>
            </div>
          ))
        }
      </div>
      <div>
        {state.matches("Todos Loaded") && (
          <button
            onClick={() => {
              send("Create New");
            }}
          >
            Create New
          </button>
        )}
        {
          state.matches("Deleting Todo Error") && (
            <>
            <p>SomeTing Went Wrong - {state.context.errorMessage}</p>
            <button 
            onClick={()=>{
              send({
                type:"Speed Up"
              })
            }}>Go Back To List</button>
            </>
          )
        }
        {state.matches("Creating New Todo.Showing Form Input") && (
         <form  onSubmit={e=>{
          e.preventDefault();
          send({
            type:"Submit"
          })
         }}>
           <input
            onChange={(e) => {
              send({
                type: "Form Input Changed",
                value: e.target.value,
              });
            }}
          />
         </form>
        )}
      </div>
    </div>
  );
}

export default App;
