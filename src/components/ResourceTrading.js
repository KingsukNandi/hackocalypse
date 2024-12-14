import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query 
} from 'firebase/firestore';
import { firestore } from '../firebase';

function ResourceTrading({ user }) {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({
    name: '',
    quantity: 0,
    description: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resourcesQuery = query(collection(firestore, 'resources'));
    const unsubscribe = onSnapshot(resourcesQuery, (snapshot) => {
      const resourceList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setResources(resourceList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addResource = async (e) => {
    e.preventDefault();
    if (newResource.quantity <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }
    try {
      await addDoc(collection(firestore, 'resources'), {
        ...newResource,
        traderEmail: user.email,
        timestamp: new Date(),
      });
      setNewResource({ name: '', quantity: 0, description: '' });
    } catch (error) {
      console.error("Error adding resource: ", error);
    }
  };

  return (
    <div>
      <h2>Resource Trading</h2>
      <form onSubmit={addResource}>
        <input 
          value={newResource.name}
          onChange={(e) => setNewResource({
            ...newResource, 
            name: e.target.value
          })}
          placeholder="Resource Name"
          required
        />
        <input 
          type="number"
          value={newResource.quantity}
          onChange={(e) => setNewResource({
            ...newResource, 
            quantity: parseInt(e.target.value)
          })}
          placeholder="Quantity"
          required
        />
        <textarea 
          value={newResource.description}
          onChange={(e) => setNewResource({
            ...newResource, 
            description: e.target.value
          })}
          placeholder="Description"
          required
        />
        <button 
          type="submit" 
          disabled={!newResource.name || !newResource.description || newResource.quantity <= 0}
        >
          List Resource
        </button>
      </form>

      {loading ? (
        <p>Loading resources...</p>
      ) : resources.length === 0 ? (
        <p>No resources available</p>
      ) : (
        <div>
          <h3>Available Resources</h3>
          {resources.map(resource => (
            <div key={resource.id}>
              <p>{resource.name} - {resource.quantity}</p>
              <p>{resource.description}</p>
              <p>Trader: {resource.traderEmail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResourceTrading;
