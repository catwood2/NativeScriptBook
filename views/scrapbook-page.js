var observable = require("data/observable");
var observableArray = require("data/observable-array");
var frame = require("ui/frame");
var fileSystemService = require("~/data/fileSystemService");

function scrapbookPageModel(id) {
  // #A
  var model = new observable.fromObject({
    id: id,
    genders: ["Female", "Male", "Other"],
    title: "",

    gender: "",
    calcAge: function(year,month,day) {
      var date = new Date(year, month, day);
      var now = Date.now();
      var diff = Math.abs(now - date) / 1000 / 31536000;

      return diff.toFixed(1);
    }
  });

  return model;
}

/*exports.onLoaded = function(args) {
  var page = args.object;
  var scrapbook;
  if (page.navigationContext != null) {
    // #B
    scrapbook = page.navigationContext.model;
  } else {
    scrapbook = new observable.fromObject({
      pages: new observableArray.ObservableArray(new scrapbookPageModel())
    });
  }
  page.bindingContext = scrapbook;
}; */

exports.onLoaded = function(args) {
  var page = args.object;
  var scrapbook = new observable.fromObject({
    pages: new observableArray.ObservableArray()
  });
 var pages = fileSystemService.fileSystemService.getPages(); 
  if (pages.length !== 0) {
    pages.forEach(function(item) {
      var model = new scrapbookPageModel(item.id); // #B
      model.title = item.title;
      model.gender = item.gender;
      model.year = item.year;
      model.month = item.month;
      model.day = item.day;
      scrapbook.pages.push(model);
    });
  }
  page.bindingContext = scrapbook;
}; 
 
exports.onAddTap = function(args) {
  var page = args.object;
  var scrapbook = page.bindingContext;
  frame.topmost().navigate({
    moduleName: "views/scrapbookUpdate-page",
    context: { model: new scrapbookPageModel(scrapbook.pages.length) } // #A
  });
};
exports.onItemTap = function(args) {
  var page = args.object;
  var scrapbook = page.bindingContext;
  frame.topmost().navigate({
    moduleName: "views/scrapbookUpdate-page",
    context: { model: scrapbook.pages.getItem(args.index) } // #B
  });
};
/*exports.onAddTap = function(args) { // #A
  var page = args.object;
  var scrapbook = page.bindingContext;
  scrapbook.pages.push(new scrapbookPageModel()); // #B
  frame.topmost().navigate({
  moduleName: "views/scrapbookUpdate-page",
  context: { model: scrapbook, index: scrapbook.pages.length - 1 } // #C
  });
  };

exports.onItemTap = function(args) {
  // #C
  var page = args.object;
  var scrapbook = page.bindingContext;
  frame.topmost().navigate({
    moduleName: "views/scrapbookUpdate-page",
    context: { model: scrapbook, index: args.index } //# D
  });
};*/
