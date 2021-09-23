export type Path = Omit<typeof path, 'fill'>

const path = {
  signIn: ['/', '/signin'],
  signUp: '/signup',
  user: '/user',
  userSettings: '/user/settings',
  storage: '/storage/:storageID',
  memberManagement: '/storage/:storageID/member-management',
  history: '/storage/:storageID/history',
  penerimaan: '/storage/:storageID/penerimaan',
  bufferArea: '/storage/:storageID/buffer-area',
  list: '/storage/:storageID/list',
  delivery: '/storage/:storageID/delivery',
};


export default path;
