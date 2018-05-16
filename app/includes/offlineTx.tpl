<main class="tab-pane active"
      ng-if="globalService.currentTab==globalService.tabs.offlineTransaction.id"
      ng-controller='offlineTxCtrl'
      ng-cloak>

  <h1 translate="OFFLINE_Title">
    Generate &amp; Send Offline MOAC Transaction
  </h1>

  @@if (site === 'moac') {  @@include( './offlineTx-1.tpl', { "site": "mew" } )   }
  @@if (site === 'moac') {  @@include( './offlineTx-2.tpl', { "site": "mew" } )   }
  @@if (site === 'moac') {  @@include( './offlineTx-3.tpl', { "site": "mew" } )   }
  @@if (site === 'moac') {  @@include( './offlineTx-modal.tpl', { "site": "mew" } )   }

</main>
