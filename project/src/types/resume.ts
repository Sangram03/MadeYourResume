export interface TechnicalSkill {
  category: string;
  skills: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  link?: string;
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
}

export interface Education {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Resume {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedIn?: string;
    website?: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  technicalSkills: TechnicalSkill[];
  projects: Project[];
  achievements: Achievement[];
}

export type SectionKey = 'summary' | 'technicalSkills' | 'experience' | 'projects' | 'education' | 'achievements' | 'skills';