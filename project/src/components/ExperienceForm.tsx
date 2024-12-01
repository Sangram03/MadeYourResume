import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Experience } from '../types/resume';

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

export function ExperienceForm({ experiences, onChange }: ExperienceFormProps) {
  const addExperience = () => {
    onChange([
      ...experiences,
      {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        highlights: [''],
      },
    ]);
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updatedExperiences = experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    onChange(updatedExperiences);
  };

  const updateHighlight = (expIndex: number, highlightIndex: number, value: string) => {
    const updatedExperiences = experiences.map((exp, i) => {
      if (i === expIndex) {
        const highlights = [...exp.highlights];
        highlights[highlightIndex] = value;
        return { ...exp, highlights };
      }
      return exp;
    });
    onChange(updatedExperiences);
  };

  const addHighlight = (expIndex: number) => {
    const updatedExperiences = experiences.map((exp, i) =>
      i === expIndex ? { ...exp, highlights: [...exp.highlights, ''] } : exp
    );
    onChange(updatedExperiences);
  };

  const removeExperience = (index: number) => {
    onChange(experiences.filter((_, i) => i !== index));
  };

  const removeHighlight = (expIndex: number, highlightIndex: number) => {
    const updatedExperiences = experiences.map((exp, i) => {
      if (i === expIndex) {
        const highlights = exp.highlights.filter((_, j) => j !== highlightIndex);
        return { ...exp, highlights };
      }
      return exp;
    });
    onChange(updatedExperiences);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
        <button
          onClick={addExperience}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Experience
        </button>
      </div>

      {experiences.map((exp, index) => (
        <div key={index} className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium text-gray-900">Position {index + 1}</h3>
            <button
              onClick={() => removeExperience(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => updateExperience(index, 'position', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => updateExperience(index, 'location', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Achievements/Responsibilities
            </label>
            {exp.highlights.map((highlight, hIndex) => (
              <div key={hIndex} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => updateHighlight(index, hIndex, e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Describe your achievement..."
                />
                <button
                  onClick={() => removeHighlight(index, hIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => addHighlight(index)}
              className="mt-2 text-sm text-blue-500 hover:text-blue-700"
            >
              + Add Achievement
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}