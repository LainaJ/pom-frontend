import React from 'react';
import ViewList from './ViewList'
import './index.css';
import Login from './Login'
import CreateUserForm from './CreateUserForm';
import Pomodoro from './Pomodoro'
import Welcome from './Welcome'
// import { update } from 'lodash-es';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
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
    usersPrioritizedTasks: [],
    havePrioritized: false,
    haveSavedPrioritized: false,
    wip: [],
    complete: []
  };

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/tasks")
      .then(resp => resp.json())
      .then(taskData =>
        this.setState({
          allTasks: taskData
          //   ,
          //   complete: taskData.filter(task => task.category === "complete")
        })
      );
    fetch("http://localhost:3000/api/v1/users")
      .then(resp => resp.json())
      .then(userData =>
        this.setState({
          allUsers: userData
        })
      );
  }

  renderRegister = routerProps => {
    return <CreateUserForm routerProps={routerProps} />;
  };

  renderLogin = routerProps => {
    return (
      <Login
        routerProps={routerProps}
        login={this.login}
        showCreateUserForm={this.showCreateUserForm}
        newUserFormOpen={this.state.newUserFormOpen}
        filterUserTasks={this.filterUserTasks}
      />
    );
  };

  login = enteredName => {
    let registeredUser = this.state.allUsers.find(
      user => user.username === enteredName.username
    );
    return registeredUser
      ? this.setState({
          currentUser: registeredUser,
          userTasks: this.state.allTasks.filter(task => task.user_id === registeredUser.id )
        })
      : alert("You must first create an account.");
  };

  renderWelcome = (routerProps) => {
    return (
      <Welcome
        key={Welcome.id}
        currentUser={this.state.currentUser}
        userTasks={this.state.userTasks}
        routerProps={routerProps}
        // prioritize={this.prioritize}
        // deleteTask={this.deleteTask}
        usersPrioritizedTasks={this.state.usersPrioritizedTasks}
        // viewSavedPrioritized={this.viewSavedPrioritized}
        // updateStateFromDrop={this.updateStateFromDrop}
        // editCompleted={this.editCompleted}
        wip={this.state.wip}
        complete={this.state.complete}
      />
    );
  };

  showTaskForm = () => {
    this.setState({
      newFormOpen: !this.state.newFormOpen
    });
  };

  //the third line of this is sometimes the difference between bugginess//look into otherwise
  addNewTask = newTaskObject => {
    let newTasks = [...this.state.allTasks, newTaskObject]
    this.setState({
      allTasks: newTasks,
      userTasks: [...this.state.userTasks, newTaskObject],
      usersPrioritizedTasks: [...this.state.usersPrioritizedTasks, newTaskObject
      ]
    });
  };

  showCreateUserForm = () => {
    this.setState({
      newUserFormOpen: !this.state.newUserFormOpen
    });
  };

  deleteTask = taskObject => {
    let updatedTasks = this.state.allTasks.filter(
      task => task.id !== taskObject.id
    )
    let updatedPTasks = this.state.usersPrioritizedTasks.filter(
      task => task.id !== taskObject.id
    )
    let updatedUserTasks = this.state.userTasks.filter(
        task => task.id !== taskObject.id
      )
    this.setState({
      allTasks: updatedTasks,
      usersPrioritizedTasks: updatedPTasks,
      userTasks: updatedUserTasks
    })
  };

  prioritize = () => {
    if (this.state.currentUser !== null) {
      let firstSortedUserTasks = this.state.userTasks.sort((a, b) =>
        a.importance > b.importance ? 1 : -1
      );
      let sortAllUser = firstSortedUserTasks.sort((a, b) =>
        a.urgency > b.urgency ? 1 : -1
      );
      this.setState({
        usersPrioritizedTasks: sortAllUser, 
        havePrioritized: !this.state.havePrioritized
      });
    }
  };

  viewSavedPrioritized = () => {
    this.state.usersPrioritizedTasks.map(
      task =>
        (task.priority_order =
          this.state.usersPrioritizedTasks.indexOf(task) + 1)
    );
    this.setState({
      haveSavedPrioritized: true
    });
  };

  editCompleted = () => {
    let userTasks = this.state.usersPrioritizedTasks.filter(
      task => task.user_id === this.state.currentUser.id
    );
    let wip = userTasks.filter(task => task.category === "wip");
    let complete = userTasks.filter(task => task.category === "complete");
    this.setState({
      wip: wip,
      complete: complete
    });
  };

  persistOrdered = task => {
    fetch(`http://localhost:3000/api/v1/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        priority_order: task.priority_order
      })
    }).then(response => response.json());
    //   .then(updatedTasks => console.log("here's what persisted:", updatedTasks))
  };

  updateStateFromDrop = tasks => {
    console.log(tasks);
    let wip = tasks.filter(task => task.category === "wip");
    let complete = tasks.filter(task => task.category === "complete");
    this.setState({
      wip: wip,
      complete: complete
    });
  };

  render() {
    console.log(this.state.userTasks)
    console.log("wip:", this.state.wip);
    console.log("complete:", this.state.complete);
    return (
      <div className="demo8-outer">
        {/* <div className="persist-saved-tasks">             */}
        {this.state.haveSavedPrioritized
          ? this.state.usersPrioritizedTasks.map(task =>
              this.persistOrdered(task)
            )
          : null}
        {/* </div> */}
        <Switch />
        {!this.state.currentUser ? (
          <Route path="/login" render={this.renderLogin} />
        ) : null}
        <Route path="/register" render={this.renderRegister} />
        {this.state.currentUser ? (
          <Route
            path="/list"
            render={() => (
              <ViewList
                key={ViewList.id}
                allTasks={this.state.allTasks}
                showTaskForm={this.showTaskForm}
                newFormOpen={this.state.newFormOpen}
                addNewTask={this.addNewTask}
                currentUser={this.state.currentUser}
                userTasks={this.state.userTasks}
                prioritize={this.prioritize}
                deleteTask={this.deleteTask}
                usersPrioritizedTasks={this.state.usersPrioritizedTasks}
                viewSavedPrioritized={this.viewSavedPrioritized}
                updateStateFromDrop={this.updateStateFromDrop}
                editCompleted={this.editCompleted}
                wip={this.state.wip}
                complete={this.state.complete}
                havePrioritized={this.state.havePrioritized}
              />
            )}
          />
        ) : null}
        <Route path="/welcome" render={this.renderWelcome} />
        <Route path="/pomodoro"
          render={() => (
            <Pomodoro defaultBreakLength="5" defaultSessionLength="25" />
          )}
        />
        <Switch />
      </div>
    );
  }
}


export default Main;
