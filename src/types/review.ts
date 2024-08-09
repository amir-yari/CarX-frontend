import User from "./user";

type Review = {
  rating: number;
  comment?: string;
  hostReply?: string;
  reviewId?: string;
  User: User;
};

export default Review;
