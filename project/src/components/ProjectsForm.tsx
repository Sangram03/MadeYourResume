import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Project } from '../types/resume';

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export function ProjectsForm({ projects, onChange }: ProjectsFormProps) {
  const addProject = () => {
    onChange([
      ...projects,
      {
        name: '',
        description: '',
        technologies: [''],
        startDate: '',
        endDate: '',
        link: '',
      },
    ]);
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = projects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    onChange(updated);
  };

  const updateTechnology = (projectIndex: number, techIndex: number, value: string) => {
    const updated = projects.map((project, i) => {
      if (i === projectIndex) {
        const technologies = [...project.technologies];
        technologies[techIndex] = value;
        return { ...project, technologies };
      }
      return project;
    });
    onChange(updated);
  };

  const addTechnology = (projectIndex: number) => {
    const updated = projects.map((project, i) =>
      i === projectIndex
        ? { ...project, technologies: [...project.technologies, ''] }
        : project
    );
    onChange(updated);
  };

  const removeProject = (index: number) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const updated = projects.map((project, i) => {
      if (i === projectIndex) {
        return {
          ...project,
          technologies: project.technologies.filter((_, j) => j !== techIndex),
        };
      }
      return project;
    });
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
        <button
          onClick={addProject}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Project
        </button>
      </div>

      {projects.map((project, index) => (
        <div key={index} className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium text-gray-900">Project {index + 1}</h3>
            <button
              onClick={() => removeProject(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => updateProject(index, 'name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Project Link (optional)</label>
              <input
                type="url"
                value={project.link}
                onChange={(e) => updateProject(index, 'link', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="month"
                  value={project.startDate}
                  onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="month"
                  value={project.endDate}
                  onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Describe the project, its goals, and your role..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Technologies Used</label>
              {project.technologies.map((tech, techIndex) => (
                <div key={techIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => updateTechnology(index, techIndex, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Technology name"
                  />
                  <button
                    onClick={() => removeTechnology(index, techIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addTechnology(index)}
                className="mt-2 text-sm text-blue-500 hover:text-blue-700"
              >
                + Add Technology
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}