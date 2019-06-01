import React, { Component, Fragment } from 'react';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Route } from 'react-router-dom';
import Register from '../Register/Register';
class MainPage extends Component {

    state={
        selectUser:["Teacher"],
        selectedUser:""
    }
    handleChange =  (event) => {
        this.setState({selectedUser: event.target.value});
        this.props.history.push({
         pathname: '/register',
         state: { selectedUser: event.target.value }
         });
     };
    render(){
        return(
            <Fragment>
                <FormControl className="col-md-4">
                        <InputLabel htmlFor="age-native-helper">Select User</InputLabel>
                        <Select
                            native
                            value={this.state.selectedUser}
                            onChange={this.handleChange}
                            inputProps={{
                            name: 'select-user',
                            id: 'select-user',
                            }}
                        >
                        <option value="" />
                        {this.state.selectUser.map(name => (
                            <option key={name} value={name}>{name}</option>
                        ))}</Select>
                </FormControl>

                <Route path={this.props.match.path + '/register'} 
                 render={ () =>(<Register selectedUser={this.state.selectedUser} />)} />
            </Fragment>  
            )
    }
}

export default MainPage;
