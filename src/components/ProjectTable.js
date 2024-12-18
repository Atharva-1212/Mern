import React from 'react';
import { Link } from 'react-router-dom';

const ProjectTable = ({ projects, onDelete }) => (
  <div className="container mt-4">
    <table className="table table-striped table-responsive">
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Description</th>
          <th>Skills</th>
          <th>Members</th>
          <th>Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project._id}>
            <td>{project.name}</td>
            <td>{project.description}</td>
            <td>{project.skills.join(', ')}</td>
            <td>{project.members}</td>
            <td>{project.isActive ? 'Yes' : 'No'}</td>
            <td>
              <Link to={`/edit/${project._id}`} className="btn btn-primary btn-sm me-2">
                Edit
              </Link>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(project._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Link to="/add" className="btn btn-success mt-3">
      Add New Project
    </Link>
  </div>
);

export default ProjectTable;
