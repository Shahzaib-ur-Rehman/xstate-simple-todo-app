
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.Todos Machine.Creating New Todo.Saving Todos:invocation[0]": { type: "done.invoke.Todos Machine.Creating New Todo.Saving Todos:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.Todos Machine.Deleting Todo:invocation[0]": { type: "done.invoke.Todos Machine.Deleting Todo:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.Todos Machine.Loading Todos:invocation[0]": { type: "done.invoke.Todos Machine.Loading Todos:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.Todos Machine.Creating New Todo.Saving Todos:invocation[0]": { type: "error.platform.Todos Machine.Creating New Todo.Saving Todos:invocation[0]"; data: unknown };
"error.platform.Todos Machine.Deleting Todo:invocation[0]": { type: "error.platform.Todos Machine.Deleting Todo:invocation[0]"; data: unknown };
"error.platform.Todos Machine.Loading Todos:invocation[0]": { type: "error.platform.Todos Machine.Loading Todos:invocation[0]"; data: unknown };
"xstate.after(0)#Todos Machine.Deleting Todo Error": { type: "xstate.after(0)#Todos Machine.Deleting Todo Error" };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "deleteTodo": "done.invoke.Todos Machine.Deleting Todo:invocation[0]";
"loadTodos": "done.invoke.Todos Machine.Loading Todos:invocation[0]";
"saveTodo": "done.invoke.Todos Machine.Creating New Todo.Saving Todos:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "deleteTodo" | "loadTodos" | "saveTodo";
        };
        eventsCausingActions: {
          "assignErrorToContext": "error.platform.Todos Machine.Creating New Todo.Saving Todos:invocation[0]" | "error.platform.Todos Machine.Deleting Todo:invocation[0]" | "error.platform.Todos Machine.Loading Todos:invocation[0]";
"assignFormInputToContext": "Form Input Changed";
"assignTodosTContext": "done.invoke.Todos Machine.Loading Todos:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "Has Todos": "done.invoke.Todos Machine.Loading Todos:invocation[0]";
        };
        eventsCausingServices: {
          "deleteTodo": "Delete";
"loadTodos": "done.invoke.Todos Machine.Creating New Todo.Saving Todos:invocation[0]" | "done.invoke.Todos Machine.Deleting Todo:invocation[0]" | "xstate.init";
"saveTodo": "Submit";
        };
        matchesStates: "Creating New Todo" | "Creating New Todo.Saving Todos" | "Creating New Todo.Showing Form Input" | "Deleting Todo" | "Deleting Todo Error" | "Loading Todos" | "Loading Todos Error" | "Todos Loaded" | { "Creating New Todo"?: "Saving Todos" | "Showing Form Input"; };
        tags: never;
      }
  