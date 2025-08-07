import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/items').then(res => setItems(res.data)) .catch(err => console.error('GET error:', err));
  }, []);

  function save(e) {
    e.preventDefault();
    if (editId) {axios.put(`http://localhost:3000/items/${editId}`, { name: text }).then(() => reload());
    } else {
      axios.post('http://localhost:3000/items', { name: text }).then(() => reload());
    }
  }

  function del(id) {
    axios.delete(`http://localhost:3000/items/${id}`).then(() => reload());
  }

  function reload() {
    axios.get('http://localhost:3000/items').then(res => {
      setItems(res.data);
      setText('');
      setEditId('');
    });
  }

  return (
    <>
    <h1 className='heading'>CRUD APP</h1>
    <div className="App">
      
      <form onSubmit={save}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>

      <ul>
        {items.map(i => (
          <li key={i._id}>
            {i.name}
            <button onClick={() => { setText(i.name); setEditId(i._id); }}>Edit</button>
            <button onClick={() => del(i._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default App;