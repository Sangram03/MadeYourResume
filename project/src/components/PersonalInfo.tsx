import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface PersonalInfoProps {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedIn?: string;
    website?: string;
  };
  onChange: (field: string, value: string) => void;
}

export function PersonalInfo({ personalInfo, onChange }: PersonalInfoProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={personalInfo.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>
        
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-gray-400" />
            </span>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="mt-1 block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-4 w-4 text-gray-400" />
            </span>
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="mt-1 block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-4 w-4 text-gray-400" />
            </span>
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => onChange('location', e.target.value)}
              className="mt-1 block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="City, Country"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">LinkedIn (optional)</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Linkedin className="h-4 w-4 text-gray-400" />
            </span>
            <input
              type="url"
              value={personalInfo.linkedIn}
              onChange={(e) => onChange('linkedIn', e.target.value)}
              className="mt-1 block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Website (optional)</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-4 w-4 text-gray-400" />
            </span>
            <input
              type="url"
              value={personalInfo.website}
              onChange={(e) => onChange('website', e.target.value)}
              className="mt-1 block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://johndoe.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}