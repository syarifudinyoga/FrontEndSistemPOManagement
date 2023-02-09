<template>
<aside class="menu-sidebar d-none d-lg-block">
  <div class="logo">
    <router-link to="/dashboard">
    <h3>PO Management</h3>
    </router-link>
  </div>
  <div class="menu-sidebar__content js-scrollbar1">
    <nav class="navbar-sidebar">
      <ul class="list-unstyled navbar__list">
         <li class="float-left">
            <router-link to="/dashboard">     
            <h5><i class="fas fa-tachometer-alt"></i>Dashboard</h5>
            </router-link>
         </li><br><br><br>
         <li class="float-left">
            <router-link to="/client">
            <h5><i class="fas fa-chart-bar"></i>Client</h5>
            </router-link>
         </li><br><br><br>
         <li class="float-left">
            <router-link to="/employee">
            <h5><i class="fas fa-table"></i>Employee</h5>
            </router-link>
         </li><br><br><br>
         <li class="float-left">
            <router-link to="/user">
            <h5><i class="fas fa-user"></i>User</h5>
            </router-link>
         </li>
      </ul>
    </nav>
  </div>
</aside>
</template>