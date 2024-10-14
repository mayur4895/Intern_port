import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { input } = await request.json();

    if (!input || typeof input !== 'string') {
      return new Response('Invalid input', { status: 400 });
    }

 
      const mockSkills = [
      'React',
      'JavaScript',
      'TypeScript',
      'Node.js',
      'Python',
      'Django',
      'Flask',
      'Ruby on Rails',
      'Java',
      'Spring Boot',
      'C#',
      '.NET',
      'ASP.NET',
      'HTML',
      'CSS',
      'C++',
      'Dart',
      'Flutter',
      'PHP',
      'Laravel',
      'Symfony',
      'MongoDB',
      'MySQL',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Kubernetes',
      'AWS',
      'Azure',
      'Google Cloud',
      'Git',
      'GitHub',
      'GitLab',
      'Jenkins',
      'Travis CI',
      'CircleCI',
      'Terraform',
      'Ansible',
      'Prometheus',
      'Grafana',
      'ElasticSearch',
      'Solr',
      'Hadoop',
      'Spark',
      'TensorFlow',
      'PyTorch',
      'Machine Learning',
      'Deep Learning',
      'NLP',
      'Blockchain',
      'Ethereum',
      'Smart Contracts',
      'CI/CD',
      'REST',
      'GraphQL',
      'OAuth',
      'JWT',
      'SAML',
      'Testing',
      'Jest',
      'Mocha',
      'Selenium',
      'JUnit',
      'PyTest',
      'AR/VR',
      'Unity',
      'Unreal Engine',
    ];

 
    const filteredSkills = mockSkills.filter(skill =>
      skill.toLowerCase().includes(input.toLowerCase())
    );

    return NextResponse.json({ skills: filteredSkills });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return new Response('Failed to fetch skills', { status: 500 });
  }
}
