import axios from 'axios'
const baseURL =  "http://localhost:3000/todos"

export const courseService = {
    getAll(){
        return axios.get(baseURL)
},
    createTodo(newTodo){
        axios.post(baseURL,  {title: newTodo, 
        isFinished: false})
        return this.getAll()

    },
    deleteTodo(id){
        axios.delete(baseURL + "/" + id)
        return this.getAll()
    },

    updateTodo(id, data){
        axios.put(baseURL + "/" + id, data)
        return this.getAll()
    }
}