function loadSettingsProfile() {
  var name = localStorage.getItem('userName') || '';
  var username = localStorage.getItem('userUsername') || '';
  var about = localStorage.getItem('userBio') || '';
  var location = localStorage.getItem('userLocation') || '';
  document.getElementById('settingsName').value = name;
  document.getElementById('settingsUsername').value = username;
  document.getElementById('settingsAbout').value = about;
  document.getElementById('settingsLocation').value = location;
  var profilePhoto = localStorage.getItem('profilePic');
  var profileImg = document.getElementById('settingsProfilePhoto');
  var defaultAvatar = document.getElementById('settingsDefaultAvatar');
  if (profilePhoto) {
    profileImg.src = profilePhoto;
    profileImg.style.display = 'block';
    defaultAvatar.style.display = 'none';
  } else {
    profileImg.style.display = 'none';
    defaultAvatar.style.display = 'block';
  }
  var coverPhoto = localStorage.getItem('coverPhoto');
  var coverImg = document.getElementById('settingsCoverPhoto');
  var defaultCover = document.getElementById('settingsDefaultCover');
  if (coverPhoto) {
    coverImg.src = coverPhoto;
    coverImg.style.display = 'block';
    defaultCover.style.display = 'none';
  } else {
    coverImg.style.display = 'none';
    defaultCover.style.display = 'block';
  }
  if (window.firebase && firebase.auth) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user && user.email) {
        document.getElementById('settingsEmail').value = user.email;
      } else {
        document.getElementById('settingsEmail').value = '';
      }
    });
  } else {
    document.getElementById('settingsEmail').value = '';
  }
}
loadSettingsProfile();
[
  'settingsName',
  'settingsUsername',
  'settingsAbout',
  'settingsLocation',
].forEach(function (id) {
  document.getElementById(id).addEventListener('change', function () {
    var key =
      id === 'settingsName'
        ? 'userName'
        : id === 'settingsUsername'
        ? 'userUsername'
        : id === 'settingsAbout'
        ? 'userBio'
        : id === 'settingsLocation'
        ? 'userLocation'
        : '';
    if (key) localStorage.setItem(key, this.value);
  });
});
// Profile photo upload
document
  .getElementById('settingsProfilePhotoInput')
  .addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (evt) {
      localStorage.setItem('profilePic', evt.target.result);
      loadSettingsProfile();
    };
    reader.readAsDataURL(file);
  });
document
  .getElementById('settingsCoverPhotoInput')
  .addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (evt) {
      localStorage.setItem('coverPhoto', evt.target.result);
      loadSettingsProfile();
    };
    reader.readAsDataURL(file);
  });
document
  .getElementById('changePasswordBtn')
  .addEventListener('click', function () {
    if (window.firebase && firebase.auth) {
      var user = firebase.auth().currentUser;
      if (user && user.email) {
        firebase
          .auth()
          .sendPasswordResetEmail(user.email)
          .then(function () {
            alert('Password reset email sent!');
          })
          .catch(function (error) {
            alert('Error: ' + error.message);
          });
      } else {
        alert('No user is signed in.');
      }
    } else {
      alert('Password reset is only available with Firebase Auth.');
    }
  });
document.getElementById('logoutBtn').addEventListener('click', function () {
  if (window.firebase && firebase.auth) {
    firebase
      .auth()
      .signOut()
      .then(function () {
        window.location.href = 'landing.html';
      });
  } else {
    window.location.href = 'landing.html';
  }
});
document
  .getElementById('deleteAccountBtn')
  .addEventListener('click', function () {
    if (window.firebase && firebase.auth) {
      var user = firebase.auth().currentUser;
      if (user) {
        if (
          confirm(
            'Are you sure you want to request account deletion? This cannot be undone.'
          )
        ) {
          user
            .delete()
            .then(function () {
              alert('Account deleted.');
              window.location.href = 'index.html';
            })
            .catch(function (error) {
              alert(
                'Error: ' +
                  error.message +
                  '\nYou may need to re-authenticate before deleting your account.'
              );
            });
        }
      } else {
        alert('No user is signed in.');
      }
    } else {
      alert('Account deletion is only available with Firebase Auth.');
    }
  });
