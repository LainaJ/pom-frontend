import React from 'react';
import ViewList from './ViewList'
import './index.css';
import Login from './Login'
import CreateUserForm from './CreateUserForm';
import Pomodoro from './Pomodoro'
import Welcome from './Welcome'
import { render } from 'react-dom'
import { Route, Switch } from 'react-router-dom';
import 'typeface-roboto';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import ExampleControlSlot from './ExampleControlSlot'
import Navbar from "./Navbar";
// import {TransitionMotion, spring, presets} from 'react-motion';
// import clamp from 'lodash-es/clamp'
// import swap from 'lodash-move'
// import { useGesture } from 'react-use-gesture'
// import Button from '@material-ui/core/Button';

const localizer = momentLocalizer(moment)


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
    complete: [],
    scheduledTasks: [],
    taskToSchedule: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/tasks")
      .then(resp => resp.json())
      .then(taskData =>
        this.setState({
          allTasks: taskData
          //   ,
          //   complete: taskData.filter(task => task.category === "complete")
        })
      )
    fetch("http://localhost:3000/api/v1/users")
      .then(resp => resp.json())
      .then(userData =>
        this.setState({
          allUsers: userData
        })
      )
  }

  renderRegister = routerProps => {
    return <CreateUserForm routerProps={routerProps} />
  }

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
          userTasks: this.state.allTasks.filter(task => task.user_id === registeredUser.id)
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
        usersPrioritizedTasks={this.state.usersPrioritizedTasks}
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

  addNewTask = newTaskObject => {
    let newTasks = [...this.state.allTasks, newTaskObject]
    this.setState({
      allTasks: newTasks,
      userTasks: [...this.state.userTasks, newTaskObject],
      usersPrioritizedTasks: [...this.state.usersPrioritizedTasks, newTaskObject],
      newFormOpen: !this.state.newFormOpen
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
      let userTasksCopy = [...this.state.userTasks]
      let firstSortedUserTasks = userTasksCopy.sort((a, b) =>
        a.importance > b.importance ? 1 : -1
      )
      let sortAllUser = firstSortedUserTasks.sort((a, b) =>
        a.urgency > b.urgency ? 1 : -1
      )
      this.setState({
        usersPrioritizedTasks: sortAllUser, 
        havePrioritized: !this.state.havePrioritized
      })
    }
  };

  // viewSavedPrioritized = () => {
  //   this.state.usersPrioritizedTasks.map(
  //     task =>
  //       (task.priority_order =
  //         this.state.usersPrioritizedTasks.indexOf(task) + 1)
  //   )
  //   this.setState({
  //     haveSavedPrioritized: true
  //   })
  // };

  // editCompleted = () => {
  //   let userTasks = this.state.usersPrioritizedTasks.filter(
  //     task => task.user_id === this.state.currentUser.id
  //   );
  //   let wip = userTasks.filter(task => task.category === "wip");
  //   let complete = userTasks.filter(task => task.category === "complete");
  //   this.setState({
  //     wip: wip,
  //     complete: complete
  //   });
  // };

  renderViewList = (routerProps) => {
    return (
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
        // viewSavedPrioritized={this.viewSavedPrioritized}
        updateStateFromDrop={this.updateStateFromDrop}
        editCompleted={this.editCompleted}
        wip={this.state.wip}
        complete={this.state.complete}
        havePrioritized={this.state.havePrioritized}
        routerProps={routerProps}
      />
    );
  }

  renderPomodoro = (routerProps) => {
    return (
      <Pomodoro
        defaultBreakLength="5"
        defaultSessionLength="25"
        routerProps={routerProps}
        />
    );
  };

  renderCalendar = (routerProps) => {
    if (routerProps.history.location.state.detail) {
    let task = routerProps.history.location.state.detail
    console.log(task)

    return (
      <>
      <div id="control-slot">

        <ExampleControlSlot.Entry>  
          <p >
            Click and drag the mouse over a date/time range below.
            {/* Click an event to see more info. */}
          </p>
        </ExampleControlSlot.Entry>
        </div>
        <Calendar
          selectable
          localizer={localizer}
          events={this.state.userTasks}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, marginTop: 20, backgroundColor: 'white', borderRadius: '4px' }}
          defaultView={Views.WEEK}
          scrollToTime={new Date(1970, 1, 1, 6)}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={(e) => this.handleSelect(e, task)}
        />
      </>
    );

    }
    else {
       
    }


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
    let wip = tasks.filter(task => task.category === "wip");
    let complete = tasks.filter(task => task.category === "complete");
    this.setState({
      wip: wip,
      complete: complete
    });
  };

  handleSelect = ({ start, end }, task ) => {
    const title = task.description
    // window.prompt(`Please type Yes to confirm scheduling ${task.description}.`)
    console.log(task)
    if (title)
      this.setState({
        userTasks: [
          ...this.state.userTasks,
          {
            start,
            end,
            title: task.description,
          },
        ],
        scheduledTasks: [...this.state.scheduledTasks, task]
      })
  }


  render() {
    return (
      <div >
        {this.state.haveSavedPrioritized
          ? this.state.usersPrioritizedTasks.map(task =>
              this.persistOrdered(task)
            )
          : null}
        <Navbar currentUser={this.state.currentUser} />
        <Switch />
        {!this.state.currentUser ? (
          <Route path="/login" render={this.renderLogin} />
        ) : null}
        <Route path="/register" render={this.renderRegister} />
        {this.state.currentUser ? (
          <Route path="/list" render={this.renderViewList} />
        ) : null}
        <Route path="/welcome" render={this.renderWelcome} />
        <Route path="/pomodoro" render={this.renderPomodoro} />
        <Route path="/calendar" render={this.renderCalendar} />
        <Switch />
      </div>
    );
  }
}


export default Main;
