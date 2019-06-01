import React, {Component,Fragment} from 'react';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems'
import './Layout.css';
class Layout extends Component{
    render(){
        return(
            <Fragment>
                <div className="col-md-2 ">
                <nav className="siderbar bg-light">
                    <NavigationItems />
                </nav>
                
                </div>
                    <div className="col-md-9 mt-3 pt-3">
                    {this.props.children}
                    </div>
            </Fragment>  
        )
    }
} 

export default Layout;