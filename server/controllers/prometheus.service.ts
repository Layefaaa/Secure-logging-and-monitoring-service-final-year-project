import { Registry, collectDefaultMetrics, Counter, register } from "prom-client";

/**
 * Class for managing service metrics.
 */
export class ServiceMetrics extends Registry {
  private static instance: ServiceMetrics;
  private defaultMetricsRegistered = false; // Ensure default metrics are only registered once
  private requestCounterMetric: Counter<string> | undefined;

  /**
   * Private constructor to prevent direct instantiation.
   * Initializes default metrics and a request counter.
   */
  private constructor() {
    super();

    // Initialize default metrics only once
    if (!this.defaultMetricsRegistered) {
      collectDefaultMetrics({ register: this });
      this.defaultMetricsRegistered = true;

      // Initialize the request counter metric
      this.requestCounterMetric = new Counter({
        name: "http_requests_total",
        help: "Total number of HTTP requests",
        registers: [this],
        labelNames: ["method", "path", "status"],
      });
    }
  }

  /**
   * Gets the singleton instance of ServiceMetrics.
   * @returns {ServiceMetrics} The instance.
   */
  public static getInstance(): ServiceMetrics {
    if (!ServiceMetrics.instance) {
      ServiceMetrics.instance = new ServiceMetrics();
    }
    return ServiceMetrics.instance;
  }

  /**
   * Increments the request counter metric.
   * @param method The HTTP method (e.g., GET, POST).
   * @param path The router path (e.g., /api/users).
   * @param status The response status code (e.g., 200, 404).
   */
  public incrementRequestCount(method: string, path: string, status: number): void {
    if (this.requestCounterMetric) {
      this.requestCounterMetric.labels(method, path, status.toString()).inc();
    } else {
      console.error("Request counter metric is not initialized.");
    }
  }

  /**
   * Gets the collected metrics in a format suitable for exporting.
   * @returns {Promise<string>} The metrics in Prometheus format.
   */
  public async getMetrics(): Promise<string> {
    return this.metrics();
  }
}
