import React, { useRef } from 'react';
import type { Resume, SectionKey } from '../types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { SectionDivider } from './SectionDivider';
import { DownloadButton } from './DownloadButton';

interface ResumePreviewProps {
  resume: Resume;
  sectionOrder: SectionKey[];
}

export function ResumePreview({ resume, sectionOrder }: ResumePreviewProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const renderSection = (sectionKey: SectionKey) => {
    switch (sectionKey) {
      case 'summary':
        return resume.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Professional Summary</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{resume.summary}</p>
          </div>
        );

      case 'technicalSkills':
        return resume.technicalSkills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Technical Skills</h2>
            <div className="space-y-4">
              {resume.technicalSkills.map((category, index) => (
                <div key={index}>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{category.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'experience':
        return resume.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Experience</h2>
            <div className="space-y-6">
              {resume.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <div className="text-gray-600 text-sm">
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{exp.location}</p>
                  <ul className="list-disc list-inside space-y-1">
                    {exp.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="text-gray-700">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return resume.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects</h2>
            <div className="space-y-6">
              {resume.projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {project.name}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-blue-600 hover:underline text-sm"
                          >
                            View Project
                          </a>
                        )}
                      </h3>
                    </div>
                    <div className="text-gray-600 text-sm">
                      {project.startDate} - {project.endDate}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        return resume.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Education</h2>
            <div className="space-y-6">
              {resume.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{edu.school}</h3>
                      <p className="text-gray-600">
                        {edu.degree} in {edu.fieldOfStudy}
                      </p>
                    </div>
                    <div className="text-gray-600 text-sm">
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 whitespace-pre-wrap">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'achievements':
        return resume.achievements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h2>
            <div className="space-y-4">
              {resume.achievements.map((achievement, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{achievement.title}</h3>
                    <div className="text-gray-600 text-sm">{achievement.date}</div>
                  </div>
                  <p className="text-gray-700">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        return resume.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {resume.skills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{skill.name}</span>
                  <span className="text-sm text-gray-500">{skill.level}</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div ref={contentRef} className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{resume.personalInfo.fullName}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-gray-600">
            {resume.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{resume.personalInfo.email}</span>
              </div>
            )}
            {resume.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{resume.personalInfo.phone}</span>
              </div>
            )}
            {resume.personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{resume.personalInfo.location}</span>
              </div>
            )}
            {resume.personalInfo.linkedIn && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-4 w-4" />
                <a href={resume.personalInfo.linkedIn} className="text-blue-600 hover:underline">
                  LinkedIn
                </a>
              </div>
            )}
            {resume.personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <a href={resume.personalInfo.website} className="text-blue-600 hover:underline">
                  Portfolio
                </a>
              </div>
            )}
          </div>
        </div>

        <SectionDivider />

        {/* Sections */}
        {sectionOrder.map((sectionKey, index) => {
          const sectionContent = renderSection(sectionKey);
          return sectionContent ? (
            <React.Fragment key={sectionKey}>
              {sectionContent}
              {index < sectionOrder.length - 1 && <SectionDivider />}
            </React.Fragment>
          ) : null;
        })}
      </div>
      <DownloadButton contentRef={contentRef} />
    </>
  );
}