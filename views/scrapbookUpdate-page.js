var observable = require("data/observable");
var frame = require("ui/frame");
var scrapbook; // #A
var fileSystemService = require("~/data/fileSystemService");

exports.onLoaded = function(args) {
  var page = args.object;
  var scrapbookPage = page.navigationContext.model;
  page.bindingContext = scrapbookPage;
};

var fileSystemService = require("~/data/fileSystemService");
exports.onDoneTap = function(args) {
  var page = args.object;
  var scrapbookPage = page.bindingContext;
  fileSystemService.fileSystemService.savePage(scrapbookPage);
  frame.topmost().navigate({
    moduleName: "views/scrapbook-page"
  });
};
