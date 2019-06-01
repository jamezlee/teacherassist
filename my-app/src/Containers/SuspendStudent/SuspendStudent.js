import React, { Component, Fragment } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import axios from '../../axios-config/axios-config';



class SuspendStudent extends Component {
    state = {
        student: "",
        students: [],
        comfirmation:"",
    }
    componentDidMount() {
        axios.get('/viewallstd/all')
            .then(response => {
                this.setState({ students: response.data });
                //console.log(response.data);
                
        });
      
    }
    handleChange = (stateName, event) => {
        console.log(event.target);
        this.setState({ [stateName]: event.target.value });

    };

    handleSubmit = () => {
        console.log("handleSubmit form")
        var data = {
            student: this.state.student
        }
        axios.post('/api/suspend', data
        ).then(response => {
            console.log(response);
            if(response.status == 204){
                this.setState({comfirmation:"suspended"})
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
                        <InputLabel htmlFor="age-native-helper">Select a student to suspend</InputLabel>
                        <Select
                            native
                            multiple={false}
                            value={this.state.student}
                            onChange={(e) => this.handleChange("student", e)}
                            inputProps={{
                                name: 'select-user',
                                id: 'select-user',
                            }}
                        >
                            <option value="" />
                            {this.state.students.map(name => (
                                <option key={name.student} value={name.student}>{name.student}</option>
                            ))}
                            </Select>

                    </FormControl>

                </div>
                <div className="row mt-3">
                <div className="col-md-4 p-0">
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

export default SuspendStudent
