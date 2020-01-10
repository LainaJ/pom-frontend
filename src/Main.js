import React from 'react';
import ViewList from './ViewList'
import './index.css';
import Login from './Login'
import CreateUserForm from './CreateUserForm';
import { update } from 'lodash-es';
// import ReactDOM from 'react-dom';
// import Demo from './Demo'

class Main extends React.Component {

    state = {
        allTasks: [],
        showLogin: true,
        newFormOpen: false,
        newUserFormOpen: false, 
        currentUser: null, 
        allUsers: [], 
        userTasks: [], 
        sortedbyDate: [] 
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/tasks')
        .then(resp => resp.json())
        .then(taskData => this.setState({
            allTasks: taskData
        })
        )
        fetch('http://localhost:3000/api/v1/users')
        .then(resp => resp.json())
        .then(userData => this.setState({
            allUsers: userData})
        )
        }

    login = (enteredName) => {
        let registeredUser = this.state.allUsers.find(user => user.username === enteredName.username)
        return registeredUser?
            this.setState({
                currentUser: registeredUser
            }): alert("You must first create an account.")
        }

    showTaskForm = () => {
        this.setState({
            newFormOpen: !this.state.newFormOpen
        })
    }

    addNewTask = (newTaskObject) => {
        let newTasks = [...this.state.allTasks, newTaskObject]
        this.setState({
          allTasks: newTasks    
        })
      }

    showCreateUserForm = () => {
        this.setState({
            newUserFormOpen: !this.state.newUserFormOpen
        })
    }

    deleteTask = (taskObject) => {
        console.log(taskObject.id)
        let updatedTasks = this.state.allTasks.filter(task => task.id !== taskObject.id )
        this.setState({
            allTasks: updatedTasks
        })
    }

    // filterUserTasks = () => {
    //     console.log("here")
    //     if (this.state.currentUser) {
    //         let onlyUserTasks = this.state.allTasks.filter(task => task.user_id === this.state.currentUser.id)
    //         console.log(onlyUserTasks)
    //         this.setState({
    //             userTasks: onlyUserTasks
    //         })
    //         }
    //         else {
    //             console.log("wth")
    //         }
    //     }

    sortByDate = () => {
        let sortTasks = this.state.allTasks.sort((a, b) => (a.importance > b.importance)? 1 : -1)
        let sortUrgent = sortTasks.sort((a, b) => (a.urgency > b.urgency)? 1 : -1)
        this.setState({
            sortedbyDate: sortUrgent
        })
    }

    render() {
        return (
            <div className="demo8-outer">
            {!this.state.currentUser && !this.state.newUserFormOpen?
             <Login 
                login={this.login}
                showCreateUserForm={this.showCreateUserForm}
                newUserFormOpen={this.state.newUserFormOpen}
                />:null }
            {this.state.newUserFormOpen?
            <CreateUserForm
            />:null}
    
             <ViewList 
             allTasks={this.state.allTasks}
             showTaskForm ={this.showTaskForm}
             newFormOpen={this.state.newFormOpen}
             addNewTask={this.addNewTask}
             currentUser={this.state.currentUser}
             userTasks={this.state.userTasks}
             sortByDate={this.sortByDate}
             sortedByDate={this.state.sortedByDate}
             deleteTask={this.deleteTask}
             />
            </div>
        )
    }
}


export default Main;
