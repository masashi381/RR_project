export enum Limitation {
  None, // Pages with no limitation
  LoggedIn, // Pages only for logged in users
}

export type Page = {
  path: RegExp;
  limitation: Limitation;
  isLoadingRequired: boolean;
};

export type Permission = {
  isAllowed: boolean;
  redirection: string;
};

export const PAGES: Page[] = [
  {
    path: /^\/$/,
    limitation: Limitation.None,
    isLoadingRequired: false,
  },
  {
    path: /^\/restaurants$/,
    limitation: Limitation.None,
    isLoadingRequired: true,
  },
  {
    path: /^\/signup$/,
    limitation: Limitation.None,
    isLoadingRequired: false,
  },
  {
    path: /^\/login$/,
    limitation: Limitation.None,
    isLoadingRequired: false,
  },
  {
    path: /^\/restaurants\/\w+$/,
    limitation: Limitation.None,
    isLoadingRequired: true,
  },
  {
    path: /^\/users$/,
    limitation: Limitation.LoggedIn,
    isLoadingRequired: false,
  },
  {
    path: /^\/users\?tab=favorite$/,
    limitation: Limitation.LoggedIn,
    isLoadingRequired: false,
  },
  {
    path: /^\/users\?tab=reviews$/,
    limitation: Limitation.LoggedIn,
    isLoadingRequired: false,
  },
  {
    path: /^\/users\?tab=userProfile$/,
    limitation: Limitation.LoggedIn,
    isLoadingRequired: false,
  },
  {
    path: /^\/users\?tab=userEdit$/,
    limitation: Limitation.LoggedIn,
    isLoadingRequired: false,
  },
];
