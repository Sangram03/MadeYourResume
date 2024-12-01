import React from 'react';
import { Trash2, Plus } from 'lucide-react';
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
import type { TechnicalSkill } from '../types/resume';
import { DraggableSkill } from './DraggableSkill';
import { SkillSuggestions } from './SkillSuggestions';
import { SKILL_CATEGORIES } from '../constants/skillCategories';

interface TechnicalSkillsFormProps {
  technicalSkills: TechnicalSkill[];
  onChange: (technicalSkills: TechnicalSkill[]) => void;
}

export function TechnicalSkillsForm({ technicalSkills, onChange }: TechnicalSkillsFormProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addCategory = (categoryKey?: string) => {
    const category = categoryKey ? SKILL_CATEGORIES[categoryKey] : null;
    onChange([
      ...technicalSkills,
      {
        category: category ? category.title : '',
        skills: category ? [category.suggestions[0]] : [''],
      },
    ]);
  };

  const updateCategory = (index: number, category: string) => {
    const updated = technicalSkills.map((skill, i) =>
      i === index ? { ...skill, category } : skill
    );
    onChange(updated);
  };

  const addSkill = (categoryIndex: number, skillName?: string) => {
    const updated = technicalSkills.map((category, i) =>
      i === categoryIndex
        ? { ...category, skills: [...category.skills, skillName || ''] }
        : category
    );
    onChange(updated);
  };

  const updateSkill = (categoryIndex: number, skillIndex: number, value: string) => {
    const updated = technicalSkills.map((category, i) => {
      if (i === categoryIndex) {
        const skills = [...category.skills];
        skills[skillIndex] = value;
        return { ...category, skills };
      }
      return category;
    });
    onChange(updated);
  };

  const removeCategory = (index: number) => {
    onChange(technicalSkills.filter((_, i) => i !== index));
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const updated = technicalSkills.map((category, i) => {
      if (i === categoryIndex) {
        return {
          ...category,
          skills: category.skills.filter((_, j) => j !== skillIndex),
        };
      }
      return category;
    });
    onChange(updated);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = parseInt(active.id.split('-')[1]);
      const newIndex = parseInt(over.id.split('-')[1]);
      onChange(arrayMove(technicalSkills, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Technical Skills</h2>
        <div className="flex gap-2">
          {Object.entries(SKILL_CATEGORIES).map(([key, category]) => (
            <button
              key={key}
              onClick={() => addCategory(key)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
            >
              + {category.title}
            </button>
          ))}
          <button
            onClick={() => addCategory()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Custom Category
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={technicalSkills.map((_, index) => `category-${index}`)}
          strategy={verticalListSortingStrategy}
        >
          {technicalSkills.map((category, categoryIndex) => (
            <DraggableSkill key={`category-${categoryIndex}`} id={`category-${categoryIndex}`}>
              <div className="flex-1 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <input
                    type="text"
                    value={category.category}
                    onChange={(e) => updateCategory(categoryIndex, e.target.value)}
                    className="text-lg font-medium text-gray-900 border-b border-transparent focus:border-blue-500 focus:outline-none"
                    placeholder="Category name (e.g., Programming Languages)"
                  />
                  <button
                    onClick={() => removeCategory(categoryIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => updateSkill(categoryIndex, skillIndex, e.target.value)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Skill name"
                      />
                      <button
                        onClick={() => removeSkill(categoryIndex, skillIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addSkill(categoryIndex)}
                    className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add Skill
                  </button>
                </div>

                <SkillSuggestions
                  onSelect={(skill) => addSkill(categoryIndex, skill)}
                />
              </div>
            </DraggableSkill>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}