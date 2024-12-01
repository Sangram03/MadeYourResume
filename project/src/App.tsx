import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { PersonalInfo } from './components/PersonalInfo';
import { ExperienceForm } from './components/ExperienceForm';
import { EducationForm } from './components/EducationForm';
import { SkillsForm } from './components/SkillsForm';
import { TechnicalSkillsForm } from './components/TechnicalSkillsForm';
import { ProjectsForm } from './components/ProjectsForm';
import { AchievementsForm } from './components/AchievementsForm';
import { ResumePreview } from './components/ResumePreview';
import { DraggableSection } from './components/DraggableSection';
import type { Resume, SectionKey } from './types/resume';

function App() {
  const [resume, setResume] = useState<Resume>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      website: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    technicalSkills: [],
    projects: [],
    achievements: [],
  });

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [sectionOrder, setSectionOrder] = useState<SectionKey[]>([
    'summary',
    'technicalSkills',
    'experience',
    'projects',
    'education',
    'achievements',
    'skills',
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const updatePersonalInfo = (field: string, value: string) => {
    setResume((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = sectionOrder.indexOf(active.id);
      const newIndex = sectionOrder.indexOf(over.id);
      setSectionOrder(arrayMove(sectionOrder, oldIndex, newIndex));
    }
  };

  const renderSection = (sectionKey: SectionKey) => {
    switch (sectionKey) {
      case 'summary':
        return (
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Professional Summary
              </label>
              <textarea
                value={resume.summary}
                onChange={(e) => setResume((prev) => ({ ...prev, summary: e.target.value }))}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Write a compelling summary of your professional background and key strengths..."
              />
            </div>
          </div>
        );
      case 'technicalSkills':
        return (
          <div className="p-6">
            <TechnicalSkillsForm
              technicalSkills={resume.technicalSkills}
              onChange={(technicalSkills) => setResume((prev) => ({ ...prev, technicalSkills }))}
            />
          </div>
        );
      case 'experience':
        return (
          <div className="p-6">
            <ExperienceForm
              experiences={resume.experience}
              onChange={(experience) => setResume((prev) => ({ ...prev, experience }))}
            />
          </div>
        );
      case 'projects':
        return (
          <div className="p-6">
            <ProjectsForm
              projects={resume.projects}
              onChange={(projects) => setResume((prev) => ({ ...prev, projects }))}
            />
          </div>
        );
      case 'education':
        return (
          <div className="p-6">
            <EducationForm
              education={resume.education}
              onChange={(education) => setResume((prev) => ({ ...prev, education }))}
            />
          </div>
        );
      case 'achievements':
        return (
          <div className="p-6">
            <AchievementsForm
              achievements={resume.achievements}
              onChange={(achievements) => setResume((prev) => ({ ...prev, achievements }))}
            />
          </div>
        );
      case 'skills':
        return (
          <div className="p-6">
            <SkillsForm
              skills={resume.skills}
              onChange={(skills) => setResume((prev) => ({ ...prev, skills }))}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">ATS-Optimized Resume Builder</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="sm:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as 'edit' | 'preview')}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="edit">Edit</option>
              <option value="preview">Preview</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'edit'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'preview'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Preview
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'edit' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <PersonalInfo
                personalInfo={resume.personalInfo}
                onChange={updatePersonalInfo}
              />
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="space-y-6">
                <SortableContext
                  items={sectionOrder}
                  strategy={verticalListSortingStrategy}
                >
                  {sectionOrder.map((sectionKey) => (
                    <DraggableSection key={sectionKey} id={sectionKey}>
                      {renderSection(sectionKey)}
                    </DraggableSection>
                  ))}
                </SortableContext>
              </div>
            </DndContext>
          </div>
        ) : (
          <ResumePreview resume={resume} sectionOrder={sectionOrder} />
        )}
      </main>
    </div>
  );
}

export default App;