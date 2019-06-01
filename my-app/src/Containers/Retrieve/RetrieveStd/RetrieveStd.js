import React, { Fragment } from 'react';

const RetrieveStd = (props) => {
    console.log(props)

    return (
        <Fragment>

            <div className="row mt-3">
                <div className="col-md-12">
                    <p>{props.students.students?
                     "Below is the following students" :''}
                
                     </p>
                    <ul>
                        {props.students.students ?
                            props.students.students.map(object => (
                                <li>{object}</li>
                            )) : ''
                        }
                    </ul>

                </div>
            </div>
        </Fragment>

    )

}



export default RetrieveStd;