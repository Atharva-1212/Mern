import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddEditProjectForm from '../components/AddEditProjectForm';
import { useParams, useNavigate } from 'react-router-dom';

const AddEditProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/projects/${id}`)
        .then((response) => {
          setProject(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Error fetching project details');
          setLoading(false);
        });
    } else {
      setProject({
        name: '',
        description: '',
        skills: [],
        members: 1,
        isActive: false,
      });
    }
  }, [id]);

  const handleSubmit = (projectData) => {
    setLoading(true);
    const apiCall = id
      ? axios.put(`http://localhost:5000/api/projects/${id}`, projectData)
      : axios.post('http://localhost:5000/api/projects', projectData);

    apiCall
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((err) => {
        setError('Error submitting project');
        setLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h1>{id ? 'Edit Project' : 'Add Project'}</h1>
      <AddEditProjectForm
        initialData={project}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddEditProjectPage;
