document.addEventListener('DOMContentLoaded', function () {
  const name = localStorage.getItem('userName') || 'User';
  const pfp = localStorage.getItem('profilePic') || '';

  const nameSpan = document.getElementById('sidebarProfileName');
  const pfpImg = document.getElementById('sidebarProfilePic');
  const defaultAvatar = document.getElementById('sidebarDefaultAvatar');

  if (nameSpan) nameSpan.textContent = name;

  if (pfp && pfpImg) {
    pfpImg.src = pfp;
    pfpImg.style.display = 'block';
    if (defaultAvatar) defaultAvatar.style.display = 'none';
  } else {
    if (pfpImg) pfpImg.style.display = 'none';
    if (defaultAvatar) defaultAvatar.style.display = 'block';
  }
});
