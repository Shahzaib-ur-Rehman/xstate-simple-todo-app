import { createMachine, assign } from "xstate";





export const todosMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FWwAQFkCGAxgBYCWAdmAHQAyqeE5UWaGsAxBhZeQG6oDWVFplyFSXWvUbN0mBL1QE8AFxKoyAbQAMAXW07EoAA6YSq9YZAAPRAFoAjPYDMWygE4nAJk8AWAOw+ABw+Tm6BADQgAJ52jgBslJ7OAKyebo5ecXFOAL45kcLY+MTkQrLYkhCQbADCAE5gKmBYAHJgAO76liawZmpkljYItm5anpRxWh4+9n72WvF+kTEIafaUfm5uQW5xW3HJfnF+eQXloiVchViV1QAiYAA2YMpgXUggPX0WH0MOWn4nJR-M5PH5PMFkk5UstEGk-MCsvYQvYwdsfNlTiBrsVxFR6o1VGQmG12jIMJQAMpEVDtaQAMVQdQAtlgAJJkIwAV2UbEZLPZnJ5WBqRDwxMg72MpnMA1+diCCXSyLSY2Cni0EWicOCwK0cU8Bz8yTcfk1cSxOLEpUoBJU0lJ5NQVJpdOJWH5rI53N5lK5ACNmWYpZ8Zf1BnYTUrklofOlUurNbCEMjKPMPKNjabNckLflsedcTa7USSR0nVS8DxpIUOOoqApBJQrZd8Q17e7HcJK9X3YV5GQ+EpZfoQ19ZRHhslUe4fFCjmlgvZAvZk7ZvAlgk5AT5fGN0j5LYXrVwSw7y93KVWa+U2GA6nUmZQjI8VAAzJnM5vH1u29ul1oL1kHsb1YAch3tdRR10bowx+UA-k8bdKGnXMYwOZE5x8ZNkUCSgnAIrwnDnOJ5h8WMj1YC48UoB5ngA4Q6y4RsyioosuDol5QNQcDFEgzRdDHOC5QQuxAnBSgximXYpm3ZJkx8EIJkCaFAi2aEXDBSiRHYqhOIY2Q7wfJ8X3fT9vzYk89KeLi+1kXjh36aCDA+cdw3lYZHGSZI9S0Jx7FGAKY22ZNkhUtNkkUkIxj2JJtKKKzaJsgyMCwABRYy6jYKxYGUJpKDwN9XjqAAKTwYy0ABKNgWxo-TuPSzKhN6CcPNsM0fKk-ZZONBSZgmXNDUOE0zUCPMzks396rs1KMsfLLKSMMBICwABVIxmu+ETrDsAJXH1PYjihKLgmTLJXFmOZSLjTNDXi6ibUqbj2Hvebn1fZQPxZCydMSp6ZrkBRHKgwSYNc4TJwcacEj8pwV12bzkX1NdwvsLJzpImZl0CPJ8zIdA4EsWrSlglr3NEzzcx8SSCPhg5p3IuI12IvCAq0KY0dBLJcnzYmJDoBgAfgcGyfgnbPPmPD0eyJJEcZtdDVcPZ2fSUjMkxXmfxo65bggUmtsh1E0YmdGvHsOXke1BAEV2Uiwrh44CL2caC0mmj-qYa45qZfXWophw4YRaWzYtpmrbCDZQhNMKxsBbd7t0v9CXPMlhF98nxdsOIxrTPwOvIiFdyTK2HCU6WAmRMIgkOBPErPTsgIpalaQZT9BR9dOxb+bJWbzrRIrVIutRWAI01kzMRpzF2+bbZOG9T4Cr17T3yk77bEOnCY3HnA0q+XAE11zNNpbU5EY2Rc3a6m5LuLXw2AQSLGDXTOSFOXdwCJNbcbq2bYr7qm+ANGrzTvm1DweEWZIUUnnTYYcVgHDwm4MEaMDjlQwnmPIQA */

    id: "Todos Machine",
    initial: "Loading Todos",
    schema: {
        // events: {} as { type: "Todos Loaded", todos: string[] } | { type: "Loading Todos Failed", errorMessage: string }
        services: {} as {
            'loadTodos': {
                data: string[]
            },
            saveTodo :{
                data:void
            },
            deleteTodo:{
                data:void
            }
        },
        events: {} as
            | {
                type: "Create New"
            }
            | {
                type: "Form Input Changed",
                value: string
            }
            | {
                type: "Submit"
            }
            |{
                type:"Delete",
                todo:string
            }
            |{
                type:"Speed Up"
            }
    },
    tsTypes: {} as import("./todosMachine.typegen").Typegen0,
    context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
        createNewTodoFormInput: ''
    },
    states: {
        "Loading Todos": {
            invoke: {
                src: "loadTodos",

                onDone: {
                    target: "Todos Loaded",
                    actions: "assignTodosTContext",
                    cond: "Has Todos"
                },

                onError: {
                    target: "Loading Todos Error",
                    actions: "assignErrorToContext"
                }
            }
        },

        "Todos Loaded": {
            on: {
                "Create New": "Creating New Todo",
                Delete: "Deleting Todo"
            }
        },

        "Loading Todos Error": {},

        "Creating New Todo": {
            states: {
                "Showing Form Input": {
                    on: {
                        "Form Input Changed": {
                            target: "Showing Form Input",
                            internal: true,
                            actions: "assignFormInputToContext"
                        },

                        Submit: {
                            target:"Saving Todos"
                        }
                    }
                },

                "Saving Todos": {
                    invoke: {
                        src: "saveTodo",
                        onDone: "#Todos Machine.Loading Todos",
                        onError: {
                            target:"Showing Form Input",
                            actions:"assignErrorToContext"
                        }
                    }
                }
            },

            initial: "Showing Form Input"
        },

        "Deleting Todo": {
            invoke:{
                src:"deleteTodo",
                onError: {
                    target:"Deleting Todo Error",
                    actions:"assignErrorToContext"
                },
                onDone: "Loading Todos"
            }
        },

        "Deleting Todo Error": {
            after: {
                "": "Todos Loaded"
            },

            on: {
                "Speed Up": "Todos Loaded"
            }
        }
    },

}, {
    guards:{
        "Has Todos" :(context,event) =>{
            return event.data.length >0
        }
    },
    actions: {
        assignTodosTContext: assign((context, event) => {
            return {
                todos: event.data
            }
        }),
        assignErrorToContext: assign((context, event) => {
            return {
                errorMessage: (event.data as Error).message
            }
        }),
        assignFormInputToContext: assign((context, event) => {
            return {
                createNewTodoFormInput: event.value
            }
        })
    }
}
)