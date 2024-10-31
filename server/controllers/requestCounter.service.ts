import { NextRequest } from "next/server";
import { Models } from "../cluster"; // Ensure this path is correct
import { ServiceMetrics } from "./prometheus.service";
import { IStatusCodeCounter } from "../cluster/schema.interfaces";

/**
 * Singleton service class for managing request counters.
 * Provides methods to increment status code counts for API endpoints.
 */
export class RequestCounterService {
    private static instance: RequestCounterService;

    // Private constructor for singleton pattern
    private constructor() {}

    /**
     * Retrieves the singleton instance of RequestCounterService.
     * @returns {RequestCounterService} The singleton instance.
     */
    public static getInstance(): RequestCounterService {
        if (!RequestCounterService.instance) {
            RequestCounterService.instance = new RequestCounterService();
        }
        return RequestCounterService.instance;
    }

    /**
     * Increments the count for a specific status code for a given endpoint.
     * If the endpoint does not exist, a new record is created.
     * If the endpoint exists, the count for the status code is updated.
     *
     * @param {string} endpoint - The API endpoint for which the status code count is to be updated.
     * @param {number} statusCode - The HTTP status code to be incremented.
     * @returns {Promise<any>} The updated counter document.
     * @throws {Error} Throws an error if the MongoDB operation fails.
     */
    async incrementRequestCount(req:NextRequest,endpoint: string, statusCode: number): Promise<any> {
        ServiceMetrics.getInstance().incrementRequestCount(req.method, endpoint, statusCode);
        const update = {
            $inc: { [`statusCodes.${statusCode}`]: 1 },
            $set: { lastReset: new Date() }
        };

        try {
            // Find and update the record, or create it if it doesn't exist
            const counter = await Models.RequestCounter.findOneAndUpdate(
                { endpoint },
                update,
                { new: true, upsert: true }
            );
            return counter;
        } catch (error) {
            console.error('Error updating status code count:', error);
            throw new Error('Failed to update status code count.');
        }
    }

    async getCalls():Promise<IStatusCodeCounter[]> {
        return await Models.RequestCounter.find()
     }
}
