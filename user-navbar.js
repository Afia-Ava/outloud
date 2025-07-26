document.addEventListener('DOMContentLoaded', function () {
  if (typeof firebase === 'undefined' || !firebase.auth) return;
  firebase.auth().onAuthStateChanged(function (user) {
    const joinBtnDiv = document.querySelector(
      '.sidebar > div[style*="bottom: 0"]'
    );
    if (!joinBtnDiv) return;
    joinBtnDiv.innerHTML = '';
    if (user) {
      const name =
        user.displayName || (user.email ? user.email.split('@')[0] : 'User');
      const pfp =
        user.photoURL ||
        'https://ui-avatars.com/api/?name=' +
          encodeURIComponent(name) +
          '&background=014848&color=fff&size=48';
      const userDiv = document.createElement('div');
      userDiv.style.display = 'flex';
      userDiv.style.alignItems = 'center';
      userDiv.style.gap = '12px';
      userDiv.style.padding = '8px 0';
      const pfpDiv = document.createElement('div');
      pfpDiv.style.width = '38px';
      pfpDiv.style.height = '38px';
      pfpDiv.style.borderRadius = '50%';
      pfpDiv.style.background = '#014848';
      pfpDiv.style.display = 'flex';
      pfpDiv.style.alignItems = 'center';
      pfpDiv.style.justifyContent = 'center';
      pfpDiv.style.overflow = 'hidden';
      const pfpImg = document.createElement('img');
      pfpImg.src = pfp;
      pfpImg.alt = 'Profile';
      pfpImg.style.width = '38px';
      pfpImg.style.height = '38px';
      pfpImg.style.borderRadius = '50%';
      pfpImg.style.objectFit = 'cover';
      pfpDiv.appendChild(pfpImg);
      // Name
      const nameSpan = document.createElement('span');
      nameSpan.textContent = name;
      nameSpan.style.color = '#fff';
      nameSpan.style.fontWeight = '600';
      nameSpan.style.fontSize = '1rem';
      nameSpan.style.maxWidth = '90px';
      nameSpan.style.overflow = 'hidden';
      nameSpan.style.textOverflow = 'ellipsis';
      nameSpan.style.whiteSpace = 'nowrap';
      // 3-dot menu
      const menuWrapper = document.createElement('div');
      menuWrapper.style.position = 'relative';
      menuWrapper.style.display = 'flex';
      menuWrapper.style.alignItems = 'center';
      menuWrapper.style.marginLeft = 'auto'; // push to the right
      menuWrapper.style.marginRight = '8px'; // add a little space from the edge
      // 3-dot button
      const dotBtn = document.createElement('button');
      dotBtn.setAttribute('aria-label', 'User menu');
      dotBtn.style.background = 'none';
      dotBtn.style.border = 'none';
      dotBtn.style.cursor = 'pointer';
      dotBtn.style.padding = '0 6px';
      dotBtn.style.display = 'flex';
      dotBtn.style.alignItems = 'center';
      dotBtn.style.height = '38px';
      dotBtn.style.marginLeft = '2px';
      dotBtn.innerHTML =
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="12" r="2" fill="#fff"/><circle cx="12" cy="12" r="2" fill="#fff"/><circle cx="19" cy="12" r="2" fill="#fff"/></svg>';
      // Dropdown menu
      const menu = document.createElement('div');
      menu.style.position = 'absolute';
      menu.style.right = '0';
      menu.style.bottom = '44px';
      menu.style.background = '#23272f';
      menu.style.borderRadius = '8px';
      menu.style.boxShadow = '0 2px 12px 0 rgba(0,0,0,0.18)';
      menu.style.padding = '8px 0';
      menu.style.minWidth = '120px';
      menu.style.display = 'none';
      menu.style.zIndex = '100';
      // Logout option
      const logoutBtn = document.createElement('button');
      logoutBtn.textContent = 'Log out';
      logoutBtn.style.background = 'none';
      logoutBtn.style.border = 'none';
      logoutBtn.style.color = '#fff';
      logoutBtn.style.fontSize = '1rem';
      logoutBtn.style.fontWeight = '500';
      logoutBtn.style.width = '100%';
      logoutBtn.style.padding = '10px 18px';
      logoutBtn.style.textAlign = 'left';
      logoutBtn.style.cursor = 'pointer';
      logoutBtn.onmouseover = () => (logoutBtn.style.background = '#014848');
      logoutBtn.onmouseout = () => (logoutBtn.style.background = 'none');
      logoutBtn.onclick = () => {
        if (typeof logout === 'function') {
          logout().then(() => {
            window.location.href = 'login.html';
          });
        }
        menu.style.display = 'none';
      };
      menu.appendChild(logoutBtn);

      dotBtn.onclick = e => {
        e.stopPropagation();
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
      };

      document.addEventListener('click', function hideMenu(e) {
        if (!menu.contains(e.target) && e.target !== dotBtn) {
          menu.style.display = 'none';
        }
      });
      menuWrapper.appendChild(dotBtn);
      menuWrapper.appendChild(menu);

      userDiv.appendChild(pfpDiv);
      userDiv.appendChild(nameSpan);
      userDiv.appendChild(menuWrapper);
      joinBtnDiv.appendChild(userDiv);
    } else {
      joinBtnDiv.innerHTML = `<a href="login.html" style="background:#014848;color:#fff;padding:10px 32px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;box-shadow:0 2px 8px 0 rgba(0,0,0,0.08);">Join</a>`;
    }
  });
});
