import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { faTrashAlt, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { Button, Modal} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { batch, useSelector } from 'react-redux';
import Searchbar from '../components/Searchbar';

import './Users.scss'
import { RootState } from 'src/states/Store';

interface UserItem{
    _id : string
    type : "user"
    name : string
    address : string
    image : string
    username : string
}

const Users: React.FC = () => {
    let [updateCounter, setUpdateCounter] = useState(0)
    let [users, setUsers] = useState<UserItem[]>([])
    let [filteredUsers, setFilteredUsers] = useState<UserItem[]>()
    let [showAddDialog, setShowAddDialog] = useState<boolean>(false)
    let param = useParams<{id : string}>()    

    const search = useSelector((state: RootState) => state.search.value)
    
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${localStorage.getItem('token')}`,
            }
        };

        fetch(param.id ? `http://localhost:3000/api/users/${param.id}` : 'http://localhost:3000/api/users', requestOptions)
            .then(response => response.json())
            .then(response => {
                setUsers(response.data)
            });
    }, [updateCounter,param.id])

    useEffect(() => {
        if(!search){
            setFilteredUsers(undefined)
        }else{
            setFilteredUsers(users.filter( it => it.name.toLowerCase().includes(search)))
        }
    },[search])

    const deleteUser = ( id : string ) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': `bearer ${localStorage.getItem('token')}`,
            }
        };

        fetch(`http://localhost:3000/api/users/${id}`, requestOptions)
            .then(_ => setUpdateCounter(updateCounter + 1))
    }

    let userElements = []
    let usersToDisplay = filteredUsers ? filteredUsers : users ; 

    if(usersToDisplay.length){
        for(let u of usersToDisplay){
            userElements.push(
                <div key={u._id} className="card cardCustom" style={{ width: 300, height: 350, margin: 10, padding: 10}}>
                    <div>
                        <img src={`data:image/png;base64,${u.image}`}
                            className="card-img-top" alt={u.name} style={{width:150}}></img>
                            <button type="button" className="btn" style={{float:'right'}}>
                                <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteUser(u._id)}/>
                            </button>
                    </div>
                    <div className="card-body" style={{position: 'relative'}}>
                        <h5 className="card-title"><NavLink to={`/users/${u._id}`}>{u.name}</NavLink></h5>
                        <p className="card-text">Address: {u.address}</p>
                    </div>
                </div>
            )
        }
    }else{
        userElements.push(<p key="empty_id">Empty</p>)
    }

    return <>
        <div className="page">
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <h1 style={{flex : 1}}>Users Page
                    <button type="button" className="btn" onClick={() => setShowAddDialog(true)}>
                        <FontAwesomeIcon icon={faPlusSquare} />
                    </button>
                </h1>
                
                <Searchbar/>
            </div>
    
            <div className="userContainer">
                { userElements }
            </div>
        </div>

        <Modal show={showAddDialog} onHide={() => setShowAddDialog(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="John Doe ..." required />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" id="address" name="address" placeholder="No where ..." required />
                </div>

                <div className="form-group">
                    <label htmlFor="profile">Profile Image</label>
                    <input type="file" className="form-control" id="profile" name="profile" placeholder="N/A" accept="image/png, image/jpeg" required />
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddDialog(false)}>
                Close
            </Button>
            <Button variant="primary" onClick={async () => {
                let input = (document.getElementById('profile') as HTMLInputElement);
                let f = input.files

                if(f){                    
                    let fr = new FileReader()
                    fr.readAsDataURL(f[0])
                    fr.onload = () => {
                        if(fr.result){
                            let base64Content = fr.result.slice((fr.result as string).indexOf(',') + 1)
                            const newUser = { 
                                name : (document.getElementById('name') as HTMLInputElement).value,
                                address : (document.getElementById('address') as HTMLInputElement).value,
                                image : base64Content
                            }

                            const requestOptions = {
                                method: 'POST',
                                headers: {
                                    'Authorization': `bearer ${localStorage.getItem('token')}`,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(newUser)
                            };
                    
                            fetch('http://localhost:3000/api/users', requestOptions)
                        }
                      
    
                        batch(() => {
                            setUpdateCounter(updateCounter + 1)
                            setShowAddDialog(false)
                        })
                    }
                }
            }}>
                Add
            </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default Users;
