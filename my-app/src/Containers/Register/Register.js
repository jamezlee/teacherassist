import React, { Component, Fragment } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import axios from '../../axios-config/axios-config';



class Register extends Component {
    state = {
        resigerOwner: "",
        assigner: [],
        selectedAssigner: "",
        assignee: [],
        assigneeid: [],
        assignees: [],
        comfirmation:''
    }
    componentDidMount() {
        if (this.props.location.state.selectedUser === "Teacher") {

            axios.get('/viewallteacher/all')
                .then(response => {
                    this.setState({ assigner: response.data });
                    console.log(response.data);
                    // this.setState({
                    //     ingredients:response.data
                    // });
                });
            axios.get('/viewallstd/all')
                .then(response => {
                    this.setState({ assignees: response.data });
                    console.log(response.data);
                    // this.setState({
                    //     ingredients:response.data
                    // });
                });


        }

    }
    handleChange = (stateName, event) => {
        console.log(event.target);


        if (stateName === 'assignee') {
            this.setState({
                [stateName]: event.target.value,
                assigneeid: event.target.value
            });
        } else {
            this.setState({ [stateName]: event.target.value });
        }
    };

    handleSubmit = () => {
        console.log("handleSubmit form")
        var data = {
            teacher: this.state.selectedAssigner,
            students: this.state.assigneeid
        }
        axios.post('/api/register/teacher', data
        ).then(response => {
            console.log(response);
            if(response.status == 204){
                this.setState({comfirmation:"response status-"+response.status+"student have assigned"})
            }
        })
            .catch(error => {
                // this.setState({loading:false});
                console.log(error)
            });

    }

    render() {
        return (
            <Fragment>
                <div className="row">
                    <FormControl className="col-md-4">

                        <InputLabel htmlFor="age-native-helper">Select Assigner</InputLabel>
                        <Select
                            native
                            multiple={false}
                            value={this.state.selectedAssigner}
                            onChange={(e) => this.handleChange("selectedAssigner", e)}
                            inputProps={{
                                name: 'select-user',
                                id: 'select-user',
                            }}
                        >
                            <option value="" />
                            {this.state.assigner.map(name => (
                                <option key={name.teacher} value={name.teacherid}>{name.teacher}</option>
                            ))}</Select>

                    </FormControl>

                </div>
                <div className="row">
                    <FormControl className="col-md-4">

                        <InputLabel htmlFor="select-multiple-checkbox">Select Assignee</InputLabel>

                        <Select
                            multiple
                            value={this.state.assignee}
                            onChange={(e) => this.handleChange("assignee", e)}
                            input={<Input id="select-multiple" />}
                        >
                            {this.state.assignees.map(name => (
                                <MenuItem key={name.student} value={name.studentid} >
                                    {name.student}
                                </MenuItem>
                            ))}

                        </Select>


                    </FormControl>
                   
                </div>
                <div className="row mt-3">
                    <div className="col-md-4">
                    {this.state.comfirmation}
                    </div>
                </div>  
                <div className="row mt-3">

                    <div className="col-md-4 p-0">
                        <button onClick={this.handleSubmit} className="btn btn-primary">Update</button>

                    </div>
                </div>

            </Fragment>
        )

    }
}

export default Register
