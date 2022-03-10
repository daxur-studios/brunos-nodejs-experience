export type prevWork = {
  description: string;
  url: string;
};

export type BrunoDetails = {
  age: number;
  name: string;
  dateOfBirth: Date;
  currentLocation: string;
  currentJobRole: string;
  contactDetails: {
    phone: string;
    email: string;
  };
  socials: {
    github: string;
    linkedIn: string;
  };
  previousWorks: prevWork[];
};
