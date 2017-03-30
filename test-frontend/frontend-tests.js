// *** DUMMY TEST ***

describe('Testing the test', function () {
  it('has a dummy spec to test 2 + 2', function () {
    expect(2 + 2).toEqual(4);
  });
});

// *** VALID TESTS ***

// ** USER HANDLING **
// * Registration *
describe('Registration controller', function() {

  var httpBackend;
  var RegistrationController;

  beforeEach(function () {
    angular.mock.module('app');

    inject(function ($controller, $httpBackend) {
      httpBackend = $httpBackend;
      RegistrationController = $controller('RegistrationController');
    });
  });

  describe('register', function () {
    it('should be defined', function() {
      expect(RegistrationController).toBeDefined();
    });

    it('should have method to register new user', function() {
      expect(RegistrationController.userRegister).toBeDefined();
    });

  })
});

// * Login *
describe('Login controller', function() {

  var httpBackend;
  var LoginController;

  beforeEach(function () {
    angular.mock.module('app');

    inject(function ($controller, $httpBackend) {
      httpBackend = $httpBackend;
      LoginController = $controller('LoginController');
    });
  });

  describe('login', function () {
    it('should be defined', function() {
      expect(LoginController).toBeDefined();
    });

    it('should have function to log in user', function() {
      expect(LoginController.userLogin).toBeDefined();
    });

  });
});

// * Home *
describe('Bookmarks controller', function() {

  var httpBackend;
  var BookmarksController;
  // // TODO //
  // var location;

  beforeEach(function () {
    angular.mock.module('app');

    inject(function ( $controller, $httpBackend) {
      httpBackend = $httpBackend;
      BookmarksController = $controller('BookmarksController');
    });
  });

  describe('bookmarks', function () {
    it('should be defined', function() {
      expect(BookmarksController).toBeDefined();
    });

    it('should be defined', function() {
      expect(BookmarksController.getLinks).toBeDefined();
    });

    it('should be defined', function() {
      expect(BookmarksController.logout).toBeDefined();
    });

    it('should be defined', function() {
      expect(BookmarksController.saveBookmark).toBeDefined();
    });

    it('should be defined', function() {
      expect(BookmarksController.deleteBookmark).toBeDefined();
    });

    it('should be defined', function() {
      expect(BookmarksController.logout).toBeDefined();
    });

    it('should be defined', function() {
      expect(BookmarksController.onAddClick).toBeDefined();
    });

    it('should be defined', function() {
      expect(BookmarksController.showInputBox).toBeDefined();
    });

    it('should be invisible', function() {
      expect(BookmarksController.showInputBox).toBe(false);
    });

    it('should be visible', function() {
      BookmarksController.onAddClick();
      expect(BookmarksController.showInputBox).toBe(true);
    });

    it('should be invisible', function() {
      BookmarksController.onAddClick();
      BookmarksController.saveBookmark();
      expect(BookmarksController.showInputBox).toBe(false);
    });

  });
});
