import React, { Component, Fragment } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import axios from '../../axios-config/axios-config';



class SendNotification extends Component {
    state = {
        teacher: "",
        teachers: [],
        message: "",
        comfirmation:"",
        students:[],
        commonstdsend:''
    }
    componentDidMount() {

        axios.get('/viewallteacher/all')
                .then(response => {
                    this.setState({ teachers: response.data });
                    console.log(response.data);
                    // this.setState({
                    //     ingredients:response.data
                    // });
                });
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
        console.log(this.state.message)
        var data = {
            teacher: this.state.teacher,
            notification:this.state.message
        }
        axios.post('/api/retrievefornotifications', data
        ).then(response => {
            console.log(response);
            if(response.status == 200){
                this.setState({
                    comfirmation:"send !!!",
                    commonstdsend:response.data
            })
            }
        })
        .catch(error => {
            this.setState({comfirmation:"fail!!"})
            console.log(error)
        });




    }

    render() {
        return (
            <Fragment>
                <div className="row">
                    <FormControl className="col-md-4">
                        <InputLabel htmlFor="age-native-helper">Select a Creater</InputLabel>
                        <Select
                            native
                            multiple={false}
                            value={this.state.teacher}
                            onChange={(e) => this.handleChange("teacher", e)}
                            inputProps={{
                                name: 'select-user',
                                id: 'select-user',
                            }}
                        >
                            <option value="" />
                            {this.state.teachers.map(name => (
                                <option key={name.teacher} value={name.teacher}>{name.teacher}</option>
                            ))}
                            </Select>

                    </FormControl>

                </div>
                <div className="row">
                <div className="col-md-6 p-0">

                <div class="form-group">
                <label for="comment">message:</label>
                <textarea class="form-control" rows="5" id="comment" onChange={(e) => this.handleChange("message", e)} value={this.state.message}></textarea>
                </div>
                <h5>below all the student you can send</h5>
                {this.state.students.map(name => (
                                <p key={name.student} value={name.student} className="mb-0">{name.student}</p>
                ))}
                <small className="mt-3">please add @ behind the student email</small>
                </div>
                </div>
                <div className="row mt-3">
                <div className="col-md-4 p-0">
                                {this.state.comfirmation}
                                <p>{this.state.commonstdsend}</p>
                </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-4 p-0">
                        <button onClick={this.handleSubmit} className="btn btn-primary">Send</button>

                    </div>
                </div>
            </Fragment>
        )

    }
}

export default SendNotification
