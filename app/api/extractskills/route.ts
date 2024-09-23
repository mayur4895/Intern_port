import { NextApiRequest, NextApiResponse } from 'next';
import pdf from 'pdf-parse';
import axios from 'axios';
import nlp from 'compromise';
import { NextRequest, NextResponse } from 'next/server';

// List of required skills
const requiredSkills: string[] = [
  'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Django', 'Flask',
  'Ruby on Rails', 'Java', 'Spring Boot', 'C#', '.NET', 'ASP.NET', 'HTML', 'CSS',
  'C++', 'Dart', 'Flutter', 'PHP', 'Laravel', 'Symfony', 'MongoDB', 'MySQL',
  'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud',
  'Git', 'GitHub', 'GitLab', 'Jenkins', 'Travis CI', 'CircleCI', 'Terraform',
  'Ansible', 'Prometheus', 'Grafana', 'ElasticSearch', 'Solr', 'Hadoop', 'Spark',
  'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning', 'NLP', 'Blockchain',
  'Ethereum', 'Smart Contracts', 'CI/CD', 'REST', 'GraphQL', 'OAuth', 'JWT',
  'SAML', 'Testing', 'Jest', 'Mocha', 'Selenium', 'JUnit', 'PyTest', 'AR/VR',
  'Unity', 'Unreal Engine'
];

// Function to extract text from a PDF
async function extractTextFromPdf(pdfBuffer: Buffer): Promise<string> {
  try {
    const data = await pdf(pdfBuffer);
    return data.text;
  } catch (error) {
    throw new Error('Failed to extract text from PDF');
  }
}

// Function to extract skills from the text using compromise NLP
function extractSkills(text: string): string[] {
  const doc = nlp(text);
  const words: string[] = doc.terms().out('array').map((word: string) => word.toLowerCase()); // Explicit typing for 'word'
  return requiredSkills.filter((skill: string) => words.includes(skill.toLowerCase()));
}
export async function POST(req: NextRequest) {
  try {
    const { resumeUrl } = await req.json();
    if (!resumeUrl) {
      return NextResponse.json({ error: 'Resume URL is required' }, { status: 400 });
    }

    const response = await axios.get(resumeUrl, { responseType: 'arraybuffer' });
    const pdfBuffer = Buffer.from(response.data);
    const resumeText = await extractTextFromPdf(pdfBuffer);
    const extractedSkills = extractSkills(resumeText);

    return NextResponse.json({ skills: extractedSkills });
  } catch (error) {
    console.error('Error processing resume:', error);
    return NextResponse.json({ error: 'Failed to extract skills from resume' }, { status: 500 });
  }
}