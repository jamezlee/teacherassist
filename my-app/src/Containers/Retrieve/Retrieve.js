import React, { Component, Fragment } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import axios from '../../axios-config/axios-config';
import RetrieveStd from './RetrieveStd/RetrieveStd';


class Register extends Component {
    state = {
        teacher:[],
        selectedTeacher:"",
        commonstds:[],
        comfirmation:""
    }
    // componentDidUpdate(prevState){
    //     if (this.state.commonstds !== prevState.commonstds) {
    //         this.setState({commonstds:prevState.commonstds});
    //       }
    //     console.log(prevState.commonstds);
    // }
    componentDidMount() {
        axios.get('/viewallteacher/all')
            .then(response => {
                this.setState({ teacher: response.data });
                console.log(response.data);
                // this.setState({
                //     ingredients:response.data
                // });
            });
    }
    handleChange = (event) => {
        const queryString =event.target.value;
        this.setState({selectedTeacher:queryString})
        this.props.history.push({
         pathname: '/retrieve',
         search:'?' + queryString
        });

        axios.get('/api/commonstudents?teacher='+queryString)
        .then(response => {
            console.log(response);
            this.setState({ commonstds: response.data });
            if(response.status == 204){
                this.setState({comfirmation:"response status"+response.status})
            }
           // console.log(response.data);
            // this.setState({
            //     ingredients:response.data
            // });
        });
    };
    
    
    render() {
       
        // let showcommon = this.state.commonstds.map((object, i)=>(
        //         console.log(object)
        // )) 
        
        
        
        return (
            
            <Fragment>
                <FormControl className="col-md-4">
                        <InputLabel htmlFor="age-native-helper">Select User</InputLabel>
                        <Select
                            native
                            value={this.state.selectedTeacher}
                            onChange={this.handleChange}
                            inputProps={{
                            name: 'select-user',
                            id: 'select-user',
                            }}
                        >
                        <option value="" />
                        {this.state.teacher.map(name => (
                            <option key={name.teacher} value={name.teacher}>{name.teacher}</option>
                        ))}</Select>
                </FormControl>
                
               <RetrieveStd students={this.state.commonstds}/>
            </Fragment>
        )
        

    }
}

export default Register
