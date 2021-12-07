import React, { useEffect, useState } from 'react';
import './css/app.css';
import UserInfo from './UserInfo/UserInfo';

const App = () => {
    const [users, setUsers] = useState(false);
    const [user, setUser] = useState(false);
    const getData = () => {
        fetch('10kshopers.json', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setUsers(data);
        })
    }
    useEffect(() => {
        getData();
    },[])
    const displayUser = (e) => {
        setUser(users[e.target.value])
    }
    return (
        <div className="wrap">
            <div className="users-drop-down">
                <select name="users" id="users" onChange={displayUser}>
                    <option selected disabled>Select User</option>
                    {
                        users && users.map((user, index) => {
                            return (
                                <option key={index} value={index}>{user.firstName} {user.lastName}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="user-info-wrap">
                {
                    user && <UserInfo user={user} users={users} />
                }
            </div>
        </div>
    )
}

export default App;
