'use strict';

var lock = new Auth0Lock('JNxdEQGv4qh1mDkZSErbbDWmnuIR10po' , 'nncl.auth0.com');

document.getElementById('btn-login').addEventListener('click', function() {
    lock.show(function(err, profile, token) {
    if (err) {
      // Error callback
      console.error("Something went wrong: ", err);
    } else {
      // Success calback

      // Save the JWT token.
      localStorage.setItem('userToken', token);
      // Save the profile
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }
  });
});

document.getElementById('btn-logout').addEventListener('click', function() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userProfile');
    window.location.href = "/";
});

document.getElementById('btn-foos').addEventListener('click', function() {
    var getFoos = fetch('/api/foo', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
      },
      method: 'GET',
      cache: false
    });

    getFoos.then(function (response) {
        console.log(response);
      // response.json().then(function (foos) {
      //   console.log('the foos:', foos);
      // });
    });
});