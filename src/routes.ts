export default {
  // Other pages
  '/': false, // root is always false

  // User pages
  '/profile': true,
  '/login': true,
  '/signup': true,
  '/password/restore': false,
  '/password/change': false,
  '/email/confirm': false,
  '/fight': true,
  '/skills': true,
  '/qr-scanner': false,
  '/map': true,

  // Page 404
  '/:pathMatch(.*)*': false,
};
