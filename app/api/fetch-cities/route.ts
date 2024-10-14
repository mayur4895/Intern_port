import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { input } = await request.json();

    if (!input || typeof input !== 'string') {
      return new Response('Invalid input', { status: 400 });
    }

 
    const indianCities = [
      'Mumbai',
      'Delhi',
      'Bengaluru',
      'Hyderabad',
      'Ahmedabad',
      'Chennai',
      'Kolkata',
      'Surat',
      'Pune',
      'Jaipur',
      'Lucknow',
      'Kanpur',
      'Nagpur',
      'Indore',
      'Thane',
      'Bhopal',
      'Visakhapatnam',
      'Vadodara',
      'Coimbatore',
      'Mysore',
      'Chandigarh',
      'Guwahati',
      'Dehradun',
      'Amritsar',
      'Udaipur',
      'Raipur',
      'Ranchi',
      'Jamshedpur',
      'Kakinada',
      'Aurangabad',
      'Gwalior',
      'Rourkela',
 
    ];

    const filteredCities = indianCities.filter(city =>
      city.toLowerCase().includes(input.toLowerCase())
    );

    return NextResponse.json({ cities: filteredCities });
  } catch (error) {
    console.error('Error fetching cities:', error);
    return new Response('Failed to fetch cities', { status: 500 });
  }
}
