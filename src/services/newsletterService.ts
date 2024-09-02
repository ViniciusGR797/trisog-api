import {
  Newsletter,
  NewsletterUpsert,
} from "../models/newsletterModel";
import prismaClient from "../utils/database";

export class NewsletterService {
  static async getNewsletters(): Promise<{
    newsletters: Newsletter[] | null;
    error: string | null;
  }> {
    try {
      const newsletters = await prismaClient.newsletter.findMany();

      return { newsletters, error: null };
    } catch (error) {
      console.error("Error retrieving newsletter: ", error);
      return { newsletters: null, error: "Internal Server Error" };
    }
  }

  static async getNewsletterById(
    newsletterId: string
  ): Promise<{ newsletter: Newsletter | null; error: string | null }> {
    try {
      const newsletter = await prismaClient.newsletter.findUnique({
        where: {
          id: newsletterId,
        },
      });

      if (newsletter) {
        return { newsletter, error: null };
      } else {
        return { newsletter: null, error: null };
      }
    } catch (error) {
      console.error("Error when searching for newsletter by ID: ", error);
      return { newsletter: null, error: "Internal server error" };
    }
  }

  static async createNewsletter(
    newData: NewsletterUpsert
  ): Promise<{ createdNewsletterId: string | null; error: string | null }> {
    try {
      const result = await prismaClient.newsletter.create({
        data: {
          email: newData.email,
        },
      });

      return { createdNewsletterId: result.id, error: null };
    } catch (error) {
      console.error("Error creating newsletter: ", error);
      return { createdNewsletterId: null, error: "Internal server error" };
    }
  }

  static async deleteNewsletter(
    newsletterId: string
  ): Promise<{ deletedNewsletter: Newsletter | null; error: string | null }> {
    try {
      const result = await prismaClient.newsletter.delete({
        where: {
          id: newsletterId,
        },
      });
      return { deletedNewsletter: result, error: null };
    } catch (error) {
      console.error("Error deleting newsletter:", error);
      return { deletedNewsletter: null, error: "Internal server error" };
    }
  }
}
