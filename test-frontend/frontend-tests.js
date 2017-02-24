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

    it('should have Hello World message', function() {
      expect(RegistrationController.message).toEqual('Hello world');
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

  beforeEach(function () {
    angular.mock.module('app');

    inject(function ($controller, $httpBackend) {
      httpBackend = $httpBackend;
      BookmarksController = $controller('BookmarksController');
    });
  });

  describe('bookmarks', function () {
    it('should be defined', function() {
      expect(BookmarksController).toBeDefined();
    });

    xit('should have method to render bookmarks', function() {
      expect(BookmarksController.getList).toBeDefined();
    });

    xit('should have method to add new bookmark', function() {
      expect(BookmarksController.saveBookmark).toBeDefined();
    });
  });
});
