window.Spark = Ember.Application.create({
  LOG_TRANSITIONS : true
});

// MODEL

Spark.ApplicationAdapter = DS.FixtureAdapter.extend();


Spark.GameFilterOption = DS.Model.extend({
  name : DS.attr('string'),
  filter: DS.attr('string')
});

Spark.GameFilterOption.FIXTURES = [
{
  id : 1,
  name: "All",
  filter: "||||||||||||||||",
},
{
  id : 2,
  name: "Arcade",
  filter: "||||||||||||||||",
},
{
  id : 3,
  name: "Recently Created",
  filter: "||||||||||||||||",
}
];


Spark.GameSortOption = DS.Model.extend({
  name : DS.attr('string'),
  sort: DS.attr('string')
});

Spark.GameSortOption.FIXTURES = [
{
  id : 1,
  name: "Created Date",
  sort: "||||||||||||||||",
},

{
  id : 2,
  name: "Last Modified Date",
  sort: "||||||||||||||||",
},
{
  id : 3,
  name: "Company",
  sort: "||||||||||||||||",
}
];

Spark.Game = DS.Model.extend({
  name : DS.attr('string'),
  description : DS.attr('string'),
  genre: DS.attr("number")
});

Spark.Game.FIXTURES = [
{
  id: 1,
  name: "Fallout 3: New Vegas",
  description: "Post apocalyptic awesomeness",
  genre : 1
},
{
  id: 2,
  name: "Magic 2014: Duel of the Planewalkers",
  description: "Best card game in the world",
  genre : 2
},
{
  id : 3,
  name: "League of Legends",
  description: "Chess: Year 2000 Edition",
  genre : 3
}
];



// ENTITY ROUTE

Spark.EntityListRoute = Ember.Route.extend({
  model: function() {
    var type = this.get("type");
    var promises = {
        model : this.store.find(type),
        filterOptions : this.store.find(type+"FilterOption"),
        sortOptions : this.store.find(type+"SortOption") 
    }
    return Ember.RSVP.hash(promises);  
  },
  setupController : function( controller, hash ) {
    var type = this.get("type");
    controller.setProperties({
      model : hash.model,
      filterOptions : hash.filterOptions,
      sortOptions : hash.sortOptions,
      type : type 
    });
  },
  renderTemplate: function() {
    var type = this.get("type");
    this.render('entityList', { controller: type+'List' });
  }
});

Spark.EntityRoute = Ember.Route.extend({
  renderTemplate: function() {
    var type = this.get("type");
    this.render('entity', { controller: type });
  }
});



// ENTITY CONTROLLERS

Spark.EntityListController = Ember.ArrayController.extend({
  type: undefined,

  filterOptions : undefined,
  selectedFilters : Ember.A(),
  
  sortOptions : undefined,
  selectedSorts : Ember.A(),

  selectedItems : Ember.A(),

  actions: {
    // Game Actions
    selectAll: function() {

    },
    new : function() {

    },
    delete : function() {

    },
    refresh : function() {

    },
    // Sort/Filter Actions
    showSortFilter : function() {

    },
    filterBy : function() {

    },
    sortBy : function() {

    }
  }
})

Spark.EntityController = Ember.ObjectController.extend({
  actions: {
    edit : function() {

    },
    delete : function() {

    },
    refresh : function() {

    },
    save : function() {

    }
  }
});


// SELECT OPTION COMPONENTS

Spark.SelectOptionListComponent = Ember.Component.extend({
  options : undefined,
  selected: undefined,
  hasSelectAll: false,
  actions : {
    toggleSelected : function(optionID, isSelected) {
      var selected = this.get("selected");
      if(isSelected) {
        selected.pushObject(optionID); 
      } else {
        selected.removeAt(selected.indexOf(optionID));
      }

      if( selected.length <= 0 ) {
        this.set("hasSelectAll", false);
      }
    }
  }
});

Spark.SelectOptionComponent = Ember.Component.extend({
  isSelected: false, 
  optionID: undefined, 
  toggleSelected : function() {
      var isSelected = this.get("isSelected");
      var optionID = this.get("optionID");
      this.sendAction("PA_toggleSelected", optionID, isSelected);
  }.observes("isSelected"),
  isSelectAllToggled : function() {
    this.set( "isSelected", this.get("parentView.hasSelectAll") );
  }.observes("parentView.hasSelectAll")
});



// Router

Spark.Router.map( function() {
  /*
  this.route("login");
  this.resource("index", function() {
    this.resource("settings", function() {

    });
  });
  */
  this.resource("gameList", { path: "/" }, function() {
    this.resource("game", { path: ":game_id"}, function() {
      this.route("edit");
    });
    this.route("new");
  });
  /*
  this.resource("promoVideos", function() {
    this.resource("promoVideo", { path: ":promoVideo_hid"});
  })
*/
});

// GAME

Spark.GameListRoute = Spark.EntityListRoute.extend({
  type: "game"
});
Spark.GameRoute = Spark.EntityRoute.extend({
  type: "game"
})

Spark.GameListController = Spark.EntityListController.extend();
Spark.GameController = Spark.EntityController.extend();


Spark.FilterOptionListComponent = Spark.SelectOptionListComponent.extend();
Spark.FilterOptionComponent = Spark.SelectOptionComponent.extend();

Spark.SortOptionListComponent = Spark.SelectOptionListComponent.extend();
Spark.SortOptionComponent = Spark.SelectOptionComponent.extend();