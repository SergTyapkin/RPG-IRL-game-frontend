export default {
  // Other pages
  '/': false, // root is always false

  // User pages
  '/profile': true,
  '/login': true,
  '/signup': true,
  '/password/change': false,
  '/fight': true,
  '/skills': true,
  '/qr-scanner': false,
  '/map': true,
  '/guild': true,
  '/trade': false,

  // Page 404
  '/:pathMatch(.*)*': false,
};
