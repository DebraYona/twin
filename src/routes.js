  import React from 'react';

const Landing = React.lazy(() => import('./views/Landing/Landing'));
const Login = React.lazy(() => import('./views/Pages/Login'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Logout = React.lazy(() => import('./views/logout'));

const RegisterSuccess = React.lazy(() => import('./views/Pages/RegisterInfo/RegisterSuccess'));

const Categories = React.lazy(() => import('./views/Categories/Categories'));

const Drivers = React.lazy(() => import('./views/Drivers/Drivers'));
const addDriver = React.lazy(() => import('./views/Drivers/addDriver'));
const editOrDeleteDriver = React.lazy(() => import('./views/Drivers/editOrDeleteDriver'));
const Users = React.lazy(() => import('./views/Users/Users'));

const Contact = React.lazy(() => import('./views/Contact/Contact'));
const addContact = React.lazy(() => import('./views/Contact/addContact'));
const editOrDeleteContact = React.lazy(() => import('./views/Contact/editOrDeleteContact'));

const Transactions = React.lazy(() => import('./views/Transactions/Transactions'));
const addTransaction = React.lazy(() => import('./views/Transactions/addTransactions'));
const editOrDeleteTransactions = React.lazy(() => import('./views/Transactions/editOrDeleteTransactions'));

const EnterpriseDirectory = React.lazy(() => import('./views/EnterpriseDirectory/EnterpriseDirectory'));
const AddOrEditEnterpriseDirectory = React.lazy(() => import('./views/EnterpriseDirectory/AddOrEditEnterpriseDirectory'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/logout', name: 'Logout', component: Logout },
  { path: '/registerSuccess', exact: true, name: 'Register success', component: RegisterSuccess },

  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/categories', exact: true, name:'Ligar mis cuentas', component: Categories },
  
  { path: '/drivers', exact: true, name:'Choferes', component: Drivers },
  { path: '/drivers/add', exact: true, name:'Registrar chofer', component: addDriver },
  { path: '/drivers/:id', exact: true, name:'Editar chofer', component: editOrDeleteDriver },
  
  { path: '/users', exact: true, name:'Usuarios', component: Users },

  { path: '/contact', exact: true, name:'Contacto', component: Contact },
  { path: '/contact/add', exact: true, name:'Registrar Contacto', component: addContact },
  { path: '/contact/:id', exact: true, name:'Editar Contacto', component: editOrDeleteContact },

  { path: '/transactions', exact: true, name:'Movimientos', component: Transactions },
  { path: '/transactions/add', exact: true, name:'Agregar Transacciones', component: addTransaction },
  { path: '/transactions/:id', exact: true, name:'Editar o Eliminar Transacciones', component: editOrDeleteTransactions },

  { path: '/enterpriseDirectory', exact: true, name:'Directorio Empresarial', component: EnterpriseDirectory },
  { path: '/AddOrEditEnterpriseDirectory/:id', exact: true, name:'Detalle de Directorio Empresarial', component: AddOrEditEnterpriseDirectory },
  

];

export default routes;
