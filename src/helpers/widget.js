const getInstance = (failCallback) => {
  if (window?.B24Chat?.instance) {
    return window.B24Chat.instance
  }

  if (typeof failCallback === 'function') {
    failCallback()
  }

  return false;
}

const login = (failCallback) => {
  if(getInstance(failCallback)) {
    getInstance().login();
  }
}

const register = (failCallback) => {
  if(getInstance(failCallback)) {
    getInstance().register();
  }
}

const open = (failCallback) => {
  if(getInstance(failCallback)) {
    getInstance().toggleSVG(0);
  }
}

const openMenu = (failCallback) => {
  if(getInstance(failCallback)) {
    getInstance().openMenu();
  }
}

const openProfile = (failCallback) => {
  if(getInstance(failCallback)) {
    getInstance().openProfile();
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  register,
  open,
  openMenu,
  openProfile
}