import React, { useState, useEffect } from 'react';

const AddEditProjectForm = ({ initialData, onSubmit }) => {
  const [project, setProject] = useState(initialData || {
    name: '',
    description: '',
    skills: [],
    members: 1,
    isActive: false,
  });

  useEffect(() => {
    setProject(initialData || {
      name: '',
      description: '',
      skills: [],
      members: 1,
      isActive: false,
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProject({
      ...project,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(project);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Project Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={project.name || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          name="description"
          value={project.description || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Skills</label>
        <select
          className="form-select"
          name="skills"
          multiple
          value={project.skills || []}
          onChange={(e) =>
            setProject({
              ...project,
              skills: Array.from(e.target.selectedOptions, (opt) => opt.value),
            })
          }
        >
          <option value="ReactJS">ReactJS</option>
          <option value="NodeJS">NodeJS</option>
          <option value="MongoDB">MongoDB</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Members</label>
        <input
          type="number"
          className="form-control"
          name="members"
          value={project.members || 1}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Is Active?</label>
        <input
          type="checkbox"
          name="isActive"
          checked={project.isActive || false}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};

export default AddEditProjectForm;
