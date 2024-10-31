import { AuthLogger } from "@/server/controllers/logger.service";
import { ServiceMetrics } from "@/server/controllers/prometheus.service";

/**
 * GET handler to return Prometheus metrics.
 * 
 * @returns {Promise<Response>} The response with metrics in plain text format.
 */
export async function GET(): Promise<Response> {
  try {
    // Fetch the metrics from the ServiceMetrics singleton instance
    const metrics = await ServiceMetrics.getInstance().getMetrics();
    // Return the metrics in text/plain format
    return new Response(metrics, {
      status: 200,
      headers: {
        "Content-Type": "text/plain"
      }
    });

  } catch (error: unknown) {
    console.error("Error fetching metrics:", error);

    // Handle any errors and return a 500 response
    return new Response("Failed to fetch metrics", {
      status: 500,
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }
}
