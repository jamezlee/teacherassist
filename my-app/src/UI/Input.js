// import React, {Component,Fragment} from 'react';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Select from '@material-ui/core/Select';
// import Checkbox from '@material-ui/core/Checkbox';
// const input = (props)=>{
//     let inputElement =null;
//     let inputInvalid = '';
//     console.log(props)
//     switch (props.elementType){
//         // case ('input'):
//         //     inputElement=<input className={"inputElement " + inputInvalid }
//         //      {...props.elementConfig}
//         //       value={props.Value}
//         //       onChange={props.changed}/>
//         //     break;
//         // case ('textarea'):
//         //     inputElement=<textarea 
//         //     {...props.elementConfig}
//         //     value={props.Value}
//         //     onChange={props.changed}/>
//         //     break;
//         case ('select'):
//             inputElement=(
//                 <Select
//                     native
//                     value={props.value}
//                     onChange={props.handleChange}
//                     inputProps={{
//                     name: props.displayValue,
//                     id: 'age-native-simple',
//                     }}
//                     >

//                 {props.elementConfig.options.map(name => (
//                     <option key={name.value} value={name.value}>{name.displayValue}</option>
//                 ))}
//                 </Select>
//             )
//             break;
//         case ('muiltselect'):
//             inputElement=(
//                 <Select
//                     multiple
//                     value={props.value}
//                     onChange={props.handleChange}
//                     input={<Input id="select-multiple-checkbox" />}
//                     renderValue={selected => selected.join(', ')}
//                 >
//                 {props.elementConfig.options.map(name => (
//                 <MenuItem key={name.value} value={name.value}>
//                     <ListItemText primary={name.displayValue} />
//                 </MenuItem>
//                 ))}
//                 </Select>
//             )
//             break;
//         default:
//             inputElement =<input className={"inputElement"}  
//             {...props.elementConfig}
//             value={props.Value}/>
//     }   
//     return(
//         <Fragment>
//             <InputLabel htmlFor="select-multiple-checkbox">{props.label}</InputLabel>
//             {inputElement}
//         </Fragment>
//     );
// }

// export default input;