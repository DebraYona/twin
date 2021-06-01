const roleId = localStorage.getItem('roleId')
var items = [];
items = [];

if(roleId == 1) {
  items = [
    {
      name: 'Wallet',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info'
      }
    },
    {
      name: 'Perfil',
      url: '/users',
      icon: 'icon-user'
    },
    {
      name: 'Directorio Emp',
      url: '/enterpriseDirectory',
      icon: 'icon-folder-alt'
    },
    {
      name: 'Historial',
      url: '/transactions',
      icon: 'icon-graph'
    },
    {
      name: 'Cryptomonedas',
      url: '/stickers',
      icon: 'icon-envelope-letter'
    },
    // {
    //   name: 'Ligar mis Cuentas',
    //   url: '/categories',
    //   icon: 'icon-list'
    // },
    // {
    //   name: 'Contactos',
    //   url: '/contact',
    //   icon: 'icon-phone '
    // },
    {
      name: 'Cerrar Sesión',
      url: '/logout',
      icon: 'icon-logout'
    }
  ]
}
else if(roleId == 2) {
  items = [
    {
      name: 'Wallet',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info'
      }
    },
    {
      name: 'Perfil',
      url: '/users',
      icon: 'icon-user'
    },
    {
      name: 'Directorio Emp',
      url: '/enterpriseDirectory',
      icon: 'icon-folder-alt'
    },
    {
      name: 'Historial',
      url: '/transactions',
      icon: 'icon-graph'
    },
    {
      name: 'Cryptomonedas',
      url: '/stickers',
      icon: 'icon-envelope-letter'
    },
    // {
    //   name: 'Ligar mis Cuentas',
    //   url: '/categories',
    //   icon: 'icon-list'
    // },
    // {
    //   name: 'Contactos',
    //   url: '/contact',
    //   icon: 'icon-phone '
    // },
    {
      name: 'Cerrar Sesión',
      url: '/logout',
      icon: 'icon-logout'
    }
  ]
}

export default { items };


