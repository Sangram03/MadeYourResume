import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Achievement } from '../types/resume';

interface AchievementsFormProps {
  achievements: Achievement[];
  onChange: (achievements: Achievement[]) => void;
}

export function AchievementsForm({ achievements, onChange }: AchievementsFormProps) {
  const addAchievement = () => {
    onChange([...achievements, { title: '', description: '', date: '' }]);
  };

  const updateAchievement = (index: number, field: keyof Achievement, value: string) => {
    const updated = achievements.map((achievement, i) =>
      i === index ? { ...achievement, [field]: value } : achievement
    );
    onChange(updated);
  };

  const removeAchievement = (index: number) => {
    onChange(achievements.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Achievements</h2>
        <button
          onClick={addAchievement}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Achievement
        </button>
      </div>

      {achievements.map((achievement, index) => (
        <div key={index} className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <input
                type="text"
                value={achievement.title}
                onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                className="text-lg font-medium text-gray-900 w-full border-b border-transparent focus:border-blue-500 focus:outline-none"
                placeholder="Achievement title"
              />
            </div>
            <button
              onClick={() => removeAchievement(index)}
              className="text-red-500 hover:text-red-700 ml-4"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={achievement.description}
                onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Describe your achievement and its impact..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="month"
                value={achievement.date}
                onChange={(e) => updateAchievement(index, 'date', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}