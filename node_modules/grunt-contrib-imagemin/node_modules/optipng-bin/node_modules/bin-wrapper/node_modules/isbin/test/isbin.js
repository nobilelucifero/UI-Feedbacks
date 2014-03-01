var isbin = require('../');

describe('isbin', function() {
  it('accepts binary, additional path and callback', function(done) {
    isbin('ls', '/etc', function(exists) {
      exists.should.be.a('boolean');
      done();
    })
  });

  it('accepts array of paths', function(done) {
    isbin('ls', ['/etc', '/home'], function(exists) {
      exists.should.be.a('boolean');
      done();
    });
  });

  it('accepts just binary and callback', function(done) {
    isbin('ls', function(exists) {
      exists.should.be.a('boolean');
      done();
    });
  });

  it('accepts binary, additional path and callback', function() {
    var exists = isbin('ls', '/etc');
    exists.should.be.a('boolean');
  });

  it('accepts array of paths', function() {
    var exists = isbin('ls', ['/etc', '/home']);
    exists.should.be.a('boolean');
  });

  it('accepts just binary', function() {
    var exists = isbin('ls');
    exists.should.be.a('boolean');
  });
});
