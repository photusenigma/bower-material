/* */ 
"format cjs";
(function () {
  'use strict';
  angular
      .module('autocompleteFloatingLabelDemo', ['ngMaterial', 'ngMessages'])
      .controller('DemoCtrl', DemoCtrl);

  function DemoCtrl ($timeout, $q) {
    var self = this;

    // list of `state` value/display objects
    self.states        = loadAll();
    self.selectedItem  = null;
    self.searchText    = null;
    self.querySearch   = querySearch;
    self.itemHasFocus  = false;
    self.handleFocusChange = handleFocusChange;
    self.handleSelectedItemChange = handleSelectedItemChange;
    self.selectItem = selectItem;

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states;
      return results;
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }

    function handleSelectedItemChange (item) {
      console.log('selected item changed. ', item);
    }

    function handleFocusChange (hasFocus) {
      console.log('focus changed.  autocomplete has focus: ', hasFocus);
    }

    function selectItem (str) {
      var selectedItems = self.states.filter(function(obj) {
        return obj.value === str.toLowerCase();
      });

      if (selectedItems && selectedItems.length === 1) {
        self.selectedItem = selectedItems[0];
      }
    }
  }
})();
