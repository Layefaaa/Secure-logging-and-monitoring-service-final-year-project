"use client";
const IPDATA_API_KEY =
  "46e541f636e8ab385cbf028e2547946023155a9b353da95888bd4d69";

export const getIPData = async () => {
  // The URL of the API
  const url = `https://api.ipdata.co?api-key=${IPDATA_API_KEY}`;

  try {
    // Make the GET request
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }

    const data = await response.json();
    // Log the data
    console.log(data);
  } catch (error) {
    // Log any errors
    console.log(error);
  }
};
