import React from 'react';
import { SKILL_CATEGORIES } from '../constants/skillCategories';

interface SkillSuggestionsProps {
  onSelect: (skill: string) => void;
}

export function SkillSuggestions({ onSelect }: SkillSuggestionsProps) {
  return (
    <div className="mt-4 space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Suggested Skills</h3>
      <div className="space-y-4">
        {Object.entries(SKILL_CATEGORIES).map(([key, category]) => (
          <div key={key}>
            <h4 className="text-xs font-medium text-gray-500 mb-2">{category.title}</h4>
            <div className="flex flex-wrap gap-2">
              {category.suggestions.map((skill) => (
                <button
                  key={skill}
                  onClick={() => onSelect(skill)}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}