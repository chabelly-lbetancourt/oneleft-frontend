/** Who can follow someone (HU-047): anyone at once, or only whoever they accept. */
export type Visibility = 'PUBLIC' | 'PRIVATE';

/** A follow, or a request still waiting for the answer of a private profile. */
export type FollowStatus = 'ACCEPTED' | 'PENDING';

/** Where I stand with someone. */
export type Relation = 'NONE' | 'REQUESTED' | 'FOLLOWING' | 'SELF';

/** My profile in the social service and my counts. */
export interface SocialAccount {
  userId: string;
  name: string;
  visibility: Visibility;
  followers: number;
  following: number;
  /** Requests waiting for my answer */
  requests: number;
  /** My requests waiting for an answer */
  sentRequests: number;
}

/** Someone as I see them. */
export interface SocialPerson {
  userId: string;
  name: string;
  visibility: Visibility;
  followers: number;
  following: number;
  relation: Relation;
  followsMe: boolean;
  /** I may see their recent plans and their network (HU-048): it is me, their profile is public or I follow them */
  activityVisible: boolean;
}

/** Someone in one of my lists, and since when. */
export interface Connection {
  userId: string;
  name: string;
  status: FollowStatus;
  since: string;
}

/** A page of a list, the latest first. */
export interface ConnectionPage {
  items: Connection[];
  page: number;
  size: number;
  total: number;
}

/** My lists in «My network». */
export type NetworkList = 'followers' | 'following' | 'requests' | 'sent';

/** The lists of someone else, if their profile lets me see them (HU-048). */
export type PersonList = 'followers' | 'following';
