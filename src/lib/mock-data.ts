import { XPost } from "@/types";

const MOCK_ACCOUNTS: Record<
  string,
  { displayName: string; avatarUrl: string }
> = {
  sahilbloom: {
    displayName: "Sahil Bloom",
    avatarUrl: "https://pbs.twimg.com/profile_images/1234567890/photo_400x400.jpg",
  },
  naval: {
    displayName: "Naval",
    avatarUrl: "https://pbs.twimg.com/profile_images/1234567891/photo_400x400.jpg",
  },
  alexhormozi: {
    displayName: "Alex Hormozi",
    avatarUrl: "https://pbs.twimg.com/profile_images/1234567892/photo_400x400.jpg",
  },
  dickiebush: {
    displayName: "Dickie Bush",
    avatarUrl: "https://pbs.twimg.com/profile_images/1234567893/photo_400x400.jpg",
  },
};

const MOCK_POSTS_TEMPLATES = [
  {
    text: "The most underrated skill in business:\n\nClarity of thought.\n\nMost people can't explain what they do in one sentence. If you can't explain it simply, you don't understand it well enough.\n\nSpend time refining your message until a 12-year-old could understand it.",
    likes: 4523,
    replies: 234,
    reposts: 1245,
    quotes: 89,
    bookmarks: 2341,
    impressions: 456000,
    isThread: false,
    isReply: false,
  },
  {
    text: "I spent 10 years studying the habits of 200+ successful people.\n\nHere are 7 patterns that changed my life:\n\n(Thread) 🧵",
    likes: 12450,
    replies: 567,
    reposts: 4532,
    quotes: 234,
    bookmarks: 8901,
    impressions: 1200000,
    isThread: true,
    isReply: false,
  },
  {
    text: "Stop trying to be interesting.\n\nStart trying to be interested.\n\nThe most magnetic people I've met ask great questions and genuinely listen to the answers.",
    likes: 8932,
    replies: 412,
    reposts: 2345,
    quotes: 156,
    bookmarks: 5670,
    impressions: 890000,
    isThread: false,
    isReply: false,
  },
  {
    text: "Unpopular opinion: You don't need a morning routine.\n\nYou need systems that work regardless of when you wake up.\n\nThe best entrepreneurs I know optimize for energy management, not time management.",
    likes: 3421,
    replies: 890,
    reposts: 876,
    quotes: 234,
    bookmarks: 1234,
    impressions: 345000,
    isThread: false,
    isReply: false,
  },
  {
    text: "@someone Great point! I'd add that consistency matters more than intensity. Showing up every day at 70% beats showing up once a week at 100%.",
    likes: 234,
    replies: 12,
    reposts: 45,
    quotes: 3,
    bookmarks: 89,
    impressions: 23000,
    isThread: false,
    isReply: true,
  },
  {
    text: "The 3 skills that will make you rich:\n\n1. Writing clearly\n2. Speaking persuasively\n3. Thinking independently\n\nSchool teaches none of them.",
    likes: 15678,
    replies: 1234,
    reposts: 6789,
    quotes: 456,
    bookmarks: 12345,
    impressions: 2300000,
    isThread: false,
    isReply: false,
  },
  {
    text: "Your network is not your net worth.\n\nYour network is your net *leverage*.\n\nThe right connection at the right time can compress 10 years of work into 10 months.\n\nBut here's the catch: you can't withdraw what you haven't deposited.",
    likes: 6543,
    replies: 345,
    reposts: 1890,
    quotes: 123,
    bookmarks: 3456,
    impressions: 670000,
    isThread: false,
    isReply: false,
  },
  {
    text: "I've built 3 companies from $0 to $1M+.\n\nEach time, the same 5 mistakes almost killed me:\n\n(Thread) 🧵",
    likes: 9876,
    replies: 678,
    reposts: 3456,
    quotes: 234,
    bookmarks: 7890,
    impressions: 980000,
    isThread: true,
    isReply: false,
  },
  {
    text: "The fastest way to learn anything:\n\n1. Find the best person at it\n2. Study their work obsessively\n3. Reverse-engineer their process\n4. Apply it to your unique situation\n5. Iterate based on feedback\n\nThis is basically free mentorship.",
    likes: 7654,
    replies: 456,
    reposts: 2345,
    quotes: 178,
    bookmarks: 4567,
    impressions: 780000,
    isThread: false,
    isReply: false,
  },
  {
    text: "Hot take: Most \"productivity\" advice is procrastination in disguise.\n\nYou don't need a better system. You need to do the hard thing you've been avoiding.",
    likes: 11234,
    replies: 789,
    reposts: 3456,
    quotes: 345,
    bookmarks: 6789,
    impressions: 1500000,
    isThread: false,
    isReply: false,
  },
  {
    text: "@friend Totally agree with this. The compound effect is real—just not sexy enough for people to stick with.",
    likes: 156,
    replies: 8,
    reposts: 23,
    quotes: 2,
    bookmarks: 45,
    impressions: 12000,
    isThread: false,
    isReply: true,
  },
  {
    text: "Read this twice:\n\nYour first draft is supposed to be bad.\nYour first business is supposed to struggle.\nYour first year is supposed to be ugly.\n\nThe people who win are the ones who don't quit after the first attempt.",
    likes: 5432,
    replies: 234,
    reposts: 1678,
    quotes: 89,
    bookmarks: 2345,
    impressions: 540000,
    isThread: false,
    isReply: false,
  },
];

function generateDates(count: number): string[] {
  const dates: string[] = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const hoursAgo = Math.floor(Math.random() * 720) + 1;
    const date = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
    dates.push(date.toISOString());
  }
  return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
}

export function getMockPosts(handle: string): XPost[] {
  const cleanHandle = handle.replace("@", "").toLowerCase();
  const account = MOCK_ACCOUNTS[cleanHandle] || {
    displayName: cleanHandle.charAt(0).toUpperCase() + cleanHandle.slice(1),
    avatarUrl: "",
  };

  const dates = generateDates(MOCK_POSTS_TEMPLATES.length);

  return MOCK_POSTS_TEMPLATES.map((template, i) => ({
    id: `${cleanHandle}-${i}-${Date.now()}`,
    handle: cleanHandle,
    displayName: account.displayName,
    avatarUrl: account.avatarUrl,
    text: template.text,
    date: dates[i],
    likes: template.likes + Math.floor(Math.random() * 100),
    replies: template.replies + Math.floor(Math.random() * 20),
    reposts: template.reposts + Math.floor(Math.random() * 50),
    quotes: template.quotes + Math.floor(Math.random() * 10),
    bookmarks: template.bookmarks + Math.floor(Math.random() * 30),
    impressions: template.impressions + Math.floor(Math.random() * 1000),
    isThread: template.isThread,
    isReply: template.isReply,
  }));
}
