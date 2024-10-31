import { AuthLogger } from "@/server/controllers/logger.service";
import { RequestCounterService } from "@/server/controllers/requestCounter.service";

/**
 * GET handler to return request metrics.
 * 
 * @returns {Promise<Response>} The response with auth metrics.
 */
export async function GET(): Promise<Response> {
  try {
    // Fetch the metrics from the AuthLogger singleton instance
    const calls = await RequestCounterService.getInstance().getCalls()

    // Return the metrics in JSON format
    return new Response(JSON.stringify(calls), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error: unknown) {
    console.error("Error fetching auth metrics:", error);

    // Handle errors and return a 500 response
    return new Response(
      JSON.stringify({ message: "Failed to fetch api call metrics" }), 
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
