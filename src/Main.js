import React from 'react';
import ViewList from './ViewList'
import './index.css';
import Login from './Login'
import CreateUserForm from './CreateUserForm';
import Pomodoro from './Pomodoro'
// import { update } from 'lodash-es';
// import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';

class Main extends React.Component {

    state = {
        allTasks: [],
        showLogin: true,
        newFormOpen: false,
        newUserFormOpen: false, 
        currentUser: null, 
        allUsers: [], 
        userTasks: [], 
        prioritizedTasks: [], 
        usersPrioritizedTasks: [],
        haveSavedPrioritized: false

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

    renderRegister = (routerProps) => {
        return <CreateUserForm
        routerProps={routerProps} 
        />
    }

    renderLogin = (routerProps) => {
        return <Login 
        routerProps={routerProps} 
        login={this.login} 
        showCreateUserForm={this.showCreateUserForm}
        newUserFormOpen={this.state.newUserFormOpen}
        filterUserTasks={this.filterUserTasks}
        />
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
        let updatedTasks = this.state.allTasks.filter(task => task.id !== taskObject.id )
        this.setState({
            allTasks: updatedTasks
        })
    }

    prioritize = () => {
        let sortTasks = this.state.allTasks.sort((a, b) => (a.importance > b.importance)? 1 : -1)
        let sortUrgent = sortTasks.sort((a, b) => (a.urgency > b.urgency)? 1 : -1)
        this.setState({
            prioritizedTasks: sortUrgent
        })
    }

    //persists prioritizedTasks 
    // what if I filter User tasks, sort it again, and set that equal to prioritized tasks - mutating it? 

    savePrioritized = () => {
        if (this.state.prioritizedTasks !== [] && this.state.currentUser !== null) {
            let onlyUserTasks = this.state.allTasks.filter(task => task.user_id === this.state.currentUser.id)
            let firstSortedUserTasks = onlyUserTasks.sort((a, b) => (a.importance > b.importance)? 1 : -1)
            let sortAllUser = firstSortedUserTasks.sort((a, b) => (a.urgency > b.urgency)? 1 : -1)
            console.log(sortAllUser)
            console.log(this.state.allTasks)
        this.setState({
            usersPrioritizedTasks: sortAllUser
        })
     }
    }

    viewSavedPrioritized = () => {
       let savedPrioritized = this.state.usersPrioritizedTasks.map (task => task.priority_order = this.state.usersPrioritizedTasks.indexOf(task) + 1)
        this.setState({
            haveSavedPrioritized: true
        })
    }


    persistOrdered = (task) => {
        console.log(task.priority_order)
  
        fetch(`http://localhost:3000/api/v1/tasks/${task.id}`, { 
        method: 'PATCH', 
        headers: {
          'content-type':'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          priority_order: task.priority_order
        })
        })      
      .then(response => response.json())
      .then(updatedTasks => console.log(updatedTasks))

      }
  

    // filterUserTasks = () => {
    //     console.log("it got to the filterUserTasks function in Main")
    //     console.log()
    //     if (this.state.currentUser !== null) {
    //         let onlyUserTasks = this.state.allTasks.filter(task => task.user_id === this.state.currentUser.id)
    //         console.log(onlyUserTasks)
    //         this.setState({
    //             userTasks: onlyUserTasks
    //         })
    //         }
    //         else {
    //             console.log("it doesn't have currentUser at this point")
    //         }
    //     }

    render() {
        return (
            <div className="demo8-outer">
            {this.state.haveSavedPrioritized? this.state.usersPrioritizedTasks.map(task => this.persistOrdered(task)):null}
            <Switch />
            {!this.state.currentUser 
            // && !this.state.newUserFormOpen
            ?
            <Route path="/login" render={this.renderLogin} />:null}
            
            {/* render={() => 
                // <Login 
                    // routerProps={routerProps}
                    // login={this.login}
                    // showCreateUserForm={this.showCreateUserForm}
                    // newUserFormOpen={this.state.newUserFormOpen}
                    // />}/>:null }
            {this.state.newUserFormOpen? */}
            <Route path="/register" render={this.renderRegister}/>


            {/* <Route path="/register" render={() => 
                <CreateUserForm
                />}/> */}
                {/* :null} */}
            {this.state.currentUser?
            <Route path="/list" render={() => 
                <ViewList 
                key={ViewList.id}
                allTasks={this.state.allTasks}
                showTaskForm ={this.showTaskForm}
                newFormOpen={this.state.newFormOpen}
                addNewTask={this.addNewTask}
                currentUser={this.state.currentUser}
                userTasks={this.state.userTasks}
                prioritize={this.prioritize}
                prioritizedTasks={this.state.prioritizedTasks}
                deleteTask={this.deleteTask}
                savePrioritized={this.savePrioritized}
                usersPrioritizedTasks={this.state.usersPrioritizedTasks}
                viewSavedPrioritized={this.viewSavedPrioritized}
                />}/>:null}
                {/* else render login component?  */}
            <Route path="/pomodoro" render={() => 
                <Pomodoro
                defaultBreakLength='5' 
                defaultSessionLength='25'
                />}/>
             <Switch />
            </div>
        )
    }
}


export default Main;
