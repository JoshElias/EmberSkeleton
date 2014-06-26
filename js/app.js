window.Spark = Ember.Application.create();

Spark.ApplicationAdapter = DS.FixtureAdapter.extend();

// Router

Spark.Router.map( function() {
  /*
  this.route("login");
  this.resource("index", function() {
    this.resource("settings", function() {

    });
  });
  */
	this.resource("games", { path: "/" }, function() {
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


// GAMES


Spark.GamesRoute = Ember.Route.extend({
  model: function() {
    var promises = {
        model : this.store.find("game"),
        filterOptions : this.store.find("filterOption"),
        sortOptions : this.store.find("sortOption") 
    }

    return Ember.RSVP.hash(promises);  
  },
  setupController : function( controller, hash ) {
      controller.setProperties({
        model : hash.model,
        filterOptions : hash.filterOptions,
        sortOptions : hash.sortOptions
      });
  }
});



Spark.GamesController = Ember.ArrayController.extend({
  filterOptions : {},
  selectedFilters : [],
  sortOptions : {},
  selectedSorts : [],

  selectedItems : [],

  actions: {
    // Game Actions
    selectAllGames: function() {

    },
    newGame : function() {

    },
    deleteGame : function() {

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


// GAME

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

Spark.GameController = Ember.ObjectController.extend({
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
})


// FILTER

Spark.FilterOption = DS.Model.extend({
  name : DS.attr('string'),
  filter: DS.attr('string')
});

Spark.FilterOption.FIXTURES = [
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


Spark.FilterOptionsComponent = Ember.Component.extend({
  filterOptions : undefined,
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
    },
    refresh : function() {

    } 
  }
});

Spark.FilterOptionComponent = Ember.Component.extend({
  isSelected: false, //Ember.computed.oneWay('parentView.hasSelectAll'),
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


// SORT

Spark.SortOption = DS.Model.extend({
  name : DS.attr('string'),
  sort: DS.attr('string')
});

Spark.SortOption.FIXTURES = [
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


Spark.SortOptionsComponent = Ember.Component.extend({
  sortOptions : undefined,
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
    },
    refresh : function() {

    } 
  }
});

Spark.SortOptionComponent = Ember.Component.extend({
  isSelected: false, //Ember.computed.oneWay('parentView.hasSelectAll'),
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
