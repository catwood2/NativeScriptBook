var observable = require("data/observable");
var observableArray = require("data/observable-array");
exports.onLoaded = function(args) {
var page = args.object;
var calcAge = function(year, month, day){
var date = new Date(year, month, day);
var now = Date.now();
var diff = Math.abs(now - date) / 1000 / 31536000;
return diff.toFixed(1);
}
var genders = ["Female", "Male", "Other"];
var emptyScrapbookPage = new observable.fromObject({
genders: genders,
calcAge: calcAge
});
var filledScrapbookPage = new observable.fromObject({
genders: genders,
title: "Riven's Page",
calcAge: calcAge,
gender: 0
});
var scrapbook = new observable.fromObject({
pages: new observableArray.ObservableArray(emptyScrapbookPage, filledScrapbookPage)
}); //#A
page.bindingContext = scrapbook;
};