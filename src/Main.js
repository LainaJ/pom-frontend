import React from 'react';
import ViewList from './ViewList'
import './index.css';
import Login from './Login'
import CreateUserForm from './CreateUserForm';
// import ReactDOM from 'react-dom';
// import Demo from './Demo'

class Main extends React.Component {

    state = {
        allTasks: [],
        showLogin: true,
        newFormOpen: false,
        newUserFormOpen: false, 
        currentUser: null, 
        allUsers: []
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
            allUsers: userData
        })
        )
        }


    login = (username) => {
        // console.log(username)
        // console.log(this.state.allUsers)
        let registeredUser = this.state.allUsers.find(username)
        console.log(registeredUser)
            this.setState({
                currentUser: username
            })
        //     "Sorry, you must register first."
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

        //       addNewUser = (newUserObject) => {null
        // //add front end user logic later? as above?
            
        //       }

    showCreateUserForm = () => {
        console.log("got here")
        this.setState({
            newUserFormOpen: !this.state.newUserFormOpen
        })
    }

    render() {
        return (
            <div className="demo8-outer">
            {!this.state.currentUser?
             <Login 
                login={this.login}
                showCreateUserForm={this.showCreateUserForm}
                newUserFormOpen={this.state.newUserFormOpen}
                />:null }
            <CreateUserForm/>
             <ViewList 
             allTasks={this.state.allTasks}
             showTaskForm ={this.showTaskForm}
             newFormOpen={this.state.newFormOpen}
             addNewTask={this.addNewTask}
             currentUser={this.state.currentUser}
             />
            </div>
        )
    }

}


export default Main;
