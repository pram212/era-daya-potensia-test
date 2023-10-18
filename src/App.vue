<template>
  <div class="container">
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container d-flex">
        <a class="navbar-brand" href="#">Pramono Test</a>
        <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
          <ul class="navbar-nav mx-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/album">Album</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
    <router-view class="container p-3">
      
    </router-view>

  </div>

</template>