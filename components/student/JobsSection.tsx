'use client';

import { useGetAllPosts } from '@/features/post/api/getallPosts';
import React from 'react';
import InternshipCard from './InternshipCard';
import { Post } from '@prisma/client';

interface JobSectionProps {
  filters: {
    availability: string[];
    location: string;
    internship_type: string[];
  };
  searchQuery: string;
}

const JobSection: React.FC<JobSectionProps> = ({ filters, searchQuery }) => {
  const { data: Internships, isLoading, error } = useGetAllPosts();

  const getRelevanceScore = (internship: Post): number => {
    const normalizedSearchQuery = searchQuery.toLowerCase();
    let score = 0;

    // Increase score for exact matches in the internship profile or company name
    if (internship.internshipProfile.toLowerCase().includes(normalizedSearchQuery) ||
        internship.companyName.toLowerCase().includes(normalizedSearchQuery)) {
      score += 10;
    }

    // Increase score for partial matches by splitting the query into words
    const queryWords = normalizedSearchQuery.split(' ');
    const matches = queryWords.some(word =>
      internship.internshipProfile.toLowerCase().includes(word) ||
      internship.companyName.toLowerCase().includes(word)
    );
    if (matches) {
      score += 5;
    }

    // Increase score for matching filters
    if (filters.availability.includes(internship.partOrFullTime)) {
      score += 2;
    }
    if (filters.internship_type.includes(internship.internshipType)) {
      score += 2;
    }
    const cities = internship.cities.map(city => city.toLowerCase());
    if (filters.location === '' || cities.includes(filters.location.toLowerCase())) {
      score += 2;
    }

    return score;
  };

  const filteredJobs = Internships
    ?.filter((internship: Post) => {
      const filterByAvailability =
        filters.availability.length === 0 || filters.availability.includes(internship.partOrFullTime);

      const filterByInternshipType =
        filters.internship_type.length === 0 || filters.internship_type.includes(internship.internshipType);

      const cities = internship.cities.map((cur) => cur.toLowerCase());
      const filterByLocation =
        filters.location === '' || cities.includes(filters.location.toLowerCase());

      const normalizedSearchQuery = searchQuery.toLowerCase();
      const filterBySearchQuery =
        searchQuery === '' ||
        internship.internshipProfile.toLowerCase().includes(normalizedSearchQuery) ||
        internship.companyName.toLowerCase().includes(normalizedSearchQuery) ||
        normalizedSearchQuery
          .split(' ')
          .some((word) => internship.internshipProfile.toLowerCase().includes(word) ||
                         internship.companyName.toLowerCase().includes(word));

      return filterByAvailability && filterByInternshipType && filterByLocation && filterBySearchQuery;
    })
    .map((internship: Post) => ({
      internship,
      score: getRelevanceScore(internship),
    }))
    .sort((a, b) => b.score - a.score)  
    .map(({ internship }) => internship); 

  return (
    <div className='  h-full  shadow-sm p-4'>
      <div className='flex flex-col gap-3'>
        {filteredJobs?.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
        {filteredJobs?.length === 0 && <p>No internships found.</p>}
      </div>
    </div>
  );
};

export default JobSection;
