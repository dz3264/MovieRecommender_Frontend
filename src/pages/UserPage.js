import React from 'react';
import '../styles/Page.css';
import Registration from "../auth/Registration";
import Login from '../auth/Login';
import Button from "react-bootstrap/Button";
import UserHistory from "../auth/UserHistory";

class UserPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loggedInStatus: this.props.loggedInStatus,
        }
    }

    render() {



        return <div className="User Page">
            {
                this.props.loggedInStatus ?
                    <div className='userInfo'>
                        <div className='userName'>
                            {this.props.user['name']}
                        </div>
                        <UserHistory user={this.props.user} />
                        <Button
                            variant="light"
                            className='FormBtn'
                            onClick={()=>{this.props.userStatus(null)}}>Logout</Button>
                    </div> :
                    <div className='LoginSignup'>
                        <div className='LoginTitle'>
                            Log in or Sign Up for Personalized Movie Recommendation !
                        </div>
                        <div className='LoginForms'>
                            <Registration userStatus={this.props.userStatus}/>
                            <Login userStatus={this.props.userStatus}/>
                        </div>


                    </div>
            }

        </div>;
    }

}

export default UserPage;
