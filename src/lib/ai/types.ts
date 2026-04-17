export interface GeneratedTweet {
  id: string;
  author: string;
  handle: string;
  avatarInitials: string;
  content: string;
  likes: string;
  retweets: string;
  replies: string;
  date: string;
  context?: string;
}

export interface GenerateTweetsResponse {
  tweets: GeneratedTweet[];
  intro?: string;
}

export interface TweetAnalysisSection {
  title: string;
  summary: string;
  quote?: string;
}

export interface TweetAnalysis {
  headline: string;
  sections: TweetAnalysisSection[];
  takeaways: string[];
}
