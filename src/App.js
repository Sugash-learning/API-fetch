import { Button, EditableText, InputGroup, Toaster} from '@blueprintjs/core';
import './App.css';
import { useEffect, useState } from 'react';
import { BUTTON } from '@blueprintjs/core/lib/esm/common/classes';

const AppToaster = Toaster.create({
  position: "top"
})
function App() {
  const[users , setUsers] =useState([]);
  const [newName,setNewName]=useState("")
  const [newEmail,setNewEmail]=useState("")
  const [newWebsite,setNewWebsite]=useState("")
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) => setUsers(json))
  },[])
    function onchangeHandler(id,key,value) {
    setUsers((users) => {
      return users.map(user => {
        return user.id === id? {...user,[key]: value }: user;

       })
    })

  }
  
  function updateUser(id) {
    const user = users.find((user) => user.id === id);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json; charset=UTF-8 "
        }
      }
    ).then((response) => response.json())
    .then(data => {
      
      AppToaster.show({
        message: "User Updated successfully...",
        intent: 'success',
        timeout: 3000
      })
      
    })

  }
  
  function adduser() {
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();

    if (name && email && website) {
      fetch("https://jsonplaceholder.typicode.com/users",
      {
        method: "POST",
        body: JSON.stringify({
            name,
            email,
            website

        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8 "
        }
      }
    ).then((response) => response.json())
    .then(data => {
      setUsers([...users,data]);
      AppToaster.show({
        message: "User added successfully...",
        intent: 'success',
        timeout: 3000
      })
      setNewName("");
      setNewEmail("");
      setNewWebsite("");
    })

    }
  }
  
  return (
    <div className="App">
        <table className='bp4-html-table modifier'>
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
            <th>Action</th>
          </thead>
          <tbody>
              {users.map(user =>
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td><EditableText onChange={value => onchangeHandler(user.id, 'email', value) } value={user.email }/></td>
                  <td><EditableText onChange={value => onchangeHandler(user.id, 'website', value) } value={user.website }/></td>
                  <td>
                    <Button intent='Primary' onClick={() => updateUser(user.id)}>Update</Button>
                    
                    </td>
                </tr>
              )}

          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td><InputGroup 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder='Enter Name...'
              />
              </td>
              <td><InputGroup 
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder='Enter Email...'
              />
              </td>
              <td><InputGroup 
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
                placeholder='Enter Website...'
              />
              </td>
              <td>
                <Button intent='success' onClick={adduser}>Add User</Button>
              </td>
            </tr>
          </tfoot>
        </table>
      
    </div>
  );
  
  }

export default App;
