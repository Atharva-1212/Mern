import React, { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    skills: '',
    members: 1,
    isActive: false,
  });
  const [editingProjectId, setEditingProjectId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAddProject = () => {
    fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newProject,
        skills: newProject.skills.split(',').map((skill) => skill.trim()),
      }),
    })
      .then((response) => response.json())
      .then((project) => {
        setProjects((prev) => [...prev, project]);
        resetForm();
      })
      .catch((error) => console.error(error.message));
  };

  const handleDeleteProject = (id) => {
    fetch(`http://localhost:5000/api/projects/${id}`, { method: 'DELETE' })
      .then(() => {
        setProjects((prev) => prev.filter((project) => project._id !== id));
      })
      .catch((error) => console.error(error.message));
  };

  const handleEditProject = (project) => {
    setNewProject({
      name: project.name,
      description: project.description,
      skills: project.skills.join(', '),
      members: project.members,
      isActive: project.isActive,
    });
    setEditingProjectId(project._id);
  };

  const handleUpdateProject = () => {
    fetch(`http://localhost:5000/api/projects/${editingProjectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newProject,
        skills: newProject.skills.split(',').map((skill) => skill.trim()),
      }),
    })
      .then((response) => response.json())
      .then((updatedProject) => {
        setProjects((prev) =>
          prev.map((project) => (project._id === updatedProject._id ? updatedProject : project))
        );
        resetForm();
      })
      .catch((error) => console.error(error.message));
  };

  const resetForm = () => {
    setNewProject({ name: '', description: '', skills: '', members: 1, isActive: false });
    setEditingProjectId(null);
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Projects</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Project Form */}
      <div className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={newProject.name}
          onChange={handleInputChange}
          className="form-input"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProject.description}
          onChange={handleInputChange}
          className="form-input"
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma-separated)"
          value={newProject.skills}
          onChange={handleInputChange}
          className="form-input"
        />
        <input
          type="number"
          name="members"
          placeholder="Number of Members"
          value={newProject.members}
          onChange={handleInputChange}
          className="form-input"
        />
        <button className="submit-button" onClick={editingProjectId ? handleUpdateProject : handleAddProject}>
          {editingProjectId ? 'Update Project' : 'Add Project'}
        </button>
        {editingProjectId && <button className="cancel-button" onClick={resetForm}>Cancel Edit</button>}
      </div>

      {/* Projects List */}
      <div className="projects-list">
        {filteredProjects.map((project) => (
          <div key={project._id} className="project-card">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p><strong>Skills:</strong> {project.skills.join(', ')}</p>
            <p><strong>Members:</strong> {project.members}</p>
            <p><strong>Status:</strong> {project.isActive ? 'Active' : 'Inactive'}</p>
            <div className="button-group">
              <button className="edit-button" onClick={() => handleEditProject(project)}>Edit</button>
              <button className="delete-button" onClick={() => handleDeleteProject(project._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
