import { AuthLogger } from "@/server/controllers/logger.service";

/**
 * GET handler to return request metrics.
 * 
 * @returns {Promise<Response>} The response with auth metrics.
 */
export async function GET(): Promise<Response> {
  try {
    // Fetch the metrics from the AuthLogger singleton instance
    const metrics = await AuthLogger.getInstance().getrequests();

    // Return the metrics in JSON format
    return new Response(JSON.stringify(metrics), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error: unknown) {
    console.error("Error fetching auth metrics:", error);

    // Handle errors and return a 500 response
    return new Response(
      JSON.stringify({ message: "Failed to fetch auth metrics" }), 
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
