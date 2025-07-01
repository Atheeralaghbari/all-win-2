export async function getCountries() {
  // noStore(); // Uncomment this if you want to prevent caching

  try {
    const apiUrl = `https://italent.me/aw-admin/api/v1/dashboard/list/country`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any other necessary headers, e.g., an auth token if required
        // 'Authorization': `Bearer ${process.env.API_KEY}`,
      },
      // You can control caching behavior here
      // next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch countries from API.');
    }

    const data = await response.json();

    // The API returns an object with a 'data' key which is the array.
    // Let's assume the structure is { success: true, message: '...', data: [...] }
    // We only need the array inside 'data'.
    return data.data || []; // Return the array or an empty array if it's missing
  } catch (error) {
    console.error('Database Error:', error);
    // In case of an error, return an empty array so the UI doesn't break.
    return [];
  }
}
